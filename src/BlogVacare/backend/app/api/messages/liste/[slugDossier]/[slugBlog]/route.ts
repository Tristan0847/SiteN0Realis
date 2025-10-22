import { NextRequest, NextResponse } from "next/server";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";

const service : I_MessageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);

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
          { error: (error as Error).message },
          { status: 500 }
      );
  }
}
