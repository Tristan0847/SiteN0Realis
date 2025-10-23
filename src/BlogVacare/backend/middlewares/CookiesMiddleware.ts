import { NextResponse } from "next/server";

/**
 * Classe middleware de gestion des cookies
 */
export class CookiesMiddleware {

    /**
     * Méthode d'assignation de cookies à une réponse
     * @param reponse Réponse à fournir 
     * @param tokenAcces Token d'accès de l'utilisateur
     * @param tokenRefresh Token refresh de l'utilisateur
     */
    public setAuthCookies(reponse : NextResponse, tokenAcces : string, tokenRefresh : string) {
        reponse.cookies.set("tokenAcces", tokenAcces, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: Number(process.env.JWT_TOKEN_ACCES_EXPIRATION_NUM),
            path: "/"
        });

        reponse.cookies.set("tokenRefresh", tokenRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: Number(process.env.JWT_TOKEN_REFRESH_EXPIRATION_NUM),
            path: "/api/utilisateur"
        });
    }

    /**
     * Méthode de suppression des cookies d'authentification
     * @param reponse Réponse à modifier
     */
    public effacerAuthCookies(reponse : NextResponse) {
        reponse.cookies.set("tokenAcces", "", { maxAge: 0, path: "/" });
        reponse.cookies.set("tokenRefresh", "", { maxAge: 0, path: "/api/utilisateur" });
    }



}