import 'server-only';

import {SiteVariant} from "@BlogsFront/model/Variant";
import {BlogRouteParam, DossierRouteParam, Params, RouteParams} from "@BlogsFront/model/ExportParams";
import {BASE_DATA_PATH, BASE_DATA_PATH_COMMUNITY, BASE_DATA_PATH_COMMUNITY_USER} from "@BlogsFront/lib/constants";
import path from "node:path";
import * as fs from "node:fs";

//#region Blog principal

/**
 * Méthode de récupération des routes de l'application pour une variante donnée
 * @param variant
 */
async function recupererRoutes(variant: SiteVariant): Promise<RouteParams> {
    const filePath = path.join(process.cwd(), BASE_DATA_PATH, 'routes.json');
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const params = JSON.parse(content) as Params;
    return params[variant];
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
export async function getDossierBlogsParams(variante: SiteVariant) : Promise<DossierRouteParam[]> {
    try {
        const paramsRoute = await recupererRoutes(variante);
        return paramsRoute.dossiers;
    } catch (error) {
        console.error('Erreur lors de la récupération de paramètres pour les blogs.' + error);
        return [];
    }
}

/**
 * Génère les paramètres pour la page des messages
 * @param variante Variante du site
 */
export async function getMessagesParams(variante: SiteVariant) : Promise<BlogRouteParam[]> {
    try {
        const paramsRoute = await recupererRoutes(variante);
        return paramsRoute.blogs;
    } catch (error) {
        console.error('Erreur lors de la récupération de paramètres pour les messages (getMessagesParams). ' + error);
        return [];
    }
}

//#endregion

//#region AVOS

/**
 * Méthode de récupération d'un fichier
 * @param lien Lien du fichier à récupérer
 * @returns Contenu du fichier
 */
async function recupererFichier<T>(lien : string): Promise<T> {
    const content = await fs.promises.readFile(lien, 'utf-8');
    return JSON.parse(content) as T;
}

/**
 * Récupère les paramètres des posts
 * @returns Liste des posts
 */
export async function getPostParams(): Promise<{ slug: string }[]> {
    const params = await recupererFichier<string[]>(BASE_DATA_PATH_COMMUNITY + "/index.json");

    return params.map(slug => ({ slug }));
}

/**
 * Récupère les paramètres des utilisateurs
 * @returns Liste des utilisateurs
 */
export async function getUtilisateursParams(): Promise<{ pseudo: string }[]> {
    const files = await fs.promises.readdir(BASE_DATA_PATH_COMMUNITY_USER);
    return files.map(file => ({
        pseudo: file.replace(".json", "")
    }));
}

//#endregion