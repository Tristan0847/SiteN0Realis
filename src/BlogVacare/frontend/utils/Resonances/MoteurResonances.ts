import { ResonanceManager } from "@BlogsFront/utils/Resonances/ResonanceManager";
import { DOMService } from "./DOMService";
import { GradientService } from "./GradientService";

/**
 * Moteur gérant le système d'animation des ondes
 */
export class MoteurResonance {
    // Gestionnaire d'ondes
    private resonanceManager: ResonanceManager;
    // Element DOM pour l'affichage
    private resonanceOverlay: HTMLDivElement;
    // ID de la boucle d'animation pour l'arrêter
    private animationFrameId: number | null = null;
    // ID de l'intervalle de résonance
    private intervalleResonances: number | null = null;
    private body : HTMLElement;

    /**
     * Constructeur de la classe
     * @param body Element body du document
     * @param intervalle Intervalle entre 2 résonances
     */
    constructor(body: HTMLElement,intervalle: number = 8470) {
        this.body = body;
        this.resonanceManager = new ResonanceManager(intervalle);
        this.resonanceOverlay = DOMService.creerResonanceOverlay();
    }

    /**
     * Met à jour l'affichage visuel des résonances à chaque frame
     */
    private updateGradients(): void {
        const tempsActuel = Date.now();
        this.resonanceManager.filtrerResonancesActuelles(tempsActuel);

        // Pas de calcul si aucune onde active
        if (!this.resonanceManager.contientResonancesActuelles()) {
            this.resonanceOverlay.style.background = 'transparent';
            return;
        }

        // Génération et application des gradients pour toutes les résonances actives
        const gradients = GradientService.genererGradients(
            this.resonanceManager.getResonancesActuelles(),
            tempsActuel
        );

        const finalBackground = gradients.length > 0 ? gradients.join(', ') : 'transparent';
        this.resonanceOverlay.style.background = finalBackground;
    }

    /**
     * Boucle d'animation principale
     */
    private animer = (): void => {
        const tempsActuel = Date.now();
        
        // Gestion automatique des résonances temporelles
        this.resonanceManager.nouvelleResonance(tempsActuel);
        
        // Mise à jour visuelle
        this.updateGradients();
        
        // Programmation de la frame suivante
        this.animationFrameId = requestAnimationFrame(this.animer);
    };

    /**
     * Démarre le système de pulsations régulières avec setInterval
     * Complète le système de pulsations temporelles de la boucle d'animation
     * Double sécurité : pulsation par frame ET par intervalle fixe
     */
    private commencerResonances(): void {
        // Résonance initiale
        this.resonanceManager.ajouterResonance();
        
        // Résonances régulières programmées
        this.intervalleResonances = window.setInterval(() => {
            this.resonanceManager.ajouterResonance();
        }, this.resonanceManager['intervalle']);
    }

    /**
     * Démarre le système d'animation
     */
    start(): void {
        // Injection DOM
        this.body.appendChild(this.resonanceOverlay);
        DOMService.appliquerStylesBody(this.body);
        
        // Démarrage des pulsations automatiques
        this.commencerResonances();
        
        // Lancement de la boucle d'animation
        this.animer();
    }

    /**
     * Arrête complètement le système et nettoie toutes les ressources
     */
    stop(): void {
        // Arrêt de la boucle d'animation
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        // Arrêt des résonances programmées
        if (this.intervalleResonances) {
            clearInterval(this.intervalleResonances);
            this.intervalleResonances = null;
        }

        // Nettoyage DOM
        if (this.resonanceOverlay && this.body.contains(this.resonanceOverlay)) {
            this.body.removeChild(this.resonanceOverlay);
        }

        // Reset de styles
        DOMService.resetBodyStyles(this.body);
    }
}