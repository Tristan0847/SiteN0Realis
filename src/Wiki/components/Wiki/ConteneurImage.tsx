"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Props pour le composant ConteneurImage
 */
interface ConteneurImageProps {
    src: string;
    urlLien?: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

/**
 * Méthode d'affichage d'une image dans un conteneur centré
 * @param src Source de l'image
 * @param urlLien URL du lien s'il est différent de celui de l'image (vide sinon)
 * @param alt Alt de l'image
 * @param width Largeur de l'image
 * @param height Hauteur de l'image
 * @param className Classes CSS supplémentaires
 * @returns 
 */
export function ConteneurImage({ src, urlLien = "", alt, width = 600, height = 800, className }: ConteneurImageProps) {
    return (
        <div className={`flex justify-center my-4 ${className ? className : ""}`}>
            <Link href={ urlLien ? urlLien : src } className={`block`}>
                <Image src={ process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + src : src} alt={alt} width={width} height={ height } className="max-w-full h-auto hover:scale-[1.05] transition-transform duration-300 border border-gray-200 rounded-md shadow-md" />
            </Link>
        </div>
    );
}