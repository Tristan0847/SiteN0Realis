import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { SiteVariant } from "@BlogsShared/model/Variant";

const service : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);

/**
 * Route pour récupérer tous les dossiers
 * @param request Requête entrante
 * @returns Réponse HTTP avec la liste des dossiers ou une erreur
 */
export async function POST(request: NextRequest) {
        
    try {
        // Récupération des paramètres
        const body = await request.json();
        const variante : SiteVariant = body.variante;
        if (variante !== "old" && variante !== "modern") {
            return NextResponse.json(
                { error: "Variante invalide" },
                { status: 400 }
            );
        }
        
        // Vérification qu'on a les droits d'ouvrir le dossier (s'il est supprimé et que l'on n'est pas admin, on ne peut pas l'ouvrir)
        const estAdmin : boolean = (request.headers.has("x-est-admin") && request.headers.get("x-est-admin") === "true");

        // On récupère tous les dossiers
        const dossiers = await service.recupererDossiers(variante, estAdmin);

        // On crée la réponse JSON avec les dossiers et on ajoute les en-têtes CORS
        let response = NextResponse.json(dossiers);
        response = CorsMiddleware.addCorsHeaders(response, request);

        // On retourne la réponse
        return response;
    }
    // En cas d'erreur
    catch (error) {
        // On retourne une réponse d'erreur avec le message
        return NextResponse.json(
            { error: "Erreur lors de la récupération des dossiers du projets" },
            { status: 500 }
        );
    }
}
