<?php

use App\Http\Middleware\Auth\AdminAuthMiddleware;
use App\Http\Middleware\Auth\AuthMiddleware;
use App\Http\Middleware\Auth\OptionalAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'auth.optional' => OptionalAuthMiddleware::class,
            'auth' => AuthMiddleware::class,
            'auth.admin' => AdminAuthMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
