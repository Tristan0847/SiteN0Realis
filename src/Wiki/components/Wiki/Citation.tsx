import { ReactNode } from "react";

/**
 * Props pour le composant Citation
 */
interface CitationProps {
    children: ReactNode;
    auteur?: string;
}

/**
 * Composant Citation pour afficher une citation avec un auteur optionnel
 * @param children Citation à afficher
 * @param auteur Auteur de la citation (optionnel)
 * @returns Composant de la citation
 */
export function Citation({ children, auteur }: CitationProps) {
    return (
        <blockquote className="border-l-3 border-gray-400 pl-4 italic my-4">
            {children}
            {auteur && <span className="text-sm text-gray-600 mt-2">— {auteur}</span>}
        </blockquote>
    );
}