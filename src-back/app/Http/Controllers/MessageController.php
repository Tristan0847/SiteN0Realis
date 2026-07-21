<?php

namespace App\Http\Controllers;

use App\Http\Requests\Messages\ListRequest;
use App\Http\Requests\Messages\RemoveRequest;
use App\Http\Requests\Messages\StoreRequest;
use App\Models\Blog;
use App\Models\Dossier;
use App\Models\ElementSupprime;
use App\Models\Message;
use App\Models\VariantEnum;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

class MessageController
{
    /**
     * Route affichant les messages d'un blog
     * @param ListRequest $request Requête entrante avec la variante et l'id du blog
     * @return JsonResponse Messages et code de succès/d'erreur
     */
    public function index(string $slug_dossier, string $slug_blog, ListRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $user = auth('api')->user();
            $estAdmin = $user?->est_admin ?? false;

            $idBlog = $this->getBlogId($slug_dossier, $slug_blog);

            $messages = Message::query()
                ->where("id_blog", $idBlog)
                ->when(($validated["variant"] === VariantEnum::MODERN->value && !$estAdmin), function (Builder $query) {
                    $query->whereNull("id_suppression");
                    // Si la variante n'est pas celle moderne, on peut afficher les éléments supprimés selon l'état de connexion
                }, function (Builder $query) use ($estAdmin) {
                    $query->with($estAdmin ? 'elementSupprime' : 'elementSupprimeVisible');
                })
                ->get()
                ->all();

            return response()->json($messages);
        } catch (Exception) {
            return response()->json([
                'message' => "Erreur lors de l'affichage des messages du blog",
            ], 500);
        }
    }

    /**
     * Route de création d'un message
     * @param StoreRequest $request Requête entrante avec paramètres
     * @return JsonResponse Réponse de succès ou d'erreur
     */
    public function store(StoreRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $nomUtilisateur = $request->user()->nom_utilisateur;
            $datePublication = now();

            $idBlog = $this->getBlogId($validated["slug_dossier"], $validated["slug_blog"]);

            Message::query()
                ->create([
                    "id_blog" => $idBlog,
                    "nom_utilisateur" => $nomUtilisateur,
                    "contenu" => $validated["contenu"],
                    "date_publication" => $datePublication,
                    "id_suppression" => null
                ]);

            return response()->json([
                'message' => "Message créé avec succès",
            ], 201);
        } catch (Exception) {
            return response()->json([
                'message' => "Erreur lors de la création du message",
            ], 500);
        }
    }

    /**
     * Route supprimant un message
     * @param RemoveRequest $request Requête entrante
     * @return JsonResponse Réponse de succès ou d'erreur
     */
    public function supprimer(RemoveRequest $request): JsonResponse
    {
        try {
            $params = $request->validated();
            $nomUtilisateur = $request->user()->nom_utilisateur;

            $message = Message::query()
                ->findOrFail($params["id_message"]);

            $element = ElementSupprime::query()
                ->create([
                    "nom_utilisateur" => $nomUtilisateur,
                    "raison_suppression" => $params["raison"],
                    "cache" => $params["cache"],
                    "date_suppression" => now()
                ]);

            $message->id_suppression = $element->id;
            $message->save();

            return response()->json([
                'message' => "Message supprimé avec succès",
            ]);
        } catch (Exception) {
            return response()->json([
                'message' => "Erreur lors de la suppression du message",
            ], 500);
        }
    }

    private function getBlogId(string $slug_dossier, string $slug_blog): int
    {
        $idDossier = Dossier::query()
            ->where('slug', $slug_dossier)
            ->firstOrFail()
            ->id;

        return Blog::query()
            ->where('id_dossier', $idDossier)
            ->where('slug', $slug_blog)
            ->firstOrFail()
            ->id;
    }
}
