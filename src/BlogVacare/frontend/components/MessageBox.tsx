import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";

/**
 * Paramètres en entrée de la fonction
 */
interface MessageBoxProps {
    message: string;
    type?: 'info' | 'error' | 'loading';
}

/**
 * Message Box affichée à l'écran lors d'une erreur ou d'un chargement de page
 * @param param0 
 * @returns 
 */
export default function MessageBox({ message, type = 'info' }: MessageBoxProps) {
  
    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    const baseClass = styles.messageBase;
    let typeClass = '';

    // Couleurs selon le type de message
    switch (type) {
        case 'error':
        typeClass = styles.messageErreur;
        break;
        case 'loading':
        typeClass = styles.messageChargement;
        break;
        default:
        typeClass = styles.messageDefaut;
    }

    return (
        <div className={`${baseClass} ${typeClass}`}>
        {message}
        </div>
    );
}
