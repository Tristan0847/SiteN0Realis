import {Metadata} from 'next';
import PageDossiersClient from '@BlogsFront/app/_shared/pageClient';
import {getPageAccueilParams} from '@BlogsFront/lib/routes-config';

export function generateMetadata(): Metadata {
    return {
        title: 'Accueil - Blog de Vacare',
    };
}

/**
 * Page d'accueil du site
 * @returns {JSX.Element} Composant React pour la page d'accueil
 */
export default async function Page() {

    return (
        <PageDossiersClient />
    );
}


/**
 * Génère les paramètres de génération de pages statiques du projet (ici, juste la page d'accueil en elle-même)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
    return await getPageAccueilParams();
}

// Active les paramètres dynamiques
export const dynamicParams = true;