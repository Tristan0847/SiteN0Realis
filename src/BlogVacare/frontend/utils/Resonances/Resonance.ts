import { ResonanceConfig } from "@BlogsFront/utils/Resonances/ResonanceConfig";

/**
 * Données concernant une résonance 
 */
export interface ResonanceData {
    position : number;
    intensite : number;
}

/**
 * Classe correspondant à une résonance
 */
export class Resonance {

    // Début de la résonnance
    private startTime : number;
    // Durée de la résonance
    private duration : number;
    // Identifiant unique
    private id : number;
    // Couleur de la résonance
    private couleur : string;
    // Facteur ajouté à chaque écho
    private echoFacteur : number;


    /**
     * Constructeur de la classe
     * @param config Configuration de la résonance
     */
    constructor(config : ResonanceConfig) {
        this.startTime = Date.now();
        this.duration = config.duree;
        this.id = Math.random();
        this.echoFacteur = config.intensiteEcho;

        // Choix aléatoire de la couleur de la résonance parmi celles de la configuration
        const valeurAleatoire = Math.floor(Math.random() * config.couleurs.length);
        this.couleur = config.couleurs[valeurAleatoire];
    }

    /**
     * Méthode permettant d'obtenir l'avancée de la résonance actuelle
     * @param currentTime Temps actuel
     * @returns Progression dans l'avancée de la résonnance (durée écoulée / durée totale)
     */
    public getProgression(currentTime : number) : number {
        const elapsed = currentTime - this.startTime;
        return elapsed / this.duration;
    }

    /**
     * Méthode permettant de déterminer si oui ou non une résonance est active
     * @param currentTime Temps actuel
     * @returns Si progression de la résonnance à plus de 100% : true, sinon false
     */
    public estActif(currentTime : number) : boolean {
        return this.getProgression(currentTime) < 1;
    }

    /**
     * Méthode retournant les données d'une résonance
     * @param currentTime Temps actuel
     * @returns Retourne la position et l'intensité de la résonance
     */
    public getDonneesResonance(currentTime : number) : ResonanceData {
        const progress = this.getProgression(currentTime);

        if (progress >= 1)
            return {position: -1, intensite: 0};

        const wavePosition = progress * 100;
        const baseIntensity = Math.max(0, 1 - progress);

        // Intensité de la configuration
        const echo1 = Math.abs(Math.sin(progress * Math.PI * 12) * 0.15 * this.echoFacteur);
        const echo2 = Math.abs(Math.sin(progress * Math.PI * 6) * 0.25 * this.echoFacteur);
        const echo3 = Math.abs(Math.sin(progress * Math.PI * 3) * 0.35 * this.echoFacteur);
        const echo4 = Math.abs(Math.sin(progress * Math.PI * 1.5) * 0.45 * this.echoFacteur);
        
        // Dissipation progressive
        let fonduFermeture = 1;
        if (progress > 0.75) {
            fonduFermeture = Math.pow((1 - progress) / 0.25, 0.3);
        }
        
        const combinedEchos = echo1 + echo2 + echo3 + echo4;
        const totalIntensity = baseIntensity * combinedEchos * fonduFermeture;

        return {position: wavePosition, intensite: totalIntensity};
    }

    /**
     * Getter de l'id de la résonance
     * @returns ID de la résonance
     */
    public getId() : number {
        return this.id;
    }

    /**
     * Getter de la couleur de la résonance
     * @returns Couleur de la résonance
     */
    public getCouleur() : string {
        return this.couleur;
    }
}