import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';
import { jsonMapping } from '@BlogsShared/utils/jsonMapping';


/**
 * Service de gestion de blogs (par des fichiers JSON)
 */
export class BlogServiceJson implements I_BlogService {

    private apiBaseUrl: string;

    /**
     * Constructeur du service de blog JSON
     * @param apiBaseUrl URL de base de l'API (répertoire des fichiers JSON)
     */
    constructor(apiBaseUrl: string) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async getAllDossiers(): Promise<Dossier[]> {

        const url = `${this.apiBaseUrl}/dossiers`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des dossiers : ${response.statusText}`);
        }
        const dossiersJson = await response.json();        

        let dossiers : Dossier[] = [];
        dossiersJson.forEach((d: any) => {
            dossiers.push(jsonMapping.mapToDossier(d));
        });

        return dossiers;
    }

    async getBlogsForDossier(dossierId: string): Promise<Blog[]> {

        const url = `${this.apiBaseUrl}/blogs/${dossierId}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des blogs pour le dossier ${dossierId} : ${response.statusText}`);
        }
        const blogsJson = await response.json();      

        const blogs: Blog[] = [];
        for (const blogJson of blogsJson) {
            let blog : Blog = jsonMapping.mapToBlog(blogJson);
            blog.setDossier(new Dossier(dossierId));
            blogs.push(blog);
        }

        return blogs;
    }

    async getMessagesForBlog(blogId: string, dossierId : string): Promise<Message[]> {
       
        const url = `${this.apiBaseUrl}/messages/${dossierId}/${blogId}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des messages pour le blog ${blogId} dans le dossier ${dossierId} : ${response.statusText}`);
        }
        const messagesJson = await response.json();        

        let messages : Message[] = [];
        messagesJson.forEach((m: any) => {
            messages.push(jsonMapping.mapToMessage(m));
        });

        return messages;
    }
}
