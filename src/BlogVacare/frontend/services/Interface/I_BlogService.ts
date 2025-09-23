import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';

/**
 * Interface de gestion de services de blogs
 */
export interface I_BlogService {

    /**
     * Méthode permettant de récupérer tous les dossiers du projet
     * @return Liste des dossiers
     */
    getAllDossiers(): Promise<Dossier[]>;

    /**
     * Méthode permettant de récupérer les blogs d'un dossier
     * @param dossierId Identifiant du dossier
     * @return Liste des blogs du dossier
     */
    getBlogsForDossier(dossierId: string): Promise<Blog[]>;

    /**
     * Méthode permettant de récupérer les messages d'un blog
     * @param blogId Identifiant du blog
     * @param dossierId Identifiant du dossier
     * @return Liste des messages du blog
     */
    getMessagesForBlog(blogId: string, dossierId : string): Promise<Message[]>;
        
}
