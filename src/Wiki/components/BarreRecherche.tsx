"use client";

import { IndexRecherche } from "@Wiki/model/Recherche";
import { rechercher } from "@Wiki/utils/rechercheArticles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Props de la barre de recherche (requête initiale, placeholder, gestion des suggestions, gestion des événements, noms de classes et autofocus éventuel)
 */
interface BarreRechercheProps {
    requeteInitiale?: string;
    placeholder?: string;
    suggestionsMax?: number;
    montrerSuggestions?: boolean;
    onResultats?: (requete : string) => void;
    onChangementRequete?: (requete : string) => void;
    className?: string;
    autoFocus?: boolean;
}

/**
 * Composant de barre de recherche d'articles
 * @param requeteInitiale Requête initiale
 * @param placeholder Texte du placeholder
 * @param suggestionsMax Nombre maximum de suggestions à afficher
 * @param montrerSuggestions Indique s'il faut afficher les suggestions
 * @param onResultats Fonction de rappel lors de la réception des résultats
 * @param onChangementRequete Fonction de rappel lors du changement de la requête
 * @param className Noms de classes CSS supplémentaires
 * @param autoFocus Indique si le champ doit être autofocus
 */
export function BarreRecherche({
    requeteInitiale = "",
    placeholder = "Rechercher un article...",
    suggestionsMax = 5,
    montrerSuggestions = true,
    onResultats,
    onChangementRequete,
    className = "",
    autoFocus = false,
} : BarreRechercheProps) {
    // Requête de recherche
    const [requete, setRequete] = useState<string>(requeteInitiale);
    // Affichage du dropdown de suggestions
    const [montrerDropdown, setMontrerDropdown] = useState<boolean>(false);
    // Références vers le champ de recherche et son conteneur
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    // Résultats de la recherche 
    const [resultats, setResultats] = useState<IndexRecherche[]>([]);
    const [enChargement, setEnChargement] = useState<boolean>(false);
    const [erreur, setErreur] = useState<string | null>(null);

    // Récupération des résultats de la recherche
    useEffect(() => {
        async function chargerResultats() {
            if (requete.trim().length > 2) {
                setEnChargement(true);
                const { resultats, enChargement, erreur } = await rechercher({ requete, options: { limit: suggestionsMax } });
                setResultats(resultats);
                setEnChargement(enChargement);
                setErreur(erreur);
            }
        }
        chargerResultats();
    }, [requete, suggestionsMax]);

    // On cache le dropdown en cas de clic extérieur
    useEffect(() => {
        function handleClicExterieur(event: MouseEvent) {
            if (containerRef.current && event.target instanceof Node && !containerRef.current.contains(event.target as Node)) {
                setMontrerDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClicExterieur);
        return () => {
            document.removeEventListener("mousedown", handleClicExterieur);
        };
    }, []);

    // Mise à jour de la requête
    useEffect(() => {
        setRequete(requeteInitiale);
    }, [requeteInitiale]);

    // Gestion du changement de la requête
    const handleChangementRequete = (nouvelleRequete : string) => {
        setRequete(nouvelleRequete);
        setMontrerDropdown(true);
        onChangementRequete?.(nouvelleRequete);
    }

    // Gestion de la soumission de la recherche
    const handleSoumission = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Si on appuie sur Entrée, on lance la recherche
        if (e.key === "Enter") {
            setMontrerDropdown(false);
            // Si on a une fonction de rappel, on l'appelle
            if (onResultats) {
                onResultats(requete);
            // Sinon, si le score de correspondance est suffisant, on redirige vers l'article
            } else if (resultats.length >= 1 && resultats[0].titre.toLowerCase() === requete.trim().toLowerCase()) {
                router.push(`/article/${resultats[0].slug}`);
            // Sinon, on redirige vers la page de résultats
            } else {
                router.push(`/recherche?requete=${encodeURIComponent(requete)}`);
            }
        }
    };

    // Si on appuie sur une suggestion, on redirige vers l'article souhaité
    const handleClicSuggestion = (article : IndexRecherche) => {
        setMontrerDropdown(false);
        router.push(`/wiki/article/${article.slug}`);
    }

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <input type="text" value={requete} autoFocus={autoFocus} placeholder={placeholder} ref={inputRef}
                onChange={(e) => { handleChangementRequete(e.target.value); }}
                onFocus={() => { if (montrerSuggestions) setMontrerDropdown(true); }}
                onKeyDown={handleSoumission}
                className="w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800" />

            {montrerDropdown && montrerSuggestions && requete.trim().length > 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-500 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {enChargement && (
                        <div className="p-4 text-gray-200">Chargement des suggestions...</div>
                    )}
                    {erreur && (
                        <div className="p-4 text-red-500">Erreur lors de la recherche : {erreur}</div>
                    )}
                    {!enChargement && !erreur && resultats.length === 0 && (
                        <div className="p-4 text-gray-200">Aucun résultat trouvé.</div>
                    )}
                    {!enChargement && !erreur && resultats.map((article : IndexRecherche) => (
                        <SuggestionItem key={article.slug} article={article} onClic={handleClicSuggestion} />
                    ))}
                </div>
            )}
        </div>
    )

}


//#region Composant suggestion

/**
 * Props d'un item de suggestion
 */
interface SuggestionItemProps {
    article : IndexRecherche;
    onClic : (article : IndexRecherche) => void;
}

/**
 * Item de suggestion d'article
 * @param article Article suggéré
 * @param onClic Fonction de rappel lors du clic sur la suggestion
 * @returns Élément React de suggestion
 */
function SuggestionItem({ article, onClic } : SuggestionItemProps) {
    return(
        <Link href={`/article/${article.slug}`} onClick={() => onClic(article)} className="block px-4 py-2 border-b border-gray-700 hover:bg-gray-600 transition-colors">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">
                        {article.titre}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                        {article.categorie}, {article.sousCategorie}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                        {article.extrait}
                    </div>
                </div>
            </div>

        </Link>
    )
}


//#endregion