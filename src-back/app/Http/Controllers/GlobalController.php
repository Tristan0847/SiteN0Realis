<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

/**
 * Controlleur pour des actions globales
 */
class GlobalController
{
    /**
     * Méthode retournant l'URL des médias publics du site
     * @return JsonResponse URL des médias publics du site
     */
    public function getMediaLink(): JsonResponse
    {
        return response()->json(rtrim(config('app.url'), '/') . '/storage');
    }
}
