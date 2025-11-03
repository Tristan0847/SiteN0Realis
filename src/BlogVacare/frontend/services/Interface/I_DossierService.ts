import { Dossier } from "@BlogsShared/model/Dossier";
import { SiteVariant } from "@BlogsShared/model/Variant";

/**
 * Interface de Service de dossiers
 */
export interface I_DossierService {

    /**
     * Méthode de récupération des dossiers du projet
     * @param variante Variante du site
     * @returns Liste de dossiers du projet
     */
    recupererDossiers(variante : SiteVariant) : Promise<Dossier[]>;

    /**
     * Méthode de récupération d'un dossier à partir de son slug
     * @param slugDossier Slug du dossier associé
     * @returns Dossier enrichi
     */
    recupererDossierParSlug(slugDossier : string) : Promise<Dossier>;

    /**
     * Méthode de création d'un dossier 
     * @param nom Nom du dossier
     * @param description Description du dossier
     */
    creerDossier(nom : string, description : string) : Promise<void>;

    /**
     * Méthode de suppression d'un dossier
     * @param idDossier Dossier à supprimer
     * @param raisonSuppression Raison de la suppression
     * @param cache Si le dossier est à cacher ou non
     */
    supprimerDossier(idDossier : string, raisonSuppression : string, cache : boolean) : Promise<void>;
    
}