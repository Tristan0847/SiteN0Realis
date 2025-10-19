import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";

const service : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);

/**
 * Route pour récupérer tous les dossiers
 * @param request Requête entrante
 * @returns Réponse HTTP avec la liste des dossiers ou une erreur
 */
export async function GET(request: NextRequest) {
        
    try {
        // On récupère tous les dossiers
        const dossiers = await service.recupererDossiers();

        // On crée la réponse JSON avec les dossiers et on ajoute les en-têtes CORS
        let response = NextResponse.json(dossiers);
        response = CorsMiddleware.addCorsHeaders(response);

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
