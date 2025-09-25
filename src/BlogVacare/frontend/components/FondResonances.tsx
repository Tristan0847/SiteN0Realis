'use client';
import { useResonanceAnimation } from '@BlogsFront/hooks/useResonanceAnimation';

/**
 * Composant correspondant à l'animation de résonances en fond du projet
 * @returns 
 */
export default function FondResonanceClient() {
    useResonanceAnimation(8470);
    return null;
}