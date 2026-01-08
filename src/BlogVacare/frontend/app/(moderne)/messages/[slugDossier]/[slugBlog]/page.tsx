import PageMessagesClient from '@BlogsFront/app/_shared/messages/[slugDossier]/[slugBlog]/pageClient';
import { getMessagesPrecharges } from '@BlogsFront/app/_shared/messages/[slugDossier]/[slugBlog]/pageGetter';
import { getMessagesParams } from '@BlogsFront/lib/routes-config';
import { MessageJSON } from '@BlogsShared/model/Message';
import { Metadata } from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
    params: Promise<{ slugDossier: string; slugBlog: string }>;
}

export async function generateMetadata({ params } : PageProps): Promise<Metadata> {

  const parametres = await params;

  return {
    title: `${parametres.slugBlog} -  Blog de Vacare`,
  };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default async function Page({ params }: PageProps) {

  const { slugDossier, slugBlog } = await params;

  const messagesSerialises : MessageJSON[] = await getMessagesPrecharges(slugDossier, slugBlog, "modern");
  
  return <PageMessagesClient slugDossier={slugDossier} slugBlog={slugBlog} messagesPrecharges={ messagesSerialises.length > 0 ? messagesSerialises : undefined } />;
}


/**
 * Génère les paramètres de génération de pages statiques du projet (ici, chaque blog de chaque dossier)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
  return await getMessagesParams("modern");
}
// Active les paramètres dynamiques
export const dynamicParams = false;