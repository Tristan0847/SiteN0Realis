import { MoteurResonance } from '@BlogsFront/utils/Resonances/MoteurResonances';
import { useEffect, useRef } from 'react';

/**
 * Hook d'animation des résonances
 * @param intervalle Intervalle entre les pulsations en millisecondes (défaut: 8470ms)
 * @returns Objet contenant la référence au moteur d'animation (pour usage avancé)
 */
export const useResonanceAnimation = (intervalle: number = 8470) => {

    // Moteur d'animation
    const engineRef = useRef<MoteurResonance | null>(null);

    // Cycle de vie de l'animation
    useEffect(() => {
        // Récupération de l'élément body
        const body = document.body;
        
        // Création et démarrage du moteur d'animation
        engineRef.current = new MoteurResonance(body, intervalle);
        engineRef.current.start();

        // Fonction de nettoyage à l'arrêt
        return () => {
            engineRef.current?.stop();
            engineRef.current = null;
        };
    }, [intervalle]);
    
    return {
        engine: engineRef.current
    };
};