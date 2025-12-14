"use client";
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from "d3-force";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Node, Edge, Background, Controls, MiniMap, useNodesState, useEdgesState, Panel, Handle, Position, EdgeProps, getStraightPath, BaseEdge, EdgeLabelRenderer } from "reactflow";
import { DonneesArticle } from "@Wiki/utils/recuperationArticles";

//#region Constantes

const couleurFond = "#f0f0f0";
const COULEURS_CATEGORIES: Record<string, string> = {
  Vedettes: "#3b82f6",
  Lieu: "#10b981",
  Événement: "#f59e0b",
  Concepts: "#8b5cf6",
  Defaut: "#000000"
};

// Taille des noeuds
const TAILLE_NOEUD = 50;

// Type de noeuds personnalisés
const nodeTypes = {
  noeudArticle: NoeudArticle,
};

const edgeTypes = {
    areteArticle: AreteArticle,
}

// Variables D3-force
// Variable définissant la distance entre 2 noeuds
const DISTANCE_ENTRE_NOEUDS = 100;
// Force de distance globale
const FORCE_DISTANCE = 0.7;
// Force de répulsion entre les noeuds
const FORCE_REPULSION = -40;
// Force de collision entre les noeuds
const FORCE_COLLISION = 1.5;

//#endregion


//#region Types

/**
 * Props du composant GrapheDeConnaissance
 */
interface GrapheConnaissanceProps {
    articles: DonneesArticle[];
    slugCentral? : string;
    className?: string;
    height?: string;
    avecFiltres?: boolean;
}

/**
 * Interface d'une arête avec force optionnelle
 */
type EdgeCustomise = Edge & {
    force?: number;
    typeRelation?: string;
    description?: string;
    bidirectionnel?: boolean;
}

/**
 * Interface interne de données d'un Node pour D3-force
 */
interface NodeData {
    id: string;
    label: string;
    categorie: string;
    estCentre: boolean;
    x?: number;
    y?: number;
}

/**
 * Interface interne de données d'un Edge pour D3-force
 */
interface EdgeData {
    source: string;
    target: string;
    force?: number;
    id: string;
    typeRelation?: string;
    description?: string;
    label?: string|React.ReactNode;
}
//#endregion

/**
 * Composant de graphe de connaissance des articles du projet
 * @param articles Liste des articles à inclure dans le graphe
 * @param slugCentral Slug de l'article central du graphe (optionnel)
 * @param className Classe CSS à appliquer au conteneur du graphe (optionnel)
 * @param avecFiltres Indique si les filtres doivent être affichés (optionnel)
 * @returns Composant GrapheDeConnaissance 
 */
