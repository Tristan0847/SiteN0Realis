import { NextRequest, NextResponse } from "next/server";
import { AuthMiddleware } from "@BlogsBack/middlewares/AuthMiddleware";
import { LoggerMiddleware } from "@BlogsBack/middlewares/LoggerMiddleware";
import { CorsMiddleware } from "@BlogsBack/middlewares/CorsMiddleware";

export const runtime = 'nodejs'; 
const authMiddleware = new AuthMiddleware();
const logger = new LoggerMiddleware();

export async function middleware(requete : NextRequest) {
    // Enregistrement de la requête
    logger.run(requete);

    const chemin = requete.nextUrl.pathname;

    // Autorisation du préchargement de la requête
    if (requete.method === 'OPTIONS') {
        const reponse = new NextResponse(null, {
            status: 200
        });
        const requeteCors = CorsMiddleware.addCorsHeaders(reponse, requete);
        return requeteCors;
    }

    const routesPubliques = [
        '/api/utilisateur/connexion',
        '/api/utilisateur/deconnexion',
        '/api/utilisateur/inscription',
        '/api/utilisateur/refresh',

        '/api/dossiers/liste',
        '/api/dossiers/recuperation',
        '/api/blogs/liste',
        '/api/blogs/recuperation',
        '/api/messages/liste'
    ];

    const routesAdmin = [
        '/api/dossiers/supprimer',
        '/api/blogs/supprimer',
        '/api/messages/supprimer'
    ];

    const routesAuthentifiees = [
        '/api/utilisateur/me',
        
        '/api/dossiers/creer',
        '/api/blogs/creer',
        '/api/messages/creer'
    ];

    let reponse : NextResponse|undefined;

    // Récupération des réponses selon le niveau d'authentification requis
    if (routesPubliques.some(route => chemin.startsWith(route))) {
        reponse = NextResponse.next();
    }

    if (routesAdmin.some(route => chemin.startsWith(route))) {
        reponse = await authMiddleware.verifierAdmin(requete);
    }

    if (routesAuthentifiees.some(route => chemin.startsWith(route))) {
        reponse = await authMiddleware.authentification(requete);
    }

    if (reponse == undefined) {
        throw new Error("Aucune route correspondante n'a été retrouvée");
    }

    const reponseCors : NextResponse = CorsMiddleware.addCorsHeaders(reponse, requete);

    return reponseCors;
}