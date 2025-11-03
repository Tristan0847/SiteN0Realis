import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";

/**
 * Type de props pour les messages JSON préchargés
 */
export type MessageJSON = ReturnType<Message['toJSON']>;

/**
 * Classe représentant un message dans le blog.
 */
export class Message {

    private id : number = -1;
    private contenu: string = "";
    private date: Date = new Date();
    private utilisateur: Utilisateur = new Utilisateur();
    private elementSupprime : ElementSupprime|null = null;

    /**
     * Getter de l'identifiant
     * @returns 
     */
    getId(): number {
        return this.id;
    }

    /**
     * Setter de l'identifiant
     * @param id Identifiant du dossier
     */
    setId(id: number): void {
        this.id = id;
    }

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
     * Getter de si l'élément est supprimé
     * @returns 
     */    
    public getElementSupprime(): ElementSupprime | null {
        return this.elementSupprime;
    }

    /**
     * Setter de si l'élément est supprimé
     * @param value 
     */
    public setElementSupprime(value: ElementSupprime | null) {
        this.elementSupprime = value;
    }
    

    /**
     * Méthode de génération d'un objet JSON à partir de l'objet actuel
     * @returns JSON généré
     */
    toJSON() {
        return {
            id: this.id,
            contenu: this.contenu,
            date: this.date.toISOString(),
            utilisateur: this.utilisateur.toJSON(),
            elementSupprime: this.elementSupprime?.toJSON() ?? null
        };
    }

    /**
     * Méthode de création d'un objet message à partir d'un JSON
     * @param json JSON du messa
     * @returns Message créé
     */
    static fromJSON(json: MessageJSON): Message {
        let message = new Message();
        message.setId(json.id);
        message.setContenu(json.contenu);
        message.setDate(new Date(json.date));
        message.setUtilisateur(Utilisateur.fromJSON(json.utilisateur));
        if (json.elementSupprime) {
            message.setElementSupprime(ElementSupprime.fromJSON(json.elementSupprime));
        }
        return message;
    }
}
