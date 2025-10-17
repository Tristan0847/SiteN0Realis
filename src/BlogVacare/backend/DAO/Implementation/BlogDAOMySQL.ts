import mysql, { RowDataPacket } from 'mysql2/promise';
import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';
import { I_BlogDAO } from '@BlogsBack/DAO/Interface/I_BlogDAO';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';
import { getDbPool } from '@BlogsBack/config/MySQL/dbPoolMySql';

//#region Interfaces

/**
 * Lignes attendues à la demande d'un Dossier
 */
interface DossierRow extends RowDataPacket {
    id: string;
    titre: string;
    description: string;
    nomUtilisateur: string;
}

/**
 * Lignes attendues à la demande d'un Blog
 */
interface BlogRow extends RowDataPacket {
    id: string;
    titre: string;
    dateCreation: Date;
    nomUtilisateur: string;
    contenu: string;
}

/**
 * Lignes attendues à la demande d'un Message
 */
interface MessageRow extends RowDataPacket {
    id: string;
    datePublication: Date;
    contenu: string;
    nomUtilisateur: string;
    idBlog: string;
}

//#endregion

/**
 * Classe de DAO de Blogs avec MySQL
 */
export class BlogDAOMySQL implements I_BlogDAO {
    private pool: mysql.Pool;

    constructor() {
        this.pool = getDbPool();
    }

    async getAllDossiers(): Promise<Dossier[]> {
        try {
            const [rows] = await this.pool.query<DossierRow[]>('SELECT id, titre, description, nomUtilisateur FROM Dossier');
            
            const dossiers : Dossier[] = rows.map((row) => {
                const dossier = new Dossier();
                dossier.setId(row.id);
                dossier.setTitre(row.titre);
                dossier.setDescription(row.description);
                
                const utilisateur = this.creerUtilisateur(row.nomUtilisateur);
                dossier.setUtilisateur(utilisateur);
                
                return dossier;
            });

            return dossiers;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des dossiers : " + error);
            throw new Error("Impossible de récupérer les dossiers" + error);
        }
    }

    // Récupère tous les blogs d’un dossier donné
    async getBlogsForDossier(dossierId: string): Promise<Blog[]> {
        try {
                
            const [rows] = await this.pool.query<BlogRow[]>('SELECT b.id, b.titre, b.dateCreation, b.nomUtilisateur, m.contenu FROM Blog b JOIN Message m ON b.id = m.idBlog WHERE idDossier = ? AND m.id = 1', [dossierId]);

            const blogs : Blog[] = rows.map((row) => {
                const blog = new Blog();
                blog.setId(row.id);
                blog.setNom(row.titre);
                blog.setDateCreation(new Date(row.dateCreation));
                
                const utilisateur = this.creerUtilisateur(row.nomUtilisateur);
                blog.setUtilisateur(utilisateur);
                
                // Ajouter le premier message du blog 
                const premierMessage = new Message();
                premierMessage.setContenu(row.contenu);
                premierMessage.setDate(new Date(row.dateCreation));
                premierMessage.setUtilisateur(utilisateur);
                blog.setMessages([premierMessage]);
                
                return blog;
            });

            return blogs;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des blogs pour " + dossierId + " : " + error);
            throw new Error("Impossible de récupérer des blogs pour le dossier " + dossierId);
        }
    }

    // Récupère les messages d’un blog donné
    async getMessagesForBlog(blogId: string, dossierId: string): Promise<Message[]> {
        try {
        
            const [rows] = await this.pool.query<MessageRow[]>('SELECT id, datePublication, contenu, nomUtilisateur, idBlog FROM Message WHERE idBlog = ? ORDER BY datePublication ASC',[blogId]);

            const messages : Message[] = rows.map((row) => {
                const message = new Message();
                message.setContenu(row.contenu);
                message.setDate(new Date(row.datePublication));
                
                const utilisateur = this.creerUtilisateur(row.nomUtilisateur);
                message.setUtilisateur(utilisateur);
                
                return message;
            });

            return messages;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des messages pour " + dossierId + "/" + blogId + " : " + error);
            throw new Error("Impossible de récupérer des messages pour " + dossierId + "/" + blogId);
        }
    }

    // Méthode de création d'un utilisateur à partir d'un simple nom d'utilisateur
    private creerUtilisateur(nomUtilisateur: string): Utilisateur {
        const utilisateur = new Utilisateur();
        utilisateur.setUsername(nomUtilisateur);
        return utilisateur;
    }
}
