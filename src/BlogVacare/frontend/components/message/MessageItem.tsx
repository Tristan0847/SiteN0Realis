'use client';

import { Message } from '@BlogsShared/model/Message';

/**
 * Props du composant MessageItem
 */
type MessageItemProps = {
    message: Message;
}

/**
 * Fonction de composant permettant l'affichage d'un message envoyé en paramètre
 * @param message Message à afficher
 * @returns Composant React
 */
export function MessageItem({ message }: MessageItemProps) {
    // Chemin vers l'avatar
    const avatarSrc = `/assets/BlogVacare/Icones/${message.getUtilisateur()}.jpg`;
    // Formatage de la date
    const dateString = message.getDate().toLocaleString('fr-FR');

    return (
        <div className="message">
            <div className="message-avatar">
                <img src={avatarSrc} alt={`Avatar de ${message.getUtilisateur()}`} />
            </div>
            <div className="message-body">
                <div className="message-user">{message.getUtilisateur()}</div>
                <div className="message-content">{message.getContenu()}</div>
                <div className="message-date">Posté le {dateString}</div>
            </div>
        </div>
    );
}