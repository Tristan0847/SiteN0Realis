import Link from "next/link";
import { ReactNode } from "react";

interface BaseProps {
    children: string | ReactNode;
    id?: string;
}

interface LinkProps extends BaseProps {
    href: string;
}

// Composants de titres

/**
 * Composant pour le titre de niveau 1
 * @param children Contenu du titre
 * @returns Composant H1
 */
export const H1 = ({ children, id = "" }: BaseProps) => (
    <h1 id={id} className="text-4xl font-bold mb-4 text-white border-b-1 border-gray-300 pb-2">
        {children}
    </h1>
);

/**
 * Composant pour le titre de niveau 2
 * @param children Contenu du titre
 * @returns Composant H2
 */
export const H2 = ({ children, id = "" }: BaseProps) => (
    <h2 id={id} className="text-2xl font-bold mt-8 mb-4 text-white border-b-2 border-gray-400 pb-2">
        {children}
    </h2>
);

/**
 * Composant pour le titre de niveau 3
 * @param children Contenu du titre
 * @returns Composant H3
 */
export const H3 = ({ children, id = "" }: BaseProps) => (
    <h3 id={id} className="text-xl font-semibold mt-6 mb-3 text-white underline underline-offset-4 decoration-1 decoration-gray-300">
        {children}
    </h3>
);

/**
 * Composant pour le titre de niveau 4
 * @param children Contenu du titre
 * @returns Composant H4
 */
export const H4 = ({ children, id = "" }: BaseProps) => (
    <h4 id={id} className="text-lg font-medium mt-4 mb-2 text-white">
        {children}
    </h4>
);

// Paragraphes

/**
 * Composant pour les paragraphes
 * @param children Contenu du paragraphe
 * @returns Composant P
 */
export const P = ({ children }: BaseProps) => (
    <p className="mb-4 text-white leading-relaxed">
        {children}
    </p>
);

/**
 * composant pour centrer le contenu
 * @param children Contenu à centrer
 * @returns Composant Center
 */
export const Center = ({ children }: BaseProps) => (
    <div className="text-center my-4">
        {children}
    </div>
);

/**
 * Composant pour le texte rouge
 * @param children Contenu du texte
 * @param niveau Niveau de rouge (100 à 900)
 * @returns Composant TexteRouge
 */
export const TexteRouge = ({ children, niveau=  200 } : { children: string | ReactNode; niveau?: number }) => (
    <span className={ `text-red-${niveau}` }>
        { children }
    </span>
)

// Listes
/**
 * Composant pour les listes non ordonnées
 * @param children Contenu de la liste
 * @returns Composant UL
 */
export const UL = ({ children }: BaseProps) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-white">
        {children}
    </ul>
);

/**
 * Composant pour les listes ordonnées
 * @param children Contenu de la liste
 * @returns Composant OL
 */
export const OL = ({ children }: BaseProps) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-white">
        {children}
    </ol>
);

/**
 * Composant pour les éléments de liste
 * @param children Contenu de l'élément de liste
 * @returns Composant LI
 */
export const LI = ({ children }: BaseProps) => (
    <li className="ml-4">
        {children}
    </li>
);

// Liens
/**
 * Composant pour les liens
 * @param children Contenu du lien
 * @returns Composant A
 */
export const A = ({ href, children }: LinkProps) => (
    <Link href={href} className="text-blue-400 hover:underline font-medium">
        {children}
    </Link>
);

// Code
/**
 * Composant pour le code
 * @param children Contenu du code
 * @returns Composant Code
 */
export const Code = ({ children }: BaseProps) => (
    <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-blue-400">
        {children}
    </code>
);

/**
 * Composant pour le bloc de préformatage
 * @param children Contenu du bloc
 * @returns Composant Pre
 */
export const Pre = ({ children }: BaseProps) => (
    <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
            {children}
        </code>
    </pre>
);

// Emphase
/**
 * Composant pour le texte en gras
 * @param children Contenu du texte
 * @returns Composant Strong
 */
export const Strong = ({ children }: BaseProps) => (
    <strong className="font-bold text-white">
        {children}
    </strong>
);

/**
 * Composant pour le texte en italique
 * @param children Contenu du texte
 * @returns Composant Em
 */
export const Em = ({ children }: BaseProps) => (
    <em className="italic text-gray-300">
        {children}
    </em>
);

// Export par défaut pour une utilisation facile
/**
 * Export des composants custom
 */
export const ComposantsCustom = {
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    Center: Center,
    TexteRouge: TexteRouge,
    ul: UL,
    ol: OL,
    li: LI,
    a: A,
    code: Code,
    pre: Pre,
    strong: Strong,
    em: Em
};