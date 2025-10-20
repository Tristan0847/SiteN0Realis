import { Utilisateur } from '@BlogsShared/model/Utilisateur';

/**
 * Interface de réponse de l'API
 */
export interface AuthReponse {
    succes: boolean;
    utilisateur: Utilisateur;
}

/**
 * Interface de service d'authentification
 */
export interface I_AuthService {

    /**
     * Méthode de connexion au site
     * @param nomUtilisateur Nom d'utilisateur
     * @param mdp Mot de passe entré
     * @returns Réponse de l'API
     */
    connexion(nomUtilisateur : string, mdp : string) : Promise<AuthReponse>

    /**
     * Méthode d'inscription au site
     * @param nomUtilisateur Nom de l'utilisateur 
     * @param mdp1 Mot de passe
     * @param mdp2 Mot de passe ré-entré par sécurité
     */
    inscription(nomUtilisateur : string, mdp1 : string, mdp2 : string) : Promise<AuthReponse>;

    /**
     * Méthode de déconnexion au site
     */
    deconnexion() : Promise<void>;

    /**
     * Méthode de rafraichissement du token d'accès
     */
    rafraichirToken() : Promise<void>;

}