import { Dossier, Blog, Message } from "@BlogsFront/model/Blog";
import { SiteVariant } from "@BlogsFront/model/Variant";
import {BlogGettersInterface} from "@BlogsFront/service/interface/BlogGettersInterface";
import {AbstractLocalGetters} from "@BlogsFront/service/local/AbstractLocalGetters";
import {
    BASE_DATA_PATH_BLOGS_FETCH, BASE_DATA_PATH_COMMUNITY_ACCUEIL_FETCH, BASE_DATA_PATH_COMMUNITY_FETCH,
    BASE_DATA_PATH_COMMUNITY_POSTS_FETCH, BASE_DATA_PATH_COMMUNITY_TENDANCES_FETCH, BASE_DATA_PATH_COMMUNITY_USER_FETCH
} from "@BlogsFront/lib/constants";
import {PaginatedBlog, UserBlog} from "@BlogsFront/model/Community";

/**
 * Récupération des dossiers/blogs/messages par fichiers JSON récupérés du backend à l'export
 */
export class LocalBlogGetters extends AbstractLocalGetters implements BlogGettersInterface {

    /**
     * Constructeur de la classe
     */
    public constructor() {
        super(BASE_DATA_PATH_BLOGS_FETCH);
    }

    async getDossiers(variant: SiteVariant): Promise<Dossier[]> {
        return await this.lireJson<Dossier[]>(variant, "dossiers.json");
    }
    async getBlogs(slug_dossier: string, variant: SiteVariant): Promise<Blog[]> {
        return await this.lireJson<Blog[]>(variant, "dossier/" +  slug_dossier + ".json");
    }
    async getMessages(slug_dossier: string, slug_blog: string, variant: SiteVariant): Promise<Message[]> {
        return await this.lireJson<Message[]>(variant, "blog/" + slug_dossier + "/" + slug_blog + ".json");
    }

    async getCommunityPosts(page: number, tendances: boolean): Promise<PaginatedBlog> {
        return await this.fetchJson<PaginatedBlog>((tendances ? BASE_DATA_PATH_COMMUNITY_TENDANCES_FETCH : BASE_DATA_PATH_COMMUNITY_ACCUEIL_FETCH) + "/page" + page + ".json");
    }
    async getCommunityBlog(slug: string): Promise<Blog> {
        const reponse = await this.fetchJson<Blog>(BASE_DATA_PATH_COMMUNITY_POSTS_FETCH + "/" + slug + ".json");
        if (reponse.messages !== undefined && reponse.messages !== null && reponse.messages.length > 0) {
            reponse.message_post = reponse.messages.shift();
        }

        return reponse;
    }
    async getCommunityBlogsByUser(nom_utilisateur: string): Promise<UserBlog> {
        return await this.fetchJson<UserBlog>(BASE_DATA_PATH_COMMUNITY_USER_FETCH + "/" + nom_utilisateur + ".json");
    }
    async getRandomBlogs(): Promise<Blog[]> {
        const slugs : string[] = await this.fetchJson<string[]>(BASE_DATA_PATH_COMMUNITY_FETCH + "/index.json");

        // Sélection de 5 slugs aléatoires
        let max = slugs.length - 1;
        const min = 0;
        const selectedSlugs = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            selectedSlugs.push(slugs[randomIndex]);
            slugs.splice(randomIndex, 1);
            max--;
        }

        // Sélection des blogs
        const blogs : Blog[] = [];
        for (const slug of selectedSlugs) {
            const blog = await this.getCommunityBlog(slug);
            if (blog.message_post && blog.message_post.contenu) {
                blog.message_post.contenu.length > 250 ? blog.message_post.contenu = blog.message_post.contenu.slice(0, 247) + "..." : blog.message_post.contenu;
            }
            blogs.push(blog);
        }

        return blogs;
    }

    async getLienMedias(): Promise<string> {
        return "/assets/BlogVacare/Community";
    }
}