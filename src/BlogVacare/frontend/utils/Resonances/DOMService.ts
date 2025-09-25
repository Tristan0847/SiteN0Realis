/**
 * Classe de gestion des opérations DOM
 */
export class DOMService {

    /**
     * Propriétés statiques d'overlay des ondes
     */
    private static readonly OVERLAY_STYLES = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.25;
        transition: opacity 0.3 ease-out;
    `;

    /**
     * Méthode permettant de créer l'élément d'overlay des résonances
     * @returns Div configurée avec le style des résonances
     */
    static creerResonanceOverlay(): HTMLDivElement {
        const overlay = document.createElement('div');
        overlay.style.cssText = this.OVERLAY_STYLES;
        return overlay;
    }

    /**
     * Applique les styles du background pour l'élément Body, couvrant la page entière
     * @param body Element body du document 
     */
    static appliquerStylesBody(body: HTMLElement): void {
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundSize = '100% 100%';
        body.style.backgroundPosition = '50% 50%';
        body.style.backgroundAttachment = 'fixed';
    }

    /**
     * Permet de faire revenir à la normale le style du Body
     * @param body Element body du document
     */
    static resetBodyStyles(body: HTMLElement): void {
        body.style.backgroundRepeat = '';
        body.style.backgroundSize = '';
        body.style.backgroundPosition = '';
        body.style.backgroundAttachment = '';
    }
}
