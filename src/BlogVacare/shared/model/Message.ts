/**
 * Classe représentant un message dans le blog.
 */
export class Message {

    private contenu: string;
    private date: Date;
    private utilisateur: string;

    /**
     * Constructeur de la classe Message.
     * @param contenu Contenu du message.
     * @param date Date du message.
     * @param utilisateur Utilisateur ayant posté le message.
     */
    constructor(contenu?: string, date?: string | Date, utilisateur?: string) {
        this.contenu = contenu || '';
        this.date = date ? (typeof date === 'string' ? new Date(date) : date) : new Date();
        this.utilisateur = utilisateur || '';
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
    getUtilisateur(): string {
        return this.utilisateur;
    }

    /**
     * Setter de l'utilisateur ayant posté le message
     * @param utilisateur 
     */
    setUtilisateur(utilisateur: string): void {
        this.utilisateur = utilisateur;
    }
}
