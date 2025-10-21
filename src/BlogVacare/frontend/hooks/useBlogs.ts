'use client';

import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { ServiceFactory, INTERFACESSERVICE } from '@BlogsFront/services/ServiceFactory';
import { useApiMutation } from '@BlogsFront/hooks/useApiMutation';
import { useApiQuery } from '@BlogsFront/hooks/useApiQuery';
import { Blog } from '@BlogsShared/model/Blog';

const blogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);


/**
 * Méthode de hook pour récupérer les blogs d'un dossier
 * @param slugDossier Slug du dossier contenant le blog
 * @returns Objet contenant les blogs, l'état de chargement et une éventuelle erreur
 */
export function useBlogs(slugDossier : string) {
    return useApiQuery<Blog[], [string]>(
        (slug : string) => blogService.recupererBlogsDuDossier(slug),
        [slugDossier],
        {
            // Relance la requête si slugDossier est défini
            actif: !!slugDossier
        }
    )
}

/**
 * Méthode de hook pour récupérer un blog à partir de ses slugs
 * @param slugDossier Slug du dossier contenant le blog
 * @param slugBlog Slug du blog concerné
 * @returns Objet contenant le blog, l'état de chargement et une éventuelle erreur
 */
export function useBlog(slugDossier : string, slugBlog : string) {
    return useApiQuery<Blog, [string, string]>(
        (slugBlog : string, slugDossier : string) => blogService.recupererBlogParSlug(slugBlog, slugDossier),
        [slugBlog, slugDossier], 
        {
            actif: !!slugDossier && !!slugBlog
        }
    );
}


/**
 * Hook de création d'un blog
 * @returns Méthode hook de création de blogs 
 */
export function useCreerBlog() {
    return useApiMutation(
        async (nom: string, contenuPremierMessage: string, idDossier: string) => {
            await blogService.creerBlog(nom, contenuPremierMessage, idDossier);
        }
    );
}

/**
 * Hook de suppression d'un blog
 * @returns Méthode hook de suppression de blog
 */
export function useSupprimerBlog() {
    return useApiMutation(
        async (idBlog : string, raisonSuppression : string, cache : boolean) => {
            await blogService.supprimerBlog(idBlog, raisonSuppression, cache);
        }
    )
}