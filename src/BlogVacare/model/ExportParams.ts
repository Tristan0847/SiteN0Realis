import {SiteVariant} from "@BlogsFront/model/Variant";

/**
 * Paramètres de route d'un dossier
 */
export interface DossierRouteParam {
    slugDossier: string;
}

/**
 * Paramètre de route d'un blog
 */
export interface BlogRouteParam {
    slugDossier: string;
    slugBlog: string;
}

/**
 * Paramètres de routes d'une variante du site
 */
export interface RouteParams {
    dossiers: DossierRouteParam[];
    blogs: BlogRouteParam[];
}

/**
 * Paramètres globaux des routes
 */
export type Params = Record<SiteVariant, RouteParams>;