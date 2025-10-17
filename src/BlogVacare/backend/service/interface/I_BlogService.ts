import { Blog } from "@BlogsShared/model/Blog";
import { Dossier } from "@BlogsShared/model/Dossier";
import { Message } from "@BlogsShared/model/Message";

/**
 * Interface de service de gestion de blogs
 */
export interface I_BlogService {

    /**
     * Méthode d'obtention des dossiers du projet
     * @returns Liste des dossiers
     */
    getDossiers() : Promise<Dossier[]>;

    /**
     * Méthode de récupération des blogs d'un dossier
     * @param dossierId Identifiant du dossier 
     * @returns Blogs du dossier
     */
    getBlogsDeDossier(dossierId : string) : Promise<Blog[]>;

    /**
     * Méthode de récupération de messages d'un blog
     * @param blogId Identifiant du blog
     * @param dossierId Identifiant du dossier
     * @returns Liste des messages du blog
     */
    getMessagesDeBlog(blogId : string, dossierId : string) : Promise<Message[]>;

}