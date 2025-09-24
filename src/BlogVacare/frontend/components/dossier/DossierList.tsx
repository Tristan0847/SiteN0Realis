'use client';

import { Dossier } from '@BlogsShared/model/Dossier';
import { DossierItem } from '@BlogsFront/components/dossier/DossierItem';

/**
 * Props du composant DossierList
 */
type DossierListProps = {
    dossiers: Dossier[];
}

/**
 * Méthode de composant pour afficher une liste de Dossiers
 * @param dossiers Liste des Dossiers à afficher
 * @returns Composant React contenant la liste de Dossiers
 */
export function DossierList({ dossiers }: DossierListProps) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {dossiers.map(d => (
            <li key={d.getId()}>
                <DossierItem dossier={d}/>
            </li>
        ))}
        </ul>
    );
}