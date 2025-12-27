"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { rechercher } from "@Wiki/utils/rechercheArticles";
import { IndexRecherche } from "@Wiki/model/Recherche";
import { BarreRecherche } from "@Wiki/components/BarreRecherche";
import Image from "next/image";

const LIMITE = 20;

/**
 * Page de recherche d'articles
 * @returns Composant de la page de recherche
 */
export function PageDeRecherche() {
    
    // Récupération des paramètres de recherche s'il y en a
    const searchParams = useSearchParams();
    const requeteInitiale = searchParams.get("requete") || "";
  
    // Mise en place des états
    // Requête entrée (initialisée avec le paramètre d'URL)
    const [requete, setrequete] = useState(requeteInitiale);
    // Filtre actuel de catégorie
    const [filtreCategorie, setFiltreCategorie] = useState<string>("");
    // Filtre actuel en tags
    const [filtreTags, setFiltreTags] = useState<Set<string>>(new Set());
    // Type de tri
    const triParametres = [
        { value: "pertinence", label: "Pertinence" },
        { value: "date", label: "Date" },
        { value: "titre", label: "Titre" }
    ];
    const [tri, setTri] = useState<typeof triParametres[number]["value"]>("pertinence");
    // Ordre du tri (croissant ou décroissant)
    const [ordreTri, setOrdreTri] = useState<"asc" | "desc">("desc");
    // Auteur d'article
    const [auteurs, setAuteurs] = useState<Set<string>>(new Set());

    // Résultats de la recherche 
    const [resultats, setResultats] = useState<IndexRecherche[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(false);
    const [erreur, setErreur] = useState<string | null>(null);

    // Récupération des résultats de la recherche à chaque changement de requête
    useEffect(() => {
        /**
         * Méthode de chargement des résultats
         */
        async function chargerResultats() {
            if (requete.trim().length > 2) {
                setEnChargement(true);
                const { resultats, enChargement, erreur } = await rechercher({ requete: requete, options: { limit: LIMITE } });
                setResultats(resultats);
                setEnChargement(enChargement);
                setErreur(erreur);
            }
            else {
                setResultats([]);
            }
        }
        chargerResultats();
    }, [requete]);

    // Filtrages et tris des résultats
    const resultatsFiltres = useMemo(() => {
        let articlesFiltres = resultats as IndexRecherche[];

        // Filtre par catégorie
        if (filtreCategorie) {
            articlesFiltres = articlesFiltres.filter((a) => a.categorie === filtreCategorie);
        }

        // Filtre par tags
        if (filtreTags.size > 0) {
            articlesFiltres = articlesFiltres.filter((a: IndexRecherche) => a.tags.some((tag) => filtreTags.has(tag)));
        }

        // Tri
        if (tri === "date") {
            articlesFiltres = [...articlesFiltres].sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime());
        } else if (tri === "titre") {
            articlesFiltres = [...articlesFiltres].sort((a, b) => a.titre.localeCompare(b.titre));
        }

        // Filtre par auteur
        if (auteurs.size > 0) {
            articlesFiltres = articlesFiltres.filter((a) => auteurs.has(a.auteur));
        }

        if (ordreTri === "asc") {
            articlesFiltres = articlesFiltres.reverse();
        }

        return articlesFiltres;
    }, [resultats, filtreCategorie, filtreTags, tri, ordreTri]);


    // Listes pour les filtres (mis à jour à chaque changement de résultats)
    const categories = useMemo(() => {
        return Array.from(new Set(resultats.map((a) => a.categorie)));
    },[resultats]);

    // Liste des tags (mis à jour à chaque changement de résultats)
    const tagsActuels = useMemo(() => {
        const tagSet = new Set<string>();
        resultats.forEach((a: IndexRecherche) => a.tags.forEach((t) => tagSet.add(t)));
        return Array.from(tagSet).sort();
    }, [resultats]);

    // Méthode de changement du filtre d'un tag (ajout ou retrait du filtre sur un tag)
    const toggleTag = (tag: string) => {
        const tagsTemp = new Set(filtreTags);
        if (tagsTemp.has(tag)) {
            tagsTemp.delete(tag);
        } else {
            tagsTemp.add(tag);
        }

        setFiltreTags(tagsTemp);
    };

    const auteursActuels = useMemo(() => {
        const auteurSet = new Set<string>();
        resultats.forEach((a: IndexRecherche) => auteurSet.add(a.auteur));
        return Array.from(auteurSet).sort();
    }, [resultats]);

    // Méthode de changement du filtre d'un auteur (ajout ou retrait du filtre sur un auteur)
    const toggleAuteur = (auteur: string) => {
        const auteursTemp = new Set(auteurs);
        if (auteursTemp.has(auteur)) {
            auteursTemp.delete(auteur);
        } else {
            auteursTemp.add(auteur);
        }
        setAuteurs(auteursTemp);
    };

    // Méthode de changement de l'ordre du tri
    const toggleOrdreTri = () => {
        setOrdreTri(ordreTri === "asc" ? "desc" : "asc");
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Recherche d'articles</h1>

                    {/* Barre de recherche */}
                    <BarreRecherche
                        requeteInitiale={requete}
                        placeholder="Rechercher un article..."
                        montrerSuggestions={false}
                        autoFocus={true}
                        onChangementRequete={(q) => setrequete(q)}
                        onResultats={(q) => setrequete(q)}
                        className="max-w-3xl"
                    />

                    {/* Statistiques */}
                    <div className="mt-4 text-gray-400 text-sm">
                        {enChargement ? ("Chargement...") : 
                            requete.length < 2 ? ("Veuillez entrer au moins 2 caractères pour lancer une recherche") : 
                            (`${resultatsFiltres.length} résultat${resultatsFiltres.length > 1 ? "s" : ""} pour "${requete}"`)
                        }
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
                    {/* Sidebar filtres */}
                    {requete.length >= 2 && resultats.length > 0 && (
                    <aside className="space-y-6">
                        {/* Ordre du tri */} 
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                            <h3 className="font-bold text-white mb-3">Ordre du tri</h3>
                            <button onClick={toggleOrdreTri} className="relative inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm w-full justify-center group">
                                <span className={`transition-all duration-300 ${ordreTri === "asc" ? "text-green-400 font-semibold" : "text-gray-400"}`}>
                                    Croissant
                                </span>
                                <div className="w-px h-4 bg-gray-500" />
                                <span className={`transition-all duration-300 ${ordreTri === "desc" ? "text-green-400 font-semibold" : "text-gray-400"}`}>
                                    Décroissant
                                </span>
                            </button>
                        </div>

                        {/* Tri par date, titre, ... */}
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                            <h3 className="font-bold text-white mb-3">Trier par</h3>
                            <div className="space-y-2">
                            {triParametres.map((option) => (
                                <label key={option.value} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                    <input type="radio" name="tri" checked={tri === option.value} onChange={() => setTri(option.value as any)} className="text-blue-500"/>
                                    {option.label}
                                </label>
                            ))}
                            </div>
                        </div>

                        {/* Filtre par catégorie */}
                        {categories.length > 1 && (
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                            <h3 className="font-bold text-white mb-3">Catégorie</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                <input type="radio" name="categorie" checked={!filtreCategorie} onChange={() => setFiltreCategorie("")}/>
                                    Toutes
                                </label>
                                {categories.map((cat) => (
                                <label key={cat} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                    <input type="radio" name="categorie" checked={filtreCategorie === cat} onChange={() => setFiltreCategorie(cat)}/>
                                    {cat}
                                </label>
                                ))}
                            </div>
                        </div>
                        )}
                        
                        {/* Filtre par auteurs */}
                        {auteursActuels.length > 0 && (
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                <h3 className="font-bold text-white mb-3">Auteurs</h3>
                                <div className="flex flex-wrap gap-2">
                                    {auteursActuels.slice(0, 20).map((auteur) => (
                                    <button key={auteur} onClick={() => toggleAuteur(auteur)}
                                    className={`px-2 py-1 text-xs rounded transition-colors ${auteurs.has(auteur) ? "bg-green-700 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                                        {auteur}
                                    </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Filtre tags */}
                        {tagsActuels.length > 0 && (
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                <h3 className="font-bold text-white mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tagsActuels.slice(0, 20).map((tag) => (
                                    <button key={tag} onClick={() => toggleTag(tag)}
                                    className={`px-2 py-1 text-xs rounded transition-colors ${filtreTags.has(tag) ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                                        #{tag}
                                    </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                    )}

                    {/* Résultats */}
                    <div>
                        {enChargement ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
                        </div>
                        ) : resultatsFiltres.length === 0 ? (
                        <div className="text-center py-12">
                                <div className="flex items-center justify-center flex-col space-y-6">
                                    <Image src={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + "/assets/logo/Triquetra blanc.png" : "/assets/logo/Triquetra blanc.png"} alt="" width={200} height={200} className="opacity-50 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" />
                                    <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">
                                    {requete.length < 2
                                        ? "Entrez au moins 2 caractères pour rechercher"
                                        : (<><Link className="hover:line-through" href="/journal-d-anti-r/recherche-de-soi">Aucun résultat</Link> pour "{requete}"</>)}
                                    </p>
                                </div>
                        </div>
                        ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resultatsFiltres.map((article : IndexRecherche) => (
                            <ResultatItem key={article.slug} article={article} requete={requete} />
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );


}


// ===== COMPOSANT RÉSULTAT =====

/**
 * Composant d'item de résultat
 * @param article Article trouvé
 * @param requete Requête de recherche
 * @returns Composant d'item de résultat
 */
function ResultatItem({ article, requete }: { article: IndexRecherche; requete: string }) {
    const itemEncadre = (article.titre.toLowerCase() == requete.toLowerCase()) ? "border-blue-600 border-2 p-4 rounded-lg hover:border-blue-700" : "border border-gray-700 hover:border-gray-600" ;
  return (
    <Link href={`/article/${article.slug}`} className={`block p-6 bg-gray-800 rounded-lg hover:scale-101 transition-all duration-200 group ${itemEncadre}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
          {article.categorie}
        </span>
        {article.sousCategorie && (
          <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">
            {article.sousCategorie}
          </span>
        )}
      </div>

      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
        {article.titre}
      </h2>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.extrait}...</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Par {article.auteur}</span>
        <span>{new Date(article.dateCreation).toLocaleDateString("fr-FR")}</span>
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}