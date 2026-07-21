'use client';

import {apiPost} from "@BlogsFront/lib/apiFetch";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {blogGetters} from "@BlogsFront/service/ServiceFactory";
import {Blog} from "@BlogsFront/model/Blog";

const queryKey =  ['communaute-blogs'];
const queryKeyTendances =  (tendances : boolean) => [...queryKey, tendances] as const;
const queryKeyUtilisateur = (nom_utilisateur : string) => ['communaute-utilisateur', nom_utilisateur] as const;

const queryKeyBlog = (slug : string) => ['communaute-blog', slug] as const;

/**
 * Hook de récupération de blogs pour le feed communautaire
 * @param tendances Si on doit récupérer par ordre de tendances ou non
 */
export function useFeed(tendances : boolean = false) {
    const getter = blogGetters();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: queryKeyTendances(tendances),
        queryFn: (({pageParam}) => getter.getCommunityPosts(pageParam, tendances)),
        initialPageParam: 1,
        getNextPageParam: (page) => page.last_page > page.current_page ? page.current_page + 1 : null,
        staleTime: 5 * 60 * 1000
    });
    const items : Blog[] = data?.pages?.flatMap((page) => page.data) ?? [];

    return { items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
}

/**
 * Hook de récupération d'utilisateurs
 * @param pseudo Pseudo de l'utilisateur
 */
export function useFeedUtilisateur(pseudo : string) {
    const getter = blogGetters();

    const {data, isLoading, error} = useQuery({
        queryKey: [...queryKey, ...queryKeyUtilisateur(pseudo)],
        queryFn: () => getter.getCommunityBlogsByUser(pseudo),
        staleTime: 5 * 60 * 1000,

    });

    return {blogs: data?.blogs ?? [], utilisateur: data?.utilisateur ?? null, isLoading, error};
}

/**
 * Hook de récupération de blogs aléatoires
 */
export function useRandomFeed() {
    const getter = blogGetters();

    const {data, isLoading, isFetching, error, refetch} = useQuery({
        queryKey: queryKey,
        queryFn: () => getter.getRandomBlogs(),
        staleTime: 5 * 60 * 1000,
    });

    return {blogs: data ?? [], isLoading: (isLoading || isFetching), error, refetch};
}

/**
 * Méthode de création d'un blog communautaire
 * @param contenu Contenu du blog
 * @param file Fichier lié au blog
 */
async function creerBlog(contenu : string, file : File|null) {
    await apiPost("communaute/blog/creer", {
        "contenu": contenu,
        "media": file
    });
}

/**
 * Hook de création de blog
 */
export function useCreerBlogCommunautaire() {
    const queryClient = useQueryClient();

    const {isPending, error, isSuccess, mutate, mutateAsync} = useMutation({
        mutationFn: ({ contenu, file } : {contenu: string, file: File | null}) => creerBlog(contenu, file),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: queryKey});
        }
    });

    return {isPending, error, isSuccess, mutate, mutateAsync};
}

/**
 * Méthode de réponse à un post
 * @param slug Slug du post
 * @param contenu Contenu de la réponse
 * @param file Fichier lié au message
 */
async function repondrePost(slug: string, contenu : string, file : File|null) {
    await apiPost(`communaute/blog/${slug}/repondre`, {
        "contenu" : contenu,
        "media": file ? file : undefined
    });
}

/**
 * Hook de création de blog
 */
export function useRepondrePost() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({slug, contenu, file} : {slug: string, contenu: string, file : File|null}) => repondrePost(slug, contenu, file),
        onSuccess: async (_data, {slug}) => {
            await queryClient.invalidateQueries({queryKey: queryKeyBlog(slug)});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}

/**
 * Hook de récupération d'un post et de ses réponses
 * @param slug Slug du post
 */
export function usePost(slug : string)  {
    const getter = blogGetters();

    const {data, isLoading, error} = useQuery({
        queryKey: queryKeyBlog(slug),
        queryFn: () => getter.getCommunityBlog(slug)
    });

    return {data, isLoading, error};
}