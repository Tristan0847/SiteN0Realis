'use client';

import Link from 'next/link';
import { Blog } from '@BlogsShared/model/Blog';

/**
 * Props du composant BlogItem
 */
type BlogItemProps = {
    blog: Blog;
    idDossier: string;
}

/**
 * Fonction de composant permettant l'affichage d'un blog envoyé en paramètre
 * @param blog Blog à afficher
 * @param idDossier identifiant du dossier contenant le blog
 * @returns Composant React
 */
export function BlogItem({ blog, idDossier }: BlogItemProps) {
    const dateString = blog.getDateCreation().toLocaleDateString('fr-FR');
    return (
        <div className="p-4 border border-neutral-light rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white max-w-md">
        <div className="flex flex-col gap-1">
            <Link 
            href={`/messages/${idDossier}/${blog.getId()}`}
            className="text-lg font-semibold text-primary-dark hover:underline border-b-2 border-primary-dark/50 pb-1"
            aria-label={`Voir le blog ${blog.getNom()}`}
            >
            {blog.getNom()}
            </Link>

            <span className="text-sm text-neutral-dark italic">Créé le {dateString} par <strong>{blog.getUtilisateur().getUsername()}</strong></span>

            <p className="text-neutral-700 mt-2 line-clamp-4">
                {blog.getMessages()[0].getContenu()}
            </p>
        </div>
        </div>
    );
}