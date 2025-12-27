import { PageAccueil } from "@Wiki/contenuPages/Accueil";
import { allArticles } from "contentlayer2/generated";
import { Article } from "contentlayer2/generated";

/**
 * Méthode de génération des métadonnées pour la page d'accueil
 * @returns Métadonnées de la page
 */
export async function generateMetadata() {
    return {
        "title" : "Page d'accueil - Oeil de l'Occulte",
    }
}


/**
 * Méthode de génération du contenu de la page d'accueil
 * @returns Contenu de la page
 */
export default async function WikiPageAccueil() {

    const articles : Article[] = await allArticles;

    return(
        <PageAccueil articles={ articles } />
    )
}