export function GrapheDeConnaissance({ articles, slugCentral = "", className = "", height = "700px", avecFiltres = true }: GrapheConnaissanceProps) {
    // Initialisation des états pour les noeuds et arêtes du graphe
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    // Liste des filtres actifs
    const [filtresActifs, setFiltresActifs] = useState<Set<string>>(new Set());
    const [enChargement, setEnChargement] = useState<boolean>(true);

    // Génération du graphe
    useEffect(() => {
        setEnChargement(true);
        const { nodes, edges } = genererGraphe(articles, slugCentral, filtresActifs);
        setNodes(nodes);
        setEdges(edges);
        
        setEnChargement(false);
    }, [articles, slugCentral, filtresActifs]);

    // Génération des filtres
    const changerCategorie = (categorie: string) => {
        const nouveauxFiltres = new Set(filtresActifs);
        if (nouveauxFiltres.has(categorie)) {
            nouveauxFiltres.delete(categorie);
        } else {
            nouveauxFiltres.add(categorie);
        }
        setFiltresActifs(nouveauxFiltres);
    };

    // Action de réinitialisation des filtres
    const reinitialiserFiltres = () => {
        setFiltresActifs(new Set());
    }

    // Gestion des collisions quand on manipule un noeud
    const onNodeDrag = useCallback((event: React.MouseEvent, node: Node) => {
        // On vérifie la distance à tous les autres noeuds
        const autresNoeuds = nodes.filter(n => n.id !== node.id);
        const noeudsRepousses: Node[] = [];
        
        // On vérifie chaque autre nœud pour voir s'il est trop proche
        autresNoeuds.forEach(autreNoeud => {
            const dx = node.position.x - autreNoeud.position.x;
            const dy = node.position.y - autreNoeud.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Distance minimale = 2 fois le rayon des nœuds + un peu d'espace
            const distanceMin = TAILLE_NOEUD * 2.2;
            
            if (distance < distanceMin && distance > 0) {
                // Calculer la force de répulsion (plus fort quand c'est proche)
                const force = (distanceMin - distance) / distanceMin;
                
                // Vecteur de répulsion normalisé
                const repulsionX = (dx / distance) * force * 30; // 30 = intensité de la répulsion
                const repulsionY = (dy / distance) * force * 30;
                
                // Nouvelle position pour le nœud repoussé
                noeudsRepousses.push({
                    ...autreNoeud,
                    position: {
                        x: autreNoeud.position.x - repulsionX,
                        y: autreNoeud.position.y - repulsionY
                    }
                });
            }
        });
        
        // Appliquer les modifications si des nœuds ont été repoussés
        if (noeudsRepousses.length > 0) {
            setNodes((nds) =>
                nds.map((n) => {
                    const noeudRepousse = noeudsRepousses.find(nr => nr.id === n.id);
                    return noeudRepousse || n;
                })
            );
        }
    }, [nodes, setNodes]);


    // Gestion des arêtes personnalisées
    // En survolant une arête, on affiche ses données
    const setHoverEdge = useCallback((edgeId: string, hover: boolean) => {
        setEdges((eds) =>
            eds.map((e) =>
            e.id === edgeId ? { ...e, data: { ...e.data, hover } } : e
            )
        );
    }, [setEdges]);

    // Gestion du survol des arêtes
    const handleEdgeMouseEnter = useCallback(
        (_: React.MouseEvent, edge: Edge) => {
            setHoverEdge(edge.id, true);
        },
        [setHoverEdge]
    );

    // Gestion de l'arrêt du survol des arêtes
    const handleEdgeMouseLeave = useCallback(
        (_: React.MouseEvent, edge: Edge) => {
            setHoverEdge(edge.id, false);
        },
        [setHoverEdge]
    );


    // Liste des catégories
    const categories = Array.from(new Set(articles.map(article => article.categorie)));

    // Statistiques du graphe
    const statsGraphe = {
        nombreNoeuds: nodes.length,
        nombreAretes: edges.length
    };

    return (
        <div className={ "border border-gray-300 rounded-lg overflow-hidden bg-gray-200 " + className }  style={{ height: height }}>
            <div className="relative w-full h-full" style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeDrag={onNodeDrag}
                    fitView
                    fitViewOptions={{
                        padding: 0.2,
                        includeHiddenNodes: false,
                        minZoom: 0.5,
                        maxZoom: 1.5
                    }}
                    nodeTypes= { nodeTypes }
                    edgeTypes= { edgeTypes }
                    onNodesChange={ onNodesChange }
                    onEdgesChange={ onEdgesChange }
                    onEdgeMouseEnter={ handleEdgeMouseEnter }
                    onEdgeMouseLeave={ handleEdgeMouseLeave }

                    attributionPosition="bottom-right"
                    >
                        <Background color={ couleurFond } />
                        <Controls position="top-left"/>
                        <MiniMap nodeColor={(node) => COULEURS_CATEGORIES[node.data.categorie] || COULEURS_CATEGORIES.Defaut} maskColor="rgba(f,f,f,0.3)" />

                        { avecFiltres && (
                            <Panel position="top-right" className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-300/80 text-white">
                                <h3 className="font-bold mb-3 text-sm">Filtrer par catégorie</h3>

                                <div className="space-y-2">
                                    { categories.map( (categorie) => (
                                        <label key={categorie} className="flex items-center gap-2 text-sm text-gray-100">
                                            <input type="checkbox" checked={filtresActifs.size === 0 || filtresActifs.has(categorie)} onChange={ () => changerCategorie(categorie) } className="rounded" />
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COULEURS_CATEGORIES[categorie] || COULEURS_CATEGORIES.Defaut }}/>
                                            <span>{categorie}</span>
                                        </label>
                                    ))}
                                </div>
                                
                                <button
                                    onClick={reinitialiserFiltres}
                                    className="mt-4 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                >
                                    Afficher tout
                                </button>

                                {enChargement && (
                                    <div className="mt-4 text-sm text-gray-400">Calcul du graphe...</div>
                                )}

                            </Panel>
                        )}

                        {/* Panel de statistiques */}
                        <Panel position="bottom-left" className="bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-300/80 text-white">
                            <div className="text-xs text-gray-300 space-y-1">
                                {statsGraphe.nombreNoeuds} articles, {statsGraphe.nombreAretes} connexions
                            </div>
                        </Panel>
                </ReactFlow>
            </div>
        </div>
    );
}

