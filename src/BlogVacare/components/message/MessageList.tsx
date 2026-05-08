'use client';

import {Message} from '@BlogsFront/model/Blog';
import {MessageItem} from '@BlogsFront/components/message/MessageItem';
import {useVariant} from '@BlogsFront/contexts/VariantContext';
import {getVariantStyles} from '@BlogsFront/lib/variant-styles';

/**
 * Props du composant MessageList
 */
type MessageListProps = {
    messages: Message[];
    suppressionHandler?: (id: number, raison: string, cache: boolean) => Promise<void>;
}

/**
 * Méthode de composant pour afficher une liste de messages
 * @param messages Liste des messages à afficher
 * @param suppressionHandler Gestion de la suppression d'un message
 * @returns Composant React contenant la liste de messages
 */
export function MessageList({messages, suppressionHandler}: MessageListProps) {

    const variant = useVariant();
    const styles = getVariantStyles(variant);

    return (
        <div className={styles.messageList}>
            {messages.map((m) => (
                <MessageItem key={new Date(m.date_publication).toISOString() + m.nom_utilisateur} message={m}
                             suppressionHandler={suppressionHandler}/>
            ))}
        </div>
    );
}