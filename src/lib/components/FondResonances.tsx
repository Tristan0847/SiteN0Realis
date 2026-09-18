'use client';
import {useResonanceAnimation} from '../hooks/useResonanceAnimation';
import {TypeConfigResonance} from '../utils/Resonances/ResonanceConfig';

/**
 * Interface de props passés en paramètre au fond de résonances
 */
interface ResonanceProps {
    preset?: TypeConfigResonance;
}

/**
 * Composant correspondant à l'animation de résonances en fond du projet
 * @returns
 */
export default function FondResonance({preset = TypeConfigResonance.modern}: ResonanceProps) {
    useResonanceAnimation(preset);
    return null;
}