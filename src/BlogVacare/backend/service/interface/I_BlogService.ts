import { Blog } from "@BlogsShared/model/Blog";
import { SiteVariant } from "@BlogsShared/model/Variant";

/**
 * Interface de service de gestion de blogs
 */
export interface I_BlogService {

    /**
     * Méthode de création d'un blog
     * @param nom Nom du blog
     * @param contenuPremierMessage Contenu de son premier message 
     * @param dossierId Identifiant du dossier contenant le blog
     * @param nomUtilisateur Nom de l'utilisateur créant le blog
     */
    creerBlog(nom : string, contenuPremierMessage : string, dossierId : string, nomUtilisateur : string) : Promise<void>;

    /**
     * Méthode de récupération des blogs d'un dossier
     * @param slugDossier Slug du dossier
     * @param variante Variante du site
     * @param estAdmin Variable définissant si l'utilisateur est admin ou non
     * @return Liste des blogs du dossier
     */
    recupererBlogsDuDossier(slugDossier : string, variante : SiteVariant, estAdmin : boolean) : Promise<Blog[]>;

    /**
     * Méthode de récupération d'un blog à partir des slugs associés
     * @param slugBlog Slug du blog à rechercher
     * @param slugDossier Slug du dossier contenant le blog
     * @returns Blog associé
     */
    recupererBlogParSlug(slugBlog : string, slugDossier : string) : Promise<Blog>;

    /**
     * Méthode de suppression d'un blog
     * @param blogId Identifiant du blog à supprimer 
     * @param nomUtilisateur Nom de l'utilisateur supprimant le blog
     * @param raisonSuppression Raison de la suppression
     * @param cache Si l'élément supprimé doit être caché ou non sur le site
     */
    supprimerBlog(blogId : string, nomUtilisateur : string, raisonSuppression : string, cache : boolean) : Promise<void>;

}