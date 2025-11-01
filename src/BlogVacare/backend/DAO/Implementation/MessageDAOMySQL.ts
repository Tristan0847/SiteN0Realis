import mysql, { RowDataPacket } from 'mysql2/promise';
import { getDbPool } from "@BlogsBack/config/dbPoolMySql";
import { I_MessageDAO } from "@BlogsBack/DAO/Interface/I_MessageDAO";
import { Message } from '@BlogsShared/model/Message';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';
import { ElementSupprime } from '@BlogsShared/model/ElementSupprime';
import { dateFormatUtil } from '@BlogsShared/utils/dateFormatUtil';

/**
 * Lignes attendues à la demande d'un message
 */
interface MessageRow extends RowDataPacket {
    id: number;
    contenu: string;
    datePublication: Date;
    description: string;
    nomUtilisateur: string;
    idSuppression: number|null;
    utilisateurSuppression: string|null;
    raisonSuppression: string|null;
    datesuppression: string|null;
    cache: boolean|null;
}

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
            const requete = "SELECT m.id, m.contenu, m.nomUtilisateur, m.datePublication, idSuppression, es.nomUtilisateur AS utilisateurSuppression, es.raisonSuppression, es.datesuppression, es.cache FROM Message m LEFT JOIN elementsupprime es ON m.idSuppression = es.id WHERE idBlog = ? ORDER BY datePublication ASC";
            const params = [idBlog];

            const [rows] = await this.pool.execute<MessageRow[]>(requete, params);

            const messages : Message[] = [];

            for (const row of rows) {
                const message = this.transformerRowEnMessage(row);

                messages.push(message);
            }

            return messages;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des messages : " + error);
            throw new Error("Impossible de récupérer les messages" + error);
        }
    }

    async recupererPremierMessage(idBlog : string) : Promise<Message> {
        try {
            const requete = "SELECT m.id, m.contenu, m.nomUtilisateur, m.datePublication, idSuppression FROM Message m WHERE idBlog = ? AND idSuppression IS NULL ORDER BY datePublication ASC LIMIT 1";
            const params = [idBlog];

            const [rows] = await this.pool.execute<MessageRow[]>(requete, params);
            if (rows.length === 0) {
                throw new Error("Aucun message trouvé pour le blog demandé.");
            }

            const row : MessageRow = rows[0];
            const message = this.transformerRowEnMessage(row);

            return message;
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
    
    private transformerRowEnMessage(row : MessageRow) : Message {
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
        if (row.idSuppression !== null && row.datesuppression != null) {
            const elementSupprime = new ElementSupprime();
            elementSupprime.setId(row.idSuppression);
            elementSupprime.setRaisonSuppression(row.raisonSuppression ?? "");

            // Création de l'utilisateur à partir de son nom
            const utilisateurSuppression = new Utilisateur();
            utilisateurSuppression.setUsername(row.utilisateurSuppression ?? "");
            elementSupprime.setUtilisateur(utilisateurSuppression);

            const dateSuppr = new Date(row.datesuppression)
            elementSupprime.setDateSuppression(dateSuppr);
            elementSupprime.setCache(row.cache ?? false);
            message.setElementSupprime(elementSupprime);
        }
        
        return message;
    }

}