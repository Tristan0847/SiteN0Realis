'use client';

import { ServiceFactory, INTERFACESSERVICE } from '@BlogsFront/services/ServiceFactory';
import { I_AuthService, AuthReponse } from '@BlogsFront/services/Interface/I_AuthService';
import { useApiMutation } from '@BlogsFront/hooks/useApiMutation';
import { useApiQuery } from '@BlogsFront/hooks/useApiQuery';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';

const authService = ServiceFactory.get<I_AuthService>(INTERFACESSERVICE.I_AuthService);

/**
 * Hook de connexion
 * @returns Méthode hook de connexion
 */
export function useConnexion() {
    return useApiMutation<[string, string], AuthReponse>(
        async (nomUtilisateur: string, mdp: string) => {
            return await authService.connexion(nomUtilisateur, mdp);
        }
    );
}

/**
 * Hook d'inscription d'un utilisateur
 * @returns Méthode hook d'inscription
 */
export function useInscription() {
    return useApiMutation<[string, string, string], AuthReponse>(
        async (nomUtilisateur: string, mdp1: string, mdp2: string) => {
            return await authService.inscription(nomUtilisateur, mdp1, mdp2);
        }
    );
}

/**
 * Hook de déconnexion d'un utilisateur
 * @returns Méthode hook de déconnexion
 */
export function useDeconnexion() {
    return useApiMutation<[], void>(
        async () => {
            await authService.deconnexion();
        }
    );
}

/**
 * Hook de rafraîchissement du token
 * @returns Méthode hook de rafraîchissement
 */
export function useRafraichirToken() {
    return useApiMutation<[], void>(
        async () => {
            await authService.rafraichirToken();
        }
    );
}

/**
 * Hook de récupération de l'utilisateur actuellement connecté
 * @returns Méthode hook de récupération de l'utilisateur connecté
 */
export function useRecupererUtilisateurConnecte() {
    return useApiQuery<Utilisateur, []>(
        () => authService.recupererUtilisateurConnecte(),
        []
    );
}
