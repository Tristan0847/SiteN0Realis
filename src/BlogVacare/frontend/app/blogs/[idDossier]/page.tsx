import PageBlogsClient from '@BlogsFront/app/blogs/[idDossier]/pageClient';
import { Metadata } from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
  params: Promise<{ idDossier: string }>;
}

export async function generateMetadata({ params } : PageProps): Promise<Metadata> {

  const parametres = await params;

  return {
    title: `${parametres.idDossier} - Blog de Vacare`,
  };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default async function Page({ params }: PageProps) {
  
  const { idDossier } = await params;

  // La page transmet l'idDossier au composant client (vue)
  return <PageBlogsClient idDossier={idDossier} />;
}
