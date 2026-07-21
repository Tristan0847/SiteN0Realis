<?php

namespace App\Http\Controllers;

use App\Http\Requests\Messages\PostRequest;
use App\Models\Blog;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Controller pour la gestion de page de blogs communautaires
 */
class BlogCommunautaireController
{
    private const string MEDIAS_URL = "post-medias";

    /**
     * Récupère les blogs par date de création (page principale)
     * @param Request $request Paramètres avec le numéro de la page actuelle
     * @return JsonResponse Blogs récupérés
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $tendances = $request->input('tendances', false) === "true";

            // Sous-requête pour faire un order by sur le premier message
            $premierMessageParBlog = DB::table('messages as m1')
                ->whereRaw('m1.date_publication = (select min(m2.date_publication) from messages as m2 where m2.id_blog = m1.id_blog)');

            $blogs = Blog::query()
                ->leftJoinSub($premierMessageParBlog, "premier_message", function ($join) {
                    $join->on("blogs.id", "=", "premier_message.id_blog");
                })
                ->with(["messagePost"])
                ->withCount(['messages as nombre_reponses'])
                ->when($tendances, function(Builder $query) {
                    $query
                        ->orderByRaw('(COALESCE(premier_message.likes, 0) + (COALESCE(premier_message.partages, 0) * 2.5)) DESC')
                        ->orderBy("nombre_reponses", "desc");
                })
                ->whereNull('blogs.id_suppression')
                ->orderBy('date_creation', 'desc')
                ->paginate(10)
                // Limite le 1er message à 250 chars
                ->through(function ($blog) {
                    $message = $blog->messagePost?->contenu ?? null;
                    if ($message && strlen($message) > 250) {
                        $blog->messagePost->contenu = Str::limit($message, 250);
                    }
                    return $blog;
                });

            return response()->json($blogs);
        }
        catch (Exception) {
            return response()->json([
                'error' => 'Une erreur est survenue lors de la récupération des blogs.'
            ], 500);
        }
    }

    /**
     * Route de récupération des blogs d'un utilisateur
     * @param string $nomUtilisateur Nom de l'utilisateur concerné
     * @return JsonResponse Blogs et utilisateur récupérés ou message d'erreur
     */
    public function indexParUtilisateur(string $nomUtilisateur): JsonResponse
    {
        try {
            $utilisateur = User::query()
                ->where("nom_utilisateur", $nomUtilisateur)
                ->firstOrFail();

            $blogs = Blog::query()
                ->with(["messagePost"])
                ->withCount(['messages as nombre_reponses'])
                ->whereNull('id_suppression')
                ->where("nom_utilisateur", $nomUtilisateur)
                ->get()
                // Limite le 1er message à 150 chars
                ->map(function ($blog) {
                    $message = $blog->messagePost?->contenu ?? null;
                    if ($message && strlen($message) > 250) {
                        $blog->messagePost->contenu = Str::limit($message, 250);
                    }
                    return $blog;
                });

            return response()->json([
                'utilisateur' => $utilisateur,
                'blogs' => $blogs
            ]);
        }
        catch (Exception) {
            return response()->json([
                'error' => 'Une erreur est survenue lors de la récupération des blogs.'
            ], 500);
        }
    }

    /**
     * Route permettant de récupérer 5 blogs aléatoires du site
     * @return JsonResponse
     */
    public function indexAleatoire(): JsonResponse
    {
        try {
            $blogs = Blog::query()
                ->with(["messagePost", "elementSupprimeVisible"])
                ->withCount(['messages as nombre_reponses'])
                ->inRandomOrder()
                ->limit(5)
                ->get()
                // Limite le 1er message à 150 chars
                ->map(function ($blog) {
                    $message = $blog->messagePost?->contenu ?? null;
                    if ($message && strlen($message) > 250) {
                        $blog->messagePost->contenu = Str::limit($message, 250);
                    }
                    return $blog;
                });

            return response()->json($blogs);
        }
        catch (Exception) {
            return response()->json([
                'error' => 'Une erreur est survenue lors de la récupération des blogs.'
            ], 500);
        }
    }

