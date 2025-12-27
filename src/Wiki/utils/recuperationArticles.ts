import { allArticles, Article } from "contentlayer2/generated";


/**
 * Interface de données d'un article individuel
 */
export interface DonneesArticle {
    slug: string;
    titre: string;
    auteur: string;
    categorie: string;
    relations?: {
        explicit?: Array<{
            slug: string;
            type: string;
            force?: number;
            bidirectionnel?: boolean;
            description?: string;
        }>;
    }
}

/**
 * Méthode retournant les articles liés à un article donné
 * @param article Article dont on veut récupérer les relations
 * @returns Liste des articles liés
 */
export function recupererRelationsDeArticle(article : Article) : Article[] {
    // On vérifie que l'article existe bien
    if (allArticles.find(a => a.slug === article.slug) === undefined) {
        return [];
    }

    // On parcourt ensuite la liste des relations de cet article pour en retourner les données
    const relationsRecuperees : Article[] = [];
    relationsRecuperees.push(article); // On ajoute l'article de base aussi
    if (article.relations && article.relations.explicit) {
        for (const relation of article.relations.explicit) {
            // On cherche les articles qui sont dans une relation de l'article actuel
            const articleLie = allArticles.find(a => a.slug === relation.slug);
            if (articleLie && !articleLie.cache) {
                relationsRecuperees.push(articleLie);
            }
        }
    }
    // Recherche des articles qui référencent l'article actuel
    for (const autreArticle of allArticles) {
        if (!autreArticle.cache && autreArticle.relations && autreArticle.relations.explicit) {
            for (const relation of autreArticle.relations.explicit) {
                if (relation.slug === article.slug && !relation.cache) {
                    relationsRecuperees.push(autreArticle);
                }
            }
        }
    }
    return relationsRecuperees;
}