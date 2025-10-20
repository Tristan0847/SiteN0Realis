import { Blog } from '@BlogsShared/model/Blog';

/**
 * Interface de gestion de services de blogs
 */
export interface I_BlogService {

    /**
     * Méthode de récupération de blogs d'un dossier
     * @param slugDossier Slug du dossier concerné
     * @returns Liste de blogs du dossier
     */
    recupererBlogsDuDossier(slugDossier : string) : Promise<Blog[]>;

    /**
     * Méthode de récupération de blogs à partir de slugs fournis
     * @param slugBlog Slug du blog recherché
     * @param slugDossier Slug du dossier contenant le blog
     * @returns Blog enrichi
     */
    recupererBlogParSlug(slugBlog : string, slugDossier : string) : Promise<Blog>;

    /**
     * Méthode de création d'un blog
     * @param nom Nom du blog
     * @param contenuPremierMessage Contenu du premier message 
     * @param idDossier Identifiant du dossier dans lequel le blog sera créé
     */
    creerBlog(nom : string, contenuPremierMessage : string, idDossier : string) : Promise<void>;

    /**
     * Méthode de suppression d'un blog
     * @param idBlog Identifiant du blog à supprimer
     * @param raisonSuppression Raison de sa suppression
     * @param cache Si le blog supprimé est à cacher ou non
     */
    supprimerBlog(idBlog : string, raisonSuppression : string, cache : boolean) : Promise<void>;
    
}
