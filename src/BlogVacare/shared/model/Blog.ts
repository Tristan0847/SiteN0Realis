import { Message } from '@BlogsShared/model/Message';
import { Utilisateur } from '@BlogsShared/model/Utilisateur';
import { ElementSupprime } from '@BlogsShared/model/ElementSupprime';

export type BlogJSON = ReturnType<Blog['toJSON']>;

/**
 * Classe représentant un blog du site
 */
export class Blog {
        
    private id: string = "";
    private nom: string = "";
    private slug : string = "";
    private dateCreation: Date = new Date();
    private messages: Message[] = [];
    private utilisateur: Utilisateur = new Utilisateur();
    private idDossier: string = "";
    private elementSupprime : ElementSupprime|null = null;

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
     * Getter du slug du dossier
     * @returns 
     */
    getSlug(): string {
        return this.slug;
    }

    /**
     * Setter du slug du dossier
     * @param titre slug du dossier
     */
    setSlug(slug: string): void {
        this.slug = slug;
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
            nom: this.nom,
            slug: this.slug,
            dateCreation: this.dateCreation.toISOString(),
            messages: this.messages.map(m => m.toJSON()),
            utilisateur: this.utilisateur.toJSON(),
            idDossier: this.idDossier,
            elementSupprime: this.elementSupprime?.toJSON() ?? null
        };
    }

    /**
     * Méthode de création d'un objet blog à partir d'un JSON
     * @param json JSON du blog
     * @returns Blog créé
     */
    static fromJSON(json: any): Blog {
        let blog = new Blog();
        blog.setId(json.id);
        blog.setNom(json.nom);
        blog.setSlug(json.slug);
        blog.setDateCreation(new Date(json.dateCreation));
        blog.setIdDossier(json.idDossier);
        blog.setMessages(json.messages.map((msgJson: any) => Message.fromJSON(msgJson)));
        blog.setUtilisateur(Utilisateur.fromJSON(json.utilisateur));
        if (json.elementSupprime) {
            blog.setElementSupprime(ElementSupprime.fromJSON(json.elementSupprime));
        }
        return blog;
    }
}
