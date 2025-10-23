"use client";

import { DossierEntete } from "@BlogsFront/components/dossier/DossierEntete";
import { DossierFormCreation } from "@BlogsFront/components/dossier/DossierFormCreation";
import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import MessageBox from "@BlogsFront/components/MessageBox";
import { useAuthContexte } from "@BlogsFront/contexts/AuthContext";
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
  
    // Hook de récupération des dossiers
    const { donnees: hookDossiers, chargement: hookLoading, erreur: hookError, refetch: refetch } = useDossiers();

    // Hook de création de dossiers
    const {mutation: mutation, chargement: chargementCreation, erreur: erreurCreation} = useCreerDossier();

    // Hook de contexte d'authentification (Vérification que l'on est connecté ou non)
    const { estConnecte, utilisateur, chargement: chargementAuth } = useAuthContexte();

    // Une fois un succès créé, on ferme le formulaire de création et on re-récupère la page
    const handleCreation = async (nom: string, description: string) => {
      const resultat = await mutation(nom, description);
      refetch();
    }

    const loading = dossiersPrecharges ? false : hookLoading;
    const error = dossiersPrecharges ? null : hookError;

    if (loading) return <MessageBox message="Chargement des dossiers..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;
    
    // Chargement des dossiers
    let dossiers: Dossier[];
    
    if (dossiersPrecharges) {
      dossiers = dossiersPrecharges.map(b => Dossier.fromJSON(b));
    } else if (hookDossiers) {
      dossiers = hookDossiers;
    } else {
      return <MessageBox message="Aucun blog disponible" type="info" />;
    }

    return (
      <div>
        <DossierEntete/>
        <DossierFormCreation onSubmit={handleCreation} chargement={ chargementCreation } erreur={ erreurCreation } estConnecte= {estConnecte }/>
        
        <DossierList dossiers={dossiers} />
      </div>
    );
}