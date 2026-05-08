<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DossierController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UtilisateurController;

Route::controller(UtilisateurController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/refresh', 'refresh');
    Route::post('/inscription', 'inscription');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/me', 'me');
    });
});

Route::middleware(["auth", "auth.admin"])->group(function () {
    Route::post("/dossier/supprimer", [DossierController::class, "supprimer"]);
    Route::post("/blog/supprimer", [BlogController::class, "supprimer"]);
    Route::post("/message/supprimer", [MessageController::class, "supprimer"]);
});


Route::middleware(["auth"])->group(function () {
    Route::post("/dossier/store", [DossierController::class, "store"]);
    Route::post("/blog/store", [BlogController::class, "store"]);
    Route::post("/message/store", [MessageController::class, "store"]);
});


Route::middleware(["auth.optional"])->group(function () {
    Route::get("/dossier", [DossierController::class, "index"]);
    Route::get("/blogs/{slug_dossier}", [BlogController::class, "index"]);
    Route::get("/messages/{slug_dossier}/{slug_blog}", [MessageController::class, "index"]);
});
