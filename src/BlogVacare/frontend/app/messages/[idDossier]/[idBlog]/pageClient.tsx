'use client';

import { MessageList } from '@BlogsFront/components/message/MessageList';
import MessageBox from '@BlogsFront/components/MessageBox';
import { useMessages } from '@BlogsFront/hooks/useMessages';
import { Message, MessageJSON } from '@BlogsShared/model/Message';
import { useEffect, useState } from 'react';

/**
 * Props pour le composant PageMessagesClient
 */
interface PageBlogsClientProps {
  idDossier: string;
  idBlog: string;
  messagesPrecharges?: MessageJSON[];
}

/**
 * Page affichant les messages d'un blog spécifique
 * @returns {JSX.Element} Composant React pour la page des messages d'un blog
 */
export default function PageMessagesClient({idDossier, idBlog, messagesPrecharges }: PageBlogsClientProps) {
    
    const { messages: hookMessages, loading: hookLoading, error: hookError } = useMessages(idBlog, idDossier);
    
    // On utilise les données de préchargement si elles sont présentes, sinon celles du hook
    const messages = messagesPrecharges ? messagesPrecharges.map(m => Message.fromJSON(m)) : hookMessages;

    const loading = messagesPrecharges ? false : hookLoading;
    const error = messagesPrecharges ? null : hookError;

    if (loading) return <MessageBox message="Chargement des messages..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

    return (
        <MessageList messages={messages} />
    );
}
