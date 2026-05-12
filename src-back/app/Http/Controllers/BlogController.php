<?php

namespace App\Http\Controllers;

use App\Http\Requests\Blogs\StoreRequest;
use App\Http\Requests\Dossier\ListRequest;
use App\Http\Requests\Blogs\RemoveRequest;
use App\Models\Blog;
use App\Models\Dossier;
use App\Models\ElementSupprime;
use App\Models\Message;
use App\Models\VariantEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Support\Str;

/**
 * Controller gérant les Blogs
 */
class BlogController
{
    /**
     * Route affichant les blogs d'un dossier
     * @param string $slug_dossier Slug du dossier à afficher
     * @param ListRequest $request Requête entrante avec la variante
     * @return JsonResponse Message et code de succès/d'erreur
     */
    public function index(string $slug_dossier, ListRequest $request): JsonResponse
    {
        try {
            $variant = $request->validated("variant");
            $user = auth('api')->user();
            $estAdmin = $user?->est_admin ?? false;

            $id_dossier = Dossier::query()
                ->where("slug", $slug_dossier)
                ->firstOrFail()
                ->id;

            // Récupération des blogs du dossier avec le contenu du premier message
            $blogs = Blog::query()
                ->where("id_dossier", $id_dossier)
                ->when(($variant === VariantEnum::MODERN->value && !$estAdmin), function (Builder $query) {
                    $query->whereNull("id_suppression");
                    // Si la variante n'est pas celle moderne, on peut afficher les éléments supprimés selon l'état de connexion
                }, function (Builder $query) use ($estAdmin)  {
                    $query->with($estAdmin ? 'elementSupprime' : 'elementSupprimeVisible');
                })
                // Premier message non supprimé seulement
                ->with("premierMessage")
                ->orderBy('date_creation', 'desc')
                ->get()
                // Limite le 1er message à 150 chars
                ->map(function ($blog) {
                    $message = $blog->premierMessage?->contenu ?? null;
                    if ($message && strlen($message) > 250) {
                        $blog->premierMessage->contenu = Str::limit($message, 250);
                    }
                    return $blog;
                });

            return response()->json($blogs);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage() . "Erreur lors de l'affichage des blogs du dossier " . $slug_dossier,
            ], 500);
        }
    }

    /**
     * Route enregistrant un nouveau blog
     * @param StoreRequest $request Requête avec les paramètres entrant
     * @return JsonResponse Message et code de succès/d'erreur
     */
    public function store(StoreRequest $request): JsonResponse
    {
        try {
            $params = $request->validated();
            $nom_utilisateur = $request->user()->nom_utilisateur;
            $slug = Str::slug($params["nom"]);

            $date_creation = now();

            $id_dossier = Dossier::query()
                ->where("slug", $params["slug_dossier"])
                ->firstOrFail()
                ->id;

            // Création du blog
            $blog = Blog::query()
                ->create([
                    "titre" => $params["nom"],
                    "slug" => $slug,
                    "id_dossier" => $id_dossier,
                    "nom_utilisateur" => $nom_utilisateur,
                    "date_creation" => $date_creation,
                    "id_suppression" => null,
                ]);

            // Création premier message
            Message::query()
                ->create([
                    "id_blog" => $blog->id,
                    "nom_utilisateur" => $nom_utilisateur,
                    "contenu" => $params["contenuPremierMessage"],
                    "date_publication" => $date_creation,
                    "id_suppression" => null,
                ]);

            return response()->json([
                'message' => "Blog créé avec succès",
            ], 201);
        } catch (Exception) {
            return response()->json([
                'message' => "Erreur lors de la création du blog, veuillez renseigner au moins un titre à celui-ci",
            ], 500);
        }
    }


    /**
     * Route supprimant un dossier
     * @param RemoveRequest $request Requête entrante
     * @return JsonResponse Réponse de succès ou d'erreur
     */
    public function supprimer(RemoveRequest $request): JsonResponse
    {
        try {
            $params = $request->validated();
            $nomUtilisateur = $request->user()->nom_utilisateur;

            $blog = Blog::query()
                ->findOrFail($params["id_blog"]);

            $element = ElementSupprime::query()
                ->create([
                    "nom_utilisateur" => $nomUtilisateur,
                    "raison_suppression" => $params["raison"],
                    "cache" => $params["cache"],
                    "date_suppression" => now()
                ]);

            $blog->id_suppression = $element->id;
            $blog->save();

            return response()->json([
                'message' => "Blog supprimé avec succès",
            ]);
        } catch (Exception) {
            return response()->json([
                'message' => "Erreur lors de la suppression du blog, veuillez renseigner au moins un titre à celui-ci",
            ], 500);
        }
    }
}
