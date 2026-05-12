import {SiteVariant} from "@BlogsFront/model/Variant";
import {BASE_DATA_PATH_FETCH} from "@BlogsFront/lib/constants";

/**
 * Classe abstraite contenant les helpers nécessaires à la récupération de données sous JSON
 */
export abstract class AbstractLocalGetters {

    private readonly cheminBase : string;

    /**
     * Constructeur de la classe
     * @param cheminBase Chemin de base
     */
    protected constructor(cheminBase : string = BASE_DATA_PATH_FETCH) {
        this.cheminBase = cheminBase;
    }

    /**
     * Méthode privée construisant l'URL du fichier
     * @param variant Variant du site
     * @param url URL du fichier (après le variant)
     * @private
     */
    protected buildCheminBase(variant: SiteVariant, url: string): string {
        let retour = this.cheminBase;
        if (variant === "old") {
            retour = retour + "/old"
        }

        return retour + "/" + url;
    }

    /**
     * Méthode privée de lecture de fichier JSON
     * @param variant Variant du site
     * @param url URL du fichier (après le variant)
     * @private
     */
    protected async lireJson<T>(variant: SiteVariant, url: string): Promise<T> {
        const lien : string = this.buildCheminBase(variant, url);

        const reponse = await fetch(lien);
        if (!reponse.ok) {
            throw new Error(`Impossible de lire le fichier ${lien}`);
        }

        return await reponse.json() as T;
    }
}