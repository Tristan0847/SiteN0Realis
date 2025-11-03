import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";

const service : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);

/**
 * Route pour récupérer un blog dont on fournit le slug
 * @param request Requête entrante
 * @param param Objet contenant les paramètres de la route 
 * @returns Réponse HTTP avec le blog ou une erreur
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slugDossier: string, slugBlog : string }> }) {
    
    try {
        // On récupère le blog
        const { slugDossier, slugBlog } = await params;
        const blogs = await service.recupererBlogParSlug(slugBlog, slugDossier);

        // On crée la réponse JSON avec le blog et on ajoute les en-têtes CORS
        let response = NextResponse.json(blogs);
        response = CorsMiddleware.addCorsHeaders(response, request);

        // On retourne la réponse
        return response;
    }
    // En cas d'erreur
    catch (error) {
        console.error("[Erreur API]", error);
        // On retourne une réponse d'erreur avec le message
        return NextResponse.json(
            { error: "Erreur lors de la récupération des données du blog demandées" },
            { status: 500 }
        );
    }
}
