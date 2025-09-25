import PageMessagesClient from '@BlogsFront/app/messages/[idDossier]/[idBlog]/pageClient';
import { Metadata } from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
    params: { idDossier: string; idBlog: string };
}

export async function generateMetadata({ params } : PageProps): Promise<Metadata> {

  const parametres = await params;

  return {
    title: `${parametres.idBlog} - ${parametres.idDossier} - Blog de Vacare`,
  };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default async function Page({ params }: PageProps) {
  const { idDossier, idBlog } = await params;
  
  return <PageMessagesClient idDossier={idDossier} idBlog={idBlog} />;
}
