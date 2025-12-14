"use client";

import { Article } from "@Wiki/.contentlayer/generated";
import { GrapheDeConnaissance } from "@Wiki/components/GrapheDeConnaissance";
import { A, H2, P, TexteRouge } from "@Wiki/components/Wiki/ComposantsCustom";
import { recupererRelationsDeArticle } from "@Wiki/utils/recuperationArticles";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AccueilProps {
    articles: Article[];
}

/**
 * Méthode de génération du contenu de la page d'accueil
 */
export function PageAccueil({ articles }: AccueilProps) {
    
    const [articleCentral, setArticleCentral] = useState<Article | undefined>(undefined);
    const [articlesAffiches, setArticlesAffiches] = useState<Article[]>([]);

    // Sélection d'un article aléatoire à afficher sur le graphe d'accueil
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const articleChoisi = articles[randomIndex];
        const relations = recupererRelationsDeArticle(articleChoisi);

        setArticleCentral(articleChoisi);
        setArticlesAffiches(relations);
    }, [articles])


    return(<>
    <H2>L'Oeil de l'Occulte vous souhaite la bienvenue</H2>
    <p className="text-xl pb-4">AntiR, Dr Owl et tous les autres contributeurs vous accueillent en ces lieux et vous remercient sincèrement de l'intérêt que vous pourriez porter à notre projet !</p>
    <p className="text-center text-xl space-y-4"><TexteRouge niveau={100}>L'Oeil de l'Occulte est notre répertoire de vérités cachées.</TexteRouge>
    <br/><TexteRouge niveau={300}>Là où ce que ce monde rejette, nous l'embrassons,</TexteRouge>
    <br/><TexteRouge niveau={500}>Là où tout ce que vous occultez prend forme,</TexteRouge>
    <br/><TexteRouge niveau={700}>Là où les ténèbres deviennent lumière.</TexteRouge></p>
    
    <H2>Besoin d'une piste de départ ?</H2>
    <p className="text-xl py-4">N'hésitez pas à <A href='/recherche'>faire une recherche</A> pour trouver un article qui vous intéresserait !</p>
    <p className="text-xl py-4">Trouvez ci-dessous un schéma réduit des différentes liaisons entre nos articles ! Un article aléatoire sélectionné, toutes ses connexion révélées ! Cliquez sur un article pour en savoir plus à son sujet !</p>
    <p className="text-xl my-4 text-center">Pourquoi pas découvrir... {articleCentral ? (<Link href={articleCentral ? `/article/${articleCentral.slug}` : "#"} className="font-bold text-2xl underline hover:bg-gray-400/80 p-2">{articleCentral.titre}</Link>) : "l'article qui est en cours de chargement..."} !</p>
    <GrapheDeConnaissance articles={ articlesAffiches } slugCentral={ (articleCentral) ? articleCentral.slug : "" } avecFiltres={false} />
    </>);
}