"use client";
import { useState, useEffect } from 'react';
import { Heading } from '@Wiki/contentlayer.config';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';


/**
 * Props pour le composant TableDesMatieres
 */
interface TableDesMatieresProps {
  headings: Heading[];
  estOuvert: boolean;
  setEstOuvert: (ouvert: boolean) => void;
}

/**
 * Composant affichant la table des matières d'un article
 * @param headings Liste des titres extraits de l'article
 * @param estOuvert État d'ouverture de la table des matières
 * @param setEstOuvert Fonction pour modifier l'état d'ouverture
 * @returns Composant de table des matières
 */
export function TableDesMatieres({ headings, estOuvert, setEstOuvert }: TableDesMatieresProps) {
    
    // État pour le titre actif au scroll
    const [activeId, setActiveId] = useState<string>("");
    
    // Effet pour gérer la mise à jour du scroll et le titre actif
    useEffect(() => {
        // On utilise intersection observer pour détecter le titre actif
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Si l'élément est intersecté, on met à jour l'ID actif
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0% -35% 0%' }
        );
        
        // On observe chaque titre
        headings.forEach((heading) => {
            const element = document.getElementById(heading.slug);
            // Si l'élément existe, on l'observe
            if (element) observer.observe(element);
        });
        
        // Nettoyage à la désactivation du composant
        return () => observer.disconnect();
    }, [headings]);
    
    // S'il n'y a pas d'en-têtes, on n'affiche rien
    if (headings.length === 0) return null;
    
    // Table des matières
    return (
        <>
        {/* Bouton pour ouvrir/fermer sur mobile */}
            <button
                onClick={() => setEstOuvert(!estOuvert)}
                className={"fixed top-20 left-4 z-50 lg:hidden bg-gray-800 text-white p-2 rounded-md shadow-lg hover:bg-gray-700 transition-colors " + (estOuvert ? 'hidden' : '')}
                aria-label={estOuvert ? "Fermer la table des matières" : "Ouvrir la table des matières"}
            >
                <Menu size={24} />
            </button>

            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-gray-800 border-r border-gray-700
                    transition-transform duration-500 ease-in-out lg:z-10 z-40
                    ${estOuvert ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16'}
                    ${estOuvert ? 'w-80' : 'w-0 lg:w-16'}
                `}
            >
                {/* Bouton de toggle */}
                <button
                    onClick={() => setEstOuvert(!estOuvert)}
                    className="hidden lg:flex absolute -right-3 top-20 bg-gray-700 text-white p-1 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
                    aria-label={estOuvert ? "Fermer la table des matières" : "Ouvrir la table des matières"}
                >
                    {estOuvert ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>

                <nav className={`h-full overflow-y-auto py-8 lg:py-20 px-6 ${estOuvert ? 'block' : 'hidden lg:hidden'}`}>
                    <h2 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                        <Menu size={20} />
                        Table des matières
                    </h2>
                    <ul className="space-y-2">
                        {headings.map((heading) => (
                            <li
                                key={heading.slug}
                                style={{ paddingLeft: `${(heading.niveau - 2) * 1}rem` }}
                            >
                                <a
                                    href={`#${heading.slug}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.slug)?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        });
                                        // Fermer sur mobile après le clic
                                        if (window.innerWidth < 1024) {
                                            setEstOuvert(false);
                                        }
                                    }}
                                    className={`
                                        block py-2 px-3 text-sm transition-all rounded-md
                                        hover:bg-gray-700 hover:text-blue-200
                                        ${activeId === heading.slug
                                            ? 'text-blue-200 font-semibold bg-gray-700 border-l-4 border-blue-200'
                                            : 'text-gray-300'
                                        }
                                    `}
                                >
                                    {heading.texte}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {!estOuvert && (
                    <div className="hidden lg:flex flex-col items-center pt-20 px-2">
                        <Menu size={24} className="text-gray-400" />
                    </div>
                )}
            </aside>

            {estOuvert && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setEstOuvert(false)}
                />
            )}
        </>
    );
}