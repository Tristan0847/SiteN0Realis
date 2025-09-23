'use client';

import { useState, useEffect } from 'react';
import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { ServiceFactory, INTERFACES } from '@BlogsFront/services/ServiceFactory';
import type { Message } from '@BlogsShared/model/Message';

/**
 * Hook pour récupérer les messages d'un blog
 * @param blogId Identifiant du blog concerné
 * @param dossierId Identifiant du dossier parent
 * @returns { messages, loading, error } Objet contenant les messages, l'état de chargement et une éventuelle erreur
 */
export function useMessages(blogId: string, dossierId: string) {

    // State des messages
    const [messages, setMessages] = useState<Message[]>([]);
    // State indiquant si le chargement est en cours
    const [loading, setLoading] = useState(true);
    // State pour stocker une éventuelle erreur
    const [error, setError] = useState<Error | null>(null);

    // Execution du hook au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les messages
        async function fetchMessages() {
            setLoading(true);
            setError(null);

            try {
                const blogService = ServiceFactory.get<I_BlogService>(INTERFACES.I_BlogService);
                const data = await blogService.getMessagesForBlog(blogId, dossierId);
                setMessages(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        if (!blogId) {
            setError(new Error('Identifiant de blog non fourni'));
            setLoading(false);
        }
        else if (!dossierId) {
            setError(new Error('Identifiant de dossier non fourni'));
            setLoading(false);
        }
        else {
            fetchMessages();
        }
    }, [blogId, dossierId]);

    return { messages, loading, error };
}
