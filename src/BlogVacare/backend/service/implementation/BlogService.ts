import { DAOFactory, INTERFACESDAO } from "@BlogsBack/DAO/DAOFactory";
import { I_BlogDAO } from "@BlogsBack/DAO/Interface/I_BlogDAO";
import { I_ElementSupprimeDAO } from "@BlogsBack/DAO/Interface/I_ElementSupprimeDAO";
import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { SlugsUtil } from "@BlogsShared/utils/SlugsUtil";
import { Blog } from "@BlogsShared/model/Blog";
import { Dossier } from "@BlogsShared/model/Dossier";
import { Message } from "@BlogsShared/model/Message";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { v4 as uuidv4 } from 'uuid';
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";

/**
 * Service de blogs de l'application
 */
export class BlogService implements I_BlogService {

    private messageService : I_MessageService;
    private dao : I_BlogDAO;
    private elementSupprimeDAO : I_ElementSupprimeDAO;

    constructor() {
        this.messageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);
        this.dao = DAOFactory.get<I_BlogDAO>(INTERFACESDAO.I_BlogDAO);
        this.elementSupprimeDAO = DAOFactory.get<I_ElementSupprimeDAO>(INTERFACESDAO.I_ElementSupprimeDAO);
    }


    async creerBlog(nom : string, contenuPremierMessage : string, dossierId : string, nomUtilisateur : string) : Promise<void> {
        try {
            if (!nom || nom.trim().length === 0) {
                throw new Error("Le nom du blog ne peut pas être vide");
            }
            if (!contenuPremierMessage || contenuPremierMessage.trim().length === 0) {
                throw new Error("Le contenu du premier message ne peut pas être vide");
            }
            if (nom.length > 255) {
                throw new Error("Le nom du blog ne peut pas dépasser 255 caractères");
            }
            
            const blog = new Blog();
            blog.setNom(nom);

            // Génération de l'ID
            const idBlog = uuidv4();
            blog.setId(idBlog);

            // Création du slug
            const slug = SlugsUtil.genererSlug(nom);
            blog.setSlug(slug);

            // Création de l'utilisateur associé
            const utilisateur = new Utilisateur();
            utilisateur.setUsername(nomUtilisateur);
            blog.setUtilisateur(utilisateur);

            // Date de création
            const date = new Date("now");
            blog.setDateCreation(date);

            await this.dao.creerBlog(blog, dossierId);

            // Création du premier message
            await this.messageService.creerMessage(contenuPremierMessage, nomUtilisateur, blog.getId());
        }
        catch (error) {
            throw error;
        }        
    }

    async recupererBlogsDuDossier(slugDossier : string) : Promise<Blog[]> {
        try {
            if (!slugDossier || slugDossier.trim() === '') {
                throw new Error("ID du dossier invalide");
            }

            return await this.dao.recupererBlogsDuDossier(slugDossier);
        }
        catch (error) {
            throw error;
        }
    }


    async supprimerBlog(blogId : string, nomUtilisateur : string, raisonSuppression : string, cache : boolean) : Promise<void> {
        try {
            if (!blogId || blogId.trim() === '') {
                throw new Error("ID du blog invalide");
            }

            // Création de l'élément supprimé 
            const elementSupprime = new ElementSupprime();
            elementSupprime.setRaisonSuppression(raisonSuppression);

            const utilisateur = new Utilisateur();
            utilisateur.setUsername(nomUtilisateur);
            elementSupprime.setUtilisateur(utilisateur);

            elementSupprime.setCache(cache);
            const date = new Date("now");
            elementSupprime.setDateSuppression(date);

            const elementSupprimeAvecID = await this.elementSupprimeDAO.creerElementSupprime(elementSupprime);

            // Création du blog à supprimer
            const blogASupprimer = new Blog();
            blogASupprimer.setId(blogId);
            blogASupprimer.setElementSupprime(elementSupprimeAvecID);

            await this.dao.supprimerBlog(blogASupprimer);
        }
        catch (error) {
            throw error;
        }
    }

}