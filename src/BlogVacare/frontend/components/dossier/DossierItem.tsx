'use client';

import Link from 'next/link';
import { Dossier } from '@BlogsShared/model/Dossier';
import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';
import { useState } from 'react';
import SuppressionBox from '@BlogsFront/components/SuppressionBox';
import ElementSupprimeBox from '@BlogsFront/components/ElementSupprimeBox';

/**
 * Props du composant DossierItem
 */
type DossierItemProps = {
    dossier: Dossier;
    suppressionHandler?: (id: string, raison: string, cache: boolean) => Promise<void>;
}

/**
 * Fonction de composant permettant l'affichage d'un Dossier envoyé en paramètre
 * @param dossier Dossier à afficher
 * @returns Composant React
 */
export function DossierItem({ dossier, suppressionHandler }: DossierItemProps) {

  // Récupération des styles
  const variant = useVariant();
  const styles = getVariantStyles(variant);
  const baseUrl = (variant == "modern") ? "" : "/" + variant;

  // Mise en place de la dialog box de suppression
  const [dialogBoxOuverte, setDialogBox] = useState(false);
  const suppression = dossier.getElementSupprime();

  return (
    <div className={ styles.listeDossierItem }>
      <div className={ styles.listeDossierLienConteneur}>
        <Link href={`${baseUrl}/blogs/${dossier.getSlug()}`} className={ styles.listeDosierLien }>
          {dossier.getTitre()}
        </Link>

        {suppressionHandler && !suppression && (
          <div>
            <button onClick={() => setDialogBox(true)} className={ styles.supprimerDossierBtn }>Supprimer</button>

            <SuppressionBox id={ dossier.getId() } type={ "dossier" } suppressionHandler={ suppressionHandler } dialogBoxOuverte={ dialogBoxOuverte } setDialogBox={ setDialogBox } />
          </div>
        )}
      </div>

      <div className={ styles.listeDossierItemSoustitre }>
        {dossier.getDescription()}
      </div>
      <div className={ styles.listeDossierItemSoustitre }>
        Créé par {dossier.getUtilisateur().getUsername()}
      </div>
      {suppression && (
        <ElementSupprimeBox type={ "dossier" } donnees={ suppression }/>
      )}
    </div>
  );
}
