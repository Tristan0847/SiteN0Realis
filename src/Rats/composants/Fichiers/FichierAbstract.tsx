"use client";
import { JSX, ReactElement, SVGProps, useState } from "react";

/**
 * Classe abstraite de fichier affiché sur le site
 */
export abstract class FichierAbstract {
    //#region Attributs/propriétés
    private id: number;
    protected nom: string;
    private description: string|JSX.Element;
    private icone: ReactElement<SVGProps<SVGSVGElement>>;
    private estRouge: boolean;


    /**
     * Getter de l'ID du composant
     * @returns ID du composant
     */
    public getId() : string {
        return this.id.toString();
    }

    /**
     * Getter du nom du fichier
     * @returns Nom du fichier
     */
    public getNom(): string { 
        return this.nom;
    }

    /**
     * Getter de l'icone du fichier
     * @returns Icone du fichier
     */
    public getIcone() {
        return this.icone;
    }

    /**
     * Getter de la couleur du fichier
     * @returns True si est rouge, false sinon
     */
    public getEstRouge(): boolean {
        return this.estRouge;
    }
    
    /**
     * Getter de la description éventuelle du fichier
     * @returns Description du fichier
     */
    public getDescription() {
        return this.description;
    }
    //#endregion

    //#region Constructeur
    /**
     * Constructeur de la classe abstraite
     * @param id ID du fichier
     * @param nom Nom du fichier
     * @param description Description (affichée en-dessous du fichier)
     * @param icone Icone sur lequel cliquer
     * @param estRouge Couleur de l'icone (blanc par défaut, peut être rouge)
     */
    public constructor(id : number, nom: string, description: string|JSX.Element, icone: ReactElement<SVGProps<SVGSVGElement>>, estRouge: boolean) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.icone = icone;
        this.estRouge = estRouge;
    }
    //#endregion

    //#region Méthodes d'affichage

    /**
     * Méthode abstraite d'affichage d'un fichier (pop-up s'ouvrant quand on clique dessus)
     * @returns {JSX.Element} Composant React pour l'affichage
     */
    public abstract recupererContenuFichier() : JSX.Element;

    //#endregion

}