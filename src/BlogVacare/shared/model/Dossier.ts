import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Type pour les dossiers sérialisés
 */
export type DossierJSON = ReturnType<Dossier['toJSON']>;

/**
 * Classe représentant un dossier de blogs
 */
export class Dossier {

    private id: string = "";
    private titre: string = "";
    private description: string = "";
    private utilisateur: Utilisateur = new Utilisateur();

    /**
     * Getter de l'identifiant
     * @returns 
     */
    getId(): string {
        return this.id;
    }

    /**
     * Setter de l'identifiant
     * @param id Identifiant du dossier
     */
    setId(id: string): void {
        this.id = id;
    }

    /**
     * Getter du titre du dossier
     * @returns 
     */
    getTitre(): string {
        return this.titre;
    }

    /**
     * Setter du titre du dossier
     * @param titre Titre du dossier
     */
    setTitre(titre: string): void {
        this.titre = titre;
    }

    /**
     * Getter de la description du dossier
     * @returns 
     */
    getDescription(): string {
        return this.description;
    }

    /**
     * Setter de la description du dossier
     * @param description Description du dossier
     */
    setDescription(description: string): void {
        this.description = description;
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
            id: this.id,
            titre: this.titre,
            description: this.description,
            utilisateur: this.utilisateur.toJSON(),
        };
    }

    /**
     * Méthode de création d'un objet dossier à partir d'un JSON
     * @param json JSON du dossier
     * @returns Dossier créé
     */
    static fromJSON(json: any): Dossier {
        let dossier = new Dossier();
        dossier.setId(json.id);
        dossier.setTitre(json.titre);
        dossier.setDescription(json.description);
        dossier.setUtilisateur(Utilisateur.fromJSON(json.utilisateur));
        return dossier;
    }
}
