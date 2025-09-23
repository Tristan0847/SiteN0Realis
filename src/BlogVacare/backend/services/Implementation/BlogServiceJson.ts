import fs from 'fs/promises';
import path from 'path';
import { I_BlogService } from '@BlogsBack/services/Interface/I_BlogService';
import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';
import { jsonMapping } from '@BlogsShared/utils/jsonMapping';


/**
 * Service de gestion de blogs (par des fichiers JSON)
 */
export class BlogServiceJson implements I_BlogService {

    private contentDir: string;

    /**
     * Constructeur du service de blog JSON
     * @param contentDir Répertoire contenant les fichiers JSON initalisé dans l'injecteur de dépendances
     */
    constructor(contentDir: string) {
        this.contentDir = contentDir;
    }

    async getAllDossiers(): Promise<Dossier[]> {
        const filePath = path.join(this.contentDir, 'dossiers.json');
        const data = await fs.readFile(filePath, 'utf8');
        const dossiersJson = JSON.parse(data);

        let dossiers : Dossier[] = [];
        dossiersJson.forEach((d: any) => {
            dossiers.push(jsonMapping.mapToDossier(d));
        });

        return dossiers;
    }

    async getBlogsForDossier(dossierId: string): Promise<Blog[]> {
        const filePath = path.join(this.contentDir, `Dossiers`, dossierId + `.json`);
        const data = await fs.readFile(filePath, 'utf8');
        
        const blogsJson = JSON.parse(data);

        const blogs: Blog[] = [];
        for (const blogJson of blogsJson) {
            blogs.push(jsonMapping.mapToBlog(blogJson));
        }

        return blogs;
    }

    async getMessagesForBlog(blogId: string, dossierId : string): Promise<Message[]> {
        const filePath = path.join(this.contentDir, `blogs`, dossierId, `${blogId}.json`);
        const data = await fs.readFile(filePath, 'utf8');

        const messagesJson = JSON.parse(data);

        let messages : Message[] = [];
        messagesJson.forEach((m: any) => {
            messages.push(jsonMapping.mapToMessage(m));
        });

        return messages;
    }
}
