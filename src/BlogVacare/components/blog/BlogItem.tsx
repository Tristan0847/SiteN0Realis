'use client';

import Link from 'next/link';
import {Blog} from '@BlogsFront/model/Blog';
import {useVariant} from '@BlogsFront/contexts/VariantContext';
import {getVariantStyles} from '@BlogsFront/lib/variant-styles';
import {useState} from 'react';
import SuppressionBox from '@BlogsFront/components/SuppressionBox';
import ElementSupprimeBox from '@BlogsFront/components/ElementSupprimeBox';

/**
 * Props du composant BlogItem
 */
type BlogItemProps = {
    blog: Blog;
    slugDossier: string;
    suppressionHandler?: (id: number, raison: string, cache: boolean) => Promise<void>;
}

/**
 * Fonction de composant permettant l'affichage d'un blog envoyé en paramètre
 * @param blog Blog à afficher
 * @param slugDossier Slug du dossier contenant le blog
 * @param suppressionHandler Handler de suppression d'un blog
 * @returns Composant React
 */
export function BlogItem({blog, slugDossier, suppressionHandler}: BlogItemProps) {
    const dateString = new Date(blog.date_creation).toLocaleDateString('fr-FR');

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    const baseUrl = (variant == "modern") ? "" : "/" + variant;

    // Mise en place de la dialog box de suppression
    const [dialogBoxOuverte, setDialogBox] = useState(false);
    const suppression = blog.element_supprime ?? blog.element_supprime_visible ?? null;

    return (
        <div className={styles.BlogItemConteneur}>
            <div className={styles.BlogItemSousConteneur}>
                <div className={styles.BlogItemLienConteneur}>
                    <Link href={`${baseUrl}/messages/${slugDossier}/${blog.slug}`} className={styles.BlogItemLien}
                          aria-label={`Voir le blog ${blog.titre}`}
                    >
                        {blog.titre}
                    </Link>

                    {suppressionHandler && !suppression && (
                        <div className={styles.supprimerBtn}>
                            <button onClick={() => setDialogBox(true)}>Supprimer</button>

                            <SuppressionBox id={blog.id} type={"blog"} suppressionHandler={suppressionHandler}
                                            dialogBoxOuverte={dialogBoxOuverte} setDialogBox={setDialogBox}/>
                        </div>
                    )}
                </div>
                <span
                    className={styles.BlogItemSpan}>Créé le {dateString} par <strong>{blog.nom_utilisateur}</strong></span>

                <p className={styles.BlogItemContenu}>
                    {blog.premier_message ? blog.premier_message.contenu : "..."}
                </p>

                {suppression && (
                    <ElementSupprimeBox type={"blog"} donnees={suppression}/>
                )}
            </div>
        </div>
    );
}