import { Message } from '@BlogsShared/model/Message';
import { Dossier } from '@BlogsShared/model/Dossier';

/**
 * Classe représentant un blog du site
 */
export class Blog {
        
    private id: string;
    private nom: string;
    private dateCreation: Date;
    private messages: Message[];
    private dossier: Dossier;

    /**
     * Constructeur de la classe
     * @param id Identifiant du blog
     * @param nom Nom du blog
     * @param dateCreation Date de création du blog
     * @param messages Messages du blog
     * @param dossier Dossier contenant le blog
     */
    constructor (id?: string, nom?: string, dateCreation?: string | Date, messages?: Message[], dossier?: Dossier) {
        this.id = id || '';
        this.nom = nom || '';
        this.dateCreation = dateCreation ? (typeof dateCreation === 'string' ? new Date(dateCreation) : dateCreation) : new Date();
        this.messages = messages || [];
        this.dossier = dossier || new Dossier();
    }

    /**
     * Getter de l'identifiant du blog
     * @returns 
     */
    getId(): string {
        return this.id;
    }

    /**
     * Setter de l'identifiant du blog
     * @param id 
     */
    setId(id: string): void {
        this.id = id;
    }

    /**
     * Getter du nom du blog
     * @returns 
     */
    getNom(): string {
        return this.nom;
    }

    /**
     * Setter du nom du blog
     * @param nom 
     */
    setNom(nom: string): void {
        this.nom = nom;
    }

    /**
     * Getter de la date de création du blog
     * @returns 
     */
    getDateCreation(): Date {
        return this.dateCreation;
    }

    /**
     * Setter de la date de création du blog
     * @param dateCreation 
     */
    setDateCreation(dateCreation: Date): void {
        this.dateCreation = dateCreation;
    }

    /**
     * Getter des messages du blog
     * @returns 
     */
    getMessages(): Message[] {
        return this.messages;
    }

    /**
     * Setter des messages du blog
     * @param messages 
     */
    setMessages(messages: Message[]): void {
        this.messages = messages;
    }

    /**
     * Getter du dossier contenant le blog
     * @returns 
     */
    getDossier(): Dossier {
        return this.dossier;
    }

    /**
     * Getter du dossier contenant le blog
     * @param dossier 
     */
    setDossier(dossier: Dossier): void {
        this.dossier = dossier;
    }
}
