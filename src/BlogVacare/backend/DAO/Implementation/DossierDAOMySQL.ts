import { getDbPool } from "@BlogsBack/config/MySQL/dbPoolMySql";
import { I_DossierDAO } from "@BlogsBack/DAO/Interface/I_DossierDAO";
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise';
import { Dossier } from "@BlogsShared/model/Dossier";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";
import { dateFormatUtil } from "@BlogsShared/utils/dateFormatUtil";

/**
 * Lignes attendues à la demande d'un Dossier
 */
interface DossierRow extends RowDataPacket {
    id: string;
    titre: string;
    slug: string;
    dateCreation: Date;
    description: string;
    nomUtilisateur: string;
    idSuppression: number|null;
    utilisateurSuppression: string|null;
    raisonSuppression: string|null;
    datesuppression: string|null;
    cache: boolean|null;
}

/**
 * DAO de la table Dossier sous MySQL
 */
export class DossierDAOMySQL implements I_DossierDAO {

    private pool: mysql.Pool;

    constructor() {
        this.pool = getDbPool();
    }

    async creerDossier(dossier : Dossier) : Promise<void> {
        try {
            const date = dateFormatUtil.dateToMySQLFormat(dossier.getDateCreation());
            // Mise en place de la requête
            const requete = "INSERT INTO Dossier(id, titre, slug, description, nomUtilisateur, idSuppression, dateCreation) VALUES (?, ?, ?, ?, ?, NULL, ?)";
            const parametres = [
                dossier.getId(),
                dossier.getTitre(),
                dossier.getSlug(),
                dossier.getDescription(),
                dossier.getUtilisateur().getUsername(),
                date
            ];

            await this.pool.execute(requete, parametres);
        }
        catch (error) {
            console.error("Erreur lors de la création du dossier : " + error);
            throw new Error("Impossible de créer le dossier" + error);
        }
    }
    
    async recupererDossierParSlug(slugDossier : string) : Promise<Dossier> {
        try {
            const requete = "SELECT id, titre, slug, description, nomUtilisateur, idSuppression, dateCreation FROM Dossier WHERE slug = ?";
            const params = [slugDossier];

            const [rows] = await this.pool.execute<DossierRow[]>(requete, params);

            if (rows.length === 0) {
                throw new Error("Aucun dossier trouvé avec le slug fourni");
            }
            const row = rows[0];

            const dossier = new Dossier();
            dossier.setId(row.id);
            dossier.setTitre(row.titre);
            dossier.setSlug(row.slug);
            dossier.setDescription(row.description);

            // Création de l'utilisateur
            const utilisateur = new Utilisateur();
            utilisateur.setUsername(row.nomUtilisateur);
            dossier.setUtilisateur(utilisateur);

            // Chargement des données de suppression si le dossier l'est
            if (row.idSuppression !== null) {
                const elementSupprime = new ElementSupprime();
                elementSupprime.setId(row.idSuppression);
                dossier.setElementSupprime(elementSupprime);
            }

            const date = new Date(row.dateCreation);
            dossier.setDateCreation(date);

            return dossier;
        }
        catch (error) {
            console.error("Erreur lors de la récupération du dossier par slug : " + error);
            throw new Error("Impossible de récupérer le dossier" + error);
        }
    }


    async recupererDossiers(): Promise<Dossier[]> {
        try {
            const requete = "SELECT d.id, d.titre, d.slug, d.description, d.nomUtilisateur, d.dateCreation, idSuppression, es.nomUtilisateur AS utilisateurSuppression, es.raisonSuppression, es.datesuppression, es.cache FROM Dossier d LEFT JOIN elementsupprime es ON d.idSuppression = es.id ORDER BY dateCreation DESC";

            const [rows] = await this.pool.query<DossierRow[]>(requete);
            
            const dossiers : Dossier[] = [];
            
            for (const row of rows) {
                const dossier = new Dossier();
                dossier.setId(row.id);
                dossier.setTitre(row.titre);
                dossier.setSlug(row.slug);
                dossier.setDescription(row.description);

                // Création de l'utilisateur à partir de son nom
                const utilisateur = new Utilisateur();
                utilisateur.setUsername(row.nomUtilisateur);
                dossier.setUtilisateur(utilisateur);

                // Chargement des données de suppression si le dossier l'est
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
                    dossier.setElementSupprime(elementSupprime);
                }

                const date = new Date(row.dateCreation);
                dossier.setDateCreation(date);

                dossiers.push(dossier);
            }

            return dossiers;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des dossiers : " + error);
            throw new Error("Impossible de récupérer les dossiers" + error);
        }
    }

    async supprimerDossier(dossier : Dossier) : Promise<void> {
        try {
            if (!dossier.getElementSupprime()) {
                throw new Error("L'objet de la suppression du dossier doit être défini pour le supprimer.");
            }

            const requete = "UPDATE Dossier SET idSuppression = ? WHERE id = ?";
            const params = [
                dossier.getElementSupprime()?.getId(),
                dossier.getId()
            ]

            await this.pool.execute(requete, params);
        }
        catch (error) {
            console.error("Erreur lors de la suppression du dossier : " + error);
            throw new Error("Impossible de supprimer le dossier " + error);
        }
    }
}