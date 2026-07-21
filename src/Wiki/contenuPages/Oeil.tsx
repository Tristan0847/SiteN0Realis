import OeilDeLOcculte from "@Wiki/components/OeilDeLOcculte";
import Link from "next/link";
import Image from "next/image";

/**
 * Méthode retournant un simple oeil de l'occulte en mode statique
 * @returns Composant OeilDeLOcculte en mode statique
 */
export function PageOeilOcculte() {
    const bauk = "/assets/logo/bauk.png"
    return(
        <>
            <OeilDeLOcculte mode="statique" couleur="blanc" tailleIris="moyen" vitesse={1} opacite={80} />
            <Link href="/journal-d-owl/bauk/" className="absolute opacity-10">
                <Image src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + bauk : bauk} alt="bauk" width={100} height={100} />
            </Link>
        </>
    );
}