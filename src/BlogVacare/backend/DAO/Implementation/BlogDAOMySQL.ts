import mysql, { RowDataPacket } from 'mysql2/promise';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';
import { I_BlogDAO } from '@BlogsBack/DAO/Interface/I_BlogDAO';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';
import { getDbPool } from '@BlogsBack/config/MySQL/dbPoolMySql';
import { ElementSupprime } from '@BlogsShared/model/ElementSupprime';
import { dateFormatUtil } from '@BlogsShared/utils/dateFormatUtil';

//#region Interfaces


/**
 * Lignes attendues à la demande d'un Blog
 */
interface BlogRow extends RowDataPacket {
    id: string;
    titre: string;
    slug: string;
    dateCreation: Date;
    nomUtilisateur: string;
    contenu: string;
    idSuppression: number|null;
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


    async creerBlog(blog : Blog, dossierId : string) : Promise<void> {
        try {
            const date = dateFormatUtil.dateToMySQLFormat(blog.getDateCreation());
            // Mise en place de la requête
            const requete = "INSERT INTO Blog(id, titre, slug, idDossier, nomUtilisateur, dateCreation, idSuppression) VALUES (?, ?, ?, ?, ?, ?, NULL)";
            const params = [
                blog.getId(),
                blog.getNom(),
                blog.getSlug(),
                dossierId,
                blog.getUtilisateur().getUsername(),
                date
            ];

            await this.pool.execute(requete, params);
        }
        catch (error) {
            console.error("Erreur lors de la création du blog : " + error);
            throw new Error("Impossible de créer le blog" + error);
        }
    }
    
    async recupererBlogParSlug(slugBlog : string, slugDossier : string) : Promise<Blog> {
        try {
            const requete = "SELECT b.id, b.titre, b.slug, b.dateCreation, b.nomUtilisateur, b.idSuppression FROM Blog b JOIN Dossier d ON b.idDossier = d.id WHERE b.slug = ? AND d.slug = ?";
            const params = [slugBlog, slugDossier];

            const [rows] = await this.pool.execute<BlogRow[]>(requete, params);

            if (rows.length === 0) {
                throw new Error("Aucun blog trouvé avec la paire slug Blog/slug Dossier fournie");
            }

            const row = rows[0];

            const blog = new Blog();
            blog.setId(row.id);
            blog.setNom(row.titre);
            blog.setSlug(row.slug);
            const date = new Date(row.dateCreation);
            blog.setDateCreation(date);

            // Création de l'utilisateur associé
            const utilisateur = new Utilisateur();
            utilisateur.setUsername(row.nomUtilisateur);
            blog.setUtilisateur(utilisateur);

            // Création de l'objet de suppression si le blog l'est
            if (row.idSuppression !== null) {
                const elementSupprime = new ElementSupprime();
                elementSupprime.setId(row.idSuppression);
                blog.setElementSupprime(elementSupprime);
            }

            return blog;
        }
        catch (error) {
            console.error("Erreur lors de la récupération du blog par slug : " + error);
            throw new Error("Impossible de récupérer le blog par slug" + error);
        }
    }

    async recupererBlogsDuDossier(slugDossier: string): Promise<Blog[]> {
        try {
            const requete = "SELECT b.id, b.titre, b.slug, b.dateCreation, b.nomUtilisateur, b.idSuppression, m.contenu FROM Blog b INNER JOIN Dossier d ON d.id = b.idDossier LEFT JOIN Message m ON b.id = m.idBlog AND m.id = (SELECT MIN(m2.id) FROM Message m2 WHERE m2.idBlog = b.id) WHERE d.slug = ? ORDER BY b.dateCreation DESC";
            const params = [slugDossier];

            const [rows] = await this.pool.query<BlogRow[]>(requete, params);

            const blogs: Blog[] = [];

            for (const row of rows) {
                const blog = new Blog();
                blog.setId(row.id);
                blog.setNom(row.titre);
                blog.setSlug(row.slug);
                blog.setDateCreation(new Date(row.dateCreation));

                // Création de l'objet de suppression si le blog l'est
                if (row.idSuppression !== null) {
                    const elementSupprime = new ElementSupprime();
                    elementSupprime.setId(row.idSuppression);
                    blog.setElementSupprime(elementSupprime);
                }

                // Création de l'utilisateur associé
                const utilisateur = new Utilisateur();
                utilisateur.setUsername(row.nomUtilisateur);
                blog.setUtilisateur(utilisateur);

                // Création du premier message associé, limité à 150 caractères
                const message = new Message();
                let contenu = row.contenu;
                if (contenu.length >= 250) {
                    contenu = contenu.slice(0,246) + "...";
                }

                message.setContenu(contenu);
                blog.setMessages([message]);

                blogs.push(blog);
            }

            return blogs;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des blogs du dossier : " + error);
            throw new Error("Impossible de récupérer les blogs du dossier" + error);
        }
    }

    async supprimerBlog(blog : Blog) : Promise<void> {
        try {
            if (!blog.getElementSupprime()) {
                throw new Error("L'objet de la suppression du blog doit être défini pour le supprimer.");
            }

            const requete = "UPDATE Blog SET idSuppression = ? WHERE id = ?";
            const params = [
                blog.getElementSupprime()?.getId(),
                blog.getId()
            ]

            await this.pool.execute(requete, params);
        }
        catch (error) {
            console.error("Erreur lors de la suppression du blog : " + error);
            throw new Error("Impossible de supprimer le blog " + error);
        }
    }

}
