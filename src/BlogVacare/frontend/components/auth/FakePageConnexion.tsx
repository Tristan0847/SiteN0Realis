"use client";

import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { RatsConteneur } from "@BlogsFront/components/RatsConteneur";

/**
 * Méthode de génération d'une fausse page de connexion (version exportée HTML du site)
 * @returns Bloc de fausse page de connexion
 */
export function FakePageConnexion() {
    // Récupération des styles
    const variant = useVariant();
    
    if (variant == "old") {
        return (
            <RatsConteneur>
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-red-600">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/XcPv5B7sr9k"
                                title="Rapport 1"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-red-600">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/8Dvsg70Za-A"
                                title="Rapport 2"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-700 text-sm">
                            Vacare arrive.
                        </p>
                    </div>
                </div>
            </RatsConteneur>
        );
    }
    else {
        return (
            <RatsConteneur>
                <div className="w-full max-w-6xl flex flex-col items-center gap-8">
                    <div className="text-center space-y-4 text-gray-300 text-lg">
                        <p><a href="https://youtu.be/0_RO74QsIAo?t=367">Robert nous a ouvert la voie.</a></p>
                        <p>Nous sommes les Rats que N0Realis aimerait exterminer.</p>
                        <p>Nous sommes les parangons d&apos;une vérité qu&apos;ils souhaiteraient enterrer.</p>
                        <p>Il est temps pour N0Realis de récolter.</p>
                    </div>

                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/oaWK3ZYITYk"
                            title="Décla-rat-ion de guerre"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-gray-400 text-sm">
                            Nous vous recontacterons en temps voulu.
                        </p>
                    </div>
                </div>
            </RatsConteneur>
        );
    }
}
