import { Dossier, Blog, Message } from "@BlogsFront/model/Blog";
import { SiteVariant } from "@BlogsFront/model/Variant";
import {BlogGettersInterface} from "@BlogsFront/service/interface/BlogGettersInterface";
import {apiFetch} from "@BlogsFront/lib/apiFetch";

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

}