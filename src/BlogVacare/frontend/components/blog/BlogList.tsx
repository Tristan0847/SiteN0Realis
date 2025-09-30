'use client';

import { Blog } from '@BlogsShared/model/Blog';
import { BlogItem } from '@BlogsFront/components/blog/BlogItem';

/**
 * Props du composant BlogList
 */
type BlogListProps = {
    blogs: Blog[];
    idDossier: string;
}

/**
 * Méthode de composant pour afficher une liste de blogs
 * @param blogs Liste des blogs à afficher
 * @returns Composant React contenant la liste de blogs
 */
export function BlogList({ blogs, idDossier }: BlogListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 bg-white border-2 border-stone-200/10 rounded-lg shadow-primary-dark/80 max-w-4xl mx-auto">
            {blogs.map(b => (
                <BlogItem key={b.getId()} blog={b} idDossier={idDossier} />
            ))}
        </div>
    );
}