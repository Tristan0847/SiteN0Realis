"use client";
import { JSX, ReactElement, SVGProps } from "react";
import { FichierAbstract } from "./FichierAbstract";

/**
 * Fichier audio
 */
export class FichierTexte extends FichierAbstract {

    private contenu : JSX.Element;

    //#region Constructeur
    /**
     * Constructeur de la classe abstraite
     * @param id ID du fichier
     * @param nom Nom du fichier
     * @param description Description (affichée en-dessous du fichier)
     * @param estRouge Couleur de l'icone (blanc par défaut, peut être rouge)
     * @param src Source du fichier audio
     */
    public constructor(id : number, nom: string, description: string|JSX.Element, estRouge: boolean, contenu : JSX.Element) {
        
        const couleur = estRouge ? "red" : "white" ;
        const icone : ReactElement<SVGProps<SVGSVGElement>> = (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 90 90" className="w-24 h-24">
        <g stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round">
            <path d="M 77.474 17.28 L 61.526 1.332 C 60.668 0.473 59.525 0 58.311 0 H 15.742 c -2.508 0 -4.548 2.04 -4.548 4.548 v 80.904 c 0 2.508 2.04 4.548 4.548 4.548 h 58.516 c 2.508 0 4.549 -2.04 4.549 -4.548 V 20.496 C 78.807 19.281 78.333 18.138 77.474 17.28 z M 61.073 5.121 l 12.611 12.612 H 62.35 c -0.704 0 -1.276 -0.573 -1.276 -1.277 V 5.121 z M 74.258 87 H 15.742 c -0.854 0 -1.548 -0.694 -1.548 -1.548 V 4.548 C 14.194 3.694 14.888 3 15.742 3 h 42.332 v 13.456 c 0 2.358 1.918 4.277 4.276 4.277 h 13.457 v 64.719 C 75.807 86.306 75.112 87 74.258 87 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 68.193 33.319 H 41.808 c -0.829 0 -1.5 -0.671 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 26.385 c 0.828 0 1.5 0.671 1.5 1.5 S 69.021 33.319 68.193 33.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 34.456 33.319 H 21.807 c -0.829 0 -1.5 -0.671 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 12.649 c 0.829 0 1.5 0.671 1.5 1.5 S 35.285 33.319 34.456 33.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <linearGradient id="SVGID_1" gradientUnits="userSpaceOnUse" x1="21.8064" y1="19.2332" x2="42.2984" y2="19.2332">
        <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity={1}/>
        <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity={1}/>
        </linearGradient>
        <line x1="-10.246" y1="0" x2="10.246" y2="0" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) "/>
            <path d="M 42.298 20.733 H 21.807 c -0.829 0 -1.5 -0.671 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 20.492 c 0.829 0 1.5 0.671 1.5 1.5 S 43.127 20.733 42.298 20.733 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 68.193 44.319 H 21.807 c -0.829 0 -1.5 -0.671 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 46.387 c 0.828 0 1.5 0.671 1.5 1.5 S 69.021 44.319 68.193 44.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 48.191 55.319 H 21.807 c -0.829 0 -1.5 -0.672 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 26.385 c 0.828 0 1.5 0.672 1.5 1.5 S 49.02 55.319 48.191 55.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 68.193 55.319 H 55.544 c -0.828 0 -1.5 -0.672 -1.5 -1.5 s 0.672 -1.5 1.5 -1.5 h 12.649 c 0.828 0 1.5 0.672 1.5 1.5 S 69.021 55.319 68.193 55.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 68.193 66.319 H 21.807 c -0.829 0 -1.5 -0.672 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 46.387 c 0.828 0 1.5 0.672 1.5 1.5 S 69.021 66.319 68.193 66.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
            <path d="M 68.193 77.319 H 55.544 c -0.828 0 -1.5 -0.672 -1.5 -1.5 s 0.672 -1.5 1.5 -1.5 h 12.649 c 0.828 0 1.5 0.672 1.5 1.5 S 69.021 77.319 68.193 77.319 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round" transform=" matrix(1 0 0 1 0 0) " />
        </g>
        </svg>);

        super(id, nom + ".txt", description, icone, estRouge);

        // Texte à afficher
        this.contenu = contenu;
    }
    //#endregion

    public recupererContenuFichier() : JSX.Element {
        return this.contenu;
    }
}