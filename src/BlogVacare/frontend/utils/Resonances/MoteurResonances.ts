import { ResonanceManager } from "@BlogsFront/utils/Resonances/ResonanceManager";
import { DOMService } from "@BlogsFront/utils/Resonances/DOMService";
import { GradientService } from "@BlogsFront/utils/Resonances/GradientService";
import { ResonanceConfig } from "@BlogsFront/utils/Resonances/ResonanceConfig";

/**
 * Moteur gérant le système d'animation des ondes
 */
export class MoteurResonance {
    // Gestionnaire d'ondes
    private resonanceManager: ResonanceManager;
    // Gestionnaire de gradients
    private gradientService : GradientService;
    // Element DOM pour l'affichage
    private resonanceOverlay: HTMLDivElement;
    // ID de la boucle d'animation pour l'arrêter
    private animationFrameId: number | null = null;
    // ID de l'intervalle de résonance
    private intervalleResonances: number | null = null;
    // Body de la page
    private body : HTMLElement;
    // Configuration actuelle des résonances 
    private config : ResonanceConfig;
    // Dernier background mis en cache pour l'optimisation
    private dernierBackground : string = "";

    // Valeurs d'images par seconde, limitées à 60 pour optimiser l'affichage
    private derniereFrame : number = 0;
    private readonly FPS = 60;
    private readonly INTERVALLE_FRAMES = 1000 / this.FPS;

    /**
     * Constructeur de la classe
     * @param body Element body du document
     * @param config Configuration des résonances
     */
    constructor(body: HTMLElement, config : ResonanceConfig) {
        this.body = body;
        this.config = config;
        this.resonanceManager = new ResonanceManager(config);
        this.resonanceOverlay = DOMService.creerResonanceOverlay();
        this.gradientService = new GradientService();
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
        const gradients = this.gradientService.genererGradients(this.resonanceManager.getResonancesActuelles(), tempsActuel, this.config);

        const finalBackground = gradients.length > 0 ? gradients.join(', ') : 'transparent';
        if (finalBackground != this.dernierBackground) {
            this.resonanceOverlay.style.background = finalBackground;
            this.dernierBackground = finalBackground;
        }
    }

    /**
     * Boucle d'animation principale
     */
    private animer = (): void => {
        const tempsActuel = Date.now();
        const delta = tempsActuel - this.derniereFrame;
        
        // On n'animera selon une limite définie en constante, 60 FPS par exemple
        if (delta > this.INTERVALLE_FRAMES) {
            this.derniereFrame = tempsActuel - (delta % this.INTERVALLE_FRAMES);

            // Gestion automatique des résonances temporelles
            this.resonanceManager.nouvelleResonance(tempsActuel);
            
            // Mise à jour visuelle
            this.updateGradients();
        }
            
        // Programmation de la frame suivante
        this.animationFrameId = requestAnimationFrame(this.animer);
    };

    /**
     * Démarre le système d'animation
     */
    start(): void {
        // Injection DOM
        this.body.appendChild(this.resonanceOverlay);
        DOMService.appliquerStylesBody(this.body);
        
        // Démarrage des pulsations automatiques
        this.resonanceManager.ajouterResonance();
        
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

        // Nettoyage DOM
        if (this.resonanceOverlay && this.body.contains(this.resonanceOverlay)) {
            this.body.removeChild(this.resonanceOverlay);
        }

        // Reset de styles
        DOMService.resetBodyStyles(this.body);
    }
}