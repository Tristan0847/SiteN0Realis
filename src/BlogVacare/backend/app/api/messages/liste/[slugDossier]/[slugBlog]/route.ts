import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";

const service : I_MessageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);
const dossierService : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);
const blogService : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);

/**
 * Route pour récupérer les messages d'un blog dans un dossier
 * @param request Requête entrante
 * @param param Objet contenant les paramètres de la route
 * @returns Réponse HTTP avec la liste des messages ou une erreur
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slugDossier: string; slugBlog: string }> }) {
  try {
    // On récupère les messages pour le blog et le dossier spécifiés
    const { slugDossier, slugBlog } = await params;
    const dossier = await dossierService.recupererDossierParSlug(slugDossier);
    const blog = await blogService.recupererBlogParSlug(slugBlog, slugDossier);

    const dossierSupprime = dossier.getElementSupprime() !== null;
    const blogSupprime = blog.getElementSupprime() !== null;
    const estAdmin : boolean = request.headers.get("x-est-admin") === "true";

    if ((dossierSupprime || blogSupprime) && !estAdmin) {
        throw new Error("Vous n'avez pas accès à ce blog");
    }

    // Récupération des messages
    const messages = await service.recupererMessages(slugBlog, slugDossier);

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
