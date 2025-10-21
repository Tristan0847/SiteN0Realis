"use client";

import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import MessageBox from "@BlogsFront/components/MessageBox";
import { useDossiers } from "@BlogsFront/hooks/useDossiers";
import { Dossier, DossierJSON } from "@BlogsShared/model/Dossier";

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
  
    const { donnees: hookDossiers, chargement: hookLoading, erreur: hookError } = useDossiers();

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
        <DossierList dossiers={dossiers} />
    );
}