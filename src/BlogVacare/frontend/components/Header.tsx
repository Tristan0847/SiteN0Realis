'use client';

import { useAuthContexte } from "@BlogsFront/contexts/AuthContext";
import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { useDeconnexion } from "@BlogsFront/hooks/useAuth";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Méthode de composant pour afficher le header du site
 * @returns Composant React contenant le header du site
 */
export function Header() {
    
    // Hook de contexte d'authentification (Vérification que l'on est connecté ou non)
    const { estConnecte, utilisateur, chargement: chargementAuth, deconnexion: deconnexionContexte } = useAuthContexte();
    const router = useRouter();

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    const baseUrl = (variant == "modern") ? "" : "/" + variant;

    // Hook de déconnexion
    const { mutation: deconnecter } = useDeconnexion();
    const handleDeconnexion = async () => {
        await deconnecter();
        deconnexionContexte();
        router.push(baseUrl);
    };

    
    const titre = (variant == "old") ? "Forum de SuperFlashAtomicMan et Vince" : "Blog de Vacare";

    return (
            <header className={ styles.header }>
                <h1 className="text-3xl font-bold py-2">{ titre }</h1>
                <nav className={ styles.headerNav }>
                    <ul className="flex items-center justify-center space-x-4 mt-2 text-2xl">
                        <li><Link href={ baseUrl + "/" } className={ styles.headerLien }>Accueil</Link></li>
                        {chargementAuth ? (
                            <li className="animate-pulse">Chargement...</li>
                        ) : estConnecte ? (
                            <>
                                <li>
                                    <button 
                                        onClick={handleDeconnexion}
                                        className={ styles.headerLien }
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                                <li className={ styles.headerUtilisateur }>
                                    👤 {utilisateur?.getUsername()}
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href={baseUrl + "/connexion" } className={ styles.headerLien }>
                                    Connexion
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
    );
}