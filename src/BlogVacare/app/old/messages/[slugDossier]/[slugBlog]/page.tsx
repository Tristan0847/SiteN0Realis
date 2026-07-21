import PageMessagesClient from '@BlogsFront/app/_shared/messages/[slugDossier]/[slugBlog]/pageClient';
import {getMessagesParams} from '@BlogsFront/lib/routes-config';
import {Metadata} from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
    params: Promise<{ slugDossier: string; slugBlog: string }>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {

    const parametres = await params;

    return {
        title: `Blog ${parametres.slugBlog}`,
    };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default async function Page({params}: PageProps) {

    const {slugDossier, slugBlog} = await params;

    return <PageMessagesClient slugDossier={slugDossier} slugBlog={slugBlog}/>;
}


/**
 * Génère les paramètres de génération de pages statiques du projet (ici, chaque blog de chaque dossier)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
    return await getMessagesParams("old");
}

// Active les paramètres dynamiques
export const dynamicParams = false;