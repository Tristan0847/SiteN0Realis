import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { Blog, BlogJSON } from '@BlogsShared/model/Blog';

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

    async recupererBlogsDuDossier(slugDossier : string) : Promise<Blog[]> {
        const url = this.apiBaseUrl + "/blogs/liste/" + slugDossier;
        const reponse = await fetch(url, {
            credentials: "include"
        });

        if (!reponse.ok) {
            throw new Error("Erreur lors de la récupération des blogs du dossier " + slugDossier);
        }

        const blogsJson = await reponse.json();
        const blogs : Blog[] = [];

        blogsJson.forEach( (blogJson : BlogJSON) => {
            const blog = Blog.fromJSON(blogJson);
            blogs.push(blog);
        })
        
        return blogs;
    }

    
    async recupererBlogParSlug(slugBlog : string, slugDossier : string) : Promise<Blog> {
        const url = this.apiBaseUrl + "/blogs/recuperation/" + slugDossier + "/" + slugBlog;
        const reponse = await fetch(url);

        if (!reponse.ok) {
            throw new Error("Erreur lors de la récupération du blog " + slugDossier + "/" + slugBlog);
        }

        const blogJson = await reponse.json();
        const blog = Blog.fromJSON(blogJson);

        return blog;
    }


    async creerBlog(nom : string, contenuPremierMessage : string, idDossier : string) : Promise<void> {
        const url = this.apiBaseUrl + "/blogs/creer";
        const body = JSON.stringify({
            nom: nom,
            contenuPremierMessage: contenuPremierMessage,
            idDossier: idDossier
        });

        const requete : RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: body
        };

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "Erreur lors de la création du blog");
        }
    }

    async supprimerBlog(idBlog : string, raisonSuppression : string, cache : boolean) : Promise<void> {
        const url = this.apiBaseUrl + "/blogs/supprimer";

        const body = JSON.stringify({
            idBlog: idBlog,
            raisonSuppression: raisonSuppression,
            cache: cache
        });

        const requete : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
            credentials: "include",
            body: body
        }

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "Erreur lors de la suppression du blog");
        }
    }
}
