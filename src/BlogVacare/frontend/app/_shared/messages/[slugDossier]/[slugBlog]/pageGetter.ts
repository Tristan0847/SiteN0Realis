import { getRouteMessages } from "@BlogsFront/lib/routes-config";
import { MessageJSON } from "@BlogsShared/model/Message";
import { SiteVariant } from "@BlogsShared/model/Variant";

/**
 * Méhode de récupération des messages préchargés
 * @param slugDossier Slug du dossier contenant le blog recherché
 * @param slugBlog Slug du blog concené
 * @param variante Variante du site
 * @returns Messages préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getMessagesPrecharges(slugDossier : string, slugBlog : string, variante : SiteVariant) : Promise<MessageJSON[]> {

    let messagesSerialises : MessageJSON[] = [];
    const mode = process.env.NEXT_BUILD_MODE;
    if (mode == 'export') {
        const messagesPrecharges = await getRouteMessages(slugDossier, slugBlog, variante);
        messagesSerialises = messagesPrecharges.map(message => message.toJSON());
    }
  
    return messagesSerialises;

}