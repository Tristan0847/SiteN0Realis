/**
 * Interface d'utilisateur
 */
export interface Utilisateur {
    nom_utilisateur: string;
    mot_de_passe?: string;
    est_admin: boolean;
    created_at?: string|null;
    updated_at?: string|null;
}

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
export interface DonneesInscription {
  nomUtilisateur: string;
  mdp1: string;
  mdp2: string;
}

/**
 * Réponse d'authentification
 */
export interface AuthReponse {
  utilisateur: Utilisateur;
  tokenAcces: string;
  tokenRefresh: string;
}