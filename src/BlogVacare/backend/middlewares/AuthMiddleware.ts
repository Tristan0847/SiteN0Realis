import { I_AuthService } from "@BlogsBack/service/interface/I_AuthService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware d'authentification (vérification de token et enrichissement de la requête avec les infos utilsiateur)
 */
export class AuthMiddleware {

    private service : I_AuthService;

    /**
     * Constructeur de la classe
     */
    constructor() {
        this.service = ServiceFactory.get<I_AuthService>(INTERFACESSERVICE.I_AuthService);
    }


    /**
     * Méthode d'authentification au site, vérifiant que l'on est bien connecté
     * @param requete Requête envoyée 
     * @returns Réponse du routeur
     */
    async authentification(requete : NextRequest) : Promise<NextResponse>{
        try {
                
            // Récupération du token
            const tokenAcces = requete.cookies.get("tokenAcces")?.value;

            if (!tokenAcces) {
                throw new Error("Non authentifié, token manquant");
            }

            const utilisateur = await this.service.getUtilisateur(tokenAcces);

            const requeteHeaders = new Headers(requete.headers);
            requeteHeaders.set('x-username', utilisateur.getUsername());
            requeteHeaders.set('x-est-admin', utilisateur.getEstAdmin().toString());

            return NextResponse.next({
                request: {
                    headers: requeteHeaders,
                },
            });
        }
        catch (erreur) {
            const message = erreur instanceof Error ? erreur.message : "Token invalide";

            return NextResponse.json(
                { error: 'Non authentifié - ' + message },
                { status: 401 }
            );
        }
    }

    /**
     * Méthode de vérification que l'utilisateur demandant une action est bien admin
     * @param requete Requête actuelle
     * @returns Réponse du routeur 
     */
    async verifierAdmin(requete : NextRequest) : Promise<NextResponse> {
        let reponse = await this.authentification(requete);
        
        if (reponse.status !== 200) {
            return reponse;
        }
        
        const estAdmin = requete.headers.get("x-est-admin") === "true";
        
        if (!estAdmin) {
            return NextResponse.json(
                { error: "Accès refusé - Droits administrateur requis" },
                { status: 403 }
            );
        }

        return reponse;
    }
}