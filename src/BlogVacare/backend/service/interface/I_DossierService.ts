import { Dossier } from "@BlogsShared/model/Dossier";

/**
 * Interface de service de gestion de dossiers
 */
export interface I_DossierService {

    /**
     * Méthode de création d'un dossier
     * @param nom Nom du dossier
     * @param description Description du dossier
     * @param nomUtilisateur Nom de l'utilisateur créant le dossier
     */
    creerDossier(nom : string, description : string, nomUtilisateur : string) : Promise<void>;

    /**
     * Méthode de récupération de tous les dossiers du projet
     * @return Liste des dossiers
     */
    recupererDossiers() : Promise<Dossier[]>;

    /**
     * Méthode de récupération d'un dossier à partir d'un slug fourni
     * @param slugDossier Slug du dossier entré
     * @returns Dossier retourné
     */
    recupererDossierParSlug(slugDossier : string) : Promise<Dossier>;
    
    /**
     * Méthode de suppression d'un dossier
     * @param dossierId Identifiant du dossier à supprimer
     * @param nomUtilisateur Nom de l'utilisateur supprimant le blog
     * @param raisonSuppression Raison de la suppression
     * @param cache Si l'élément supprimé doit être caché ou non sur le site
     */
    supprimerDossier(dossierId : string, nomUtilisateur : string, raisonSuppression : string, cache : boolean) : Promise<void>;
    
}