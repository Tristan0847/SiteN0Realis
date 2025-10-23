import mysql, { RowDataPacket } from 'mysql2/promise';
import { getDbPool } from "@BlogsBack/config/MySQL/dbPoolMySql";
import { I_MessageDAO } from "@BlogsBack/DAO/Interface/I_MessageDAO";
import { Message } from '@BlogsShared/model/Message';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';
import { ElementSupprime } from '@BlogsShared/model/ElementSupprime';
import { dateFormatUtil } from '@BlogsShared/utils/dateFormatUtil';


/**
 * DAO de la table Message sous MySQL
 */
export class MessageDAOMySQL implements I_MessageDAO {

    private pool : mysql.Pool;

    constructor() {
        this.pool = getDbPool();
    }

    async creerMessage(message : Message, idBlog : string) : Promise<void> {
        try {
            const date = dateFormatUtil.dateToMySQLFormat(message.getDate());

            // Mise en place de la requête
            const requete = "INSERT INTO Message(contenu, datePublication, nomUtilisateur, idBlog, idSuppression) VALUES (?, ?, ?, ?, NULL)";
            const params = [
                message.getContenu(),
                date,
                message.getUtilisateur().getUsername(),
                idBlog
            ]

            await this.pool.execute(requete, params);
        }
        catch (error) {
            console.error("Erreur lors de la création du message : " + error);
            throw new Error("Impossible de créer le message" + error);
        }
    }

    async recupererMessages(idBlog : string): Promise<Message[]> {
        try {
            const requete = "SELECT id, contenu, nomUtilisateur, datePublication, idSuppression FROM Message WHERE idBlog = ? ORDER BY id ASC";
            const params = [idBlog];

            const [rows] = await this.pool.execute<RowDataPacket[]>(requete, params);

            const messages : Message[] = [];

            for (const row of rows) {
                const message = new Message();
                message.setId(row.id);
                message.setContenu(row.contenu);
                const date = new Date(row.datePublication);
                message.setDate(date);

                // Création de l'utilisateur associé
                const utilisateur = new Utilisateur();
                utilisateur.setUsername(row.nomUtilisateur);
                message.setUtilisateur(utilisateur);

                // Création de l'état de suppression de l'objet
                if (row.idSuppression !== null) {
                    const elementSupprime = new ElementSupprime();
                    elementSupprime.setId(row.idSuppression);
                    message.setElementSupprime(elementSupprime);
                }

                messages.push(message);
            }

            return messages;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des messages : " + error);
            throw new Error("Impossible de récupérer les messages" + error);
        }
    }

    async supprimerMessage(message : Message, idBlog : string) : Promise<void> {
        try {
            if (!message.getElementSupprime()) {
                throw new Error("L'élément supprimé doit être renseigné dans le message à supprimer.");
            }

            const requete = "UPDATE Message SET idSuppression = ? WHERE id = ? AND idBlog = ?";
            const params = [
                message.getElementSupprime()?.getId(),
                message.getId(),
                idBlog
            ];

            await this.pool.execute(requete, params);
        }
        catch (error) {
            console.error("Erreur lors de la suppression du message : " + error);
            throw new Error("Impossible de supprimer le message" + error);
        }
    }
    
}