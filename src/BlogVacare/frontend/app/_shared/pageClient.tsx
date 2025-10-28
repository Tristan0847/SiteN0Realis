"use client";

import { DossierEntete } from "@BlogsFront/components/dossier/DossierEntete";
import { DossierFormCreation } from "@BlogsFront/components/dossier/DossierFormCreation";
import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import { PageWrapper } from "@BlogsFront/components/PageWrapper";
import { useAuthContexte } from "@BlogsFront/contexts/AuthContext";
import { SiteVariant, useVariant } from "@BlogsFront/contexts/VariantContext";
import { useDonneesPage } from "@BlogsFront/hooks/useDonneesPage";
import { useCreerDossier, useDossiers, useSupprimerDossier } from "@BlogsFront/hooks/useDossiers";
import { Dossier, DossierJSON } from "@BlogsShared/model/Dossier";
import { filtrerElements } from "@BlogsFront/app/_shared/pageMethodes";

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
    const { mutation: mutationSuppression } = useSupprimerDossier();
    const { estConnecte, utilisateur } = useAuthContexte();
    const { donnees: dossiers, chargement, erreur } = useDonneesPage(hookDossiers, hookLoading, hookError, dossiersPrecharges, Dossier.fromJSON );
    const variant = useVariant();

    // Une fois un dossier créé, on re-récupère la page
    const handleCreation = async (nom: string, description: string) => {
      await mutation(nom, description);
      refetch();
    }

    const handleSuppression = async (id : string, raisonSuppression : string, cache : boolean) => {
      await mutationSuppression(id, raisonSuppression, cache);
      refetch();
    }

    // Gestion des données affichées pour un utilisateur admin ou non
    let estAdmin = utilisateur?.getEstAdmin() ?? false;
    const suppressionHandler = estAdmin ? handleSuppression : undefined;
    const dossiersAffiches = filtrerElements(dossiers, estAdmin, variant);

    return (
      <PageWrapper chargement={chargement} erreur={erreur} estVide={dossiers.length == 0} messageVide="Aucun dossier trouvé" chargementMessage="Chargement des dossiers...">
        <DossierEntete/>
        <DossierFormCreation onSubmit={handleCreation} chargement={ chargementCreation } erreur={ erreurCreation } estConnecte= {estConnecte }/>
        
        <DossierList dossiers={dossiersAffiches} suppressionHandler={ suppressionHandler } />
      </PageWrapper>
    );
}