import { Metadata } from 'next';
import PageDossiersClient from '@BlogsFront/app/pageClient';
import { getPageAccueilParams, getRouteDossiers } from '@BlogsFront/lib/routes-config';
import { Dossier, DossierJSON } from '@BlogsShared/model/Dossier';

export function generateMetadata(): Metadata {
  return {
    title: 'Accueil - Blog de Vacare',
  };
}

/**
 * Page d'accueil du site
 * @returns {JSX.Element} Composant React pour la page d'accueil
 */
export default async function Page() {

    let dossiersSerialises : DossierJSON[] = [];
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
      const dossiersPrecharges = await getRouteDossiers();
      dossiersSerialises = dossiersPrecharges.map(dossier => dossier.toJSON());
    }

    return(
        <PageDossiersClient dossiersPrecharges={ mode == "export" ? dossiersSerialises : undefined } />
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