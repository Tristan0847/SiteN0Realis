import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { Dossier } from '@BlogsShared/model/Dossier';
import { Blog } from '@BlogsShared/model/Blog';
import { Message } from '@BlogsShared/model/Message';
import { jsonMapping } from '@BlogsShared/utils/jsonMapping';

/**
 * Service de gestion de blogs (réception par API)
 */
export class BlogServiceApi implements I_BlogService {

    private apiBaseUrl: string;

    /**
     * Constructeur du service de blog API
     */
    constructor() {
        this.apiBaseUrl = process.env.NEXT_PUBLIC_LIEN_API_BACKEND ?? "http://localhost:3000/api";
    }

    async getAllDossiers(): Promise<Dossier[]> {

        const url = `${this.apiBaseUrl}/dossiers/liste`;
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

        const url = `${this.apiBaseUrl}/blogs/liste/${dossierId}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des blogs pour le dossier ${dossierId} : ${response.statusText}`);
        }
        const blogsJson = await response.json();      

        const blogs: Blog[] = [];
        for (const blogJson of blogsJson) {
            let blog : Blog = jsonMapping.mapToBlog(blogJson);
            blogs.push(blog);
        }

        return blogs;
    }

    async getMessagesForBlog(blogId: string, dossierId : string): Promise<Message[]> {
    
        const url = `${this.apiBaseUrl}/messages/liste/${dossierId}/${blogId}`;
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
