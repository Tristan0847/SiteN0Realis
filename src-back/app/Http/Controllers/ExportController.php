<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Dossier;
use App\Models\User;
use Exception;
use FilesystemIterator;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RuntimeException;

/**
 * Controller servant à l'export statique des données
 */
class ExportController
{
    /**
     * Route retournant tous les dossiers et blogs du site pour export statique
     * @return JsonResponse Dossiers, blogs et messages du site triés
     */
    public function getDossiers(): JsonResponse
    {
        // Retourne tous les dossiers
        $dossiers = Dossier::query()
            ->with(['blogs' => function (HasMany $query) {
                $query->with(['messages' => function (HasMany $query) {
                    $query->with('elementSupprimeVisible');
                }, 'elementSupprimeVisible', 'premierMessage']);
            }, 'elementSupprimeVisible'])
            ->get()
            ->map(function ($dossier) {
                $dossier->blogs = $dossier->blogs->map(function ($blog) {
                    $message = $blog->premierMessage?->contenu ?? null;
                    if ($message && Str::length($message) > 250) {
                        $blog->premierMessage->contenu = Str::limit($message, 250);
                    }
                    return $blog;
                });
                return $dossier;
            });

        return response()->json($dossiers);
    }

    /**
     * Route retournant tous les blogs du site, qu'ils soient dans un dossier ou non
     * @return JsonResponse Blogs et messages du site
     */
    public function getBlogs(): JsonResponse
    {
        $blogs = Blog::query()
            ->with(['messages' => function (HasMany $query) {
                $query->with('elementSupprimeVisible');
            }, 'elementSupprimeVisible'])
            ->withCount(['messages as nombre_reponses'])
            ->get();

        return response()->json($blogs);
    }

    /**
     * Méthode de récupération des blogs par utilisateur
     * @return JsonResponse Blogs triés par utilisateur
     */
    public function getBlogsParUtilisateur(): JsonResponse
    {
        $retour = User::query()
            ->with([
                "blogs" => function (HasMany $query) {
                    $query->with(["messagePost"])
                        ->withCount(['messages as nombre_reponses'])
                        ->whereNull('id_suppression')
                        ->orderByDesc("date_creation");
                }
            ])
            ->get()
            ->map(function ($utilisateur) {
                $blogs = $utilisateur->blogs->map(function ($blog) {
                    $message = $blog->messagePost?->contenu ?? null;
                    if ($message && strlen($message) > 250) {
                        $blog->messagePost->contenu = Str::limit($message, 250);
                    }
                    return $blog;
                });
                $utilisateur->blogs = null;

                return [
                    "utilisateur" => $utilisateur,
                    "blogs" => $blogs
                ];
            });


        return response()->json($retour);
    }
}
