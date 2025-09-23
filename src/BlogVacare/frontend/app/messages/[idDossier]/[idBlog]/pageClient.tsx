'use client';

import { MessageList } from '@BlogsFront/components/message/MessageList';
import { useMessages } from '@BlogsFront/hooks/useMessages';

/**
 * Props pour le composant PageMessagesClient
 */
interface PageBlogsClientProps {
  idDossier: string;
  idBlog: string;
}

/**
 * Page affichant les messages d'un blog spécifique
 * @returns {JSX.Element} Composant React pour la page des messages d'un blog
 */
export default function PageMessagesClient({idDossier, idBlog}: PageBlogsClientProps) {
    const { messages, loading, error } = useMessages(idBlog, idDossier);

    if (loading) return <p>Chargement des messages...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <main>
            <MessageList messages={messages} />
        </main>
    );
}
