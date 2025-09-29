import { Message } from '@BlogsShared/model/Message';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';

/**
 * Classe représentant un blog du site
 */
export class Blog {
        
    private id: string = "";
    private nom: string = "";
    private dateCreation: Date = new Date();
    private messages: Message[] = [];
    private utilisateur: Utilisateur = new Utilisateur();
    private idDossier: string = "";

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
     * Getter de l'utilisateur créateur du blog
     * @returns 
     */
    getUtilisateur(): Utilisateur {
        return this.utilisateur;
    }

    /**
     * Setter de l'utilisateur créateur du blog
     * @param utilisateur 
     */
    setUtilisateur(utilisateur : Utilisateur) : void {
        this.utilisateur = utilisateur;
    }

    /**
     * Getter de l'identifiant du dossier contenant le blog actuel
     * @returns 
     */
    getIdDossier(): string {
        return this.idDossier;
    }

    /**
     * Setter de l'identifiant du dossier contenant le blog actuel
     * @param idDossier 
     */
    setIdDossier(idDossier: string): void {
        this.idDossier = idDossier;
    }

}
