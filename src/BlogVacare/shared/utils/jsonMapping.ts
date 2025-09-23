import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';

/**
 * Classe utilitaire pour le mapping JSON vers les objets du modèle
 */
export class jsonMapping {

    /**
     * Méthode de mapping d'un objet JSON vers un Dossier
     * @param d Objet JSON à mapper
     * @returns Dossier mappé
     */
    static mapToDossier(d: any): Dossier {
        const dossier = new Dossier();
        dossier.setId(d.id);
        dossier.setTitre(d.titre);
        dossier.setDescription(d.description);
        return dossier;
    }

    /**
     * Méthode de mapping d'un objet JSON vers un Blog
     * @param b Objet JSON à mapper
     * @returns Blog mappé
     */
    static mapToBlog(b: any): Blog {
        const blog = new Blog();
        blog.setId(b.id);
        blog.setNom(b.nom);
        blog.setDateCreation(new Date(b.dateCreation));
        return blog;
    }

    /**
     * Méthode de mapping d'un objet JSON vers un Message
     * @param m Objet JSON à mapper
     * @returns Message mappé
     */
    static mapToMessage(m: any): Message {
        const message = new Message();
        message.setContenu(m.contenu);
        message.setDate(new Date(m.date));
        message.setUtilisateur(m.utilisateur);
        return message;
    }

}