import { getRouteBlogsForDossier } from "@BlogsFront/lib/routes-config";
import { BlogJSON } from "@BlogsShared/model/Blog";
import { SiteVariant } from "@BlogsShared/model/Variant";

/**
 * Méhode de récupération des blogs préchargés
 * @param slugDossier Slug du dossier contenant les blogs recherchés
 * @param variante Variante du site
 * @returns Blogs préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getBlogsPrecharges(slugDossier : string, variante : SiteVariant) : Promise<BlogJSON[]> {
    
    let blogsSerialises : BlogJSON[] = [];
    const mode = process.env.NEXT_BUILD_MODE;
    if (mode == 'export') {
      const blogsPrecharges = await getRouteBlogsForDossier(slugDossier, variante);
      blogsSerialises = blogsPrecharges.map(blog => blog.toJSON());
    }
    
    return blogsSerialises;

}