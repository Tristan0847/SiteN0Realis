import { CookiesMiddleware } from "@BlogsBack/middlewares/CookiesMiddleware";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route de déconnexion du site retirant les cookies de jetons d'accès
 * @param request Requête envoyée
 * @returns Réponse
 */
export async function POST(request: NextRequest) : Promise<NextResponse> {
    const reponse = NextResponse.json({ succes: true });

    const middleware = new CookiesMiddleware();
    middleware.effacerAuthCookies(reponse);

    return reponse;
}