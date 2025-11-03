import { CookiesMiddleware } from "@BlogsBack/middlewares/CookiesMiddleware";
import { NextResponse } from "next/server";

/**
 * Route de déconnexion du site retirant les cookies de jetons d'accès
 * @returns Réponse
 */
export async function POST() : Promise<NextResponse> {
    const reponse = NextResponse.json({ succes: true });

    const middleware = new CookiesMiddleware();
    middleware.effacerAuthCookies(reponse);

    return reponse;
}