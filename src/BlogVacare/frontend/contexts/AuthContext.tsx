"use client";

import { useRafraichirToken, useRecupererUtilisateurConnecte } from "@BlogsFront/hooks/useAuth";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

/**
 * Interface de contexte d'authentification
 */
interface AuthContexteType {
    estConnecte: boolean;
    utilisateur: Utilisateur|null;
    chargement: boolean;
    verifierAuth: () => Promise<{ succes: boolean, erreur? : string }>;
    connexion: (utilisateur : Utilisateur) => void;
    deconnexion: () => void;
}

const AuthContexte = createContext<AuthContexteType|undefined>(undefined);

export function AuthProvider({ children } : { children: ReactNode}) {
    const [estConnecte, setEstConnecte] = useState(false);
    const [utilisateur, setUtilisateur] = useState<Utilisateur|null>(null);
    const [chargement, setChargement] = useState(true);

    // Récupération du rafraichissement de token et de récupération de l'utilisateur
    const { mutation: mutationRafraichir } = useRafraichirToken();
    const { refetch: fetchUtilisateur } = useRecupererUtilisateurConnecte();

    const verifierAuth = async () => {
        try {
            setChargement(true);

            await mutationRafraichir();
            
            const utilisateur = await fetchUtilisateur();

            if (!utilisateur) {
                throw new Error("Vous n'êtes pas connecté");
            }

            setUtilisateur(utilisateur);
            setEstConnecte(true);

            return { succes: true }
        }
        catch (error) {
            setEstConnecte(false);
            setUtilisateur(null);

            return {
                succes: false,
                erreur: error instanceof Error ? error.message : "Erreur inconnue lors de l'authentification"
            };
        }
        finally {
            setChargement(false);
        }
    }

    // Exécution de la vérification à la création du provider
    useEffect(() => {
        verifierAuth();
    }, []);


    // Connexion et déconnexion gérées par le contexte (mise à jour de l'état de connexion et de l'utilisateur associé)
    const connexion = (utilisateur: Utilisateur) => {
        setUtilisateur(utilisateur);
        setEstConnecte(true);
    };
    
    const deconnexion = () => {
        setUtilisateur(null);
        setEstConnecte(false);
    };

    return(
        <AuthContexte.Provider value={{ estConnecte, utilisateur, chargement, verifierAuth, connexion, deconnexion }}>
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