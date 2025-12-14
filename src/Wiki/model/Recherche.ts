import path from "path";
import { cwd } from "process";

// Chemin vers le dossier où sera stocké l'index de recherche (export pour utilisation en dehors du script)
export const CHEMIN_DOSSIER_INDEX : string = path.join(cwd(), "public", "data");
export const CHEMIN_FICHIER_INDEX : string = path.join(CHEMIN_DOSSIER_INDEX, "index-recherche.json");
export const CHEMIN_FICHIER_ACCES : string = process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + "/data/index-recherche.json" : "/data/index-recherche.json";

/**
 * Interface d'index de recherche pour un article
 */
export interface IndexRecherche {
    slug: string;
    titre: string;
    categorie: string;
    sousCategorie?: string;
    tags: string[];
    auteur: string;
    extrait: string;
    dateCreation: string;
}
