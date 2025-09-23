import { NextResponse } from "next/server";
import { LoggerMiddleware } from "@BlogsBack/middlewares/LoggerMiddleware";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { ParametersMiddleware } from "@BlogsBack/middlewares/ParametersMiddleware";
import { ServiceFactory, INTERFACES } from "@BlogsBack/services/ServiceFactory";
import type { I_BlogService } from "@BlogsBack/services/Interface/I_BlogService";

const logger = new LoggerMiddleware();
const validator = new ParametersMiddleware();
const blogService: I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACES.I_BlogService);

/**
 * Route pour récupérer les blogs d'un dossier
 * @param request Requête entrante
 * @param param Objet contenant les paramètres de la route 
 * @returns Réponse HTTP avec la liste des blogs ou une erreur
 */
export async function GET(request: Request, { params }: { params: Promise<{ idDossier: string }> }) {
    
    try {
        // On log la requête et on valide les paramètres
        await logger.run(request);
        await validator.run(request);

        // On récupère les blogs pour le dossier spécifié
        const { idDossier } = await params;
        const blogs = await blogService.getBlogsForDossier(idDossier);

        // On crée la réponse JSON avec les blogs et on ajoute les en-têtes CORS
        let response = NextResponse.json(blogs);
        response = CorsMiddleware.addCorsHeaders(response);

        // On retourne la réponse
        return response;
    }
    // En cas d'erreur
    catch (error) {
        // On retourne une réponse d'erreur avec le message
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
