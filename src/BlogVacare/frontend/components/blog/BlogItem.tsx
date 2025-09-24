'use client';

import Link from 'next/link';
import { Blog } from '@BlogsShared/model/Blog';

/**
 * Props du composant BlogItem
 */
type BlogItemProps = {
    blog: Blog;
}

/**
 * Fonction de composant permettant l'affichage d'un blog envoyé en paramètre
 * @param blog Blog à afficher
 * @returns Composant React
 */
export function BlogItem({ blog }: BlogItemProps) {
    const dateString = blog.getDateCreation().toLocaleDateString('fr-FR');
    return (
        <div className="p-4 border border-neutral-light rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white max-w-md">
            <div className="flex items-baseline gap-2">
                <Link href={`/messages/${blog.getDossier().getId()}/${blog.getId()}`} className="text-lg font-semibold text-primary-dark hover:underline">
                {blog.getNom()}
                </Link>
                <span className="text-sm text-neutral-dark">- Créé le {dateString}</span>
            </div>
        </div>
    );
}