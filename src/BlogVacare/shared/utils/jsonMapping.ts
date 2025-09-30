import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';

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

         if (d.utilisateur) {
            const user = new Utilisateur();
            user.setUsername(d.utilisateur.username);
            dossier.setUtilisateur(user);
        }

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
        blog.setNom(b.titre || b.nom);
        blog.setDateCreation(new Date(b.dateCreation));

        if (b.utilisateur) {
            const user = new Utilisateur();
            user.setUsername(b.utilisateur.username);
            blog.setUtilisateur(user);
        }

        if (b.messages && Array.isArray(b.messages)) {
            const messages = b.messages.map((m: any) => jsonMapping.mapToMessage(m));
            blog.setMessages(messages);
        }

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
        const user = new Utilisateur();
        user.setUsername(m.utilisateur.username);
        message.setUtilisateur(user);
        return message;
    }

}