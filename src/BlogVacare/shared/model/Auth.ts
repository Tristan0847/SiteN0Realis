import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Interface de payload de JWT
 */
export interface JwtPayload {
    // Données de l'utilisateur
    username : string;
    estAdmin : boolean;

    // Données créées par le JWT

    // Date de création du jeton
    creation? : number;
    // Date d'expiration du jeton
    expiration? : number;
}

/**
 * Credentials d'identification
 */
export interface DonneesUtilisateur {
  username: string;
  password: string;
}

/**
 * Réponse d'authentification
 */
export interface AuthReponse {
  utilisateur: Utilisateur;
  tokenAcces: string;
  tokenRefresh: string;
}