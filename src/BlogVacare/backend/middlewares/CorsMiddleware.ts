import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware pour gérer les en-têtes CORS
 */
export class CorsMiddleware  {

    /**
     * Ajoute les en-têtes CORS à une réponse
     * @param response Réponse à modifier
     * @param request Requête entrante
     * @returns Réponse avec les en-têtes CORS ajoutés
     */
    static addCorsHeaders<T>(response: NextResponse<T>, request: NextRequest): NextResponse<T> {
        
        response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set("Access-Control-Allow-Credentials", "true");
        response.headers.set("Access-Control-Max-Age", "86400");

        return response;
    }
}