import { CHEMIN_FICHIER_ACCES, IndexRecherche } from "@Wiki/model/Recherche";
import { CHEMIN_FICHIER_INDEX } from "@Wiki/model/Recherche";
import Fuse, { IFuseOptions } from "fuse.js";

/**
 * Interface définissant les options de recherche (actuellement, la limite de résultats affichés, le seuil de similarité, et le chargement automatique)
 */
interface RechercheOptions {
    limit?: number;
    threshold?: number;
    autoLoad?: boolean;
}

/**
 * Props du composant de recherche (requête et options éventuelles)
 */
interface RechercheProps {
    requete : string;
    options? : RechercheOptions;
}

/**
 * Interface des résultats de la recherche, type de retour de la fonction utilitaire
 */
interface ResultatsRecherche {
    resultats: IndexRecherche[];
    enChargement: boolean;
    erreur: string | null;
}

/**
 * Méthode de recherche d'articles dans l'index de recherche
 * @param requete Requête de recherche
 * @param options Options éventuelles de recherche
 * @returns Résultats de la recherche, état de la recherche (chargement, erreur)
 */
export async function rechercher({requete, options = {}} : RechercheProps) : Promise<ResultatsRecherche> { 
    try {
        // Définition des options de recherche à intégrer à Fusejs
        const { limit, threshold = 0.4, autoLoad = true } = options;

        // Chargement de l'index de recherche, définition du chemin vers le fichier JSON de l'index de recherche
        let index = await fetch(CHEMIN_FICHIER_ACCES);

        // Si l'index est invalide, on lance une erreur
        if (!index.ok) {
            throw new Error("Erreur lors du chargement de l'index de recherche");
        }

        const indexJson : IndexRecherche[] = await index.json();
        
        // Tableau des articles de l'index
        let articles : IndexRecherche[] = [];

        // On ne lance la recherche que si l'index est chargé et qu'il y a des articles dedans
        if (indexJson.length > 0) {
            const parametres : IFuseOptions<IndexRecherche> = {
                keys: [
                    { name: 'titre', weight: 2 },
                    { name: 'categorie', weight: 1 },
                    { name: 'sousCategorie', weight: 0.8 },
                    { name: "auteur", weight: 1.5 },
                    { name: 'extrait', weight: 0.5 },
                    { name: 'tags', weight: 1 },
                ],
                threshold: threshold,
                includeScore: true,
                minMatchCharLength: 2,
                ignoreLocation: true,
            };

            const fuse : Fuse<IndexRecherche> = new Fuse(indexJson, parametres);

            if (fuse && requete.trim().length !== 0) {
                const resultats = fuse.search(requete.trim(), limit ? { limit } : undefined);

                // Extraction des articles des résultats
                articles = resultats.map(resultat => resultat.item);
            }
        }
        
        return { resultats: articles , enChargement: false,  erreur: null };
    }
    catch (error) {
        return {
            resultats: [],
            enChargement: false,
            erreur: (error as Error).message,
        };
    }
    
}