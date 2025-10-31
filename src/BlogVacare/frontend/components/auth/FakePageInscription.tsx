"use client";

import { useVariant } from "@BlogsFront/contexts/VariantContext";
import Image from "next/image";
import Link from "next/link";
import { RatsConteneur } from "@BlogsFront/components/RatsConteneur";

/**
 * Méthode de génération d'une fausse page d'inscription (version exportée HTML du site)
 * @returns Bloc de fausse page d'inscription
 */
export function FakePageInscription() {
    // Récupération des styles
    const variant = useVariant();

    
    if (variant == "old") {
        const contenu = [];
        for (let i = 1; i <= 1000; i++) {
            const lien = (i == 847) ? "https://youtu.be/7_dVLZ21i7w" : "https://youtu.be/Cym75FpUdgM";
            contenu.push(<Link href={ lien }>Diffusion n° {i}</Link>);
        }

        const lignes = [];
        const elementsParLigne = 6;
        for (let i = 0; i < contenu.length; i +=elementsParLigne) {
            const ligne = contenu.slice(i, i + elementsParLigne);
            lignes.push(ligne);
        }
        
        return (
            <RatsConteneur>
                <h2 className="text-center text-3xl p-4">Robert nous a ouvert la voie.</h2>
                <table className="w-full table-auto border-collapse border border-white">
                    <tbody>
                        { lignes.map((liens, indexLigne) => (
                            <tr key={ indexLigne }>
                                { liens.map((lien, indexColonne) => (
                                <td key={ indexColonne } className="px-2 py-1 text-center hover:underline hover:scale-[1.2] transition">
                                    { lien}
                                </td>  
                                ))}
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </RatsConteneur>
        );
    }
    else {
        return (
            <RatsConteneur className="relative z-0">
                <div className="absolute inset-0 -z-10 w-full h-full opacity-25">
                    <Image className="opacity-5" src="/assets/Rats/N0Records.png" alt="N0Records" layout="fill" objectFit="cover" />
                </div>
                <h2 className="text-center my-auto text-white text-3xl p-4 relative z-10">Les N0Records seront délivrés en temps voulu.</h2>
            </RatsConteneur>
        );
    }
}
