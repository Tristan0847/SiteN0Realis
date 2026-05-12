import {Blog, Dossier, Message} from "@BlogsFront/model/Blog";
import {SiteVariant} from "@BlogsFront/model/Variant";

/**
 * Interface de récupération des données du site
 */
export interface BlogGettersInterface {

    /**
     * Méthode de récupération des dossiers du projet
     * @param variant Variant actuel du site
     * @return Dossier[] Dossiers récupérés
     */
    getDossiers(variant: SiteVariant): Promise<Dossier[]>;

    /**
     * Méthode de récupération des blogs du projet
     * @param slug_dossier Slug du dossier contenant les blogs
     * @param variant Variant actuel du site
     * @returns Blog[] Blogs récupérés
     */
    getBlogs(slug_dossier: string, variant : SiteVariant): Promise<Blog[]>;

    /**
     * Méthode de récupération des messages du projet
     * @param slug_dossier Slug du dossier contenant le blog contenant les messages
     * @param slug_blog Slug du blog contenant les messages
     * @param variant Variant actuel du site
     * @returns Message[] Messages récupérés
     */
    getMessages(slug_dossier: string, slug_blog: string, variant: SiteVariant): Promise<Message[]>;
}