import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';

/**
 * Interface représentant un titre (h2, h3, h4)
 */
export interface Heading {
    niveau: number;
    texte: string;
    slug: string;
}

//#region Récupération de l'article

/**
 * Constante définissant la configuration du Contentlayer pour un article du Wiki.
 */
export const Article = defineDocumentType(() => ({
    // Nom de l'élément, sa localisation et son type
    name: 'Article',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',

    // Champs spécifiques à l'article
    fields: {
        // Métadonnées 
        titre: { type: 'string', required: true },
        slug: { type: 'string', required: true },
        dateCreation: { type: 'date', required: true },
        auteur: { type: 'string', required: true },
        cache: { type: 'boolean', required: false, default: false },

        // Catégories
        categorie: { type: 'string', required: true },
        sousCategorie: { type: 'string', required: false, default: '' },
        slugCategorie: { type: 'string', required: true },
        slugSousCategorie: { type: 'string', required: false },
        tags: { type: 'list', of: { type: 'string' }, default: [] },

        // Infobox
        infobox: { type: 'json', required: false },

        // Relations
        relations: {type: 'json', required: false },

        // Arbre généalogique éventuel
        arbreGenealogique: { type: 'json', required: false }
    },

    // Champs calculés à partir des données reçues
    computedFields: {
        url: {
            type: 'string',
            resolve: (article) => `/wiki/${article.slug}`,
        },
        nombreMots: {
            type: 'number',
            resolve: (article) => article.body.raw.split(/\s+/).length,
        },
        headings:  {
            type: "list",
            resolve: (article) => {
                // Parsing direct du markdown
                const headings: Heading[] = [];
                const slugger = new GithubSlugger();
                const regexHeading = /^(#{2,4})\s+(.+)$/gm;
                let match;
                
                while ((match = regexHeading.exec(article.body.raw)) !== null) {
                    headings.push({
                        niveau: match[1].length,
                        texte: match[2].trim(),
                        slug: slugger.slug(match[2].trim()),
                    });
                }
                
                return headings;
            }
        }
    }
}));


// Définition par défaut de la source Contentlayer
export default makeSource({
    // Lien vers le dossier de contenu et les types de documents
    contentDirPath: 'contenu/articles',
    documentTypes: [Article],

    // Plugins pour le traitement MDX
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug
        ]
    }
})

//#endregion