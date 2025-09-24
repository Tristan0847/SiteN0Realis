import PageMessagesClient from '@BlogsFront/app/messages/[idDossier]/[idBlog]/pageClient';
import { Metadata } from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
    params: { idDossier: string; idBlog: string };
}

export function generateMetadata({ params } : PageProps): Metadata {
  return {
    title: `${params.idBlog} - ${params.idDossier} - Blog de Vacare`,
  };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default function Page({ params }: PageProps) {
  const { idDossier, idBlog } = params;
  
  return <PageMessagesClient idDossier={idDossier} idBlog={idBlog} />;
}
