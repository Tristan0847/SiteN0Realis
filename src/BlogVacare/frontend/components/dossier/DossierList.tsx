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
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold text-primary-dark drop-shadow-md leading-tight">
          Bienvenue sur le Blog de Vacare
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-neutral-700 leading-relaxed px-2">
          Anciennement blog de Vince et de son meilleur ami, ce forum est aujourd&apos;hui celui de Vacare et, par conséquent, de <strong>N0Realis</strong>.<br/>
          Espace réservé aux employés autorisés, ne contactez Vacare qu&apos;en cas de nécessité absolue.<br/>
          <strong>Nos rêves deviendront réalité.</strong>
        </p>
      </div>

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

