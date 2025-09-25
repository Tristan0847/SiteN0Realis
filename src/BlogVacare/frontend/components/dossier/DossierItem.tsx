'use client';

import Link from 'next/link';
import { Dossier } from '@BlogsShared/model/Dossier';

/**
 * Props du composant DossierItem
 */
type DossierItemProps = {
    dossier: Dossier;
}

/**
 * Fonction de composant permettant l'affichage d'un Dossier envoyé en paramètre
 * @param dossier Dossier à afficher
 * @returns Composant React
 */
export function DossierItem({ dossier }: DossierItemProps) {
    return (
    <div className="text-left p-4 w-full hover:bg-gray-600/10 rounded-lg transition-colors duration-300">
        <div className="text-xl font-bold text-primary-dark mb-2 border-b-2 border-stone-500/50 pb-2">
            <Link href={`/blogs/${dossier.getId()}`} className="hover:underline">
            {dossier.getTitre()}
            </Link>
        </div>
        
        <div className="text-neutral-dark">{dossier.getDescription()}</div>
    </div>
  );
}