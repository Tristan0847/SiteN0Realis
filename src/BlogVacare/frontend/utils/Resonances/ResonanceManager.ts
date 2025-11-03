import { Resonance } from "@BlogsFront/utils/Resonances/Resonance";
import { ResonanceConfig } from "@BlogsFront/utils/Resonances/ResonanceConfig";

/**
 * Gestionnaire centralisé des résonances
 */
export class ResonanceManager {
    // Résonances actuelles
    private resonancesActuelles: Resonance[] = [];
    // Dernière résonance créée
    private derniereResonanceTemps: number = 0;
    // Configuration des résonances
    private readonly config: ResonanceConfig;

    /**
     * Constructeur de la classe
     * @param config Configuration actuelle des résonances
     */
    constructor(config : ResonanceConfig) {
        this.config = config;
    }

    /**
     * Crée et ajoute une nouvelle résonance à la liste
     */
    public ajouterResonance(): void {
        this.resonancesActuelles.push(new Resonance(this.config));
    }

    /**
     * Getter pour accéder aux résonances actives
     * @returns Array des résonances actives
     */
    public getResonancesActuelles(): Resonance[] {
        return this.resonancesActuelles;
    }

    /**
     * Nettoie automatiquement les résonances expirées
     * @param tempsActuel Temps actuel
     */
    public filtrerResonancesActuelles(tempsActuel: number): void {
        this.resonancesActuelles = this.resonancesActuelles.filter(resonance => resonance.estActif(tempsActuel));
    }

    /**
     * Détermine si il est temps de déclencher une nouvelle résonance
     * @param tempsActuel Temps actuel
     * @returns true si l'intervalle de résonance est dépassé
     */
    private nouvelleResonancePossible(tempsActuel: number): boolean {
        return tempsActuel - this.derniereResonanceTemps > this.config.intervalle;
    }

    /**
     * Déclenche une nouvelle résonance si les conditions de timing sont remplies
     * @param tempsActuel Temps actuel
     */
    public nouvelleResonance(tempsActuel: number): void {
        if (this.nouvelleResonancePossible(tempsActuel)) {
            this.ajouterResonance();
            this.derniereResonanceTemps = tempsActuel;
        }
    }

    /**
     * Vérification rapide de l'état de la liste
     * @returns true si au moins une résonance est active
     */
    public contientResonancesActuelles(): boolean {
        return this.resonancesActuelles.length > 0;
    }
}