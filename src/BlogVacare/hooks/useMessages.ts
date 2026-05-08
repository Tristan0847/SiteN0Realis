'use client';

import {SiteVariant} from '@BlogsFront/model/Variant';
import {apiPost} from "@BlogsFront/lib/apiFetch";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Message} from "@BlogsFront/model/Blog";
import {getMessages} from "@BlogsFront/hooks/getters";

const queryKey = (slug_dossier: string, slug_blog: string) => ['messages', slug_dossier, slug_blog] as const;

/**
 * Hook de récupération des messages du projet
 * @param slug_dossier Slug du dossier contenant le blog contenant les messages
 * @param slug_blog Slug du blog contenant les messages
 * @param variant Variante du site
 * @param messagesPrecharges Messages préchargés du projet (cas d'export statique)
 * @returns Objet contenant les messages, l'état de chargement et une éventuelle erreur
 */
export function useMessages(slug_dossier: string, slug_blog: string, variant: SiteVariant, messagesPrecharges: Message[] = []) {
    const {data, isLoading, error} = useQuery({
        queryKey: queryKey(slug_dossier, slug_blog),
        queryFn: () => getMessages(slug_dossier, slug_blog, variant),
        enabled: !!variant && !!slug_dossier || !!slug_blog,
        initialData: messagesPrecharges.length > 0 ? messagesPrecharges : undefined,
        staleTime: 5 * 60 * 1000
    });

    return {data, isLoading, error};
}

type CreerMessageParams = {
    slug_dossier: string;
    slug_blog: string;
    contenu: string;
}

/**
 * Méthode de création d'un message
 * @param slug_dossier Slug du dossier contenant le blog où créer le message
 * @param slug_blog Slug du blog où créer le message
 * @param contenu Contenu du message
 */
async function creerMessage({slug_dossier, slug_blog, contenu}: CreerMessageParams): Promise<void> {
    await apiPost('message/store', {
        "slug_dossier": slug_dossier,
        "slug_blog": slug_blog,
        "contenu": contenu
    });
}

/**
 * Hook de création de message
 */
export function useCreerMessage() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({slug_dossier, slug_blog, contenu}: CreerMessageParams) => creerMessage({slug_dossier, slug_blog, contenu}),
        onSuccess: async (_data, {slug_dossier, slug_blog}) => {
            await queryClient.invalidateQueries({queryKey: queryKey(slug_dossier, slug_blog)});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}

type SupprimerMessageParams = {
    id: number;
    raison: string;
    cache: boolean;
    slug_dossier?: string;
    slug_blog?: string;
}

/**
 * Méthode de suppression d'un message
 * @param id ID du message à supprimer
 * @param raison Raison de la suppression
 * @param cache True s'il doit être caché, false sinon
 */
async function supprimerMessage({id, raison, cache = false}: SupprimerMessageParams): Promise<void> {
    await apiPost('message/supprimer', {
        "id_message": id,
        "raison": raison,
        "cache": cache
    });
}

/**
 * Hook de suppression de message
 */
export function useSupprimerMessage() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({id, raison, cache = false, slug_dossier, slug_blog}: SupprimerMessageParams) => supprimerMessage({id, raison, cache}),
        onSuccess: async (_data, {slug_dossier, slug_blog}) => {
            slug_dossier && slug_blog && await queryClient.invalidateQueries({queryKey: queryKey(slug_dossier, slug_blog)});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}
