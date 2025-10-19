import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Type de props pour les messages JSON préchargés
 */
export type MessageJSON = ReturnType<Message['toJSON']>;

/**
 * Classe représentant un message dans le blog.
 */
export class Message {

    private contenu: string = "";
    private date: Date = new Date();
    private utilisateur: Utilisateur = new Utilisateur();

    /**
     * Getter du contenu du message.
     * @returns 
     */
    getContenu(): string {
        return this.contenu;
    }

    /**
     * Setter du contenu du message.
     * @param contenu Contenu du message
     */
    setContenu(contenu: string): void {
        this.contenu = contenu;
    }

    /**
     * Getter de la date du mesage
     * @returns 
     */
    getDate(): Date {
        return this.date;
    }

    /**
     * Setter de la date du message
     * @param date Date du message
     */
    setDate(date: Date): void {
        this.date = date;
    }

    /**
     * Getter de l'utilisateur ayant posté le message
     * @returns 
     */
    getUtilisateur(): Utilisateur {
        return this.utilisateur;
    }

    /**
     * Setter de l'utilisateur ayant posté le message
     * @param utilisateur 
     */
    setUtilisateur(utilisateur: Utilisateur): void {
        this.utilisateur = utilisateur;
    }

    /**
     * Méthode de génération d'un objet JSON à partir de l'objet actuel
     * @returns JSON généré
     */
    toJSON() {
        return {
            contenu: this.contenu,
            date: this.date.toISOString(),
            utilisateur: this.utilisateur.toJSON(),
        };
    }

    /**
     * Méthode de création d'un objet message à partir d'un JSON
     * @param json JSON du messa
     * @returns Message créé
     */
    static fromJSON(json: any): Message {
        let message = new Message();
        message.setContenu(json.contenu);
        message.setDate(new Date(json.date));
        message.setUtilisateur(Utilisateur.fromJSON(json.utilisateur));
        return message;
    }
}
