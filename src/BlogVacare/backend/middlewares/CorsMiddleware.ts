import { NextResponse } from "next/server";

/**
 * Middleware pour gérer les en-têtes CORS
 */
export class CorsMiddleware  {

    /**
     * Ajoute les en-têtes CORS à une réponse
     * @param response Réponse à modifier
     * @returns Réponse avec les en-têtes CORS ajoutés
     */
    static addCorsHeaders<T>(response: NextResponse<T>): NextResponse<T> {
        
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response;
    }
}
