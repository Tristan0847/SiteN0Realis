'use client';

import { Blog } from '@BlogsShared/model/Blog';
import { BlogItem } from '@BlogsFront/components/blog/BlogItem';

/**
 * Props du composant BlogList
 */
type BlogListProps = {
    blogs: Blog[];
}

/**
 * Méthode de composant pour afficher une liste de blogs
 * @param blogs Liste des blogs à afficher
 * @returns Composant React contenant la liste de blogs
 */
export function BlogList({ blogs }: BlogListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {blogs.map(b => (
                <BlogItem key={b.getId()} blog={b} />
            ))}
        </div>
    );
}