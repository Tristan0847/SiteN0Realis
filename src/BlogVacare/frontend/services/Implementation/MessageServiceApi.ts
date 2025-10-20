import { I_MessageService } from "@BlogsFront/services/Interface/I_MessageService";
import { Message } from "@BlogsShared/model/Message";

/**
 * Service de messages par l'API backend
 */
export class MessageServiceApi implements I_MessageService {

    private apiBaseUrl: string;

    /**
     * Constructeur du service de messages API
     */
    constructor() {
        this.apiBaseUrl = process.env.NEXT_PUBLIC_LIEN_API_BACKEND ?? "http://localhost:3000/api";
    }

    async recupererMessagesDuBlog(slugDossier : string, slugBlog : string) : Promise<Message[]> {
        const url = this.apiBaseUrl + "/messages/liste/" + slugDossier + "/" + slugBlog;
        const reponse = await fetch(url);

        if (!reponse.ok) {
            throw new Error("Erreur lors de la récupération des messages : " + reponse.statusText);
        }

        const messagesJson = await reponse.json();
        const messages : Message[] = [];

        messagesJson.forEach( (messageJson : string) => {
            const message = Message.fromJSON(messageJson);
            messages.push(message);            
        });

        return messages;
    }

    async creerMessage(contenu : string, idBlog : string) : Promise<void> {
        const url = this.apiBaseUrl + "/messages/creer";
        const body = JSON.stringify({
            contenu: contenu,
            idBlog: idBlog
        });

        const requete : RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: body
        }

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "Erreur lors de la création du message");
        }
    }

    async supprimerMessage(messageId : number, idBlog : string, raisonSuppression : string, cache : boolean) : Promise<void> {
        const url = this.apiBaseUrl + "/messages/supprimer";
        const body = JSON.stringify({
            idMessage : messageId,
            idBlog: idBlog,
            raisonSuppression: raisonSuppression,
            cache : cache
        });

        const requete : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include",
            body: body
        };

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "Erreur lors de la suppression du message");
        }
    }
}