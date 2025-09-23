import { NextResponse } from "next/server";
import { LoggerMiddleware } from "@BlogsBack/middlewares/LoggerMiddleware";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { ServiceFactory, INTERFACES } from "@BlogsBack/services/ServiceFactory";
import type { I_BlogService } from "@BlogsBack/services/Interface/I_BlogService";

const logger = new LoggerMiddleware();
const blogService: I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACES.I_BlogService);

/**
 * Route pour récupérer tous les dossiers
 * @param request Requête entrante
 * @returns Réponse HTTP avec la liste des dossiers ou une erreur
 */
export async function GET(request: Request) {
        
    try {
        // On log la requête
        await logger.run(request);

        // On récupère tous les dossiers
        const dossiers = await blogService.getAllDossiers();

        // On crée la réponse JSON avec les dossiers et on ajoute les en-têtes CORS
        let response = NextResponse.json(dossiers);
        response = CorsMiddleware.addCorsHeaders(response);

        // On retourne la réponse
        return response;
    }
    // En cas d'erreur
    catch (error) {
        // On retourne une réponse d'erreur avec le message
        return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
}
