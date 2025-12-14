import { allArticles } from '@Wiki/.contentlayer/generated/index.mjs';
import { CHEMIN_DOSSIER_INDEX, CHEMIN_FICHIER_INDEX, IndexRecherche } from '@Wiki/model/Recherche';
import fs from 'fs';

// Filtrage des éléments cachés
const articlesVisibles = allArticles.filter(article => !article.cache);

// Génération de l'index de recherche à partir de tous les articles
const indexRecherche: IndexRecherche[] = articlesVisibles.map((article) => {
    const texte = article.body.raw || '';
    const texteSansMarkdown = texte.slice(0, 250).replace(/[#*`]/g, '');
    const extrait = texteSansMarkdown.replace(/<\/?\w+(?:\s+\w+(?:=[^>\s]+)?)*\/?>/g, '');
    // Création de l'index de recherche pour chaque article
    return ({
        slug: article.slug,
        titre: article.titre,
        categorie: article.categorie,
        sousCategorie: article.sousCategorie,
        tags: article.tags || [],
        auteur: article.auteur,
        // Extrait de 250 caractères sans markdown
        extrait: extrait,
        dateCreation: article.dateCreation,
    });
});

// Création du dossier où utiliser le fichier JSON s'il n'existe pas
const dataDir = CHEMIN_DOSSIER_INDEX;
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Écriture de l'index de recherche dans un fichier JSON
fs.writeFileSync(
    CHEMIN_FICHIER_INDEX,
    JSON.stringify(indexRecherche, null, 2)
);

console.log(`Index de recherche généré : ${indexRecherche.length} articles`);