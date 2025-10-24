import { getRouteMessages } from "@BlogsFront/lib/routes-config";
import { MessageJSON } from "@BlogsShared/model/Message";

/**
 * Méhode de récupération des messages préchargés
 * @param slugDossier Slug du dossier contenant le blog recherché
 * @param slugBlog Slug du blog concené
 * @returns Messages préchargés ou tableau vide si on n'est pas en mode export
 */
export async function getMessagesPrecharges(slugDossier : string, slugBlog : string) : Promise<MessageJSON[]> {

    let messagesSerialises : MessageJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
        const messagesPrecharges = await getRouteMessages(slugDossier, slugBlog);
        messagesSerialises = messagesPrecharges.map(message => message.toJSON());
    }
  
    return messagesSerialises;

}