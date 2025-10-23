import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { getDbPool } from "@BlogsBack/config/MySQL/dbPoolMySql";
import { I_ElementSupprimeDAO } from "@BlogsBack/DAO/Interface/I_ElementSupprimeDAO";
import { ElementSupprime } from '@BlogsShared/model/ElementSupprime';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';
import { dateFormatUtil } from '@BlogsShared/utils/dateFormatUtil';

/**
 * Lignes attendues à la demande d'un ElementSupprime
 */
interface ElementSupprimeRow extends RowDataPacket {
    nomUtilisateur: string;
    raisonSuppression: string;
    dateSuppression: Date;
    cache: number;
}

/**
 * DAO de la table ElementSupprime sous MySQL
 */
export class ElementSupprimeDAOMySQL implements I_ElementSupprimeDAO {

    private pool: mysql.Pool;

    constructor() {
        this.pool = getDbPool();
    }

    async creerElementSupprime(element : ElementSupprime) : Promise<ElementSupprime> {
        try {
            
            const date = dateFormatUtil.dateToMySQLFormat(element.getDateSuppression());

            // Mise en place de la requête
            const requete = "INSERT INTO ElementSupprime(nomUtilisateur, raisonSuppression, dateSuppression, cache) VALUES (?, ?, ?, ?)";
            const params = [
                element.getUtilisateur().getUsername(),
                element.getRaisonSuppression(),
                date,
                element.getCache()
            ];

            const [result] = await this.pool.execute<ResultSetHeader>(requete, params);
            const insertId = result.insertId;
            element.setId(insertId);

            return element;
        }
        catch (error) {
            console.error("Erreur lors de la création de l'élément supprimé : " + error);
            throw new Error("Impossible de créer l'élément supprimé" + error);
        }
    }
    
    async recupererElementSupprime(id : number): Promise<ElementSupprime> {
        try {
            const requete = "SELECT nomUtilisateur, raisonSuppression, dateSuppression, cache FROM ElementSupprime WHERE id = ?";
            const params = [id];

            const [rows] = await this.pool.execute<ElementSupprimeRow[]>(requete, params);

            if (rows.length === 0) {
                throw new Error("Aucun élément supprimé trouvé avec l'identifiant fourni");
            }

            const row = rows[0];

            const elementSupprime = new ElementSupprime();
            elementSupprime.setId(id);
            const utilisateur = new Utilisateur();
            utilisateur.setUsername(row.nomUtilisateur);
            elementSupprime.setUtilisateur(utilisateur);
            elementSupprime.setRaisonSuppression(row.raisonSuppression);
            const date = new Date(row.dateSuppression);
            elementSupprime.setDateSuppression(date);
            elementSupprime.setCache(row.cache === 1);

            return elementSupprime;
        }
        catch (error) {
            console.error("Erreur lors de la récupération de l'élément supprimé : " + error);
            throw new Error("Impossible de récupérer l'élément supprimé" + error);
        }
    }
    
    async annulerSuppression(id : number) : Promise<void> {
        try {
            const requete = "DELETE FROM ElementSupprime WHERE id = ?";
            const params = [id];

            await this.pool.execute(requete, params);
        }
        catch (error) {
            console.error("Erreur lors de l'annulation de la suppression de l'élément : " + error);
            throw new Error("Impossible d'annuler la suppression de l'élément" + error);
        }
    }
        
}
