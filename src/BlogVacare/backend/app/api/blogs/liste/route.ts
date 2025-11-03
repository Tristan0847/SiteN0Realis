import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { SiteVariant } from "@BlogsShared/model/Variant";

const service : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);
const dossierService : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);

/**
 * Route pour récupérer les blogs d'un dossier
 * @param request Requête entrante
 * @returns Réponse HTTP avec la liste des blogs ou une erreur
 */
export async function POST(request: NextRequest) : Promise<NextResponse> {
    
    try {
        // Récupération des paramètres
        const body = await request.json();
        const slugDossier : string = body.slugDossier;
        const variante : SiteVariant = body.variante;
        if (variante !== "old" && variante !== "modern") {
            return NextResponse.json(
                { error: "Variante invalide" },
                { status: 400 }
            );
        }
        
        const dossier = await dossierService.recupererDossierParSlug(slugDossier);
        
        // Vérification qu'on a les droits d'ouvrir le dossier (s'il est supprimé et que l'on n'est pas admin, on ne peut pas l'ouvrir)
        const estAdmin : boolean = (request.headers.has("x-est-admin") && request.headers.get("x-est-admin") === "true");
        
        if (dossier.getElementSupprime() !== null && (!estAdmin && (!(dossier.getElementSupprime()?.getCache()) && variante != "old"))) {
            return NextResponse.json(
                { error: "Vous n'avez pas accès à ce dossier" },
                { status: 401 }
            )
        }

        const blogs = await service.recupererBlogsDuDossier(slugDossier, variante, estAdmin);

        // On crée la réponse JSON avec les blogs et on ajoute les en-têtes CORS
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
            { error: "Erreur lors de la récupération des blogs du dossier"},
            { status: 500 }
        );
    }
}
