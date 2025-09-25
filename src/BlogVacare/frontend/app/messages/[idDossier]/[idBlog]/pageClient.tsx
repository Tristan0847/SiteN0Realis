'use client';

import { MessageList } from '@BlogsFront/components/message/MessageList';
import MessageBox from '@BlogsFront/components/MessageBox';
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

    if (loading) return <MessageBox message="Chargement des messages..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

    return (
        <MessageList messages={messages} />
    );
}
