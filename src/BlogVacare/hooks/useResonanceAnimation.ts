import { MoteurResonance } from '@BlogsFront/utils/Resonances/MoteurResonances';
import { RESONANCE_PRESETS, TypeConfigResonance } from '@BlogsFront/utils/Resonances/ResonanceConfig';
import { useEffect, useRef } from 'react';

/**
 * Hook d'animation des résonances
 * @param preset Preset à utiliser (moderne par défaut)
 * @returns Objet contenant la référence au moteur d'animation
 */
export const useResonanceAnimation = (preset: TypeConfigResonance = TypeConfigResonance.modern) => {

    // Moteur d'animation
    const engineRef = useRef<MoteurResonance | null>(null);

    // Cycle de vie de l'animation
    useEffect(() => {
        // Récupération de l'élément body
        const body = document.body;
        
        // Récupération de la configuration
        const config = RESONANCE_PRESETS[preset];

        // Création et démarrage du moteur d'animation
        engineRef.current = new MoteurResonance(body, config);
        engineRef.current.start();

        // Fonction de nettoyage à l'arrêt
        return () => {
            engineRef.current?.stop();
            engineRef.current = null;
        };
    }, [preset]);
    
    return {
        engine: engineRef.current
    };
};