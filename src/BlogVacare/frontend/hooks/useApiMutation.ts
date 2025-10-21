"use client";

import { useState, useCallback } from 'react';

/**
 * Méthode de hook de mutation (ajout, suppression en BDD) générale
 * @param mutationFn Paramètres de la fonction
 * @template TArgs Type d'argument de la fonction
 * @template TResult Type de résultat retourné
 */
export function useApiMutation<TArgs extends any[], TResult = void>(mutationFn : (...args: TArgs) => Promise<TResult>) {
    const [chargement, setChargement] = useState(false);
    const [erreur, setErreur] = useState<Error|null>(null);
    const [data, setData] = useState<TResult|null>(null);

    // Exécution de la mutation
    const mutation = useCallback(
        async (...args : TArgs) : Promise<TResult|null> => {
            setChargement(true);
            setErreur(null);
            setData(null);

            try {
                const resultat = await mutationFn(...args);
                setData(resultat);
                return resultat;
            }
            catch (err) {
                const erreur = err instanceof Error ? err : new Error("Erreur inconnue");
                setErreur(erreur);
                return null;
            }
            finally {
                setChargement(false);
            }
        } , [mutationFn]
    );

    // Réinitialisation de l'état du hook
    const reset = useCallback(() => {
        setChargement(false);
        setErreur(null);
        setData(null);
    }, []);

    return {
        mutation,
        chargement,
        erreur,
        data,
        reset,
        succes: !chargement && !erreur && data != null,
        echec: !chargement && erreur != null        
    };
}