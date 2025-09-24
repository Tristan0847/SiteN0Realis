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
        <div className="flex gap-4 p-4 rounded-lg bg-neutral-light shadow-sm">
        <img
            className="w-12 h-12 rounded-full object-cover"
            src={avatarSrc}
            alt={`Avatar de ${message.getUtilisateur()}`}
        />
        <div className="flex flex-col">
            <span className="font-semibold text-primary-dark">{message.getUtilisateur()}</span>
            <p className="bg-neutral-light p-2 rounded-md text-neutral-dark max-w-md">{message.getContenu()}</p>
            <span className="text-xs text-neutral dark:text-neutral-dark mt-1">Posté le {dateString}</span>
        </div>
        </div>
    );
}