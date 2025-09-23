'use client';

import { useState, useEffect } from 'react';
import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { ServiceFactory, INTERFACES } from '@BlogsFront/services/ServiceFactory';
import type { Blog } from '@BlogsShared/model/Blog';

/**
 * Méthode de hook pour récupérer les blogs d'un dossier
 * @param dossierId Identifiant du dossier 
 * @returns { blogs, loading, error } Objet contenant les blogs, l'état de chargement et une éventuelle erreur
 */
export function useBlogs(dossierId: string) {
        
    // State des blogs
    const [blogs, setBlogs] = useState<Blog[]>([]);
    // State indiquant si le chargement est en cours
    const [loading, setLoading] = useState(true);
    // State pour stocker une éventuelle erreur
    const [error, setError] = useState<Error | null>(null);

    // Execution du hook au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les blogs
        async function fetchBlogs() {
            setLoading(true);
            setError(null);

            try {
                const blogService = ServiceFactory.get<I_BlogService>(INTERFACES.I_BlogService);
                const data = await blogService.getBlogsForDossier(dossierId);
                setBlogs(data);
            }
            catch (err) {
                setError(err as Error);
            }
            finally {
                setLoading(false);
            }
        }

        if (!dossierId) {
            setError(new Error('Identifiant de dossier non fourni'));
            setLoading(false);
        }
        else {
            fetchBlogs();            
        }

    }, [dossierId]);

    return { blogs, loading, error };
}
