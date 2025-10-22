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
    <section className="mx-auto px-4">
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <ul className="divide-y divide-stone-200">
          {dossiers.map(d => (
            <li key={d.getId()} className="py-5 hover:bg-stone-50 transition px-4 rounded-md">
              <DossierItem dossier={d} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

