import { PageAPropos } from "@Wiki/contenuPages/APropos"

/**
 * Méthode de génération des métadonnées
 * @returns Métadonnées de la page
 */
export async function generateMetadata() {
    return {
        "title" : "Qui sommes nous ? - Oeil de l'Occulte",
    }
}

/**
 * Méthode de génération du contenu de la page "À propos"
 * @returns Contenu de la page
 */
export default async function APropos() {
    return(
        <PageAPropos />
    )
}