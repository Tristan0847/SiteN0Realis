'use client';

import { ReactNode } from "react";

/**
 * Paramètres du conteneur
 */
type RatsConteneurProps = {
  children: ReactNode;
  className? : string;
};

/**
 * Méthode de composant pour afficher le conteneur des Rats
 * @returns Composant React contenant le conteneur des Rats
 */
export function RatsConteneur({ children, className = "" } : RatsConteneurProps) {

    const contenuSupplementaire = (className) ? className + " " : ""; 
    const classNameComplet = contenuSupplementaire + "min-h-screen w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 relative text-white font-serif flex flex-col items-center justify-center";

    return (
        <section className={ classNameComplet }>
            { children }
        </section>
    );
}