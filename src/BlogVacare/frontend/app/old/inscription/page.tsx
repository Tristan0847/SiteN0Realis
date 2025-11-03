import { Metadata } from 'next';
import PageInscriptionClient from '@BlogsFront/app/_shared/inscription/pageClient';
import { FakePageInscription } from '@BlogsFront/components/auth/FakePageInscription';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `La super page d'inscription !`,
  };
}

/**
 * Page affichant la page d'inscription du site
 * @returns {JSX.Element} Composant React pour la page d'inscription du site
 */
export default async function Page() {
  
    const mode = process.env.NEXT_BUILD_MODE;
    if (mode == 'export') {
      return <FakePageInscription />
    }

    return <PageInscriptionClient />
}
