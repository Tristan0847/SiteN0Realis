import { PageDeRecherche } from "@Wiki/contenuPages/PageDeRecherche";
import { Suspense } from "react";

/**
 * Méthode de génération des métadonnées
 * @returns Métadonnées de la page
 */
export async function generateMetadata() {
    return {
        title: "Page de recherche",
        description: "Page de recherche d'articles dans le Wiki.",
    };
}

/**
 * Page de recherche du Wiki
 * @returns Composant de la page de recherche
 */
export default function PageRecherche() {

    return(
        <Suspense fallback={<div>Chargement de la page de recherche...</div>}>
            <PageDeRecherche />
        </Suspense>
    )

}
