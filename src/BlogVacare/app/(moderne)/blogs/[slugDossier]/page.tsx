import PageBlogsClient from '@BlogsFront/app/_shared/blogs/[slugDossier]/pageClient';
import {getDossierBlogsParams} from '@BlogsFront/lib/routes-config';
import {Metadata} from 'next';

/**
 * Props pour la page des blogs
 */
interface PageProps {
    params: Promise<{ slugDossier: string }>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {

    const parametres = await params;

    return {
        title: `${parametres.slugDossier} - Blog de Vacare`,
    };
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param params Paramètres de la route, incluant l'ID du dossier
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default async function Page({params}: PageProps) {

    const {slugDossier} = await params;

    return <PageBlogsClient slugDossier={slugDossier}/>;
}

/**
 * Génère les paramètres de génération de pages statiques du projet (ici, chaque dossier de blogs)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
    return await getDossierBlogsParams("modern");
}

// Active les paramètres dynamiques
export const dynamicParams = true;