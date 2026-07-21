"use client";

import OeilDeLOcculte, { OeilDeLOcculteProps } from "@Wiki/components/OeilDeLOcculte";
import Link from "next/link";

/**
 * Props pour le composant BaseJournalOwl
 */
interface BaseJournalOwlProps {
    oeilOcculteProps?: OeilDeLOcculteProps;
    contenu: React.ReactNode;
}

/**
 * Composant de base pour le journal d'Owl, oeil occulte en arrière-plan
 * @param oeilOcculteProps Propriétés pour le composant OeilDeLOcculte
 * @param contenu Contenu à afficher par-dessus l'oeil 
 * @returns 
 */
export function BaseJournalOwl({ oeilOcculteProps = { mode: "suitSouris", vitesse: 0.1, tailleIris: "petit", couleur: "noir", opacite: 10 }, contenu }: BaseJournalOwlProps) {

  return (
    <div className="relative min-h-screen flex flex-col items-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <OeilDeLOcculte {...oeilOcculteProps} />
        </div>

        <div className="relative z-10 max-w-4xl py-8 px-4 space-y-4 text-center text-gray-300">
            {contenu}
            <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm mt-4 inline-block">
                Retourner à l'accueil
            </Link>
        </div>
    </div>
  );

}