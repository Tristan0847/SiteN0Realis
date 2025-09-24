import PageBlogsClient from '@BlogsFront/app/blogs/[idDossier]/pageClient';
import { Metadata } from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
  params: { idDossier: string };
}

export function generateMetadata({ params } : PageProps): Metadata {
  return {
    title: `${params.idDossier} - Blog de Vacare`,
  };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default function Page({ params }: PageProps) {
  const { idDossier } = params;
  // La page transmet l'idDossier au composant client (vue)
  return <PageBlogsClient idDossier={idDossier} />;
}
