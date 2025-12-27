'use client';

import React, { useEffect, useRef } from 'react';
import { SvgEnhancerConfig, SvgToolbelt } from 'svg-toolbelt';

/**
 * Props pour le composant SVGinteractif
 */
interface SVGinteractifProps {
    children: React.ReactNode;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    className?: string;
    config?: Partial<SvgEnhancerConfig>;
}

/**
 * Composant SVG interactif avec zoom et déplacement
 * @param children Contenu SVG
 * @param width Largeur du conteneur SVG
 * @param height Hauteur du conteneur SVG
 * @param viewBox VueBox du SVG
 * @param className Classe CSS supplémentaire
 * @param config Configuration personnalisée pour SvgToolbelt
 * @returns Composant SVG Interactif
 */
export function SVGinteractif({ children, width = "100%", height = "600px", viewBox, className = "", config }: SVGinteractifProps) {

    // Initialisation des références vers le conteneur et l'instance SvgToolbelt
    const containerRef = useRef<HTMLDivElement>(null);
    const toolbeltRef = useRef<SvgToolbelt | null>(null);

    // Intialisation et nettoyage de SvgToolbelt
    useEffect(() => {
        if (!containerRef.current) return;

        // Nettoyage de l'instance précédente
        if (toolbeltRef.current) {
        toolbeltRef.current.destroy();
        toolbeltRef.current = null;
        }

        // Configuration par défaut avec options personnalisées
        const defaultConfig: Partial<SvgEnhancerConfig> = {
        minScale: 0.1,
        zoomStep: 0.3,
        maxScale: 10,
        showControls: true,
        controlsPosition: 'top-right',
        showZoomLevelIndicator: true,
        enableKeyboard: true,
        enableTouch: true,
        ...config
        };

        // Création de l'instance
        toolbeltRef.current = new SvgToolbelt(containerRef.current, defaultConfig);
        toolbeltRef.current.init();

        // Nettoyage et montage de l'instance
        return () => {
            if (toolbeltRef.current) {
                toolbeltRef.current.destroy();
                toolbeltRef.current = null;
            }
        };
    }, [config]);

    // Rendu du conteneur SVG
    return (
        <div  ref={containerRef} style={{ width, height, border: '1px solid #ccc', position: 'relative' }}>
            <svg width="100%" height="100%"
                viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className={className}>
                {children}
            </svg>
        </div>
    );
}
