/**
 * Interface d'utilisateur
 */
export interface Utilisateur {
    nom_utilisateur: string;
    mot_de_passe?: string;
    est_admin: boolean;
    description: string|null;
    banniere: string|null;
    created_at?: string|null;
    updated_at?: string|null;
}