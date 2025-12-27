"use client";

import FondResonance from "@BlogsFront/components/FondResonances";
import { TypeConfigResonance } from "@BlogsFront/utils/Resonances/ResonanceConfig";
import { useEffect, useState } from "react";


export function PageVacareArrive() {
    // Date de fin du compte à rebours
    const dateFinale = new Date("2026-01-01T00:00:00");

    // Constante pour calculer le temps entre la date actuelle et le 1er janvier
    const [tempsRestant, setTempsRestant] = useState<string>("");
    const [afficherVideo, setAfficherVideo] = useState<boolean>(false);

    // Rechargement du temps restant à chaque seconde
    useEffect(() => {
        const intervalle = setInterval(() => {
            const maintenant = new Date();
            const difference = dateFinale.getTime() - maintenant.getTime();

            setAfficherVideo(difference <= 0);

            // Affichage des heures, minutes et secondes restantes
            const heures = Math.floor((difference / (1000 * 60 * 60)));
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const secondes = Math.floor((difference / 1000) % 60);

            const tempsFormatte = `${heures}:${minutes}:${secondes}`;
            setTempsRestant(tempsFormatte);
        }, 1000);

        return () => clearInterval(intervalle);
    }, []);

    return (
        <div style={{ position: 'relative', minHeight: '100vh', background: "black"}}>
          <FondResonance preset={ TypeConfigResonance.vacare }/>
    
          <div style={{ position: 'relative', zIndex: 1 }}>
            <main className="text-6xl font-extrabold text-black drop-shadow-md leading-tight min-h-screen flex flex-col justify-center items-center">
                {afficherVideo ? (
                    <div className="relative w-1/2 aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-gray-600">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src=""
                            title="Nouveau départ"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )
                : tempsRestant !== "" ? tempsRestant : "..."
                }
            </main>
          </div>
        </div>
    );
}