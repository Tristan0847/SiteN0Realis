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
        <div className="flex gap-4 rounded-lg bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
            <div className="flex-none w-2/12 bg-gradient-to-r from-gray-300/50 to-white flex justify-center p-1">
                <img
                    className="w-24 h-24 rounded-full object-cover p-4"
                    src={avatarSrc}
                    alt={`Avatar de ${message.getUtilisateur()}`}
                />
            </div>

            <div className="flex-1 flex flex-col pr-2 p-4">
                <span className="font-semibold text-primary-dark col border-b-2 border-gray-400/15">{message.getUtilisateur()}</span>
                <p className="bg-white p-2 rounded-md text-neutral-dark pr-5 whitespace-pre-line">{message.getContenu()}</p>
                <span className="text-xs text-neutral dark:text-neutral-dark mt-1 pl-2">Posté le {dateString}</span>
            </div>
        </div>
    );
}