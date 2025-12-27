"use client";

import { useMemo } from "react";
import { SVGinteractif } from "@Wiki/components/SVGInteractif";

// #region Types
/**
 * Interface correspondant à un membre de la famille
 */
export interface MembreFamille {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  gender: "Homme" | "Femme" | "Autre";
  pids?: string[]; // Conjoint(s)
  mid?: string; // Mère
  fid?: string; // Père
}

/**
 * Props d'entrée de l'arbre généalogique
 */
interface ArbreGenealogiqueProps {
  membres: MembreFamille[];
  slugCentral?: string;
  height?: number;
}


/**
 * Personne positionnée dans le SVG (avec coordonnées, génération et identifiant de sous-arbre)
 */
interface PersonnePos {
  id: string;
  membre: MembreFamille;
  x: number;
  y: number;
  generation: number;
  sousArbreId: string;
}

/**
 * Interface représentant une union entre 2 parents et leurs enfants (un trait sur le SVG)
 */
interface Union {
  id: string;
  parent1Id: string;
  parent2Id: string;
  enfants: string[];
  couleur: string;
}

/**
 * Sous-arbre généalogique (couple + enfants)
 */
interface SousArbre {
  id: string;
  racine: string;
  unions: Union[];
  membres: Set<string>;
  xOffset: number;
  largeur: number;
}

// Constantes
const W = 150, H = 85, SX = 50, SY = 130;
const ESPACE_ENTRE_ARBRES = 200;

// #endregion

// #region Composant Principal

/**
 * Composant d'arbre généalogique 
 * @param membres Membres de l'arbre
 * @param slugCentral Identifiant du membre central
 * @param height Hauteur du SVG
 * @returns Composant React de l'arbre généalogique
 */
export function ArbreGenealogique({ membres, slugCentral, height = 400 }: ArbreGenealogiqueProps) {
    // Calcul de l'arbre
    const { personnes, unions, dims } = useMemo(
        () => calculerArbre(membres),
        [membres]
    );

    return (
        <div className="border border-gray-700 rounded-lg bg-gray-800 overflow-hidden" style={{ height }}>
            <SVGinteractif width="100%" height={height} viewBox={`0 0 ${dims.w} ${dims.h}`} className="mx-auto">
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
                    </filter>
                </defs>
                
                {/* Unions */}
                {unions.map((u) => <LiensUnion key={u.id} union={u} personnes={personnes} />)}
                
                {/* Membres */}
                {personnes.map(p => (
                    <Carte key={p.id} personne={p} estCentral={p.membre.id === slugCentral} />
                ))}
            </SVGinteractif>
        </div>
    );
}
// #endregion

// #region Composants

/**
 * Carte d'un membre de la famille
 * @param personne Personne positionnée
 * @param estCentral Indique si la personne est le membre central
 * @returns Composant React de la carte
 */
function Carte({ personne, estCentral }: { personne: PersonnePos; estCentral: boolean }) {
  const m = personne.membre;

  return (
    <g transform={`translate(${personne.x}, ${personne.y})`}>
        <rect
            width={W} height={H} rx={6}
            className={`fill-gray-800 ${estCentral ? 'stroke-gray-500': "stroke-gray-700"}`}
            strokeWidth={estCentral ? "4" : "2"}
            filter="url(#shadow)"
        />

        <text x={W/2} y={30} textAnchor="middle" className="fill-gray-100 font-bold text-sm">
            <tspan x={W/2} dy="0">{m.name.length > 18 ? m.name.substring(0, 16) + '...' : m.name}</tspan>
        </text>
        <text x={W/2} y={48} textAnchor="middle" className="fill-gray-400 text-xs">
            {m.birth}{m.death ? ` - ${m.death}` : ''}
        </text>
        <text x={W/2} y={66} textAnchor="middle" className="fill-gray-400 text-xs">
            {m.gender ?? "/"}
        </text>
    </g>
  );
}

/**
 * Composant React d'un lien d'union entre deux parents et leurs enfants
 * @param union Union à dessiner
 * @param personnes Liste des personnes positionnées
 * @returns Composant React du lien d'union
 */
