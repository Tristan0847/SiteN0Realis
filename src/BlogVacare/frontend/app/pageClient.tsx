"use client";

import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import MessageBox from "@BlogsFront/components/MessageBox";
import { useDossiers } from "@BlogsFront/hooks/useDossiers";

/**
 * Page affichant la liste des dossiers
 * @returns {JSX.Element} Composant React pour la page des dossiers
 */
export default function PageDossiersClient() {
    const { dossiers, loading, error } = useDossiers();

    if (loading) return <MessageBox message="Chargement des dossiers..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

    return (
        <DossierList dossiers={dossiers} />
    );
}