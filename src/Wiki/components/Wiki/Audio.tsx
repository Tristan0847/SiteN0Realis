"use client";

import { Download } from "lucide-react";
import Link from "next/link";

/**
 * Props pour le composant de lecteur audio
 */
interface AudioProps {
    src : string;
    titre?: string;
}

/**
 * Composant Audio pour lire un fichier audio
 * @param src Source du fichier audio
 * @param titre Titre affiché
 * @returns 
 */
export function Audio({ src, titre = "Audio" }: AudioProps) {
    return (
        <figure className="my-4 p-4 border border-gray-600 rounded-lg bg-gray-800 shadow-lg max-w-3xl">
            <figcaption>{titre}</figcaption>
            <div className="row-gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <audio controls className="my-4 w-full">
                    <source src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + src : src} />
                </audio>
                <Link href={ src } download><Download></Download></Link>
            </div>
        </figure>
    );
}