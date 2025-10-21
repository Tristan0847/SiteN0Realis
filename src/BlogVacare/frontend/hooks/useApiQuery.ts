"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Hook de requête sélectionnant des données de l'API
 * @param queryFn Fonction effectuant l'appel
 * @param params Paramètres de la méthode
 * @param options Options éventuelles : si la requête doit être effectuée automatiquement ou non, méthode callback au succès et à l'erreur
 */
export function useApiQuery<TData, TParams extends any[] = []>(
    queryFn: (...params: TParams) => Promise<TData>,
    params: TParams,
    options?: {
        actif?: boolean;
        retourSucces?: (donnees : TData) => void;
        retourErreur?: (erreur: Error) => void;
    }
) {
    // Récupération des options de la méthode
    const { actif = true, retourSucces, retourErreur} = options || {};
    
    // Initialisation des données
    const [donnees, setDonnees] = useState<TData|null>(null);
    const [chargement, setChargement] = useState(actif);
    const [erreur, setErreur] = useState<Error|null>(null);

    // Sérialisation des paramètres pour une meilleure comparaison
    const paramsKey = JSON.stringify(params);

    // Récupération des données manuellement
    const refetch = useCallback(async () => {
        setChargement(true);
        setErreur(null);

        try {
            const resultat = await queryFn(...params);
            setDonnees(resultat);
            retourSucces?.(resultat);
        }
        catch (err) {
            const erreur = err instanceof Error ? err : new Error("Erreur inconnue");
            setErreur(erreur);
            retourErreur?.(erreur);
        }
        finally {
            setChargement(false);
        }
    }, [paramsKey]);

    // Exécution de la requête et au changement des paramètres
    useEffect(() => {
        if (actif) {
            refetch();
        }
        else {
            setChargement(false);
        }
    }, [actif, refetch]);

    return {
        donnees, chargement, erreur, refetch, 
        succes: !chargement && !erreur && donnees !== null,
        echec: !chargement && erreur !== null
    };
}