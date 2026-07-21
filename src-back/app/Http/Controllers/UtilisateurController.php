<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\InscriptionRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Request;
use InvalidArgumentException;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Controller gérant les utilisateurs
 */
class UtilisateurController
{
    /**
     * Route de connexion au site
     * @param LoginRequest $request Requête entrante avec les paramètres
     * @return JsonResponse Message de succès avec les cookies ou message d'erreur
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $credentials = [
                "nom_utilisateur" => $validated["username"],
                "password" => $validated["password"]
            ];

            if (!$tokenAcces = auth('api')->attempt($credentials)) {
                throw new InvalidArgumentException();
            }

            $tokenRefresh = JWTAuth::claims([
                'type' => 'refresh',
                'exp' => now()->addDays(30)->timestamp,
            ])->fromUser(auth('api')->user());

            return $this->setAuthCookies($tokenAcces, $tokenRefresh);
        }
        catch (Exception $e) {
            return response()->json([
                "error" => $e->getMessage() . "Une erreur est survenue lors de la connexion"
            ], 401);
        }
    }

    /**
     * Route d'inscription sur le site
     * @param InscriptionRequest $request Requête entrante avec login et mot de passe
     * @return JsonResponse Message de succès avec les cookies ou message d'erreur
     */
    public function inscription(InscriptionRequest $request): JsonResponse
    {
        try {
            // Validation mot de passe dans la request
            $validated = $request->validated();
            $params =
                [
                    "nom_utilisateur" => $validated["login"],
                    // Hash automatique par un cast
                    "mot_de_passe" => $validated["mdp1"]
                ];

            User::query()
                ->create([
                    ...$params,
                    "est_admin" => false,
                ]);

            if (!$tokenAcces = auth('api')->attempt([
                "nom_utilisateur" => $validated["login"],
                "password" => $validated["mdp1"]
            ])) {
                throw new InvalidArgumentException();
            }

            $tokenRefresh = JWTAuth::claims([
                'type' => 'refresh',
                'exp' => now()->addDays(30)->timestamp,
            ])->fromUser(auth('api')->user());

            return $this->setAuthCookies($tokenAcces, $tokenRefresh);
        }
        catch (Exception) {
            return response()->json([
                "error" => "Une erreur est survenue lors de l'inscription"
            ], 401);
        }
    }

    /**
     * Refresh du token de connexion
     * @param Request $request Requête entrante avec les cookies de tokens
     * @return JsonResponse Message de succès avec les cookies ou message d'erreur
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            // Récupération de l'ancien token
            $tokenRefresh = $request->cookie('tokenRefresh');
            if (!$tokenRefresh) {
                throw new InvalidArgumentException();
            }

            $payload = JWTAuth::setToken($tokenRefresh)->getPayload();
            if ($payload->get('type') !== 'refresh') {
                throw new InvalidArgumentException();
            }

            $user = User::query()
                ->findOrFail($payload->get('sub'));
            $tokenAcces = JWTAuth::fromUser($user);
            $nouveauRefresh = JWTAuth::claims([
                'type' => 'refresh',
                'exp'  => now()->addDays(30)->timestamp,
            ])->fromUser($user);

            return $this->setAuthCookies($tokenAcces, $nouveauRefresh);
        }
        catch (Exception) {
            return response()->json([
                "error" => "Une erreur est survenue lors de la validation de votre connexion"
            ], 401);
        }
    }

    /**
     * Route de récupération de l'utilisateur actuellement connecté
     * @return JsonResponse Utilisateur actuellement connecté
     */
    public function me(): JsonResponse
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Route de déconnexion (oubli des tokens en cookies)
     * @return JsonResponse Message de succès sans les cookies
     */
    public function logout(): JsonResponse
    {
        auth('api')->logout();

        $response = response()->json(['message' => 'Déconnecté']);
        $response->withCookie(cookie()->forget('tokenAcces'));
        $response->withCookie(cookie()->forget('tokenRefresh'));

        return $response;
    }

    // Méthode privée de mise en place des cookies d'authentification
    private function setAuthCookies(string $tokenAcces, string $tokenRefresh): JsonResponse
    {
        $secure = app()->environment('production');

        return response()->json(['message' => 'Connecté'])
            ->withCookie(cookie(
                'tokenAcces',
                $tokenAcces,
                config('jwt.ttl'),
                '/',
                null,
                $secure,
                true,
                false,
                'strict'
            ))
            ->withCookie(cookie(
                'tokenRefresh',
                $tokenRefresh,
                // 30 jours
                60 * 24 * 30,
                '/',
                null,
                $secure,
                true,
                false,
                'strict'
            ));
    }
}
