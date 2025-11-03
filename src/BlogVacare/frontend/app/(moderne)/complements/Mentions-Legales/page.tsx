import { Metadata } from 'next';
import { MentionsLegales } from '@BlogsFront/components/complements/MentionsLegales';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Mentions légales du site`,
  };
}

/**
 * Page affichant la page de mentions légales du site
 * @returns {JSX.Element} Composant React pour la page de mentions légales du site
 */
export default async function Page() {
  
  return <MentionsLegales />
}
