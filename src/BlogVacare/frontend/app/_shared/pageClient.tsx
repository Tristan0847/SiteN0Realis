"use client";

import { DossierEntete } from "@BlogsFront/components/dossier/DossierEntete";
import { DossierFormCreation } from "@BlogsFront/components/dossier/DossierFormCreation";
import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import MessageBox from "@BlogsFront/components/MessageBox";
import { PageWrapper } from "@BlogsFront/components/PageWrapper";
import { useAuthContexte } from "@BlogsFront/contexts/AuthContext";
import { useDonneesPage } from "@BlogsFront/hooks/useDonneesPage";
import { useCreerDossier, useDossiers } from "@BlogsFront/hooks/useDossiers";
import { Dossier, DossierJSON } from "@BlogsShared/model/Dossier";
import { useState } from "react";

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
  
    // Hook de récupération des dossiers, de création de dossier, d'authentification et de données affichées sur la page
    const { donnees: hookDossiers, chargement: hookLoading, erreur: hookError, refetch: refetch } = useDossiers();
    const {mutation: mutation, chargement: chargementCreation, erreur: erreurCreation} = useCreerDossier();
    const { estConnecte } = useAuthContexte();
    const { donnees: dossiers, chargement, erreur } = useDonneesPage(hookDossiers, hookLoading, hookError, dossiersPrecharges, Dossier.fromJSON );

    // Une fois un dossier créé, on re-récupère la page
    const handleCreation = async (nom: string, description: string) => {
      await mutation(nom, description);
      refetch();
    }

    return (
      <PageWrapper chargement={chargement} erreur={erreur} estVide={dossiers.length == 0} messageVide="Aucun dossier trouvé" chargementMessage="Chargement des dossiers...">
        <DossierEntete/>
        <DossierFormCreation onSubmit={handleCreation} chargement={ chargementCreation } erreur={ erreurCreation } estConnecte= {estConnecte }/>
        
        <DossierList dossiers={dossiers} />
      </PageWrapper>
    );
}