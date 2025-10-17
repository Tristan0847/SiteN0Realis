import { AuthReponse, DonneesUtilisateur } from "@BlogsShared/model/Auth";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Interface de service d'authentification
 */
export interface I_AuthService {

    /**
     * Méthode de connexion au projet
     * @param credentials Données d'utilisateur entrées
     * @returns Réponse d'authentification (tokens et nom d'utilisateur)
     */
    connexion(credentials : DonneesUtilisateur) : Promise<AuthReponse>;

    /**
     * Méthode d'inscription au projet
     * @param donnees Données d'utilisateur entrées
     * @returns Réponse d'authentification (tokens et nom d'utilisateur)
     */
    inscription(donnees : DonneesUtilisateur) : Promise<AuthReponse>;
    
    /**
     * Méthode de refraichissement du token d'accès
     * @param tokenRefresh Token refresh actuel
     * @returns Nouveau token d'accès
     */
    rafraichirToken(tokenRefresh : string) : Promise<string>;

    /**
     * Méthode d'obtention du nom d'utilisateur et du rôle d'un utilisateur associé à un token entré
     * @param tokenAcces Token d'accès au site
     * @returns Utilisateur lié (avec son rôle) 
     */
    getUtilisateur(tokenAcces : string) : Promise<Utilisateur>;

}