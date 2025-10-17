import { NextRequest, NextResponse } from "next/server";
import { LoggerMiddleware } from "@BlogsBack/middlewares/LoggerMiddleware";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";
import { ParametersMiddleware } from "@BlogsBack/middlewares/ParametersMiddleware";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";

const logger = new LoggerMiddleware();
const validator = new ParametersMiddleware();
const service : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);

/**
 * Route pour récupérer les messages d'un blog dans un dossier
 * @param request Requête entrante
 * @param param Objet contenant les paramètres de la route
 * @returns Réponse HTTP avec la liste des messages ou une erreur
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ idDossier: string; idBlog: string }> }) {
  try {
    // On log la requête et on valide les paramètres
    await logger.run(request);
    await validator.run(request);

    // On récupère les messages pour le blog et le dossier spécifiés
    const { idDossier, idBlog } = await params;
    const messages = await service.getMessagesDeBlog(idBlog, idDossier);

    // On crée la réponse JSON avec les messages et on ajoute les en-têtes CORS
    let response = NextResponse.json(messages);
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
