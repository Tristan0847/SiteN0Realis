'use client';

import {Utilisateur} from '@BlogsFront/model/Auth';
import {apiFetch, apiPost} from "@BlogsFront/lib/apiFetch";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {ApiError} from "../model/ApiError";

const queryKey = ["utilisateur_actuel"];


/**
 * Méthode de récupération de l'utilisateur actuellement connecté
 * @returns Utilisateur Utilisateur récupéré
 */
export async function getUtilisateurConnecte(): Promise<Utilisateur|null> {
    try {
        return await apiFetch<Utilisateur>('me');
    } catch (error: any) {
        // Si l'utilisateur n'est pas connecté, on retourne null pour éviter des refetch inutiles
        if (error instanceof ApiError && error?.status && error.status === 401) {
            return null;
        }

        throw error;
    }
}

/**
 * Hook de récupération de l'utilisateur couramment connecté
 * @returns Utilisateur connecté s'il y en a un, l'état de chargement et une éventuelle erreur
 */
export function useUtilisateurConnecte() {
    const {data, isLoading, error} = useQuery({
        queryKey: queryKey,
        queryFn: () => getUtilisateurConnecte(),
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
    });

    return {data, isLoading, error};
}


type ConnexionProps = {
    nomUtilisateur: string;
    mdp: string;
}

/**
 * Méthode de connexion au site
 * @param nomUtilisateur Nom de l'utilisateur souhaitant se connecter
 * @param mdp Mot de passe de l'utilisateur souhaitant se connecter
 */
async function connexion({nomUtilisateur, mdp}: ConnexionProps): Promise<void> {
    await apiPost('login', {
        "username": nomUtilisateur,
        "password": mdp
    });
}

/**
 * Hook de création de blog
 */
export function useConnexion() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({nomUtilisateur, mdp}: ConnexionProps) => connexion({nomUtilisateur, mdp}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}


export type InscriptionProps = {
    nomUtilisateur: string;
    mdp1: string;
    mdp2: string;
}

/**
 * Méthode d'inscription au site
 * @param nomUtilisateur Nom de l'utilisateur souhaitant s'inscrire
 * @param mdp1 Mot de passe de l'utilisateur souhaitant s'inscrire
 * @param mdp2 Mot de passe de confirmation de l'utilisateur souhaitant s'inscrire
 */
async function inscription({nomUtilisateur, mdp1, mdp2}: InscriptionProps): Promise<void> {
    await apiPost('inscription', {
        "login": nomUtilisateur,
        "mdp1": mdp1,
        "mdp2": mdp2
    });
}

/**
 * Hook d'inscription au site
 */
export function useInscription() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: ({nomUtilisateur, mdp1, mdp2}: InscriptionProps) => inscription({nomUtilisateur, mdp1, mdp2}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}


/**
 * Méthode de déconnexion au site
 */
async function deconnexion(): Promise<void> {
    await apiPost('logout', {});
}

/**
 * Hook de déconnexion d'un utilisateur
 */
export function useDeconnexion() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: () => deconnexion(),
        onSuccess: async () => {
            queryClient.setQueryData(queryKey, null);
            await queryClient.invalidateQueries({queryKey});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}

/**
 * Méthode de refresh du token de l'utilisateur actuel
 */
async function refresh(): Promise<void> {
    await apiPost('refresh', {});
}

/**
 * Hook de refresh du token d'un utilisateur
 */
export function useRefresh() {
    const queryClient = useQueryClient();

    const {isPending, error, mutate, mutateAsync} = useMutation({
        mutationFn: () => refresh(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey});
        }
    });

    return {isPending, error, mutate, mutateAsync};
}