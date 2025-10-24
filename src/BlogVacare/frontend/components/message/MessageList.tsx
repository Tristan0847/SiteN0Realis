'use client';

import { Message } from '@BlogsShared/model/Message';
import { MessageItem } from '@BlogsFront/components/message/MessageItem';
import { useVariant } from '@BlogsFront/contexts/VariantContext';

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

    let messagesAffiches : Message[] = [];
    const variant = useVariant();
    // Si on est en mode old, on affiche même les messages supprimés
    if (variant == "modern") {
        messages.forEach((m) => {
            if (m.getElementSupprime() == null) {
                messagesAffiches.push(m);
            }
        })
    }

    return (
        <div className="flex flex-col gap-3 p-4 mx-auto max-w-4xl">
            {messagesAffiches.map((m) => (
                <MessageItem key={m.getDate().toISOString() + m.getUtilisateur()} message={m} />
            ))}
        </div>
    );
}