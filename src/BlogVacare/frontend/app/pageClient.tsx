"use client";

import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import MessageBox from "@BlogsFront/components/MessageBox";
import { useDossiers } from "@BlogsFront/hooks/useDossiers";
import { Dossier, DossierJSON } from "@BlogsShared/model/Dossier";
import { useEffect, useState } from "react";

/**
 * Props pour le composant PageDossiersClient
 */
interface PageDossiersClientProps {
  dossiersPrecharges?: DossierJSON[];
}

/**
 * Page affichant la liste des dossiers
 * @returns {JSX.Element} Composant React pour la page des dossiers
 */
export default function PageDossiersClient({ dossiersPrecharges } : PageDossiersClientProps) {
  
    const { dossiers: hookDossiers, loading: hookLoading, error: hookError } = useDossiers();

    // On utilise les données de préchargement si elles sont présentes, sinon celles du hook
    const dossiers = dossiersPrecharges ? dossiersPrecharges.map(d => Dossier.fromJSON(d)) : hookDossiers;

    const loading = dossiersPrecharges ? false : hookLoading;
    const error = dossiersPrecharges ? null : hookError;

    if (loading) return <MessageBox message="Chargement des dossiers..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

    return (
        <DossierList dossiers={dossiers} />
    );
}