"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/**
 * Composant d'Oeil de l'Occulte animé
 */
export interface OeilDeLOcculteProps {
    mode?: "normal" | "suitSouris" | "agité" | "statique";
    couleur?: "blanc" | "noir" | "rouge";
    tailleIris?: "petit" | "moyen" | "grand";
    vitesse?: number;
    opacite?: number;
    className?: string;
}

//#region Constantes
// Ombre maximale de l'oeil
const OMBRE_MAX = 6;
// Intervalle de temps pour l'animation de l'ombre
const INTERVALLE_OMBRE = 10;
// Pas de l'ombre
const PAS_OMBRE = 0.1;



//#endregion

/**
 * Composant d'Oeil de l'Occulte animé 
 * @param mode Mode d'animation de l'oeil (normal, suivant la souris, "agité" donc changeant de position de façon agitée)
 * @param couleur Couleur de l'oeil (blanc, noir, rouge)
 * @param tailleIris Taille de l'iris (petit, moyen, grand)
 * @param vitesse Vitesse de l'animation (par défaut 2)
 * @param opacite Opacité de l'oeil (par défaut 100)
 * @param className Classe CSS supplémentaire
 */
export default function OeilDeLOcculte({ mode = "normal", couleur = "rouge", tailleIris = "grand", vitesse = 2, opacite = 100, className = "" }: OeilDeLOcculteProps) {
    // Position actuelle de l'iris
    const [positionIris, setPositionIris] = useState<{ x: number; y: number }>({ x: 0, y: 0});
    const [positionCible, setPositionCible] = useState<{ x: number; y: number }>({ x: 0, y: 0});

    // Ombre de l'oeil qui varie avec le temps 
    const [ombreOeil, setOmbreOeil] = useState<number>(1);
    const ombreOeilSensRef = useRef<boolean>(true);

    // Référence du conteneur pour calculer la position de la souris et de l'iris
    const [tailleConteneur, setTailleConteneur] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);

    // Définition du lien vers l'image en fonction de la couleur choisie
    const lienImage = `/assets/logo/Oeil de L'occulte (Ronces ${couleur}).png`;
    const lienIris = `/assets/logo/Triquetra ${couleur}.png`;

    // Calcul de la taille du cotneneur pour les déplacements de l'iris
    useEffect(() => {
        const updateTaille = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setTailleConteneur(Math.min(rect.width, rect.height));
            }
        }

        updateTaille();
        window.addEventListener("resize", updateTaille);
        return () => window.removeEventListener("resize", updateTaille);
    }, []);
    
    // Calcul de l'espace de déplacement en fonction de la taille de l'iris
    // Plus l'iris est grand, moins il peut se déplacer
    const baseEspaceMax = tailleConteneur * 0.35;
    let facteurTaille : number;
    let tailleIrisPourcentage : number;
    switch (tailleIris) {
        case "petit":
            facteurTaille = 0.38;
            tailleIrisPourcentage = 10;
            break;
        case "moyen": default:
            facteurTaille = 0.3;
            tailleIrisPourcentage = 15;
            break;
        case "grand":
            facteurTaille = 0.2;
            tailleIrisPourcentage = 22;
            break;
    }
    const espaceMaxDeplacement = baseEspaceMax * facteurTaille;
    
    // Couleur de l'ombre selon la couleur choisie
    const couleurOmbre = couleur === "blanc" ? "#FFFFFF" : couleur === "noir" ? "#000000" : "#FF0000";
    
    // Génération d'une position aléatoire dans le cercle défini par l'espace de déplacement
    const genererPositionAleatoire = () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * espaceMaxDeplacement;
        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        };
    };

    // Mode normal : changement de position toutes les 5 secondes
    useEffect(() => {
        if (mode !== "normal") return;
        
        const interval = setInterval(() => {
            setPositionCible(genererPositionAleatoire());
        }, 5000 / vitesse);

        return () => clearInterval(interval);
    }, [mode, vitesse, espaceMaxDeplacement]);

    // Mode agité : changement rapide toutes les 2 secondes
    useEffect(() => {
        if (mode !== "agité") return;
        
        const interval = setInterval(() => {
            const nouvellePosition = genererPositionAleatoire();
            setPositionIris(nouvellePosition);
            setPositionCible(nouvellePosition);
        }, 2000 / vitesse);

        return () => clearInterval(interval);
    }, [mode, vitesse, espaceMaxDeplacement]);

    // Mode suit souris
    useEffect(() => {
        if (mode !== "suitSouris") return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calcul du vecteur de la souris par rapport au centre
            let dx = e.clientX - centerX;
            let dy = e.clientY - centerY;

            // Calcul de la distance
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Limiter le déplacement à l'espace défini
            if (distance > espaceMaxDeplacement) {
                const ratio = espaceMaxDeplacement / distance;
                dx *= ratio;
                dy *= ratio;
            }

            setPositionCible({ x: dx, y: dy });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mode, espaceMaxDeplacement]);

    // Animation fluide vers la position cible avec effet fade-out
    useEffect(() => {
        const animate = () => {
            setPositionIris(prev => {
                const dx = positionCible.x - prev.x;
                const dy = positionCible.y - prev.y;
                
                // Calcul de la distance à la cible
                const distanceACible = Math.sqrt(dx * dx + dy * dy);
                
                // Facteur de lissage qui diminue quand on s'approche de la cible
                // Plus on est proche, plus le mouvement ralentit (effet fade-out)
                const facteurBase = mode === "suitSouris" ? 0.15 : 0.05;
                const facteurDistance = Math.min(1, distanceACible / 50);
                const facteurLissage = facteurBase * facteurDistance;
                const ajustementVitesse = facteurLissage * vitesse;

                return {
                    x: prev.x + dx * ajustementVitesse,
                    y: prev.y + dy * ajustementVitesse
                };
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [positionCible, mode, vitesse]);

    // Animation de l'ombre de l'oeil
    useEffect(() => {
        // On définit l'intervalle variant l'ombre
        const ombreInterval = setInterval(() => {
            // On modifie la valeur à partir d'un calcul
            setOmbreOeil(prev => {
                // On utilise une ref pour garder le sens actuel
                const sensActuel = ombreOeilSensRef.current;
                let nouvelleValeur = prev + (sensActuel ? PAS_OMBRE : -PAS_OMBRE);

                // Inversion du sens si on atteint les limites
                if (nouvelleValeur >= OMBRE_MAX) {
                    nouvelleValeur = OMBRE_MAX;
                    ombreOeilSensRef.current = false;
                } else if (nouvelleValeur <= 1) {
                    nouvelleValeur = 1;
                    ombreOeilSensRef.current = true;
                }

                return nouvelleValeur;
            });
        }, INTERVALLE_OMBRE / vitesse);
        // Nettoyage de l'intervalle
        return () => clearInterval(ombreInterval);
    }, [vitesse]);

    return (
        <div 
            ref={containerRef}
            className={`${className ? className : "relative inline-block"}`}
            style={{ opacity: opacite / 100 }}
        >
            {/* Image de fond avec les ronces */}
            <div className="relative w-full h-full">
                <Image 
                    src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + lienImage : lienImage}
                    alt="Oeil de l'Occulte"
                    className="w-full h-full z-20"
                    width={2024}
                    height={2024}
                    style={{ filter: `drop-shadow(0 0 ${ombreOeil}px ${couleurOmbre})`}}
                />
                
                {/* Iris qui se balade */}
                <div
                    className="absolute pointer-events-none z-10"
                    style={{
                        left: '50%',
                        top: '50%',
                        width: `${tailleIrisPourcentage}%`,
                        height: `${tailleIrisPourcentage}%`,
                        transform: `translate(calc(-50% + ${positionIris.x}px), calc(-50% + ${positionIris.y}px))`,
                        filter: `drop-shadow(0 0 10px ${couleurOmbre})`
                    }}
                >
                    <Image
                        src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + lienIris : lienIris}
                        alt="Iris"
                        className="w-full h-full"
                        width={2024}
                        height={2024}
                    />
                </div>
            </div>
        </div>
    );
}