import { getRouteMessages } from "@BlogsFront/lib/routes-config";
import { SiteVariant } from "@BlogsFront/model/Variant";
import {Message} from "@BlogsFront/model/Blog";

/**
 * Méthode de récupération des messages préchargés
 * @param slugDossier Slug du dossier contenant le blog recherché
 * @param slugBlog Slug du blog concené
 * @param variante Variante du site
 * @returns Messages préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getMessagesPrecharges(slugDossier : string, slugBlog : string, variante : SiteVariant) : Promise<Message[]> {

    let messagesSerialises : Message[] = [];
    const mode = process.env.NEXT_BUILD_MODE;
    if (mode == 'export') {
        messagesSerialises = await getRouteMessages(slugDossier, slugBlog, variante);
    }
  
    return messagesSerialises;

}