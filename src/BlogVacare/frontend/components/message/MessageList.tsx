'use client';

import { Message } from '@BlogsShared/model/Message';
import { MessageItem } from '@BlogsFront/components/message/MessageItem';

/**
 * Props du composant MessageList
 */
type MessageListProps = {
    messages: Message[];
}

/**
 * Méthode de composant pour afficher une liste de messages
 * @param messages Liste des messages à afficher
 * @returns Composant React contenant la liste de messages
 */
export function MessageList({ messages }: MessageListProps) {
    return (
        <div className="message-list">
            {messages.map(m => (
                <MessageItem key={m.getDate().toISOString() + m.getUtilisateur()} message={m} />
            ))}
        </div>
    );
}