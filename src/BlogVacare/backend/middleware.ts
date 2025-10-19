import { NextRequest, NextResponse } from "next/server";
import { AuthMiddleware } from "@BlogsBack/middlewares/AuthMiddleware";
import { LoggerMiddleware } from "./middlewares/LoggerMiddleware";

export const runtime = 'nodejs'; 
const authMiddleware = new AuthMiddleware();
const logger = new LoggerMiddleware();

export async function middleware(requete : NextRequest) {
    // Enregistrement de la requête
    logger.run(requete);

    const chemin = requete.nextUrl.pathname;

    const routesPubliques = [
        '/api/utilisateur/connexion',
        '/api/utilisateur/deconnexion',
        '/api/utilisateur/inscription',
        '/api/utilisateur/refresh',

        '/api/dossiers/liste/',
        '/api/blogs/liste/',
        '/api/messages/liste/'
    ];

    const routesAdmin = [
        '/api/dossiers/supprimer/',
        '/api/blogs/supprimer/',
        '/api/messages/supprimer/'
    ];

    const routesAuthentifiees = [
        '/api/dossiers/creer/',
        '/api/blogs/creer/',
        '/api/messages/creer/'
    ];

    // Récupération des réponses selon le niveau d'authentification requis
    if (routesPubliques.some(route => chemin.startsWith(route))) {
        return NextResponse.next();
    }

    if (routesAdmin.some(route => chemin.startsWith(route))) {
        return await authMiddleware.verifierAdmin(requete);
    }

    if (routesAuthentifiees.some(route => chemin.startsWith(route))) {
        return await authMiddleware.authentification(requete);
    }

}