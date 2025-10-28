import { Message } from '@BlogsShared/model/Message';

/**
 * Interface de gestion de DAO de Messages
 */
export interface I_MessageDAO {

    /**
     * Méthode de création d'un message
     * @param message Message à créer
     * @param idBlog Identifiant du blog contenant le message
     * @returns Message créé avec son identifiant unique
     */
    creerMessage(message : Message, idBlog : string) : Promise<void>;

    /**
     * Méthode permettant de récupérer tous les messages du blog demandé
     * @param idBlog Identifiant du blog demandé
     * @return Liste des messages
     */
    recupererMessages(idBlog : string): Promise<Message[]>;

    /**
     * Méthode de récupération du premier message d'un blog
     * @param idBlog Identifiant du blog dont on veut récupérer le premier message
     * @returns Premier message du blog
     */
    recupererPremierMessage(idBlog : string) : Promise<Message>;

    /**
     * Méthode de suppression d'un dossier
     * @param message Message à supprimer avec l'objet ElementSupprime ajusté en conséquence
     * @param idBlog Identifiant du blog contenant le message
     */
    supprimerMessage(message : Message, idBlog : string) : Promise<void>;
    
}
