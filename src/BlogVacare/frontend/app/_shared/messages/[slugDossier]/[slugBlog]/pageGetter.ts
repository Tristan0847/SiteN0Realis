import { SiteVariant } from "@BlogsShared/model/Variant";
import { getRouteMessages } from "@BlogsFront/lib/routes-config";
import { MessageJSON } from "@BlogsShared/model/Message";

/**
 * Méhode de récupération des messages préchargés
 * @param slugDossier Slug du dossier contenant le blog recherché
 * @param slugBlog Slug du blog concené
 * @param variant Variante du site (old ou moderne)
 * @returns Messages préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getMessagesPrecharges(slugDossier : string, slugBlog : string, variant : SiteVariant) : Promise<MessageJSON[]> {

    let messagesSerialises : MessageJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
        const messagesPrecharges = await getRouteMessages(slugDossier, slugBlog, variant);
        messagesSerialises = messagesPrecharges.map(message => message.toJSON());
    }
  
    return messagesSerialises;

}