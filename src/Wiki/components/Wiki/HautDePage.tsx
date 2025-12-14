import { H1 } from "./ComposantsCustom";

/**
 * Props du haut de wiki
 */
interface HautDePageProps {
    titre: string;
    dateCreation: string;
    auteur: string;
    nombreMots?: number;
}

/**
 * Haut de page des pages de wiki
 * @param titre Titre de l'article
 * @param dateCreation Date de création de l'article
 * @param auteur Auteur de l'article
 * @param nombreMots Nombre de mots de l'article
 * @returns Composant React du haut de page
 */
export function HautDePage({ titre, dateCreation, auteur, nombreMots = -1 }: HautDePageProps) {
    return (
        <section className="mb-6">
            <H1>
            { titre }
            </H1>
            <p className="text-sm text-gray-300">
                Posté le {new Date(dateCreation).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    })} par {auteur} {nombreMots >= 0 && (<>({ nombreMots } mots)</>)}
            </p>
        </section>
    );
}