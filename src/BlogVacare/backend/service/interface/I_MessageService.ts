import { Message } from "@BlogsShared/model/Message";

/**
 * Interface de service de gestion de messages
 */
export interface I_MessageService {

    /**
     * Méthode de création d'un message
     * @param contenu Contenu du message 
     * @param nomUtilisateur Nom de l'utilisateur créant le message
     * @param idBlog Identifiant du blog contenant le message
     */
    creerMessage(contenu : string, nomUtilisateur : string, idBlog : string) : Promise<void>;

    /**
     * Méthode de récupération des messages d'un blog
     * @param slugBlog Slug du blog
     * @param slugDossier Slug du dossier contenant le blog
     * @return Liste des messages du blog
     */
    recupererMessages(slugBlog : string, slugDossier : string) : Promise<Message[]>;

    /**
     * Méthode de suppression d'un message
     * @param messageId Identifiant du message à supprimer
     * @param blogId Identifiant du blog contenant le message à supprimer 
     * @param nomUtilisateur Nom de l'utilisateur supprimant le blog
     * @param raisonSuppression Raison de la suppression
     * @param cache Si l'élément supprimé doit être caché ou non sur le site
     */
    supprimerMessage(messageId : number, idBlog : string, nomUtilisateur : string, raisonSuppression : string, cache : boolean) : Promise<void>;
}