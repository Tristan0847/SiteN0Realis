import {PagePost} from "@BlogsFront/pagesclient/communaute/PagePost";
import {getPostParams} from "@BlogsFront/lib/routes-config";

/**
 * Props pour le composant
 */
interface PagePostProps {
    params: Promise<{slug: string}>;
}

/**
 * Page affichant un post et ses réponses
 * @param params Paramètres de la route, incluant le slug du post
 * @returns {JSX.Element}
 */
export default async function Page({params}: PagePostProps) {

    const {slug} = await params;

    return <PagePost slug={slug}/>;
}

/**
 * Génère les paramètres de génération de pages statiques du projet (ici, chaque post)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
    return await getPostParams();
}

// Active les paramètres dynamiques
export const dynamicParams = false;