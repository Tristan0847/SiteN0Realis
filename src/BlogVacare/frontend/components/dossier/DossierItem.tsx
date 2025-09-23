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
        <div className="dossier">
            <div className="dossier-title">
                <Link href={`/blogs/${dossier.getId()}`}>
                {dossier.getTitre()}
                </Link>
            </div>
            <div className="dossier-desc">{dossier.getDescription()}</div>
        </div>
    );
}