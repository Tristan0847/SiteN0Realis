'use client';

import { ServiceFactory, INTERFACESSERVICE } from '@BlogsFront/services/ServiceFactory';
import { useApiMutation } from '@BlogsFront/hooks/useApiMutation';
import { I_MessageService } from '@BlogsFront/services/Interface/I_MessageService';
import { useApiQuery } from '@BlogsFront/hooks/useApiQuery';
import { Message } from '@BlogsShared/model/Message';

const messageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);


/**
 * Méthode de hook pour récupérer les dossiers du projet
 * @param slugDossier Slug du dossier contenant le blog
 * @param slugBlog Slug du blog contenant le message
 * @returns Objet contenant les dossiers, l'état de chargement et une éventuelle erreur
 */
export function useMessages(slugDossier: string, slugBlog: string) {
    return useApiQuery<Message[], [string, string]>(
        (slugDossier : string, slugBlog :string) => messageService.recupererMessagesDuBlog(slugDossier, slugBlog),
        [slugDossier, slugBlog],
        {
            actif: !!slugDossier && !!slugBlog
        }
    );
}


/**
 * Hook de création d'un message
 * @returns Méthode hook de création de message
 */
export function useCreerMessage() {
    return useApiMutation(
        async(contenu : string, idBlog: string) => {
            await messageService.creerMessage(contenu, idBlog);
        }
    );
}

/**
 * Hook de suppression d'un message
 * @returns Méthode hook de suppression de message
 */
export function useSupprimerMessage() {
    return useApiMutation(
        async(idMessage : number, idBlog : string, raisonSuppression : string, cache : boolean) => {
            await messageService.supprimerMessage(idMessage, idBlog, raisonSuppression, cache);
        }
    )
}