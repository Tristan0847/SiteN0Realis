'use client';

import { Dossier } from '@BlogsShared/model/Dossier';
import { DossierItem } from '@BlogsFront/components/dossier/DossierItem';
import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';
import { useAuthContexte } from '@BlogsFront/contexts/AuthContext';

/**
 * Props du composant DossierList
 */
type DossierListProps = {
    dossiers: Dossier[];
    suppressionHandler?: (id: string, raison: string, cache: boolean) => Promise<void>;
}

/**
 * Méthode de composant pour afficher une liste de Dossiers
 * @param dossiers Liste des Dossiers à afficher
 * @returns Composant React contenant la liste de Dossiers
 */
export function DossierList({ dossiers, suppressionHandler }: DossierListProps) {
  // Récupération des styles
  const variant = useVariant();
  const styles = getVariantStyles(variant);

  return (
    <section className="mx-auto px-4">
      <div className={ styles.listeDossiersDiv }>
        <ul className={ styles.listeDossiersUl }>
          {dossiers.map(d => (
            <li key={d.getId()} className={ styles.listeDossiersLi }>
              <DossierItem dossier={d} suppressionHandler={ suppressionHandler } />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

