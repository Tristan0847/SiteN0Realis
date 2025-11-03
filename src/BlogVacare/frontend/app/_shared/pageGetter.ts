import { getRouteDossiers } from "@BlogsFront/lib/routes-config";
import { DossierJSON } from "@BlogsShared/model/Dossier";
import { SiteVariant } from "@BlogsShared/model/Variant";

/**
 * Méhode de récupération des dossiers préchargés
 * @param variante Variante du site
 * @returns Dossiers préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getDossiersPrecharges(variante : SiteVariant) : Promise<DossierJSON[]> {

    let dossiersSerialises : DossierJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
      const dossiersPrecharges = await getRouteDossiers(variante);
      dossiersSerialises = dossiersPrecharges.map(dossier => dossier.toJSON());
    }
  
    return dossiersSerialises;

}