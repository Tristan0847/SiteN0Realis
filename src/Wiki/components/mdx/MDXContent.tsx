"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { ArticlesLies } from "@Wiki/components/Wiki/ArticlesLies";
import { Citation } from "@Wiki/components/Wiki/Citation";
import { ArbreGenealogique } from "@Wiki/components/Wiki/ArbreGenealogique";
import { ComposantsCustom } from "@Wiki/components/Wiki/ComposantsCustom";
import { NDA } from "@Wiki/components/Wiki/NDA";
import { ImageFlottante, SectionAvecImageFlottante } from "@Wiki/components/Wiki/ImageFlottante";

/**
 * Props pour le composant MDXContent
 */
interface MDXContentProps {
    code: string
}

// Composants custom pour remplacer les éléments HTML par défaut
const components = {
    // Composants custom
    Citation,
    NDA,
    ArticlesLies,
    ArbreGenealogique,
    ImageFlottante, SectionAvecImageFlottante,
    
    // Titres personnalisés
    ...ComposantsCustom
}

/**
 * Composant MDXContent pour rendre le contenu MDX avec des styles personnalisés
 * @param code Code MDX à rendre 
 * @returns Contenu MDX stylisé
 */
export function MDXContent({ code }: MDXContentProps) {
    const Component = useMDXComponent(code)
    
    return (
        <article className="prose prose-lg prose-invert max-w-none
        prose-headings:font-bold 
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-white
        prose-a:text-blue-400
        prose-strong:text-gray-900 prose-strong:dark:text-white
        ">
        <Component components={components} />
        </article>
    )
}