"use client";

import { DossierEntete } from "@BlogsFront/components/dossier/DossierEntete";
import { DossierFormCreation } from "@BlogsFront/components/dossier/DossierFormCreation";
import { DossierList } from "@BlogsFront/components/dossier/DossierList";
import { PageWrapper } from "@BlogsFront/components/PageWrapper";
import { useAuthContexte } from "@BlogsFront/contexts/AuthContext";
import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { useCreerDossier, useDossiers, useSupprimerDossier } from "@BlogsFront/hooks/useDossiers";
import { Dossier } from "@BlogsFront/model/Blog";
import {JSX} from "react";

/**
 * Props pour le composant PageDossiersClient
 */
interface PageDossiersClientProps {
    dossiersPrecharges?: Dossier[];
}

/**
 * Page affichant la liste des dossiers
 * @returns {JSX.Element} Composant React pour la page des dossiers
 */
export default function PageDossiersClient({ dossiersPrecharges } : PageDossiersClientProps): JSX.Element {

    // Hook de récupération des dossiers, de création de dossier, d'authentification et de données affichées sur la page
    const variante = useVariant();
    const { data: dossiers, isLoading: dossiersLoading, error: dossiersError } = useDossiers(variante, dossiersPrecharges);
    const { mutateAsync: mutateCreerDossier, error: errorCreerDossier, isPending: pendingCreerDossier} = useCreerDossier();
    const { mutateAsync: mutateSupprimerDossier} = useSupprimerDossier();
    const { estConnecte, utilisateur } = useAuthContexte();

    // Une fois un dossier créé, on re-récupère la page
    const handleCreation = async (nom: string, description: string) => {
        await mutateCreerDossier({nom, description});
    }

    const handleSuppression = async (id : number, raison : string, cache : boolean) => {
        await mutateSupprimerDossier({id, raison, cache});
    }

    // Gestion des données affichées pour un utilisateur admin ou non
    const estAdmin = utilisateur?.est_admin ?? false;
    const suppressionHandler = estAdmin ? handleSuppression : undefined;

    return (
        <PageWrapper chargement={dossiersLoading} erreur={dossiersError} estVide={dossiers !== undefined && dossiers.length == 0} messageVide="Aucun dossier trouvé" chargementMessage="Chargement des dossiers...">
            <DossierEntete/>
            <DossierFormCreation onSubmit={handleCreation} chargement={ pendingCreerDossier } erreur={ errorCreerDossier } estConnecte= {estConnecte }/>

            {dossiers && <DossierList dossiers={dossiers} suppressionHandler={ suppressionHandler } />}
        </PageWrapper>
    );
}