import { Resonance } from "@BlogsFront/utils/Resonances/Resonance";
import { ResonanceConfig } from "@BlogsFront/utils/Resonances/ResonanceConfig";

/**
 * Service statique générant des gradients CSS pour les résonances
 */
export class GradientService {
    // Seuil minimum d'intensité pour qu'une résonance soit visible
    private static readonly MIN_INTENSITY_THRESHOLD = 0.005;

    /**
     * Génère un gradient CSS linéaire pour une résonance seule
     * @param position Position de l'onde
     * @param intensite Intensité de l'onde
     * @param couleur Couleur de la résonance
     * @param config Configuration des résonances
     * @returns CSS représentant le gradient linéaire
     */
    static creerGradientResonances(position: number, intensite: number, couleur : string, config : ResonanceConfig): string {
        const opacity = Math.min(config.opaciteMax, intensite);
        const waveSpread = Math.min(config.tailleResonance, (position / 100) * (config.tailleResonance * 0.9));
        const centerPos = config.positionCentre;

        // Gradient généré
        let gradient = "";
        switch (config.direction) {
            case 'radial':
                gradient = `radial-gradient(ellipse at ${centerPos}% ${centerPos}%,
                    rgba(${couleur},${opacity}) 0%,
                    rgba(${couleur},${opacity * 0.8}) ${waveSpread * 0.3}%,
                    rgba(${couleur},${opacity * 0.5}) ${waveSpread * 0.6}%,
                    rgba(${couleur},${opacity * 0.2}) ${waveSpread}%,
                    transparent ${waveSpread + 10}%
                )`;
                break;
            case 'vertical':
                gradient = `linear-gradient(to bottom,
                    transparent 0%,
                    transparent ${Math.max(0, centerPos - waveSpread - 5)}%,
                    rgba(${couleur},${opacity * 0.5}) ${Math.max(0, centerPos - waveSpread)}%,
                    rgba(${couleur},${opacity * 0.8}) ${Math.max(0, centerPos - waveSpread / 2)}%,
                    rgba(${couleur},${opacity}) ${centerPos}%,
                    rgba(${couleur},${opacity * 0.8}) ${Math.min(100, centerPos + waveSpread / 2)}%,
                    rgba(${couleur},${opacity * 0.5}) ${Math.min(100, centerPos + waveSpread)}%,
                    transparent ${Math.min(100, centerPos + waveSpread + 5)}%,
                    transparent 100%
                )`;
                break;
            case 'horizontal':
            default:
                gradient = `linear-gradient(to right,
                    transparent 0%,
                    transparent ${Math.max(0, centerPos - waveSpread - 5)}%,
                    rgba(${couleur},${opacity * 0.5}) ${Math.max(0, centerPos - waveSpread)}%,
                    rgba(${couleur},${opacity * 0.8}) ${Math.max(0, centerPos - waveSpread / 2)}%,
                    rgba(${couleur},${opacity}) ${centerPos}%,
                    rgba(${couleur},${opacity * 0.8}) ${Math.min(100, centerPos + waveSpread / 2)}%,
                    rgba(${couleur},${opacity * 0.5}) ${Math.min(100, centerPos + waveSpread)}%,
                    transparent ${Math.min(100, centerPos + waveSpread + 5)}%,
                    transparent 100%
                )`;
                break;
        }
        return gradient;
    }

    /**
     * Traite toutes les résonances actives et génère leurs gradients respectifs
     * @param activeWaves Tableau des résonances actives
     * @param currentTime Temps actuel pour calculer l'état de chaque résonance
     * @param config Configuratio actuelle des résonances
     * @returns Array de CSS représentant tous les gradients à appliquer
     */
    static genererGradients(activeWaves: Resonance[], currentTime: number, config : ResonanceConfig): string[] {
        const gradients: string[] = [];

        activeWaves.forEach(wave => {
            const waveData = wave.getDonneesResonance(currentTime);
            
            // Ne traite que les résonances assez intenses pour être visibles
            if (waveData && waveData.intensite >= this.MIN_INTENSITY_THRESHOLD) {
                const { position, intensite } = waveData;
                const couleur = wave.getCouleur();
                gradients.push(this.creerGradientResonances(position, intensite, couleur, config));
            }
        });

        return gradients;
    }
}