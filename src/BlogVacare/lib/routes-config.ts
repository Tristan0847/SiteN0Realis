import type {Dossier} from '@BlogsFront/model/Blog';
import type {Blog} from '@BlogsFront/model/Blog';
import type {Message} from '@BlogsFront/model/Blog';
import {SiteVariant} from "@BlogsFront/model/Variant";
import {index, getBlogs, getMessages} from "@BlogsFront/hooks/getters";

/**
 * Interface de structuration des routes
 */
interface RouteComplete {
    slugDossier: string;
    slugBlog: string;
    messages: Message[];
}

/**
 * Interface de structuration de dossier à blogs
 */
interface DossierAvecBlogs {
    dossier: Dossier;
    blogs: Blog[];
}

/**
 * Récupère tous les dossiers, blogs et messages depuis le backend
 * @param variante Variante du site
 */
export async function getAllRoutes(variante: SiteVariant) {
    try {
        const init : RequestInit = {credentials: "omit"};
        // Récupération des dossiers
        const dossiers : Dossier[] = await index(variante, init);

        // Pour chaque dossier, on récupère le blog
        const routesWithBlogs: DossierAvecBlogs[] = await Promise.all(
            dossiers.map(async (dossier) => {
                try {
                    const blogs = await getBlogs(dossier.slug, variante, init);
                    return {dossier, blogs};
                } catch (error) {
                    console.error(`Erreur lors de la recherche de blogs pour le dossier ${dossier.slug} ` + error);
                    return {dossier, blogs: []};
                }
            })
        );

        // Pour chaque blog, on récupère ses messages
        const routesCompletes: RouteComplete[] = await Promise.all(
            routesWithBlogs.flatMap(({dossier, blogs}) =>
                blogs.map(async (blog) => {
                    try {
                        const messages = await getMessages(dossier.slug, blog.slug, variante, init);
                        return {slugDossier: dossier.slug, slugBlog: blog.slug, messages};
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de messages pour le blog ${blog.slug}:`, error);
                        return {slugDossier: dossier.slug, slugBlog: blog.slug, messages: []};
                    }
                })
            )
        );

        return {dossiers, routesWithBlogs, routesCompletes};
    } catch (error) {
        console.error('Erreur lors de la récupération des routes du projet : ', error);
        return {dossiers: [], routesWithBlogs: [], routesCompletes: []};
    }
}

/**
 * Génère les paramètres pour la page d'accueil (/)
 */
export async function getPageAccueilParams() {
    return [{}];
}

/**
 * Génère les paramètres pour la page des dossiers et blogs
 * @param variante Variante du site
 */
export async function getDossierBlogsParams(variante: SiteVariant) {
    try {
        const {dossiers} = await getAllRoutes(variante);

        const params = dossiers.map((dossier) => ({
            slugDossier: dossier.slug,
        }));

        return params;
    } catch (error) {
        console.error('Erreur lors de la récupération de paramètres pour les blogs (getDossierBlogsParams).' + error);
        return [];
    }
}

/**
 * Génère les paramètres pour la page des messages
 * @param variante Variante du site
 */
export async function getMessagesParams(variante: SiteVariant) {
    try {
        const {routesCompletes} = await getAllRoutes(variante);

        const params = routesCompletes.map((route) => ({
            slugDossier: route.slugDossier,
            slugBlog: route.slugBlog,
        }));

        return params;
    } catch (error) {
        console.error('Erreur lors de la récupération de paramètres pour les messages (getMessagesParams). ' + error);
        return [];
    }
}

/**
 * Récupère les infos d'une route spécifique
 * @param slugDossier Slug du dossier
 * @param slugBlog Slug du blog
 * @param variante Variante du site
 */
export async function getRouteData(slugDossier: string, slugBlog: string, variante: SiteVariant) {
    try {
        const {routesCompletes} = await getAllRoutes(variante);

        return routesCompletes.find(
            (route) => route.slugDossier === slugDossier && route.slugBlog === slugBlog
        );
    } catch (error) {
        console.error('Erreur lors de la récupération de données d\'une route (getRouteData) pour :' + slugDossier + "/" + slugBlog + ". " + error);
        return null;
    }
}


/**
 * Récupère tous les dossiers pour la page d'accueil
 * @param variante Variante du site
 */
export async function getRouteDossiers(variante: SiteVariant): Promise<Dossier[]> {
    try {
        const {dossiers} = await getAllRoutes(variante);

        return dossiers;
    } catch (error) {
        console.error('Erreur lors de la récupération des dossiers (getRouteDossiers). ' + error);
        return [];
    }
}

/**
 * Récupère les messages pour une route spécifique
 * @param slugDossier Slug du dossier récupéré
 * @param slugBlog Slug du blog récupéré
 * @param variante Variante du site
 */
export async function getRouteMessages(slugDossier: string, slugBlog: string, variante: SiteVariant) {
    try {
        const {routesCompletes} = await getAllRoutes(variante);

        const route = routesCompletes.find(
            (r) => r.slugDossier === slugDossier && r.slugBlog === slugBlog
        );
        if (!route) {
            throw new Error("Route inconnue");
        }
        const messages: Message[] = route.messages;

        return messages;
    } catch (error) {
        console.error('Erreur lors de la récupération de messages pour une route (getRouteMessages) pour :' + slugDossier + "/" + slugBlog + ". " + error);
        return [];
    }
}

/**
 * Récupère les blogs pour un dossier spécifique
 * @param slugDossier Slug du dossier récupéré
 * @param variante Variante du site
 */
export async function getRouteBlogsForDossier(slugDossier: string, variante: SiteVariant) {
    try {
        const {routesWithBlogs} = await getAllRoutes(variante);

        const route = routesWithBlogs.find((r) => r.dossier.slug === slugDossier);
        if (!route) {
            throw new Error("Route inconnue");
        }
        const blogs: Blog[] = route.blogs;

        return blogs;
    } catch (error) {
        console.error('Erreur lors de la récupération de blogs pour un dossier (getRouteBlogsForDossier) pour : ' + slugDossier + ". " + error);
        return [];
    }
}