import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";

const service : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);

/**
 * Route pour récupérer un blog dont on fournit le slug
 * @param request Requête entrante
 * @param param Objet contenant les paramètres de la route 
 * @returns Réponse HTTP avec le blog ou une erreur
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slugDossier: string }> }) {
    
    try {
        // On récupère le dossier
        const { slugDossier } = await params;
        const dossier = await service.recupererDossierParSlug(slugDossier);

        // On crée la réponse JSON avec le dossier et on ajoute les en-têtes CORS
        let response = NextResponse.json(dossier);
        response = CorsMiddleware.addCorsHeaders(response, request);

        // On retourne la réponse
        return response;
    }
    // En cas d'erreur
    catch (error) {
        // On retourne une réponse d'erreur avec le message
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