//#endregion

//#region Génération du graphe

/**
 * Méthode de génération du graphe à partir des données entrées
 * @param articles Articles à utiliser
 * @param slugCentral Slug central éventuel
 * @param categoriesFiltrees Catégories filtrées éventuelles
 * @returns Noeuds et arêtes du graphe
 */
function genererGraphe(articles: DonneesArticle[], slugCentral?: string, categoriesFiltrees?: Set<string>) : { nodes: Node[]; edges: Edge[] } {
    // Filtrage des articles
    const articlesFiltres = articles.filter( (a) => {
        // Si aucun filtre n'est actif, on garde tout
        if (!categoriesFiltrees || categoriesFiltrees.size === 0) {
            return true;
        }
        
        return categoriesFiltrees.has(a.categorie);
    });

    // Création des noeuds
    const nodesD3 : NodeData[] = articlesFiltres.map( (article) => ({
        id: article.slug,
        label: article.titre,
        categorie: article.categorie,
        estCentre: article.slug === slugCentral,
        x: undefined,
        y: undefined
    }));

    // Création des arêtes à partir des relations
    const aretes : EdgeCustomise[] = [];

    // On parcourt chaque article pour en créer les arêtes
    articlesFiltres.forEach( (article) => {
        // On parcourt ses relations
        if (article.relations && article.relations.explicit) {
            article.relations.explicit.forEach( (relation) => {

                // Si l'article dont on cherche la relation est parmi les articles filtrés, on l'ajoute à la liste
                if (articlesFiltres.find( (a) => a.slug === relation.slug)) {
                    aretes.push({
                        id: `${article.slug}--${relation.slug}--${relation.type}`,
                        source: article.slug,
                        target: relation.slug,
                        typeRelation: relation.type,
                        force: relation.force || 1,
                        label: relation.type,
                        description: relation.description,
                        bidirectionnel: false
                    });

                    // Si la relation est bidirectionnelle, on ajoute l'arête inverse aussi
                    if (relation.bidirectionnel) {
                        aretes.push({
                            id: `${relation.slug}--${article.slug}--${relation.type}`,
                            source: relation.slug,
                            target: article.slug,
                            typeRelation: relation.type,
                            label: relation.type,
                            bidirectionnel: true
                        });
                    }
                }
            })
        };

    });

    // Conversion des  au format D3-force
    const aretesD3 : EdgeData[] = aretes.map( (arete) => ({
        source: arete.source,
        target: arete.target,
        force: arete.force || 1,
        id: arete.id,
        typeRelation: arete.typeRelation,
        description: arete.description,
        label: arete.label
    }));

    // Une fois tous les noeuds et arêtes récupérées, on applique le disposition par D3-force
    const simulation = forceSimulation(nodesD3);
    // Force des liens dépendant de la force des relations
    simulation.force("link", forceLink<NodeData, EdgeData>(aretesD3).id( (d) => d.id ).distance((d) => DISTANCE_ENTRE_NOEUDS / (d.force || 1)).strength(FORCE_DISTANCE));
    // Force de répulsion entre les noeuds
    simulation.force("charge", forceManyBody().strength(FORCE_REPULSION));
    // Centrage du graphe
    simulation.force("center", forceCenter(0, 0));
    // Collision entre les noeuds
    simulation.force("collide", forceCollide(TAILLE_NOEUD * FORCE_COLLISION).strength(FORCE_DISTANCE));
    // On arrête la simulation
    simulation.stop();

    // Exécution de la simulation pendant un nombre fixe d'itérations
    for (let i = 0; i < 300; ++i) {
        simulation.tick();
    }

    // Conversion en format React Flow
    const reactFlowNodes : Node[] = nodesD3.map( (node: NodeData) => ({
        id: node.id,
        type: "noeudArticle",
        position: { x: node.x || 0, y: node.y || 0 },
        data: {
            slug: node.id,
            titre: node.label,
            categorie: node.categorie,
            estCentre: node.estCentre
        }
    }));

    // Conversion en format React Flow
    const reactFlowEdges : Edge[] = aretes.map( (arete) => {
        return {
            id: arete.id,
            source: arete.source,
            target: arete.target,
            type: "areteArticle",
            label: arete.label,
            data: {
                typeRelation: arete.typeRelation,
                description: arete.description,
                bidirectionnel: arete.bidirectionnel || false,
                hover: false
            },
            style: {
                stroke: "#374151",
                strokeWidth: Math.max((arete.force || 1) * 1.5, 2)          
            }
        }
    });
    
    return { nodes: reactFlowNodes, edges: reactFlowEdges };
}

