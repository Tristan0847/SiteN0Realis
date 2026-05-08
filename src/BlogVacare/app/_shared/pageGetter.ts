import { SiteVariant } from "@BlogsFront/model/Variant";
import {Dossier} from "@BlogsFront/model/Blog";
import {index} from "@BlogsFront/hooks/getters";

/**
 * Méthode de récupération des dossiers préchargés
 * @param variante Variante du site
 * @returns Dossiers préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getDossiersPrecharges(variante : SiteVariant) : Promise<Dossier[]> {

    let dossiersPrecharges : Dossier[] = [];
    const mode = process.env.NEXT_BUILD_MODE;
    if (mode == 'export') {
        dossiersPrecharges = await index(variante);
    }

    return dossiersPrecharges;

}