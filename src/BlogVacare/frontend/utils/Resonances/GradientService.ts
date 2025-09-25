import { Resonance } from "@BlogsFront/utils/Resonances/Resonance";

/**
 * Service statique générant des gradients CSS pour les résonances
 */
export class GradientService {
    // Seuil minimum d'intensité pour qu'une résonance soit visible
    private static readonly MIN_INTENSITY_THRESHOLD = 0.005;
    // Opacité maximum
    private static readonly MAX_OPACITY = 0.35;
    // Position centrale fixe de l'effet
    private static readonly CENTER_POSITION = 50;

    /**
     * Génère un gradient CSS linéaire pour une résonance seule
     * @param position Position de l'onde
     * @param intensite Intensité de l'onde
     * @returns CSS représentant le gradient linéaire
     */
    static creerGradientResonances(position: number, intensite: number): string {
        const opacity = Math.min(this.MAX_OPACITY, intensite);
        const waveSpread = Math.min(45, (position / 100) * 40);
        const centerPos = this.CENTER_POSITION;

        // Gradient généré
        return `linear-gradient(to right,
            transparent 0%,
            transparent ${Math.max(0, centerPos - waveSpread - 5)}%,
            rgba(0,0,0,${opacity * 0.5}) ${Math.max(0, centerPos - waveSpread)}%,
            rgba(0,0,0,${opacity * 0.8}) ${Math.max(0, centerPos - waveSpread / 2)}%,
            rgba(0,0,0,${opacity}) ${centerPos}%,
            rgba(0,0,0,${opacity * 0.8}) ${Math.min(100, centerPos + waveSpread / 2)}%,
            rgba(0,0,0,${opacity * 0.5}) ${Math.min(100, centerPos + waveSpread)}%,
            transparent ${Math.min(100, centerPos + waveSpread + 5)}%,
            transparent 100%
        )`;
    }

    /**
     * Traite toutes les résonances actives et génère leurs gradients respectifs
     * @param activeWaves Tableau des résonances actives
     * @param currentTime Temps actuel pour calculer l'état de chaque résonance
     * @returns Array de CSS représentant tous les gradients à appliquer
     */
    static genererGradients(activeWaves: Resonance[], currentTime: number): string[] {
        const gradients: string[] = [];

        activeWaves.forEach(wave => {
            const waveData = wave.getDonneesResonance(currentTime);
            
            // Ne traite que les résonances assez intenses pour être visibles
            if (waveData && waveData.intensite >= this.MIN_INTENSITY_THRESHOLD) {
                const { position, intensite } = waveData;
                gradients.push(this.creerGradientResonances(position, intensite));
            }
        });

        return gradients;
    }
}