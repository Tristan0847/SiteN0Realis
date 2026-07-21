import {Blog} from "@BlogsFront/model/Blog";
import {Utilisateur} from "@BlogsFront/model/Auth";

/**
 * Interface de récupération des blogs communautaires
 */
export interface PaginatedBlog {
    data: Blog[];
    current_page: number;
    last_page: number;
}

/**
 * Props retourné par la route de récupération des blogs d'un utilisateur
 */
export interface UserBlog {
    utilisateur: Utilisateur;
    blogs: Blog[];
}