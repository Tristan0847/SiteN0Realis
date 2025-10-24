import { Metadata } from 'next';
import PageDossiersClient from '@BlogsFront/app/_shared/pageClient';
import { getPageAccueilParams, getRouteDossiers } from '@BlogsFront/lib/routes-config';
import { DossierJSON } from '@BlogsShared/model/Dossier';
import { getDossiersPrecharges } from '@BlogsFront/app/_shared/pageGetter';

export function generateMetadata(): Metadata {
  return {
    title: 'Forum de SuperFlashAtomicMan et Vince',
  };
}

/**
 * Page d'accueil du site
 * @returns {JSX.Element} Composant React pour la page d'accueil
 */
export default async function Page() {

    let dossiersSerialises : DossierJSON[] = await getDossiersPrecharges();

    return(
        <PageDossiersClient dossiersPrecharges={ dossiersSerialises.length > 0 ? dossiersSerialises : undefined } />
    );
}


/**
 * Génère les paramètres de génération de pages statiques du projet (ici, juste la page d'accueil en elle-même)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
  return await getPageAccueilParams();
}
// Désactive les paramètres dynamiques
export const dynamicParams = false;