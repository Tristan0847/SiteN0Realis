
import { PageArticle } from "@Wiki/contenuPages/Article";
import { allArticles } from "contentlayer2/generated";
import { notFound } from "next/navigation";

/**
 * Méthode de génération des métadonnées pour une page d'article du Wiki
 * @param params Paramètres de la page (slug de l'article)
 * @returns Métadonnées de la page
 */
export async function generateMetadata({ params } : { params: Promise<{ slug : string }> }) {

    const paramsCharges = await params;
    const article = await allArticles.find((article) => article.slug === paramsCharges.slug);

    const titre = article ? article.titre : "Article non trouvé";
    const description = article ? article.body.raw.slice(0, 200) + "..." : "L'article que vous recherchez est introuvable.";

    return {
        title: titre,
        description: description,
    };
}

/**
 * Méthode de génération du contenu de la page d'un article du Wiki
 * @param params Paramètres de la page (slug de l'article)
 * @returns Contenu de la page
 */
export default async function ArticlePage({ params }: { params: Promise<{ slug : string }> }) {

    const paramsCharges = await params;
    const article = allArticles.find((article) => article.slug === paramsCharges.slug);

    // Si l'article n'existe pas, on affiche une page 404
    if (!article) {
        notFound();
    }
    
    return(<PageArticle article={article} />);
}

/**
 * Génération des paramètres statiques pour les pages d'articles du Wiki (on récupère tous les slugs)
 * @returns Liste des slugs des articles
 */
export async function generateStaticParams() {
    if (allArticles.length === 0) {
        console.warn('⚠️ Aucun article trouvé par Contentlayer');
        return [];
    }

    return allArticles.map((article) => ({
        slug: article.slug
    }))
};

export const dynamicParams = false;