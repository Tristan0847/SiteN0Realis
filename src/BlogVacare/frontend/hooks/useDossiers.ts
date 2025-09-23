'use client';

import { useState, useEffect } from 'react';
import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { ServiceFactory, INTERFACES } from '@BlogsFront/services/ServiceFactory';
import type { Dossier } from '@BlogsShared/model/Dossier';

/**
 * Hook pour récupérer les dossiers via le service de blog
 * @returns { dossiers, loading, error } Objet contenant les dossiers, l'état de chargement et une éventuelle erreur
 */
export function useDossiers() {

    // State des dossiers
    const [dossiers, setDossiers] = useState<Dossier[]>([]);
    // State indiquant si le chargement est en cours
    const [loading, setLoading] = useState(true);
    // State pour stocker une éventuelle erreur
    const [error, setError] = useState<Error | null>(null);

    // Execution du hook au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les dossiers
        async function fetchDossiers() {
            // Chargement en cours et aucune erreur au départ
            setLoading(true);
            setError(null);

            // On tente de récpérer les services et on les set dans le state si on les trouve
            try {
                const blogService = ServiceFactory.get<I_BlogService>(INTERFACES.I_BlogService);
                const data = await blogService.getAllDossiers();
                setDossiers(data);
            }
            // Sinon, on set l'erreur dans le state
            catch (err) {
                setError(err as Error);
            }
            // Enfin, on indique que le chargement est terminé
            finally {
                setLoading(false);
            }
        }
        
        // On récupère les dossiers
        fetchDossiers();
    }, []);

    return { dossiers, loading, error };
}
