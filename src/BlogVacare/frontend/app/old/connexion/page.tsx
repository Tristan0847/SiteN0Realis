import { Metadata } from 'next';
import PageConnexionClient from '@BlogsFront/app/_shared/connexion/pageClient';
import { FakePageConnexion } from '@BlogsFront/components/auth/FakePageConnexion';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `La super page de connexion !`,
  };
}

/**
 * Page affichant la page de connexion du site
 * @returns {JSX.Element} Composant React pour la  page de connexion du site
 */
export default async function Page() {
  
    const mode = process.env.NEXT_PUBLIC_NEXT_ENV;
    if (mode == 'export') {
      return <FakePageConnexion />
    }

    return <PageConnexionClient />
}
