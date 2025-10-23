import { NextRequest, NextResponse } from "next/server";

/**
 * Route de déconnexion du site retirant les cookies de jetons d'accès
 * @param request Requête envoyée
 * @returns Réponse
 */
export async function POST(request: NextRequest) : Promise<NextResponse> {
    const reponse = NextResponse.json({ succes: true });

    reponse.cookies.delete("tokenAcces");
    reponse.cookies.delete("tokenRefresh");

    return reponse;
}