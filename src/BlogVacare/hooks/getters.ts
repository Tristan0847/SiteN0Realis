import {SiteVariant} from "@BlogsFront/model/Variant";
import {Blog, Dossier, Message} from "@BlogsFront/model/Blog";
import {apiFetch} from "@BlogsFront/lib/apiFetch";

/**
 * Méthode de récupération des blogs du projet
 * @param slug_dossier Slug du dossier contenant les blogs
 * @param variant Variant actuel du site
 * @param init Requête personnalisé (possiblement sans credentials)
 * @returns Blog[] Blogs récupérés
 */
export function getBlogs(slug_dossier: string, variant: SiteVariant, init: RequestInit|undefined = undefined): Promise<Blog[]> {
    const url = `blogs/${encodeURIComponent(slug_dossier)}${variant ? `?variant=${encodeURIComponent(variant)}` : ''}`;

    return apiFetch<Blog[]>(url, init);
}


/**
 * Méthode de récupération des dossiers du projet
 * @param variant Variant actuel du site
 * @param init Requête personnalisé (possiblement sans credentials)
 * @return Dossier[] Dossiers récupérés
 */
export function index(variant: SiteVariant, init: RequestInit|undefined = undefined): Promise<Dossier[]> {
    const url = `dossier${variant ? `?variant=${encodeURIComponent(variant)}` : ''}`;

    return apiFetch<Dossier[]>(url, init);
}


/**
 * Méthode de récupération des messages du projet
 * @param slug_dossier Slug du dossier contenant le blog contenant les messages
 * @param slug_blog Slug du blog contenant les messages
 * @param variant Variant actuel du site
 * @param init Options de la requête (possiblement sans credentials)
 * @returns Message[] Messages récupérés
 */
export function getMessages(slug_dossier: string, slug_blog: string, variant: SiteVariant, init: RequestInit|undefined = undefined): Promise<Message[]> {
    const url = `messages/${encodeURIComponent(slug_dossier)}/${encodeURIComponent(slug_blog)}${variant ? `?variant=${encodeURIComponent(variant)}` : ''}`;

    return apiFetch<Message[]>(url);
}