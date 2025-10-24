'use client';

import Link from 'next/link';
import { Blog } from '@BlogsShared/model/Blog';
import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';

/**
 * Props du composant BlogItem
 */
type BlogItemProps = {
    blog: Blog;
    slugDossier: string;
}

/**
 * Fonction de composant permettant l'affichage d'un blog envoyé en paramètre
 * @param blog Blog à afficher
 * @param slugDossier Slug du dossier contenant le blog
 * @returns Composant React
 */
export function BlogItem({ blog, slugDossier }: BlogItemProps) {
    const dateString = blog.getDateCreation().toLocaleDateString('fr-FR');

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    const baseUrl = (variant == "modern") ? "" : "/" + variant;

    return (
        <div className={ styles.BlogItemConteneur }>
        <div className={ styles.BlogItemSousConteneur }>
            <Link href={`${baseUrl}/messages/${slugDossier}/${blog.getSlug()}`} className={ styles.BlogItemLien } aria-label={`Voir le blog ${blog.getNom()}`}
            >
            {blog.getNom()}
            </Link>

            <span className={ styles.BlogItemSpan }>Créé le {dateString} par <strong>{blog.getUtilisateur().getUsername()}</strong></span>

            <p className={ styles.BlogItemContenu }>
                {blog.getMessages()[0].getContenu()}
            </p>
        </div>
        </div>
    );
}