function LiensUnion({ union, personnes }: { union: Union; personnes: PersonnePos[] }) {
    // Récupération des positions des parents
    const p1 = personnes.find(p => p.id === union.parent1Id);
    const p2 = personnes.find(p => p.id === union.parent2Id);
    
    // S'il n'y a pas les 2 parents, on ne dessine rien
    if (!p1 || !p2) return null;

    // Calcul des points de connexion
    const x1 = p1.x + W/2, y1 = p1.y + H;
    const x2 = p2.x + W/2, y2 = p2.y + H;
    
    // Point d'union (au milieu, un peu en dessous)
    const yUnion = Math.max(y1, y2) + 20;
    const xUnion = (x1 + x2) / 2;

    // Récupération des enfants
    const enfants = union.enfants
        .map(id => personnes.find(p => p.id === id))
        .filter(Boolean) as PersonnePos[];

    return (
        <g stroke={union.couleur} strokeWidth={2.5} fill="none">
            <path d={`M ${x1} ${y1} L ${x1} ${yUnion}`} />
            <path d={`M ${x2} ${y2} L ${x2} ${yUnion}`} />
            <path d={`M ${x1} ${yUnion} L ${x2} ${yUnion}`} />
            <circle cx={xUnion} cy={yUnion} r={5} fill={union.couleur} />

            {enfants.length > 0 && (() => {
                const yEnfants = yUnion + 40;
                const xsEnfants = enfants.map(e => e.x + W/2);
                const xMin = Math.min(...xsEnfants);
                const xMax = Math.max(...xsEnfants);
                const xCentreEnfants = (xMin + xMax) / 2;
                
                return (
                    <>
                        <path d={`M ${xUnion} ${yUnion} L ${xUnion} ${yEnfants}`} />
                        {xUnion !== xCentreEnfants && (
                            <path d={`M ${xUnion} ${yEnfants} L ${xCentreEnfants} ${yEnfants}`} />
                        )}
                        {enfants.length > 1 && (
                            <path d={`M ${xMin} ${yEnfants} L ${xMax} ${yEnfants}`} />
                        )}
                        {enfants.map(e => {
                            const ex = e.x + W/2;
                            return <path key={e.id} d={`M ${ex} ${yEnfants} L ${ex} ${e.y}`} />;
                        })}
                    </>
                );
            })()}
        </g>
    );
}
// #endregion

// #region Calcul
/**
 * Calcul des valeurs de l'arbre généalogique
 * @param membres Membres de l'arbre 
 * @returns Données calculées de l'arbre
 */
