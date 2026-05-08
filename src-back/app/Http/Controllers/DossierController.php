<?php

namespace App\Http\Controllers;

use App\Http\Requests\Dossier\ListRequest;
use App\Http\Requests\Dossier\RemoveRequest;
use App\Http\Requests\Dossier\StoreRequest;
use App\Models\Dossier;
use App\Models\ElementSupprime;
use App\Models\VariantEnum;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Throwable;

/**
 * Controller gérant les dossiers
 */
class DossierController
{
    /**
     * Route listant les dossiers du projet
     * @param ListRequest $request Requête entrante avec les paramètres
     * @return JsonResponse Dossier ou message d'erreur
     */
    public function index(ListRequest $request): JsonResponse
    {
        try {
            $variant = $request->validated(["variant"]);
            $user = auth('api')->user();
            $estAdmin = $user?->est_admin ?? false;

            $dossiers = Dossier::query()
                ->when(($variant === VariantEnum::MODERN->value && !$estAdmin), function (Builder $query) {
                    $query->whereNull("id_suppression");
                    // Si la variante n'est pas celle moderne, on peut afficher les éléments supprimés selon l'état de connexion
                }, function (Builder $query) use ($estAdmin)  {
                    $query->with($estAdmin ? 'elementSupprime' : 'elementSupprimeVisible');
                })
                ->orderBy('date_creation', 'desc')
                ->get()
                ->all();

            return response()->json($dossiers);
        }
        catch (Exception) {
            return response()->json([
                'message' => "Erreur lors de la récupération des dossiers du projet",
            ], 500);
        }
    }


    /**
     * Méthode d'enregistrement d'un dossier
     * @param StoreRequest $request Requête entrante avec les paramètres
     * @return JsonResponse Message de succès ou d'erreur
     */
    public function store(StoreRequest $request): JsonResponse
    {
        try {
            $user = $request->user();
            if (!$user) {
                throw new AccessDeniedException();
            }

            $params = $request->validated();
            $nom_utilisateur = $user->nom_utilisateur;

            Dossier::query()
                ->create([
                    "titre" => $params["titre"],
                    "description" => $params["description"],
                    "slug" => Str::slug($params["titre"]),
                    "nom_utilisateur" => $nom_utilisateur,
                    "id_suppression" => null,
                    "date_creation" => now()
                ]);

            return response()->json([
                'message' => "Dossier créé avec succès",
            ], 201);
        }
        catch (Throwable) {
            return response()->json([
                'message' => "Erreur lors de la création du dossier, veuillez renseigner au moins un titre à celui-ci",
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

            $dossier = Dossier::query()
                ->findOrFail($params["id_dossier"]);

            $element = ElementSupprime::query()
                ->create([
                    "nom_utilisateur" => $nomUtilisateur,
                    "raison_suppression" => $params["raison"],
                    "cache" => $params["cache"],
                    "date_suppression" => now()
                ]);

            $dossier->id_suppression = $element->id;
            $dossier->save();

            return response()->json([
                'message' => "Dossier supprimé avec succès",
            ]);
        }
        catch (Throwable) {
            return response()->json([
                'message' => "Erreur lors de la suppression du dossier",
            ], 500);
        }
    }
}
