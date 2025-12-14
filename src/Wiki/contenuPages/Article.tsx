"use client";

import { Article } from "@Wiki/.contentlayer/generated";
import { MDXContent } from "@Wiki/components/mdx/MDXContent";
import { HautDePage } from "@Wiki/components/Wiki/HautDePage";
import { Infobox } from "@Wiki/components/Wiki/Infobox";
import { TableDesMatieres } from "@Wiki/components/Wiki/TableDesMatieres";
import { useState } from "react";

/**
 * Props pour le composant PageArticle
 */
interface PageArticleProps {
    article: Article;
}

/**
 * Composant représentant la page d'un article du Wiki
 * @param article Article à afficher
 * @returns Composant de la page d'article
 */
export function PageArticle({ article } : PageArticleProps) {

    // État ouvert/fermé de la table des matières
    const tableDesMatieresExistante = article.headings && article.headings.length > 0;
    const [estOuvert, setEstOuvert] =  useState<boolean>(tableDesMatieresExistante);

    
    return (
        <div className="min-h-screen bg-gray-900">
            {tableDesMatieresExistante && (
                <TableDesMatieres headings={article.headings} estOuvert={estOuvert} setEstOuvert={setEstOuvert} />
            )}

            <div className={`transition-all duration-500 ${tableDesMatieresExistante ? (estOuvert ? "lg:ml-80" : 'lg:ml-20') : ''}`}>
                <div className="container mx-auto py-8">
                    <HautDePage 
                        titre={article.titre} 
                        dateCreation={article.dateCreation} 
                        auteur={article.auteur} 
                        nombreMots={article.nombreMots} 
                    />

                    {/* Contenu principal */}
                    {article.infobox && (
                        <Infobox data={article.infobox} />
                    )}
                    
                    <div className="prose prose-lg prose-invert max-w-none">
                        <MDXContent code={article.body.code} />
                    </div>
                </div>
            </div>
      </div>
    )
}