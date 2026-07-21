<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Middleware d'authentification
 */
class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = $request->cookie('tokenAcces');
            if (!$token) {
                throw new AccessDeniedException();
            }
            if (!$request->bearerToken() && !empty($token)) {
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }

            $user = JWTAuth::setToken($token)->authenticate();

            if (!$user) {
                throw new AccessDeniedException();
            }

            auth()->setUser($user);
            $request->attributes->set('auth_user', $user);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Token invalide ou expiré',
            ], 401);
        }

        return $next($request);
    }
}
