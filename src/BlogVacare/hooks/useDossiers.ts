'use client';

import {SiteVariant} from '@BlogsFront/model/Variant';
import {Dossier} from "@BlogsFront/model/Blog";
import {apiPost} from "@BlogsFront/lib/apiFetch";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {index} from "@BlogsFront/hooks/getters";

const queryKey = ['dossiers'];

/**
 * Méthode de hook pour récupérer les dossiers du projet
 * @param variant Variante du site
 * @param dossiersPrecharges Dossiers préchargés du projet (cas d'export statique)
 * @returns Objet contenant les dossiers, l'état de chargement et une éventuelle erreur
 */
export function useDossiers(variant: SiteVariant, dossiersPrecharges: Dossier[] = []) {
    const {data, isLoading, error} = useQuery({
        queryKey: queryKey,
        queryFn: () => index(variant),
        enabled: !!variant,
        initialData: dossiersPrecharges.length > 0 ? dossiersPrecharges : undefined,
        staleTime: 5 * 60 * 1000
    });

    return {data, isLoading, error};
}

type CreerDossierParams = {
    nom: string;
    description: string;
}

/**
 * Méthode de création d'un dossier
 * @param nom Titre du dossier
 * @param description Description du dossier
 */
async function creerDossier({nom, description}: CreerDossierParams): Promise<void> {
    await apiPost('dossier/store', {
        "titre": nom,
        "description": description
    });
}

/**
 * Hook de création de dossier
 */
export function useCreerDossier() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({nom, description}: CreerDossierParams) => creerDossier({nom, description}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: queryKey});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}

type SupprimerDossierParams = {
    id: number;
    raison: string;
    cache: boolean;
}

/**
 * Méthode de suppression d'un dossier
 * @param id ID du dossier à supprimer
 * @param raison Raison de la suppression
 * @param cache True s'il doit être caché, false sinon
 */
async function supprimerDossier({id, raison, cache = false}: SupprimerDossierParams): Promise<void> {
    await apiPost('dossier/supprimer', {
        "id_dossier": id,
        "raison": raison,
        "cache": cache
    });
}

/**
 * Hook de suppression de dossier
 */
export function useSupprimerDossier() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({id, raison, cache = false}: SupprimerDossierParams) => supprimerDossier({id, raison, cache}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: queryKey});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}
