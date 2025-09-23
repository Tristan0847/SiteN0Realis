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
    return(
        <div className="dossier">
            <div className="dossier-title">
                <Link href={`/messages/${blog.getDossier().getId()}/${blog.getId()}`}>{blog.getNom()}</Link>
                <span className="dossier-date"> - Créé le {dateString}</span>
            </div>
        </div>
    );
}