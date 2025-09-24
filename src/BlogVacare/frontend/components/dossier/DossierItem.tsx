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
    <div className="p-4 border border-neutral-light rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white max-w-md">
        <div className="text-xl font-bold text-primary-dark mb-1">
            <Link href={`/blogs/${dossier.getId()}`} className="hover:underline">
            {dossier.getTitre()}
            </Link>
        </div>
        
        <div className="text-neutral-dark">{dossier.getDescription()}</div>
    </div>
  );
}