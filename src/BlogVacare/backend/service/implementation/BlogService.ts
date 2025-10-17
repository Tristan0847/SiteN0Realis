import { DAOFactory, INTERFACESDAO } from "@BlogsBack/DAO/DAOFactory";
import { I_BlogDAO } from "@BlogsBack/DAO/Interface/I_BlogDAO";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { Blog } from "@BlogsShared/model/Blog";
import { Dossier } from "@BlogsShared/model/Dossier";
import { Message } from "@BlogsShared/model/Message";

/**
 * Service de blogs de l'application
 */
export class BlogService implements I_BlogService {

    private dao : I_BlogDAO;

    constructor() {
        this.dao = DAOFactory.get<I_BlogDAO>(INTERFACESDAO.I_BlogDAO);
    }


    async getDossiers() : Promise<Dossier[]> {
        return await this.dao.getAllDossiers();
    }

    async getBlogsDeDossier(dossierId : string) : Promise<Blog[]> {
        if (!dossierId || dossierId.trim() === '') {
            throw new Error("ID du dossier invalide");
        }

        return await this.dao.getBlogsForDossier(dossierId);
    }

    async getMessagesDeBlog(blogId : string, dossierId : string) : Promise<Message[]> {
        
        if (!dossierId || dossierId.trim() === '') {
            throw new Error("ID du dossier invalide");
        }
        
        if (!blogId || blogId.trim() === '') {
            throw new Error("ID du blog invalide");
        }

        return await this.dao.getMessagesForBlog(blogId, dossierId);
    }

}