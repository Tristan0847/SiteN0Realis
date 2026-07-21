/**
 * Typage des résonnances, contenant : <br>
 * - Son intervalle : durée entre 2 résonances
 * - Sa durée : durée d'une résonance
 * - Son opacité max : Opacité de la résonance, si elle est plus ou moins marquée
 * - La position de son centre : Point à partir duquel les résonances se feront
 * - Sa taille : Largeur horizontale de la résonance
 * - Sa couleur : couleur du fond (gris, noir, ...)
 * - Sa direction : horizontale, verticale ou radiale
 * - Son intensité : Intensité de l'écho
 */
export interface ResonanceConfig {
    intervalle: number;
    duree: number;
    opaciteMax: number;
    positionCentre: number;
    tailleResonance: number;
    couleurs: string[];
    direction: 'horizontal' | 'vertical' | 'radial';
    intensiteEcho: number;
}

export enum TypeConfigResonance {
    old = "old",
    modern = "modern",
    vacare = "vacare",
    neant = "neant",
    avos = "avos"
}

/**
 * Presets de configurations de résonances du Néant
 */
export const RESONANCE_PRESETS: Record<TypeConfigResonance, ResonanceConfig> = {
    // Résonance noire, centrale et horizontale
    old: {
        intervalle: 8470,
        duree: 8000,
        opaciteMax: 0.75,
        positionCentre: 50,
        tailleResonance: 50,
        couleurs: ['0,0,0', "50, 50, 50"],
        direction: 'horizontal',
        intensiteEcho: 0.75
    },
    // Résonance plus claire et moins prononcée
    modern: {
        intervalle: 8470,
        duree: 12000,
        opaciteMax: 0.65,
        positionCentre: 50,
        tailleResonance: 60,
        // Résonances violettes, grisées
        couleurs: ['186, 179, 194', '144, 155, 161'],
        direction: 'horizontal',
        intensiteEcho:0.65
    },
    vacare: {
        intervalle: 4700,
        duree: 8470,
        opaciteMax: 0.87,
        positionCentre: 50,
        tailleResonance: 87,
        // Résonances blanches
        couleurs: ['187, 187, 187'],
        direction: 'horizontal',
        intensiteEcho:0.75
    },
    neant: {
        intervalle: 3000,
        duree: 6000,
        opaciteMax: 0.87,
        positionCentre: 50,
        tailleResonance: 100,
        couleurs: ['80, 80, 80', '40, 40, 40', '70, 70, 70'],
        direction: 'vertical',
        intensiteEcho: 0.75
    },
    avos: {
        intervalle: 8000,
        duree: 11000,
        opaciteMax: 0.6,
        positionCentre: 50,
        tailleResonance: 200,
        couleurs: ['50,155,50', '55,200,55', '22,44,22'],
        direction: 'radial',
        intensiteEcho: 0.75
    }
};