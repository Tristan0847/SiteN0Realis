"use client"

/**
 * Hook de chargement de données avec préchargement optionnel, utilisé par les routes
 * @param hookDonnees Hook de données
 * @param hookChargement Hook de chargement (état true/false)
 * @param hookErreur Hook d'erreur (null si aucune erreur retournée)
 * @param donneesPrechargees Données préchargées éventuelles
 * @param fromJSON Méthode de création de données à partir de JSON
 * @return Données chargées, état de chargement, erreur éventuelle et si oui ou non l'élément est vide
 */
export function useDonneesPage<T, TJson>(hookDonnees: T[]|null, hookChargement: boolean, hookErreur: Error|null, donneesPrechargees : TJson[]|undefined, fromJSON: (json: TJson) => T) : {donnees : T[]; chargement: boolean; erreur: Error|null; estVide: boolean} {
    // Si données préchargées, pas de chargement
    const chargement = donneesPrechargees ? false : hookChargement;
    const erreur = donneesPrechargees ? null : hookErreur;

    // Chargement des données
    let donnees: T[];
    if (donneesPrechargees) {
        donnees = donneesPrechargees.map(fromJSON);
    } else if (hookDonnees) {
        donnees = Array.isArray(hookDonnees) ? hookDonnees : [hookDonnees];
    } else {
        donnees = [];
    }

    return {
        donnees,
        chargement,
        erreur,
        estVide: donnees.length === 0
    };
}