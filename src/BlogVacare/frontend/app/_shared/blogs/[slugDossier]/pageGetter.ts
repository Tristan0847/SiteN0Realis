import { getRouteBlogsForDossier } from "@BlogsFront/lib/routes-config";
import { BlogJSON } from "@BlogsShared/model/Blog";

/**
 * Méhode de récupération des blogs préchargés
 * @param slugDossier Slug du dossier contenant les blogs recherchés
 * @returns Blogs préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getBlogsPrecharges(slugDossier : string) : Promise<BlogJSON[]> {
    
    let blogsSerialises : BlogJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
      const blogsPrecharges = await getRouteBlogsForDossier(slugDossier);
      blogsSerialises = blogsPrecharges.map(blog => blog.toJSON());
    }
    
    return blogsSerialises;

}