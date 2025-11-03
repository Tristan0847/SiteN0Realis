import { DAOFactory, INTERFACESDAO } from "@BlogsBack/DAO/DAOFactory";
import { I_ElementSupprimeDAO } from "@BlogsBack/DAO/Interface/I_ElementSupprimeDAO";
import { I_MessageDAO } from "@BlogsBack/DAO/Interface/I_MessageDAO";
import { Message } from "@BlogsShared/model/Message";
import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";
import { I_BlogDAO } from "@BlogsBack/DAO/Interface/I_BlogDAO";
import { SiteVariant } from "@BlogsShared/model/Variant";

/**
 * Interface de service de gestion de messages
 */
export class MessageService implements I_MessageService {
    
    private dao : I_MessageDAO;
    private daoBlogs : I_BlogDAO;
    private elementSupprimeDAO : I_ElementSupprimeDAO;

    constructor() {
        this.dao = DAOFactory.get<I_MessageDAO>(INTERFACESDAO.I_MessageDAO);
        this.daoBlogs = DAOFactory.get<I_BlogDAO>(INTERFACESDAO.I_BlogDAO);
        this.elementSupprimeDAO = DAOFactory.get<I_ElementSupprimeDAO>(INTERFACESDAO.I_ElementSupprimeDAO);
    }

    async creerMessage(contenu : string, nomUtilisateur : string, idBlog : string) : Promise<void> {
        try {
            if (!contenu || contenu.trim().length === 0) {
                throw new Error("Le contenu du message ne peut pas être vide");
            }

            const message = new Message();
            message.setContenu(contenu);
            const date = new Date();
            message.setDate(date);

            const utilisateur = new Utilisateur();
            utilisateur.setUsername(nomUtilisateur);
            message.setUtilisateur(utilisateur);

            await this.dao.creerMessage(message, idBlog);
        }
        catch (error) {
            throw error;
        }
    }

    async recupererMessages(slugBlog : string, slugDossier : string, variante : SiteVariant, estAdmin : boolean) : Promise<Message[]> {
        try {
            if (!slugDossier || slugDossier.trim() === '') {
                throw new Error("Slug du dossier invalide");
            }

            if (!slugBlog || slugBlog.trim() === '') {
                throw new Error("Slug du blog invalide");
            }
            
            // Récupération de l'identifiant du blog concerné
            const blog = await this.daoBlogs.recupererBlogParSlug(slugBlog, slugDossier);
            const idBlog = blog.getId();

            let messages : Message[] = [];
            if (estAdmin) {
                messages = await this.dao.recupererMessagesCaches(idBlog);
            }
            else if (variante == "old") {
                messages = await this.dao.recupererMessagesElementsSuppr(idBlog);
            }
            else {
                messages = await this.dao.recupererMessages(idBlog);
            }

            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    
    async recupererPremierMessage(idBlog : string) : Promise<Message> {
        try {
            if (!idBlog || idBlog.trim() === '') {
                throw new Error("Identifiant du blog invalide");
            }
            
            return await this.dao.recupererPremierMessage(idBlog);
        }
        catch (error) {
            throw error;
        }
    }

    async supprimerMessage(messageId : number, idBlog : string, nomUtilisateur : string, raisonSuppression : string, cache : boolean) : Promise<void> {
        try {
            if (!messageId) {
                throw new Error("ID du message invalide");
            }
            
            if (!idBlog || idBlog.trim() === '') {
                throw new Error("ID du blog invalide");
            }

            // Création de l'élément supprimé 
            const elementSupprime = new ElementSupprime();
            elementSupprime.setRaisonSuppression(raisonSuppression);

            const utilisateur = new Utilisateur();
            utilisateur.setUsername(nomUtilisateur);
            elementSupprime.setUtilisateur(utilisateur);

            elementSupprime.setCache(cache);
            const date = new Date();
            elementSupprime.setDateSuppression(date);

            const elementSupprimeAvecID = await this.elementSupprimeDAO.creerElementSupprime(elementSupprime);

            // Création du message à supprimer
            const messageASupprimer = new Message();
            messageASupprimer.setId(messageId);
            messageASupprimer.setElementSupprime(elementSupprimeAvecID);

            await this.dao.supprimerMessage(messageASupprimer, idBlog);
        }
        catch (error) {
            throw error;
        }
    }


}