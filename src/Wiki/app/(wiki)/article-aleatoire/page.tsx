"use client";

import { allArticles } from "contentlayer2/generated";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageOeilOcculte } from "@Wiki/contenuPages/Oeil";

/**
 * Méthode de génération de la page de redirection vers un article aléatoire
 * @returns Redirection vers un article aléatoire
 */
export default function ArticleAleatoire() {
    const router = useRouter();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * allArticles.length);
        router.replace(`/article/${allArticles[randomIndex].slug}`);
    }, []);

    return (<PageOeilOcculte />);
}
