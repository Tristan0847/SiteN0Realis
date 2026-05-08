'use client';

import {Dossier} from '@BlogsFront/model/Blog';
import {DossierItem} from '@BlogsFront/components/dossier/DossierItem';
import {useVariant} from '@BlogsFront/contexts/VariantContext';
import {getVariantStyles} from '@BlogsFront/lib/variant-styles';

/**
 * Props du composant DossierList
 */
type DossierListProps = {
    dossiers: Dossier[];
    suppressionHandler?: (id: number, raison: string, cache: boolean) => Promise<void>;
}

/**
 * Méthode de composant pour afficher une liste de Dossiers
 * @param dossiers Liste des Dossiers à afficher
 * @param suppressionHandler Fonction de suppression d'un dossier
 * @returns Composant React contenant la liste de Dossiers
 */
export function DossierList({dossiers, suppressionHandler}: DossierListProps) {
    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    if (dossiers.length > 0) {
        return (
            <section className="mx-auto px-4">
                <div className={styles.listeDossiersDiv}>
                    <ul className={styles.listeDossiersUl}>
                        {dossiers.map(d => (
                            <li key={d.id} className={styles.listeDossiersLi}>
                                <DossierItem dossier={d} suppressionHandler={suppressionHandler}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

}

