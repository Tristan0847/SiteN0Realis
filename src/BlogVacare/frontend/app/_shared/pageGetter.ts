import { getRouteDossiers } from "@BlogsFront/lib/routes-config";
import { DossierJSON } from "@BlogsShared/model/Dossier";

/**
 * Méhode de récupération des dossiers préchargés
 * @returns Dossiers préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getDossiersPrecharges() : Promise<DossierJSON[]> {

    let dossiersSerialises : DossierJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
      const dossiersPrecharges = await getRouteDossiers();
      dossiersSerialises = dossiersPrecharges.map(dossier => dossier.toJSON());
    }
  
    return dossiersSerialises;

}