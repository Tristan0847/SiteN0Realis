/**
 * Classe représentant un dossier de blogs
 */
export class Dossier {

    private id: string;
    private titre: string;
    private description: string;

    /**
     * Constructeur de la classe
     * @param id Identifiant du dossier
     * @param titre Titre du dossier
     * @param description Description du dossier
     */
    constructor(id?: string, titre?: string, description?: string) {
        this.id = id || '';
        this.titre = titre || '';
        this.description = description || '';
    }

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
}
