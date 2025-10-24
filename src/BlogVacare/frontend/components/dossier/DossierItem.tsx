'use client';

import Link from 'next/link';
import { Dossier } from '@BlogsShared/model/Dossier';
import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';

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
  // Récupération des styles
  const variant = useVariant();
  const styles = getVariantStyles(variant);
    const baseUrl = (variant == "modern") ? "" : "/" + variant;

  return (
    <div className={ styles.listeDossierItem }>
      <div className={ styles.listeDossierLienConteneur}>
        <Link href={`${baseUrl}/blogs/${dossier.getSlug()}`} className={ styles.listeDosierLien }>
          {dossier.getTitre()}
        </Link>
      </div>

      <div className={ styles.listeDossierItemSoustitre }>
        {dossier.getDescription()}
      </div>
      <div className={ styles.listeDossierItemSoustitre }>
        Créé par {dossier.getUtilisateur().getUsername()}
      </div>
    </div>
  );
}
