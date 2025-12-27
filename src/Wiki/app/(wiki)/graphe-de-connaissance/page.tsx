import { allArticles, Article } from "@Wiki/.contentlayer/generated";
import { PageGrapheDeConnaissance } from "@Wiki/contenuPages/PageGrapheDeConnaissance";


/**
 * Méthode de génération des métadonnées
 * @returns Métadonnées de la page
 */
export async function generateMetadata() {
    return {
        "title" : "Nos articles - Oeil de l'Occulte",
    }
}

/**
 * Page du graphe de connaissance du site
 * @returns Page du graphe de connaissance
 */
export default function PageGrapheGlobal() {

    // Sélection que des articles non cachés
    const articles : Article[] = allArticles.filter(article => !article.cache);

    return(<PageGrapheDeConnaissance articles={ articles } />);
}