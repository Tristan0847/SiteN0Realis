import { I_AuthService } from "@BlogsBack/service/interface/I_AuthService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_AuthService = ServiceFactory.get<I_AuthService>(INTERFACESSERVICE.I_AuthService);

/**
 * Route POST de raffraichissement du token refresh
 * @param request Données de la requête
 */
export async function POST(request : NextRequest) : Promise<NextResponse> {

    try {
        const refreshToken = request.cookies.get("tokenRefresh")?.value;
        
        if (!refreshToken) {
            return NextResponse.json(
                { error: 'Refresh token manquant' },
                { status: 401 }
            );
        }

        const tokenAcces = await service.rafraichirToken(refreshToken);

        // Mise en place de la réponse
        const reponse = NextResponse.json({
            succes: true,
            message: 'Token rafraîchi avec succès'
        }, { status: 200 });

        // Définition des cookies avec le token d'accès généré
        reponse.cookies.set("tokenAcces", tokenAcces, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: Number(process.env.JWT_TOKEN_ACCES_EXPIRATION_NUM),
            path: "/"
        });
        
        return reponse;
    }
    catch (error) {
        console.error("[Erreur API]", error);

        const reponse = NextResponse.json(
            { error : "Erreur lors du rafraîchissement du token" },
            { status: 401 }
        )

        // En cas d'erreur, on réinitialise les tokens
        reponse.cookies.set("tokenAcces", '', { maxAge: 0, path: "/"});
        reponse.cookies.set("tokenRefresh", "", {
            maxAge: 0,
            path: "/"
        });

        return reponse;
    }


}