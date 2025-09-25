import { Resonance } from "@BlogsFront/utils/Resonances/Resonance";

/**
 * Gestionnaire centralisé des résonances
 */
export class ResonanceManager {
    // Résonances actuelles
    private resonancesActuelles: Resonance[] = [];
    // Dernière résonance créée
    private derniereResonanceTemps: number = 0;
    // Intervalle entre deux pulsations (en ms)
    private readonly intervalle: number;

    /**
     * Constructeur de la classe
     * @param intervalle Délai en millisecondes entre chaque résonance
     */
    constructor(intervalle: number = 8470) {
        this.intervalle = intervalle;
    }

    /**
     * Crée et ajoute une nouvelle résonance à la liste
     */
    public ajouterResonance(): void {
        this.resonancesActuelles.push(new Resonance());
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
        return tempsActuel - this.derniereResonanceTemps > this.intervalle;
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