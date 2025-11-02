import { SiteVariant } from "@BlogsFront/contexts/VariantContext";
import { getRouteBlogsForDossier } from "@BlogsFront/lib/routes-config";
import { BlogJSON } from "@BlogsShared/model/Blog";

/**
 * Méhode de récupération des blogs préchargés
 * @param slugDossier Slug du dossier contenant les blogs recherchés
 * @param variant Variante du site (old ou moderne)
 * @returns Blogs préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getBlogsPrecharges(slugDossier : string, variant : SiteVariant) : Promise<BlogJSON[]> {
    
    let blogsSerialises : BlogJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
      const blogsPrecharges = await getRouteBlogsForDossier(slugDossier, variant);
      blogsSerialises = blogsPrecharges.map(blog => blog.toJSON());
    }
    
    return blogsSerialises;

}