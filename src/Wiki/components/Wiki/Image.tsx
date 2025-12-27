import Image from "next/image";
import Link from "next/link";

/**
 * Props pour le composant Image
 */
interface ImageProps {
    src: string;
    alt: string;
    width?: string;
}

/**
 * Composant pour afficher une image s'affichant à la suite de texte (pour en afficher plusieurs à la suite)
 * @param src Source de l'image
 * @param alt Texte alternatif qui servira aussi de légende
 * @param width Largeur de l'image, par défaut 300px
 * @returns Composant ImageCustom
 */
export function ImageCustom ({ src, alt, width = "300px" }: ImageProps) {
    
    return (
        <figure className={`inline-block mx-2 my-auto border border-gray-600 rounded-lg bg-gray-800 shadow-lg`} style={{ width }}>
            <Link href={src} target="_blank" rel="noopener noreferrer">
                <Image src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + src : src} alt={alt} className="w-full h-auto object-cover" width={0} height={0} />
            </Link>
            <figcaption className="px-3 py-2 text-sm text-gray-300 text-center italic">
                {alt}
            </figcaption>
        </figure>
    );
};
