import { Metadata } from 'next';
import PageConnexionClient from './pageClient';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Page de connexion - Blog de Vacare`,
  };
}

/**
 * Page affichant la page de connexion du site
 * @returns {JSX.Element} Composant React pour la  page de connexion du site
 */
export default async function Page() {
  
    return <PageConnexionClient />
}
