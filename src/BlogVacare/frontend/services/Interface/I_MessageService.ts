import { Message } from "@BlogsShared/model/Message";

/**
 * Interface de service de messages
 */
export interface I_MessageService {

    /**
     * Méthode de récupération des messages d'un blog
     * @param slugDossier Slug du dossier contenant le blog
     * @param slugBlog Slug du blog contenant les messages
     * @returns Liste de messages du projet
     */
    recupererMessagesDuBlog(slugDossier : string, slugBlog : string) : Promise<Message[]>;

    /**
     * Méthode de création d'un message
     * @param contenu Contenu du message
     * @param idBlog Identifiant du blog
     */
    creerMessage(contenu : string, idBlog : string) : Promise<void>;

    /**
     * Méthode de suppression d'un message
     * @param messageId Identifiant du message
     * @param idBlog Identifiant du blog contenant le message
     * @param raisonSuppression Raison de la suppression du message 
     * @param cache Si le message doit être caché ou non 
     */
    supprimerMessage(messageId : number, idBlog : string, raisonSuppression : string, cache : boolean) : Promise<void>;
}