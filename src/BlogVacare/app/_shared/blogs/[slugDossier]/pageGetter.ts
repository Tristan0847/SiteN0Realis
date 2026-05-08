import {getRouteBlogsForDossier} from "@BlogsFront/lib/routes-config";
import {SiteVariant} from "@BlogsFront/model/Variant";
import {Blog} from "@BlogsFront/model/Blog";

/**
 * Méthode de récupération des blogs préchargés
 * @param slugDossier Slug du dossier contenant les blogs recherchés
 * @param variante Variante du site
 * @returns Blogs préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getBlogsPrecharges(slugDossier: string, variante: SiteVariant): Promise<Blog[]> {

    let blogsSerialises: Blog[] = [];
    const mode = process.env.NEXT_BUILD_MODE;
    if (mode == 'export') {
        blogsSerialises = await getRouteBlogsForDossier(slugDossier, variante);
    }

    return blogsSerialises;

}