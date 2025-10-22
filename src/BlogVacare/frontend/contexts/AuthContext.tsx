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
    verifierAuth: () => Promise<void>;
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
            const resultat = await mutationRafraichir();

            if (resultat == null) {
                throw new Error("Erreur lors du rafraichissement de votre jeton d'accès.");
            }
            
            const utilisateur = await fetchUtilisateur();

            if (!utilisateur) {
                throw new Error("Vous n'êtes pas connecté");
            }

            setUtilisateur(utilisateur);
            setEstConnecte(true);
        }
        catch (error) {
            setEstConnecte(false);
            setUtilisateur(null);
        }
        finally {
            setChargement(false);
        }
    }

    // Exécution de la vérification à la création du provider
    useEffect(() => {
        verifierAuth();
    }, []);

    return(
        <AuthContexte.Provider value={{ estConnecte, utilisateur, chargement, verifierAuth}}>
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