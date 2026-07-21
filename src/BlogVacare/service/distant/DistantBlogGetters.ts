import { Dossier, Blog, Message } from "@BlogsFront/model/Blog";
import { SiteVariant } from "@BlogsFront/model/Variant";
import {BlogGettersInterface} from "@BlogsFront/service/interface/BlogGettersInterface";
import {apiFetch} from "@BlogsFront/lib/apiFetch";
import {PaginatedBlog, UserBlog} from "@BlogsFront/model/Community";

/**
 * Classe de récupération des données depuis l'API distante
 */
export class DistantBlogGetters implements BlogGettersInterface {
    async getDossiers(variant: SiteVariant): Promise<Dossier[]> {
        const url = `dossier${variant ? `?variant=${encodeURIComponent(variant)}` : ''}`;

        return await apiFetch<Dossier[]>(url);
    }

    async getBlogs(slug_dossier: string, variant: SiteVariant): Promise<Blog[]> {
        const url = `blogs/${encodeURIComponent(slug_dossier)}${variant ? `?variant=${encodeURIComponent(variant)}` : ''}`;

        return await apiFetch<Blog[]>(url);
    }

    async getMessages(slug_dossier: string, slug_blog: string, variant: SiteVariant): Promise<Message[]> {
        const url = `messages/${encodeURIComponent(slug_dossier)}/${encodeURIComponent(slug_blog)}${variant ? `?variant=${encodeURIComponent(variant)}` : ''}`;

        return await apiFetch<Message[]>(url);
    }

    async getCommunityPosts(page: number, tendances : boolean = false): Promise<PaginatedBlog> {
        const url = `communaute/blogs?page=${page}&tendances=${tendances}`;

        return await apiFetch<PaginatedBlog>(url);
    }

    async getCommunityBlog(slug : string) : Promise<Blog> {
        const url = `communaute/blog/${slug}`;

        const reponse = await apiFetch<Blog>(url);
        if (reponse.messages !== undefined && reponse.messages !== null && reponse.messages.length > 0) {
            reponse.message_post = reponse.messages.shift();
        }
        return reponse;
    }

    async getCommunityBlogsByUser(nom_utilisateur : string): Promise<UserBlog> {
        const url = 'communaute/blogs/utilisateur/' + nom_utilisateur;

        return await apiFetch<UserBlog>(url);
    }

    async getRandomBlogs(): Promise<Blog[]> {
        const url = 'communaute/blogs/random';

        return await apiFetch<Blog[]>(url);
    }

    async getLienMedias(): Promise<string> {
        return await apiFetch<string>("media-link");
    }
}