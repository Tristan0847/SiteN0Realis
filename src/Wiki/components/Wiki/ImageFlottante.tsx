import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

/**
 * Props pour le composant ImageFlottante
 */
interface ImageFlottanteProps {
    src: string;
    alt: string;
    position?: "left" | "right";
    width?: string;
}

/**
 * Composant pour afficher une image flottante avec légende
 * @param src Source de l'image
 * @param alt Texte alternatif qui servira aussi de légende
 * @param position Position de l'image (left ou right), par défaut right
 * @param width Largeur de l'image, par défaut 300px
 * @returns Composant ImageFlottante
 */
export function ImageFlottante ({ src, alt, position = "right", width = "300px" }: ImageFlottanteProps) {
    const floatClass = position === "left" ? "float-left mr-6" : "float-right ml-6";
    
    return (
        <figure className={`${floatClass} mb-4 border border-gray-600 rounded-lg bg-gray-800 shadow-lg`} style={{ width }}>
            <Link href={src} target="_blank" rel="noopener noreferrer">
                <Image src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + src : src} alt={alt} className="w-full h-auto object-cover" width={0} height={0} />
            </Link>
            <figcaption className="px-3 py-2 text-sm text-gray-300 text-center italic">
                {alt}
            </figcaption>
        </figure>
    );
};

/**
 * Méthode d'encapsulation d'une section avec image flottante (pour mieux gérer le possible dépassement de l'image vers la section suivante)
 * @param children Contenu de la section
 * @returns Section avec image flottante
 */
export function SectionAvecImageFlottante({ children }: { children: ReactNode|string }) {
    return (
        <div className="clear-both overflow-auto">
            {children}
        </div>
    );
}