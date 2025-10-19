import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Classe représentant les caractéristiques d'un élément supprimé 
 */
export class ElementSupprime {

    private id : number = -1;
    private utilisateur : Utilisateur = new Utilisateur();
    private raisonSuppression : string = "";
    private dateSuppression : Date = new Date();
    private cache : boolean = false;

    /**
     * Getter de l'identifiant
     * @returns 
     */
    getId(): number {
        return this.id;
    }

    /**
     * Setter de l'identifiant
     * @param id Identifiant de l'élément 
     */
    setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter de l'utilisateur ayant supprimé l'élément
     * @returns
     */
    getUtilisateur(): Utilisateur {
        return this.utilisateur;
    }

    /**
     * Setter de l'utilisateur ayant supprimé l'élément
     * @param utilisateur
     */
    setUtilisateur(utilisateur: Utilisateur): void {
        this.utilisateur = utilisateur;
    }   

    /**
     * Getter de la raison de la suppression
     * @returns 
     */
    getRaisonSuppression(): string {
        return this.raisonSuppression;
    }

    /**
     * Setter de la raison de la suppression
     * @param raisonSuppression Raison de la suppression
     */
    setRaisonSuppression(raisonSuppression: string): void {
        this.raisonSuppression = raisonSuppression;
    }

    /**
     * Getter de la date de suppression
     * @returns
     */
    getDateSuppression(): Date {
        return this.dateSuppression;
    }

    /**
     * Setter de la date de suppression
     * @param dateSuppression Date de suppression
     */
    setDateSuppression(dateSuppression: Date): void {
        this.dateSuppression = dateSuppression;
    }

    /**
     * Getter de l'élément caché ou non
     * @returns 
     */
    getCache(): boolean {
        return this.cache;
    }

    /**
     * Setter de l'élément caché ou non
     * @param cache
     */
    setCache(cache: boolean): void {
        this.cache = cache;
    }

    
    /**
     * Méthode de génération d'un objet JSON à partir de l'objet actuel
     * @returns JSON généré
     */
    toJSON() {
        return {
            id: this.id,
            utilisateur: this.utilisateur.toJSON(),
            raisonSuppression: this.raisonSuppression,
            dateSuppression: this.dateSuppression.toISOString(),
            cache: this.cache
        };
    }

    /**
     * Méthode de création d'un objet élément supprimé à partir d'un JSON
     * @param json JSON de l'élément supprimé
     * @returns Élément supprimé créé
     */
    static fromJSON(json: any): ElementSupprime {
        let elementSupprime = new ElementSupprime();
        elementSupprime.setId(json.id);
        elementSupprime.setUtilisateur(Utilisateur.fromJSON(json.utilisateur));
        elementSupprime.setRaisonSuppression(json.raisonSuppression);
        elementSupprime.setDateSuppression(new Date(json.dateSuppression));
        elementSupprime.setCache(json.cache);

        return elementSupprime;
    }
}