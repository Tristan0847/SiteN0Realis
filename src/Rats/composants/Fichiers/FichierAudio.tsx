"use client";
import { JSX, ReactElement, SVGProps } from "react";
import { FichierAbstract } from "./FichierAbstract";

/**
 * Fichier audio
 */
export class FichierAudio extends FichierAbstract {

    private src : string;

    //#region Constructeur
    /**
     * Constructeur de la classe abstraite
     * @param id ID du fichier
     * @param nom Nom du fichier
     * @param description Description (affichée en-dessous du fichier)
     * @param estRouge Couleur de l'icone (blanc par défaut, peut être rouge)
     * @param src Source du fichier audio
     */
    public constructor(id : number, nom: string, description: string|JSX.Element, estRouge: boolean, src : string) {
        
        const couleur = estRouge ? "red" : "white" ;
        const icone : ReactElement<SVGProps<SVGSVGElement>> = (
        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 90 90" className="w-24 h-24">
        <g stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round">
            <path d="M 64.741 90 c -0.246 0 -0.49 -0.091 -0.679 -0.266 L 36.186 63.998 H 5.632 c -0.552 0 -1 -0.447 -1 -1 V 27.001 c 0 -0.552 0.448 -1 1 -1 h 30.554 L 64.063 0.265 c 0.293 -0.27 0.718 -0.34 1.08 -0.181 C 65.506 0.243 65.741 0.603 65.741 1 v 88 c 0 0.397 -0.235 0.757 -0.599 0.916 C 65.014 89.973 64.877 90 64.741 90 z M 6.632 61.998 h 29.945 c 0.251 0 0.494 0.095 0.678 0.266 l 26.486 24.452 V 3.284 L 37.255 27.736 c -0.185 0.17 -0.427 0.265 -0.678 0.265 H 6.632 V 61.998 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round"/>
            <path d="M 77.151 73.534 c -0.234 0 -0.469 -0.081 -0.658 -0.247 c -0.416 -0.364 -0.458 -0.996 -0.095 -1.411 c 4.234 -4.841 6.97 -15.39 6.97 -26.876 c 0 -11.486 -2.735 -22.035 -6.97 -26.875 c -0.363 -0.416 -0.321 -1.047 0.095 -1.411 c 0.414 -0.363 1.046 -0.322 1.411 0.095 c 4.604 5.263 7.464 16.066 7.464 28.192 s -2.86 22.929 -7.464 28.192 C 77.706 73.419 77.43 73.534 77.151 73.534 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round"/>
            <path d="M 72.649 61.986 c -0.16 0 -0.323 -0.039 -0.475 -0.12 c -0.486 -0.263 -0.667 -0.87 -0.404 -1.355 c 1.973 -3.647 3.15 -9.445 3.15 -15.511 c 0 -6.065 -1.178 -11.863 -3.15 -15.511 c -0.263 -0.486 -0.082 -1.092 0.404 -1.355 c 0.486 -0.265 1.092 -0.081 1.355 0.404 c 2.154 3.984 3.391 9.985 3.391 16.462 c 0 6.478 -1.236 12.478 -3.391 16.462 C 73.349 61.797 73.005 61.986 72.649 61.986 z" stroke="none" strokeWidth={1} fill={ couleur } opacity={100} strokeLinecap="round"/>
        </g>
        </svg>);

        super(id, nom + ".mp3", description, icone, estRouge);

        // Paramètres du fichier (source)
        this.src = src;
    }
    //#endregion

    public recupererContenuFichier() : JSX.Element {
        return(<audio src={ this.src } controls className="w-full" />);
    }
}