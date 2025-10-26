import { AuthReponse, I_AuthService } from "@BlogsFront/services/Interface/I_AuthService";
import { Utilisateur, UtilisateurJSON } from "@BlogsShared/model/Utilisateur";

/**
 * Service d'authentification du site
 */
export class AuthServiceApi implements I_AuthService {

    private apiBaseUrl : string;

    constructor() {
        this.apiBaseUrl = process.env.NEXT_PUBLIC_LIEN_API_BACKEND ?? "http://localhost:3000/api";
    }

    async connexion(nomUtilisateur : string, mdp : string) : Promise<AuthReponse> {
        const url = this.apiBaseUrl + "/utilisateur/connexion";
        const body = JSON.stringify({
            username: nomUtilisateur,
            password: mdp
        });

        const requete : RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: body
        };

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "La connexion a échoué");
        }

        const json = await reponse.json();
        let retour : AuthReponse = {
            succes: json.succes,
            utilisateur: Utilisateur.fromJSON(json.utilisateur)
        }
        
        return retour;
    }

    async inscription(nomUtilisateur : string, mdp1 : string, mdp2 : string) : Promise<AuthReponse> {
        const url = this.apiBaseUrl + "/utilisateur/inscription";
        const body = JSON.stringify({
            nomUtilisateur: nomUtilisateur,
            mdp1: mdp1,
            mdp2: mdp2
        });

        const requete : RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: body
        };

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "L'inscription a échoué");
        }

        const retour : AuthReponse = await reponse.json();

        return retour;
    }
    
    async deconnexion() : Promise<void> {
        const url = this.apiBaseUrl + "/utilisateur/deconnexion";
        const requete : RequestInit = {
            method: "POST",
            credentials: "include"
        };

        await fetch(url, requete);
    }

    async rafraichirToken() : Promise<void> {
        const url = this.apiBaseUrl + "/utilisateur/refresh";
        const requete : RequestInit = {
            method: "POST",
            credentials: "include"
        };

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            throw new Error("Impossible de rafraîchir le token d'accès");
        }
    }

    async recupererUtilisateurConnecte() : Promise<Utilisateur> {
        const url = this.apiBaseUrl + "/utilisateur/me";
        const requete : RequestInit = {
            method: "GET",
            credentials: "include"
        };
        
        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            throw new Error("Impossible de récupérer l'utilisateur associé");
        }

        const utilisateurJson : UtilisateurJSON = await reponse.json();
        const utilisateur = Utilisateur.fromJSON(utilisateurJson);
        
        return utilisateur;
    }

}