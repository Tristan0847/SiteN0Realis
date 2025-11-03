import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { SiteVariant } from "@BlogsShared/model/Variant";

const service : I_MessageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);
const dossierService : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);
const blogService : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);

/**
 * Route pour récupérer les messages d'un blog dans un dossier
 * @param request Requête entrante
 * @returns Réponse HTTP avec la liste des messages ou une erreur
 */
export async function POST(request: NextRequest) : Promise<NextResponse> {
  try {
    // Récupération des paramètres
    const body = await request.json();
    const slugDossier : string = body.slugDossier;
    const slugBlog : string = body.slugBlog;
    const variante : SiteVariant = body.variante;
    if (variante !== "old" && variante !== "modern") {
        return NextResponse.json(
            { error: "Variante invalide" },
            { status: 400 }
        );
    }

    // On récupère les messages pour le blog et le dossier spécifiés
    const dossier = await dossierService.recupererDossierParSlug(slugDossier);
    const blog = await blogService.recupererBlogParSlug(slugBlog, slugDossier);

    const dossierSupprime = dossier.getElementSupprime() !== null;
    const blogSupprime = blog.getElementSupprime() !== null;
    const estAdmin : boolean = (request.headers.has("x-est-admin") && request.headers.get("x-est-admin") === "true");

    if ((dossierSupprime || blogSupprime) && (!estAdmin && (!blog.getElementSupprime()?.getCache() && variante != "old"))) {
        return NextResponse.json(
            { error: "Vous n'avez pas accès à ce blog" },
            { status: 405 }
        )
    }

    // Récupération des messages
    const messages = await service.recupererMessages(slugBlog, slugDossier, variante, estAdmin);

    // On crée la réponse JSON avec les messages et on ajoute les en-têtes CORS
    let response = NextResponse.json(messages);
    response = CorsMiddleware.addCorsHeaders(response, request);

    // On retourne la réponse
    return response;
  }
  // En cas d'erreur
  catch (error) {
      // On retourne une réponse d'erreur avec le message
      return NextResponse.json(
          { error: "Erreur lors de la récupération des messages du blog" },
          { status: 500 }
      );
  }
}
