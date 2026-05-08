<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Injection de l'utilisateur aux paramètres de la requête s'il est connecté
 */
class OptionalAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('tokenAcces');
        if ($token) {
            try {
                $user = JWTAuth::setToken($token)->authenticate();

                if ($user) {
                    $request->attributes->set('auth_user', $user);
                    $request->headers->set('Authorization', 'Bearer ' . $token);
                    auth()->setUser($user);
                }
            }
            catch (Throwable) {
            }
        }

        return $next($request);
    }
}
