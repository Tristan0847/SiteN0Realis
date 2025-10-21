'use client';

import { ServiceFactory, INTERFACESSERVICE } from '@BlogsFront/services/ServiceFactory';
import { I_DossierService } from '@BlogsFront/services/Interface/I_DossierService';
import { useApiMutation } from '@BlogsFront/hooks/useApiMutation';
import { useApiQuery } from '@BlogsFront/hooks/useApiQuery';
import { Dossier } from '@BlogsShared/model/Dossier';

const dossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);


/**
 * Méthode de hook pour récupérer les dossiers du projet
 * @returns Objet contenant les dossiers, l'état de chargement et une éventuelle erreur
 */
export function useDossiers() {
    return useApiQuery<Dossier[], []>(
        () => dossierService.recupererDossiers(),
        []
    )
}

/**
 * Méthode de hook pour récupérer un dossier du projet
 * @param slugDossier Slug du dossier concerné
 * @returns Dossier enrichi
 */
export function useDossier(slugDossier : string) {
    return useApiQuery<Dossier, [string]>(
        (slugDossier : string) => dossierService.recupererDossierParSlug(slugDossier),
        [slugDossier],
        {
            actif: !!slugDossier
        }
    );
}


/**
 * Hook de création d'un dossier
 * @returns Méthode hook de création de dossier
 */
export function useCreerDossier() {
    return useApiMutation(
        async(nomDossier : string, description : string) => {
            await dossierService.creerDossier(nomDossier, description);
        }
    );
}

/**
 * Hook de suppression d'un dossier
 * @returns Méthode hook de suppression de dossier
 */
export function useSupprimerDossier() {
    return useApiMutation(
        async(idDossier : string, raisonSuppression : string, cache : boolean) => {
            await dossierService.supprimerDossier(idDossier, raisonSuppression, cache);
        }
    )
}