function calculerArbre(membres: MembreFamille[]) : { personnes: PersonnePos[]; unions: Union[]; dims: { w: number; h: number } } {
    // Map des membres de la famille
    const membresMap = new Map(membres.map(m => [m.id, m]));
    
    // Calcul des générations
    const generations = new Map<string, number>();
    const racines = membres.filter(m => !m.mid && !m.fid);
    
    // Assignation récursive des générations 
    const assignerGeneration = (id: string, gen: number) => {
        // Si la génération actuelle est plus grande que celle déjà assignée, on ne fait rien
        const genActuelle = generations.get(id);
        if (genActuelle !== undefined && genActuelle >= gen) return;

        // On assigne la génération
        generations.set(id, gen);
        
        // On propage aux conjoints
        const membre = membresMap.get(id);
        membre?.pids?.forEach(pid => {
            if (!generations.has(pid)) {
                generations.set(pid, gen);
            }
        });
        
        // Les enfants sont de la génération inférieure
        membres.filter(m => m.fid === id || m.mid === id).forEach(e => {
            assignerGeneration(e.id, gen + 1);
        });
    };
    
    // On assigne toutes les générations
    racines.forEach(r => assignerGeneration(r.id, 0));

    // On identifie les sous-arbres
    const sousArbres: SousArbre[] = [];
    const unionsTraitees = new Set<string>();
    membres.forEach(m => {
        // S'il n'y a pas de conjoints, on passe
        if (!m.pids || m.pids.length === 0) return;
        
        // Pour chaque conjoint, on crée un sous-arbre
        m.pids.forEach(pid => {
            const unionId = [m.id, pid].sort().join('-');
            if (unionsTraitees.has(unionId)) return;
            
            unionsTraitees.add(unionId);
            
            // Récupération des enfants de l'union
            const enfants = membres
                .filter(e => (e.fid === m.id && e.mid === pid) || (e.fid === pid && e.mid === m.id))
                .map(e => e.id);
            
            // Création du sous-arbre
            const sousArbre: SousArbre = {
                id: unionId,
                racine: m.id,
                unions: [],
                membres: new Set([m.id, pid, ...enfants]),
                xOffset: 0,
                largeur: 0
            };
            
            // Ajout récursif des descendants
            const ajouterDescendants = (personneId: string) => {
                const personne = membresMap.get(personneId);
                if (!personne) return;
                
                sousArbre.membres.add(personneId);
                
                personne.pids?.forEach(conjointId => {
                    if (!sousArbre.membres.has(conjointId)) {
                        sousArbre.membres.add(conjointId);
                        
                        const enfantsCouple = membres.filter(e => 
                            (e.fid === personneId && e.mid === conjointId) || 
                            (e.fid === conjointId && e.mid === personneId)
                        );
                        
                        enfantsCouple.forEach(e => {
                            sousArbre.membres.add(e.id);
                            ajouterDescendants(e.id);
                        });
                    }
                });
            };
            
            enfants.forEach(e => ajouterDescendants(e));
            
            sousArbres.push(sousArbre);
        });
    });

    // On place chaque sous-arbre
    const personnes: PersonnePos[] = [];
    const toutesLesUnions: Union[] = [];
    let xOffset = 100;
    
    sousArbres.forEach((sousArbre) => {
        const membresSousArbre = Array.from(sousArbre.membres)
            .map(id => membresMap.get(id))
            .filter(Boolean) as MembreFamille[];
        
        const instancesMap = new Map<string, string>();
        
        const obtenirInstanceId = (membreId: string) => {
            if (!instancesMap.has(membreId)) {
                instancesMap.set(membreId, `${membreId}-${sousArbre.id}`);
            }
            return instancesMap.get(membreId)!;
        };
        
        // On regroupe par génération
        const parGen = new Map<number, MembreFamille[]>();
        membresSousArbre.forEach(m => {
            const g = generations.get(m.id) ?? 0;
            if (!parGen.has(g)) parGen.set(g, []);
            parGen.get(g)!.push(m);
        });
        
        const genSorted = Array.from(parGen.keys()).sort((a, b) => a - b);
        
        // On place les enfants d'abord (de bas en haut)
        const positionsTemporaires = new Map<string, { x: number; y: number; gen: number }>();
        
        for (let i = genSorted.length - 1; i >= 0; i--) {
            const gen = genSorted[i];
            const ms = parGen.get(gen)!;
            const y = 80 + i * (H + SY);
            
            if (i === genSorted.length - 1) {
                // Dernière génération: on place simplement de gauche à droite
                let xLocal = 0;
                ms.forEach(m => {
                    positionsTemporaires.set(m.id, { x: xLocal, y, gen });
                    xLocal += W + SX;
                });
            } else {
                // Générations intermédiaires: on calcule la position en fonction des enfants
                const dejaPlaces = new Set<string>();
                let xLocal = 0;
                
                // On place d'abord les parents qui ont des enfants
                ms.forEach(m => {
                    if (dejaPlaces.has(m.id)) return;
                    
                    // On trouve le conjoint et les enfants
                    const conjoint = m.pids?.find(pid => membresSousArbre.some(mm => mm.id === pid));
                    
                    if (conjoint) {
                        const enfantsCommuns = membresSousArbre.filter(e => 
                            (e.fid === m.id && e.mid === conjoint) || 
                            (e.fid === conjoint && e.mid === m.id)
                        );
                        
                        if (enfantsCommuns.length > 0) {
                            // Calcul du centre des enfants
                            const xEnfants = enfantsCommuns.map(e => positionsTemporaires.get(e.id)?.x ?? 0);
                            const xMinEnfants = Math.min(...xEnfants);
                            const xMaxEnfants = Math.max(...xEnfants);
                            const xCentreEnfants = (xMinEnfants + xMaxEnfants + W) / 2;
                            
                            // On place les parents centrés au-dessus
                            const largeurParents = 2 * W + SX;
                            const xParent1 = xCentreEnfants - largeurParents / 2;
                            const xParent2 = xParent1 + W + SX;
                            
                            // On vérifie la collision avec positions déjà placées
                            let ajustement = 0;
                            let collision = true;
                            
                            while (collision && ajustement < 2000) {
                                collision = false;
                                for (const [autreId, pos] of positionsTemporaires.entries()) {
                                    if (pos.gen !== gen) continue;
                                    if (dejaPlaces.has(autreId)) {
                                        const xAutre = pos.x;
                                        if (
                                            (xParent1 + ajustement < xAutre + W + SX && xParent1 + ajustement + W > xAutre - SX) ||
                                            (xParent2 + ajustement < xAutre + W + SX && xParent2 + ajustement + W > xAutre - SX)
                                        ) {
                                            collision = true;
                                            ajustement = xAutre + W + SX - xParent1;
                                            break;
                                        }
                                    }
                                }
                            }
                            
                            positionsTemporaires.set(m.id, { x: xParent1 + ajustement, y, gen });
                            positionsTemporaires.set(conjoint, { x: xParent2 + ajustement, y, gen });
                            dejaPlaces.add(m.id);
                            dejaPlaces.add(conjoint);
                            
                            xLocal = Math.max(xLocal, xParent2 + ajustement + W + SX);
                        }
                    }
                });
                
                // On place les membres restants (sans enfants dans ce sous-arbre)
                ms.forEach(m => {
                    if (!dejaPlaces.has(m.id)) {
                        positionsTemporaires.set(m.id, { x: xLocal, y, gen });
                        dejaPlaces.add(m.id);
                        xLocal += W + SX;
                    }
                });
            }
        }
        
        // On crée les instances avec positions finales
        let maxX = 0;
        
        membresSousArbre.forEach(m => {
            const pos = positionsTemporaires.get(m.id);
            if (pos) {
                const instanceId = obtenirInstanceId(m.id);
                personnes.push({
                    id: instanceId,
                    membre: m,
                    x: xOffset + pos.x,
                    y: pos.y,
                    generation: pos.gen,
                    sousArbreId: sousArbre.id
                });
                maxX = Math.max(maxX, pos.x + W);
            }
        });
        
        sousArbre.largeur = maxX;
        sousArbre.xOffset = xOffset;
        
        // On crée les unions
        const unionsCreees = new Set<string>();
        
        membresSousArbre.forEach(m => {
            if (!m.pids) return;
            
            m.pids.forEach(pid => {
                const unionId = [m.id, pid].sort().join('-');
                if (unionsCreees.has(unionId)) return;
                
                const enfants = membresSousArbre
                    .filter(e => (e.fid === m.id && e.mid === pid) || (e.fid === pid && e.mid === m.id))
                    .map(e => obtenirInstanceId(e.id));
                
                if (sousArbre.membres.has(m.id) && sousArbre.membres.has(pid)) {
                    unionsCreees.add(unionId);
                    
                    toutesLesUnions.push({
                        id: `${unionId}-${sousArbre.id}`,
                        parent1Id: obtenirInstanceId(m.id),
                        parent2Id: obtenirInstanceId(pid),
                        enfants,
                        couleur: "#6a7282"
                    });
                }
            });
        });
        
        xOffset += maxX + ESPACE_ENTRE_ARBRES;
    });

    const maxW = Math.max(xOffset, 1200);
    const maxGen = Math.max(...Array.from(generations.values()), 0);
    const maxH = (maxGen + 2) * (H + SY);

    return {
        personnes,
        unions: toutesLesUnions,
        dims: { w: maxW, h: maxH }
    };
}
// #endregion
