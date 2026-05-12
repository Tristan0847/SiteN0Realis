'use client';

import {SiteVariant} from '@BlogsFront/model/Variant';
import {Blog} from "@BlogsFront/model/Blog";
import {apiPost} from "@BlogsFront/lib/apiFetch";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {blogGetters} from "@BlogsFront/service/ServiceFactory";
import {BlogGettersInterface} from "@BlogsFront/service/interface/BlogGettersInterface";

const queryKey = (id_dossier: string) => ['blogs', id_dossier] as const;


/**
 * Hook de récupération des blogs du projet
 * @param slug_dossier Slug du dossier contenant les blogs
 * @param variant Variante du site
 * @param blogsPrecharges Blogs préchargés du projet (cas d'export statique)
 * @returns Objet contenant les blogs, l'état de chargement et une éventuelle erreur
 */
export function useBlogs(slug_dossier: string, variant: SiteVariant, blogsPrecharges: Blog[] = []) {
    const getter: BlogGettersInterface = blogGetters();

    const {data, isLoading, error} = useQuery({
        queryKey: queryKey(slug_dossier),
        queryFn: () => getter.getBlogs(slug_dossier, variant),
        enabled: !!variant && !!slug_dossier,
        initialData: blogsPrecharges.length > 0 ? blogsPrecharges : undefined,
        staleTime: 5 * 60 * 1000
    });

    return {data, isLoading, error};
}

type CreerBlogParams = {
    slug_dossier: string;
    nom: string;
    contenuPremierMessage: string;
}

/**
 * Méthode de création d'un Blog
 * @param slug_dossier Slug du dossier contenant le blog
 * @param nom Titre du Blog
 * @param description Description du Blog
 */
async function creerBlog({slug_dossier, nom, contenuPremierMessage}: CreerBlogParams): Promise<void> {
    await apiPost('blog/store', {
        "slug_dossier": slug_dossier,
        "nom": nom,
        "contenuPremierMessage": contenuPremierMessage
    });
}

/**
 * Hook de création de blog
 */
export function useCreerBlog() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({slug_dossier, nom, contenuPremierMessage}: CreerBlogParams) => creerBlog({
            slug_dossier,
            nom,
            contenuPremierMessage
        }),
        onSuccess: async (_data, {slug_dossier}) => {
            await queryClient.invalidateQueries({queryKey: queryKey(slug_dossier)});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}

type SupprimerBlogParams = {
    id: number;
    raison: string;
    cache: boolean;
    slug_dossier?: string;
}

/**
 * Méthode de suppression d'un blog
 * @param id ID du blog à supprimer
 * @param raison Raison de la suppression
 * @param cache True s'il doit être caché, false sinon
 */
async function supprimerBlog({id, raison, cache = false}: SupprimerBlogParams): Promise<void> {
    await apiPost('blog/supprimer', {
        "id_blog": id,
        "raison": raison,
        "cache": cache
    });
}

/**
 * Hook de suppression de blog
 */
export function useSupprimerBlog() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({id, raison, cache = false, slug_dossier}: SupprimerBlogParams) => supprimerBlog({
            id,
            raison,
            cache
        }),
        onSuccess: async (_data, {slug_dossier}) => {
            slug_dossier && await queryClient.invalidateQueries({queryKey: queryKey(slug_dossier)});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}
