"use client";

import {useState} from "react";
import Image from "next/image";


interface ImageDeProfilProps {
    nom_utilisateur: string;
    classNames?: string;
}

/**
 * Composant affichant l'image de profil d'un utilisateur
 * @param nom_utilisateur Nom de l'utilisateur
 * @param classNames Classes éventuelles
 * @constructor
 */
export function ImageDeProfil({nom_utilisateur, classNames = ""} : ImageDeProfilProps) {
    // Chemin vers l'avatar
    const avatarDefaut = `/assets/BlogVacare/Icones/Vince.jpg`;
    const avatarUtilisateur = `/assets/BlogVacare/Icones/${nom_utilisateur}.jpg`;
    const [avatarSrc, setAvatarSrc] = useState(avatarUtilisateur);

    return (
        <Image
            className={ classNames }
            src={avatarSrc}
            alt={`Avatar de ${nom_utilisateur}`}
            width={64}
            height={64}
            onError={() => setAvatarSrc(avatarDefaut)}
        />
    );
}