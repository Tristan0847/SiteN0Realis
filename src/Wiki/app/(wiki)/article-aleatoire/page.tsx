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
        const slug = allArticles[randomIndex].slug;

        const timer = setTimeout(() => {
            router.replace(`/article/${slug}`);
        }, 847);

        return () => clearTimeout(timer);
    }, []);

    return (<PageOeilOcculte />);
}
