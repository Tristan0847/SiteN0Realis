import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";
import Link from "next/link";

/**
 * Propos du component
 */
interface AccesRestreintProps {
    message: string;
}

/**
 * Méthode de génération du bloc indiquant un accès restreint à une fonctionnalité, nécessitant la connexion de l'utilisateur
 * @param message Message à afficher 
 * @returns Bloc d'accès restreint
 */
export function AccesRestreint({message} : AccesRestreintProps) {
    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    const baseUrl = (variant == "modern") ? "" : "/" + variant;
    const texteCreationCompte = (variant == "modern") ? "Inscrivez-vous dès maintenant." : "Inscris-toi maintenant !";

    return <section className="mx-auto px-4 py-5 max-w-4xl">
                <div className={ styles.accesRestreintDiv }>
                    <div className={ styles.accesRestreintConteneurH3 }>
                        <h3 className={ styles.accesRestreintH3 }>
                            Accès restreint
                        </h3>
                    </div>
                    
                    <p className={ styles.accesRestreintMessage }>
                        {message}
                    </p>
                    
                    <Link href={baseUrl + "/connexion" } className={ styles.accesRestreintLien }>Se connecter</Link>
                    <p>Pas encore de compte? <Link className="underline hover:font-bold" href={baseUrl + "/inscription"}>{ texteCreationCompte }</Link></p>
                </div>
            </section>;
}
