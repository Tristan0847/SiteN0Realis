import {Blog, Dossier, Message} from "@BlogsFront/model/Blog";
import {SiteVariant} from "@BlogsFront/model/Variant";
import {PaginatedBlog, UserBlog} from "@BlogsFront/model/Community";

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

    /**
     * Méthode de récupération des blogs sur la page communautaire
     * @param page Numéro de page actuel
     * @param tendances Si on veut récupérer les blogs par ordre de tendances
     * @returns PaginatedBlog Blogs récupérés
     */
    getCommunityPosts(page: number, tendances : boolean): Promise<PaginatedBlog>;

    /**
     * Méthode de récupération d'un blog de page communautaire
     * @param slug Slug du blog
     * @returns Message[] Messages récupérés
     */
    getCommunityBlog(slug : string) : Promise<Blog>;

    /**
     * Méthode de récupération de blogs pour un utilisateur donné
     * @param nom_utilisateur Nom de l'utilisateur dont on veut les blogs
     * @returns UserBlog[] Blogs et utilisateur récupérés
     */
    getCommunityBlogsByUser(nom_utilisateur : string): Promise<UserBlog>;

    /**
     * Méthode de récupération de blogs aléatoires
     * @returns Blog[] Blogs récupérés
     */
    getRandomBlogs(): Promise<Blog[]>;

    /**
     * Méthode de récupération du lien des medias (en local ou distant)
     * @returns string Lien des medias
     */
    getLienMedias(): Promise<string>;
}