import { Dossier } from '@BlogsShared/model/Dossier';

/**
 * Interface de gestion de DAO de dossiers
 */
export interface I_DossierDAO {

    /**
     * Méthode de création d'un dossier
     * @param dossier Dossier à créer
     */
    creerDossier(dossier : Dossier) : Promise<void>;

    /**
     * Méthode permettant de récupérer un dossier par son slug
     * @param slugDossier Slug du dossier
     * @return Dossier demandé
     */
    recupererDossierParSlug(slugDossier : string) : Promise<Dossier>;

    /**
     * Méthode permettant de récupérer tous les dossiers du projet
     * @return Liste des dossiers
     */
    recupererDossiers(): Promise<Dossier[]>;

    /**
     * Méthode de suppression d'un dossier
     * @param dossier Dossier à supprimer avec l'objet ElementSupprime ajusté en conséquence
     */
    supprimerDossier(dossier : Dossier) : Promise<void>;
    
}
