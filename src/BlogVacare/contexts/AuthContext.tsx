"use client";

import {
    InscriptionProps,
    useConnexion, useDeconnexion, useInscription,
    useRefresh,
    useUtilisateurConnecte
} from "@BlogsFront/hooks/useAuth";
import { Utilisateur } from "@BlogsFront/model/Auth";
import {createContext, ReactNode, useContext, useMemo} from "react";

/**
 * Interface de contexte d'authentification
 */
interface AuthContexteType {
    estConnecte: boolean;
    utilisateur: Utilisateur|null;
    chargement: boolean;
    erreur: string|null;
    refresh: () => Promise<void>;
    inscription: ({nomUtilisateur, mdp1, mdp2}: InscriptionProps) => Promise<void>;
    connexion: ({nomUtilisateur, mdp}: {nomUtilisateur: string, mdp: string}) => Promise<void>;
    deconnexion: () => Promise<void>;
}

const AuthContexte = createContext<AuthContexteType|undefined>(undefined);

export function AuthProvider({ children } : { children: ReactNode}) {
    // Récupération du rafraichissement de token et de récupération de l'utilisateur
    const { mutateAsync: refresh, error: refreshError } = useRefresh();
    const { mutateAsync: inscription, isPending: inscriptionPending, error: inscriptionError } = useInscription();
    const { data: utilisateur, isLoading: chargement, error: utilisateurError } = useUtilisateurConnecte();
    const { mutateAsync: connexion, isPending: connexionPending, error: connexionError } = useConnexion();
    const { mutateAsync: deconnexion, isPending: deconnexionPending, error: deconnexionError  } = useDeconnexion();

    const error = [refreshError, utilisateurError, connexionError, deconnexionError, inscriptionError].filter(e => e !== null).join(' - ');
    const value = useMemo<AuthContexteType>(
        () => ({
            estConnecte: utilisateur !== null,
            utilisateur: utilisateur ?? null,
            chargement: chargement || connexionPending || deconnexionPending || inscriptionPending,
            erreur: error,
            refresh: refresh,
            inscription: inscription,
            connexion: connexion,
            deconnexion: deconnexion
        }),
        [utilisateur, chargement, connexionPending, deconnexionPending, inscriptionPending, refreshError, utilisateurError, connexionError, deconnexionError, inscriptionError, refresh, inscription, connexion, deconnexion]
    );


    return(
        <AuthContexte.Provider value={value}>
            {children}
        </AuthContexte.Provider>
    );

}

/**
 * Méthode de récupération du contexte
 * @returns Contexte d'authentification
 */
export function useAuthContexte() {
    const context = useContext(AuthContexte);

    if (context === undefined) {
        throw new Error("Hook du contexte inexistant");
    }

    return context;
}