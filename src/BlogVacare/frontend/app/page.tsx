import { Metadata } from 'next';
import PageDossiersClient from './pageClient';

export function generateMetadata(): Metadata {
  return {
    title: 'Accueil - Blog de Vacare',
  };
}

/**
 * Page d'accueil du site
 * @returns {JSX.Element} Composant React pour la page d'accueil
 */
export default function Page() {
    return(
        <PageDossiersClient />
    );
}