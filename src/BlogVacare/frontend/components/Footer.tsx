'use client';

import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";

/**
 * Méthode de composant pour afficher le footer du site
 * @returns Composant React contenant le footer du site
 */
export function Footer() {

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    
    const basDePage = (variant == "old") ? "© 2003 Vince et SuperFlashAtomicMan" : "© 2025 N0Realis - Tous droits réservés";

    return (
        <footer className={ styles.footer }>
            { basDePage }
            { variant == "old" && <a href='0.html'>°</a>}
            { variant == "modern" && <p><a className="underline hover:bg-gray-400/50" href="/complements/Mentions-Legales"> Mentions légales</a></p>}
        </footer>
    );
}