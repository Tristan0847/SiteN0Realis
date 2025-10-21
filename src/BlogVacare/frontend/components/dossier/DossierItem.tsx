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
    <div className="text-left p-4 w-full rounded-lg border border-stone-200 bg-gradient-to-b from-white via-neutral-50 to-stone-100
        shadow-sm hover:shadow-lg hover:border-primary hover:scale-[1.01] transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2 border-b border-stone-300 pb-2">
        <Link href={`/blogs/${dossier.getSlug()}`} className="text-xl font-bold text-primary-dark hover:text-cyan-600 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-cyan-600 group-hover:after:w-full after:transition-all after:duration-300">
          {dossier.getTitre()}
        </Link>
      </div>

      <div className="text-neutral-dark text-base leading-relaxed">
        {dossier.getDescription()}
      </div>
      <div className="text-neutral-dark text-base leading-relaxed">
        Créé par {dossier.getUtilisateur().getUsername()}
      </div>
    </div>
  );
}
