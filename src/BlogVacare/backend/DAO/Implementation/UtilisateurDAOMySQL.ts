import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { I_UtilisateurDAO } from "@BlogsBack/DAO/Interface/I_UtilisateurDAO";
import { getDbPool } from '@BlogsBack/config/MySQL/dbPoolMySql';
import mysql, { RowDataPacket } from 'mysql2/promise';

/**
 * Lignes attendues à la demande du mot de passe d'un utilisateur
 */
interface UtilisateurMdpRow extends RowDataPacket {
    motDePasseHache : string;
}

/**
 * Lignes attendues à la demande du rôle d'un utilisateur
 */
interface UtilisateurRoleRow extends RowDataPacket {
    estAdmin: boolean;
}

/**
 * DAO de la table utilisateur (par MySQL)
 */
export class UtilisateurDAOMySQL implements I_UtilisateurDAO {

    private pool: mysql.Pool;

    constructor() {
        this.pool = getDbPool();
    }

    async creerUtilisateur(utilisateur : Utilisateur) : Promise<void> {
        try {
            await this.pool.query<[]>('INSERT INTO Utilisateur(nomUtilisateur, motDePasseHache, estAdmin) VALUES (?,?,false)',[utilisateur.getUsername(), utilisateur.getMotDePasse()]);            
        }
        catch (error) {
            console.error("Erreur lors de l'ajout d'un utilisateur : " + error);
            throw new Error("Erreur lors de l'ajout d'un utilisateur : " + error);
        }
    }

    async getMotDePasse(username : string) : Promise<Utilisateur> {
        try {
            const [rows] = await this.pool.query<UtilisateurMdpRow[]>('SELECT motDePasseHache FROM Utilisateur WHERE nomUtilisateur = ?', [username]);
            
            if (!rows || rows.length === 0) {
                throw new Error("Utilisateur introuvable");
            }

            const mdp = rows[0].motDePasseHache;

            let utilisateur = new Utilisateur();
            utilisateur.setUsername(username);
            utilisateur.setMotDePasse(mdp);

            return utilisateur;
        }
        catch (error) {
            console.error("Erreur lors de la récupération du mot de passe haché pour " + username + " : " + error);
            throw new Error("Erreur lors de la récupération du mot de passe haché pour " + username);
        }
    }

    async getRole(username : string) : Promise<Utilisateur> {
        try {
            const [rows] = await this.pool.query<UtilisateurRoleRow[]>('SELECT estAdmin FROM Utilisateur WHERE nomUtilisateur = ?', [username]);

            if (!rows || rows.length === 0) {
                throw new Error("Utilisateur introuvable");
            }
            
            const estAdmin = rows[0].estAdmin;

            let utilisateur = new Utilisateur();
            utilisateur.setUsername(username);
            utilisateur.setEstAdmin(estAdmin);

            return utilisateur;
        }
        catch (error) {
            console.error("Erreur lors de la récupération du rôle de " + username + " : " + error);
            throw new Error("Erreur lors de la récupération du rôle de  " + username);
        }
    }
}