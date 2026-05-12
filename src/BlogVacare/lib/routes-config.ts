import 'server-only';

import {SiteVariant} from "@BlogsFront/model/Variant";
import {BlogRouteParam, DossierRouteParam, Params, RouteParams} from "@BlogsFront/model/ExportParams";
import {BASE_DATA_PATH} from "@BlogsFront/lib/constants";
import path from "node:path";
import * as fs from "node:fs";

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
