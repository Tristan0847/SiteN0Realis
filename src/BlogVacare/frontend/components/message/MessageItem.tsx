'use client';

import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';
import { Message } from '@BlogsShared/model/Message';
import Image from "next/image";
import { useState } from 'react';

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
    const avatarDefaut = `/assets/BlogVacare/Icones/Vince.jpg`;
    const avatarUtilisateur = `/assets/BlogVacare/Icones/${message.getUtilisateur().getUsername()}.jpg`;
    const [avatarSrc, setAvatarSrc] = useState(avatarUtilisateur);

    // Formatage de la date
    const dateString = message.getDate().toLocaleString('fr-FR');

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);


    return (
        <div className={ styles.messageItem }>
            <div className={ styles.messageImgConteneur }>
                <Image
                    className={ styles.messageImg }
                    src={avatarSrc}
                    alt={`Avatar de ${message.getUtilisateur().getUsername()}`}
                    width={96} height={96}
                    onError={() => setAvatarSrc(avatarDefaut)}
                />
            </div>

            <div className={ styles.messageConteneur }>
                <span className={ styles.messagecontenuPseudo }>{message.getUtilisateur().getUsername()}</span>
                <p className={ styles.messageContenu }>{message.getContenu()}</p>
                <span className={ styles.messageDate }>Posté le {dateString}</span>
            </div>
        </div>
    );
}