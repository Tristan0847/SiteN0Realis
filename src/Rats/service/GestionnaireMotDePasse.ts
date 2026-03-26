"use client";
import bcrypt from "bcryptjs";

/**
 * Classe de gestion de mots de passe à base de fichiers JSON
 */
export class GestionnaireMotDePasse {

    private motsDePasse : string[];

    /**
     * Constructeur de la classe
     */
    constructor() {
        this.motsDePasse = [];
    }

    /**
     * Méthode de récupération des mots de passe depuis un fichier JSON
     * @param cheminFichier Chemin du fichier
     */
    public async recupererMotsDePasse(cheminFichier : string) : Promise<void> {
        try {
            // Récupération du contenu
            const contenu = await fetch(cheminFichier);
            const json = await contenu.json();
            this.motsDePasse = json;
        } catch (err) {
            // Fichier introuvable ou JSON invalide donne une liste de mots de passe vide
            this.motsDePasse = [];
        }
    }

    /**
     * Méthode vérifiant que le mot de passe entré correspond à un des mots de passes stockés
     * @param mdp Mot de passe entré
     * @returns { boolean } True si le mot de passe correspond, false sinon
     */
    public async verifierMotDePasse(mdp : string) : Promise<boolean> {

        let estValide : boolean = false;
        const mdpTrim = mdp.trim();
        const mdpMinuscule = mdp.toLowerCase();

        // Vérification que le mot de passe correspond à l'un de ceux stockés : si c'est le cas, on brise la boucle
        for (const mdpStocke of this.motsDePasse) {
            const mdpValide : boolean = await bcrypt.compare(mdpMinuscule, mdpStocke);
            if (mdpValide) {
                estValide = true;
                break;
            }
        }

        return estValide;

    }

}