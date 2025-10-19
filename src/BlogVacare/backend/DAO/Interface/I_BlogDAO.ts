import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';

/**
 * Interface de gestion de services de blogs
 */
export interface I_BlogDAO {

    /**
     * Méthode de création d'un blog
     * @param blog Blog à créer
     * @param slugDossier Slug du dossier contenant le blog
     */
    creerBlog(blog : Blog, slugDossier : string) : Promise<void>;

    /**
     * Méthode permettant de récupérer un blog par son slug
     * @param slugBlog Slug du blog
     * @param slugDossier Slug du dossier contenant le blog
     * @return Blog demandé
     */
    recupererBlogParSlug(slugBlog : string, slugDossier : string) : Promise<Blog>;

    /**
     * Méthode permettant de récupérer les blogs d'un dossier
     * @param slugDossier Slug du dossier
     * @return Liste des blogs du dossier
     */
    recupererBlogsDuDossier(slugDossier: string): Promise<Blog[]>;

    /**
     * Méthode de suppression d'un blog
     * @param blog Blog à supprimer avec l'objet ElementSupprime ajusté en conséquence
     */
    supprimerBlog(blog : Blog) : Promise<void>;

}
