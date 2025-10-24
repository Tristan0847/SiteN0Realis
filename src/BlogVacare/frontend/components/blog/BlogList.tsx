'use client';

import { Blog } from '@BlogsShared/model/Blog';
import { BlogItem } from '@BlogsFront/components/blog/BlogItem';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';
import { useVariant } from '@BlogsFront/contexts/VariantContext';

/**
 * Props du composant BlogList
 */
type BlogListProps = {
    blogs: Blog[];
    slugDossier: string;
}

/**
 * Méthode de composant pour afficher une liste de blogs
 * @param blogs Liste des blogs à afficher
 * @param slugDossier Slug du dossier contenant le blog
 * @returns Composant React contenant la liste de blogs
 */
export function BlogList({ blogs, slugDossier }: BlogListProps) {
    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    if (blogs.length === 0) {
        return (
            <div className={ styles.listeBlogsAucunBlogConteneur }>
                <p className={ styles.listeBlogsAucunBlogContenu }>
                    Aucun blog trouvé
                </p>
            </div>
        );
    }

    return (
        <div className={ styles.listeBlogsConteneur }>
            {blogs.map(b => (
                <BlogItem key={b.getId()} blog={b} slugDossier={slugDossier} />
            ))}
        </div>
    );
}