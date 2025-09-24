"use client";

import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import { useDossiers } from "@BlogsFront/hooks/useDossiers";

/**
 * Page affichant la liste des dossiers
 * @returns {JSX.Element} Composant React pour la page des dossiers
 */
export default function PageDossiersClient() {
    const { dossiers, loading, error } = useDossiers();

    if (loading) return <p>Chargement des dossiers...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <main>
            <h1>Liste des dossiers</h1>
            <DossierList dossiers={dossiers} />
        </main>
    );
}