    /**
     * Route de récupération d'un blog
     * @param string $slug Slug du blog
     * @return JsonResponse Succès avec blog ou erreur
     */
    public function getBlog(string $slug): JsonResponse
    {
        try {
            $user = auth('api')->user();
            $estAdmin = $user?->est_admin ?? false;

            $messages = Blog::query()
                ->where('slug', $slug)
                ->with(["messages" => function (HasMany $query) use ($estAdmin) {
                    $query->when(($estAdmin), function (Builder $query) {
                        $query->with("elementSupprime");
                    });
                }])
                ->withCount(['messages as nombre_reponses'])
                ->firstOrFail();

            return response()->json($messages);
        }
        catch (Exception) {
            return response()->json([
                'error' => 'Une erreur est survenue lors de la récupération du blog'
            ]);
        }
    }

    /**
     * Crée un nouveau blog
     * @param PostRequest $request Requête entrante avec le contenu du blog et un média éventuel
     * @return JsonResponse Message de succès ou d'erreur
     */
    public function creer(PostRequest $request): JsonResponse
    {
        try {
            $params = $request->validated();
            $nom_utilisateur = $request->user()->nom_utilisateur;
            // Slug random car aucun titre
            $slug = Str::random(10);

            $date_creation = now();

            // Création du blog
            $blog = Blog::query()
                ->create([
                    "titre" => "",
                    "slug" => $slug,
                    "id_dossier" => null,
                    "nom_utilisateur" => $nom_utilisateur,
                    "date_creation" => $date_creation,
                    "id_suppression" => null,
                ]);

            // Création premier message
            $message = Message::query()
                ->create([
                    "id_blog" => $blog->id,
                    "nom_utilisateur" => $nom_utilisateur,
                    "contenu" => $params["contenu"],
                    "date_publication" => $date_creation,
                    "id_suppression" => null,
                ]);

            if (array_key_exists("media", $params) && $params["media"] !== null) {
                $this->enregistrerFichier($params["media"], $blog->id, $message);
            }

            return response()->json([
                'message' => "Blog créé avec succès",
            ], 201);
        }
        catch (Exception) {
            return response()->json([
                "error" => "Une erreur est survenue lors de la création du blog"
            ], 500);
        }
    }

    /**
     * Route de réponse à un blog
     * @param string $slug Slug du blog
     * @param PostRequest $request Requête entrante avec le contenu de la réponse
     * @return JsonResponse Message de succès ou d'erreur
     */
    public function repondre(string $slug, PostRequest $request): JsonResponse
    {
        try {
            $params = $request->validated();
            $nom_utilisateur = $request->user()->nom_utilisateur;

            $blogId = Blog::query()
                ->where('slug', $slug)
                ->firstOrFail()
                ->id;

            $message = Message::query()
                ->create([
                    "id_blog" => $blogId,
                    "nom_utilisateur" => $nom_utilisateur,
                    "contenu" => $params["contenu"],
                    "date_publication" => now(),
                    "id_suppression" => null,
                ]);

            if (array_key_exists("media", $params) && $params["media"] !== null) {
                $this->enregistrerFichier($params["media"], $blogId, $message);
            }

            return response()->json([
                'message' => "Message créé avec succès",
            ], 201);
        }
        catch (Exception) {
            return response()->json([
                "error" => "Une erreur est survenue lors de la création du message"
            ], 500);
        }
    }

    /**
     * Fonction stockant un fichier localement et retournant son chemin local
     * @param UploadedFile $fichier Fichier à stocker
     * @param int $blog_id ID du blog contenant le message
     * @param Message $message Message où enregistrer le média
     * @return void
     */
    private function enregistrerFichier(UploadedFile $fichier, int $blog_id, Message $message): void
    {
        $extension = strtolower($fichier->getClientOriginalExtension());
        $nomBase = Str::slug(pathinfo($fichier->getClientOriginalName(), PATHINFO_FILENAME));
        if (strlen($nomBase) === 0) {
            $nomBase = "media";
        }

        $nomFichier = $nomBase . "-" . Str::random(6) . "." . $extension;

        $chemin =  $fichier->storeAs(
            self::MEDIAS_URL . "/" . $blog_id,
            $nomFichier,
            'public'
        );

        if ($chemin) {
            // Enregistrement du média dans le blog
            $message->media = $chemin;
            $message->save();
        }
    }
}

