<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = auth()->user() ?? $request->attributes->get('auth_user');
            if (!$user || !$user->est_admin) {
                throw new AccessDeniedException();
            }
        } catch (Throwable) {
            return response()->json([
                'message' => 'Route non disponible pour ce type de compte',
            ], 403);
        }

        return $next($request);
    }
}