//#endregion

//#region Composants

/**
 * Composant personnalisé de noeud représentant un article 
 * @param data Données de l'article
 * @returns Composant NoeudArticle
 */
function NoeudArticle({ data }: { data: { slug: string; titre: string; categorie: string; estCentre: boolean } }) {
    const couleur = COULEURS_CATEGORIES[data.categorie] || COULEURS_CATEGORIES.Defaut;
    const borderClass = data.estCentre ? "border-4 border-yellow-600" : "border-2 border-gray-700";
    const taille = data.estCentre ? TAILLE_NOEUD * 1.5 : TAILLE_NOEUD;

    let titreAffiche = "??";
    if (data.titre) {
        // Récupération des initiales du titre
        const mots = data.titre.split(" ");

        // S'il n'y a qu'un mot, on l'affiche en entier (max 4 lettres)
        if (mots.length === 1) {
            titreAffiche = mots[0].substring(0, 4).toUpperCase();
        // Sinon, on prend les premières lettres de chaque mot (max 4 lettres)
        } else {
            titreAffiche = "";
            for (let i = 0; i < mots.length && i < 4; i++) {
                if (mots[i].length === 0) {
                    mots.splice(i, 1);
                    i--;
                }
                else {
                    titreAffiche += mots[i].charAt(0).toUpperCase();
                }
            }
        }
    }

    return (
        <div className="group relative">
            <Handle 
                type="source" 
                position={Position.Top} 
                style={{ opacity: 0, top: '50%', left: '50%' }} 
            />
            <Handle 
                type="target" 
                position={Position.Top} 
                style={{ opacity: 0, top: '50%', left: '50%' }} 
            />

            <Link href={ `/article/${data.slug}` }
                className={`${borderClass} rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 hover:shadow-lg bg-gray-800`}
                style={{
                width: taille,
                height: taille,
                }}
            >
                <div
                className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: couleur }}
                >
                { titreAffiche }
                </div>
            </Link>

            {/* Tooltip */}
            <div className="absolute hidden group-hover:flex flex-col items-center -top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap border border-gray-700">
                <p className="font-bold text-sm">{data.titre}</p>
                <p className="text-xs text-gray-400">{data.categorie}</p>
                </div>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
            </div>
        </div>
    );
}

/**
 * Arête personnalisée avec label au survol
 * @param id Identifiant de l'arête
 * @param sourceX Position X de la source
 * @param sourceY Position Y de la source
 * @param targetX Position X de la cible
 * @param targetY Position Y de la cible
 * @param label Label de l'arête
 * @param data Données supplémentaires
 * @param markerEnd Marqueur de fin
 * @param style Style de l'arête
 * @returns Composant AreteArticle
 */
function AreteArticle({id, sourceX, sourceY, targetX, targetY, label, data, markerEnd, style } : EdgeProps) {

    // Calcul du chemin de l'arête
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    // Calcul de la position de la flèche
    const moitieX = (sourceX + targetX) / 2;
    const moitieY = (sourceY + targetY) / 2;
    const angle = Math.atan2(targetY - sourceY, targetX - sourceX) * (180 / Math.PI);

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />

            {/* Flèche */}
            {!data?.bidirectionnel && (
                <EdgeLabelRenderer>
                <div className="w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent border-l-black"
                    style={{
                    position: 'absolute',
                    left: moitieX,
                    top: moitieY,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    transformOrigin: 'center',
                    color: '#000',
                    }}/>
                </EdgeLabelRenderer>
            )}

            {/* Données affichées */}
            {data?.hover && label && (
                <EdgeLabelRenderer>
                <div
                    className="bg-gray-800 p-1 border border-gray-600 shadow-lg text-sm rounded-md z-10 absolute"
                    style={{
                    transform: `translate(-50%, -50%)`,
                    left: labelX,
                    top: labelY,
                    }}
                >
                    {label}
                </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}

//#endregion