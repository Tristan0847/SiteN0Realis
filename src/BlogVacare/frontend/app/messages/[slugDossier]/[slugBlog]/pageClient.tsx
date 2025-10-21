'use client';

import { MessageList } from '@BlogsFront/components/message/MessageList';
import MessageBox from '@BlogsFront/components/MessageBox';
import { useMessages } from '@BlogsFront/hooks/useMessages';
import { Message, MessageJSON } from '@BlogsShared/model/Message';

/**
 * Props pour le composant PageMessagesClient
 */
interface PageBlogsClientProps {
  slugDossier: string;
  slugBlog: string;
  messagesPrecharges?: MessageJSON[];
}

/**
 * Page affichant les messages d'un blog spécifique
 * @returns {JSX.Element} Composant React pour la page des messages d'un blog
 */
export default function PageMessagesClient({slugDossier, slugBlog, messagesPrecharges }: PageBlogsClientProps) {
    
    const { donnees: hookMessages, chargement: hookLoading, erreur: hookError } = useMessages(slugDossier, slugBlog);
    
    const loading = messagesPrecharges ? false : hookLoading;
    const error = messagesPrecharges ? null : hookError;

    if (loading) return <MessageBox message="Chargement des messages..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

    // Chargement des messages
    let messages: Message[];
    
    if (messagesPrecharges) {
      messages = messagesPrecharges.map(b => Message.fromJSON(b));
    } else if (hookMessages) {
      messages = hookMessages;
    } else {
      return <MessageBox message="Aucun blog disponible" type="info" />;
    }

    return (
        <MessageList messages={messages} />
    );
}
