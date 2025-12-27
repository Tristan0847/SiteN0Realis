"use client";
import Image from "next/image";
import Link from "next/link";
import { BarreRecherche } from "./BarreRecherche";

/**
 * Méthode de rendu du composant Header
 * @returns Composant Header
 */
export function Header() {
    return(
        <header className="bg-gray-800 shadow-md py-4 px-6 border-b-2 border-gray-600 z-20">
            <nav className="mx-auto max-w-11/12">
                {/* Layout PC: flex-row avec justify-between */}
                {/* Layout mobile: flex-col avec gap entre les sections */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap hover:scale-105 transition-transform duration-200 ease-in-out mx-auto lg:mx-0">
                        <Link href="/" className="flex flex-row items-center">
                            <Image
                                src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + "/assets/logo/Oeil de L'occulte (Blanc v3 miniature).png" : "/assets/logo/Oeil de L'occulte (Blanc v3 miniature).png"} 
                                alt="" 
                                width={40}
                                height={40}
                            />
                            L&apos;Oeil de l&apos;Occulte
                        </Link>
                    </h1>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:order-3">
                        <Link href="/graphe-de-connaissance" className="w-full sm:w-auto text-center text-white border-2 border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out whitespace-nowrap">
                            Tous nos articles
                        </Link>
                        <Link href="/article-aleatoire" className="w-full sm:w-auto text-center text-white border-2 border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out whitespace-nowrap">
                            Article au hasard
                        </Link>
                        <Link href="/a-propos" className="w-full sm:w-auto text-center text-white border-2 border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out whitespace-nowrap">
                            Qui sommes-nous ?
                        </Link>
                    </div>
                    
                    <BarreRecherche 
                        placeholder="Rechercher un article..." 
                        suggestionsMax={5} 
                        montrerSuggestions={true} 
                        className="w-full lg:flex-1 lg:max-w-2xl lg:mx-8 lg:order-2" 
                    />
                </div>
            </nav>
        </header>
    )
}