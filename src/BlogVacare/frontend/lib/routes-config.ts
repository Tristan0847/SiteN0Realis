import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { ServiceFactory, INTERFACESSERVICE } from '@BlogsFront/services/ServiceFactory';
import type { Dossier } from '@BlogsShared/model/Dossier';
import type { Blog } from '@BlogsShared/model/Blog';
import type { Message } from '@BlogsShared/model/Message';
import { I_DossierService } from '@BlogsFront/services/Interface/I_DossierService';
import { I_MessageService } from '@BlogsFront/services/Interface/I_MessageService';
import { filtrerElements } from '@BlogsFront/app/_shared/pageMethodes';
import { SiteVariant } from "@BlogsShared/model/Variant";

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
 */
export async function getAllRoutes() {
  try {
    const dossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);
    const blogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);
    const messageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);

    // Récupération des dossiers
    const dossiers = await dossierService.recupererDossiers();

    // Pour chaque dossier, on récupère le blog
    const routesWithBlogs: DossierAvecBlogs[] = await Promise.all(
      dossiers.map(async (dossier) => {
        try {
          const blogs = await blogService.recupererBlogsDuDossier(dossier.getSlug());
          return { dossier, blogs };
        } catch (error) {
          console.log(`Erreur lors de la recherche de blogs pour le dossier ${dossier.getSlug()}`);
          return { dossier, blogs: [] };
        }
      })
    );

    // Pour chaque blog, on récupère ses messages
    const routesCompletes: RouteComplete[] = await Promise.all(
      routesWithBlogs.flatMap(({ dossier, blogs }) =>
        blogs.map(async (blog) => {
          try {
            const messages = await messageService.recupererMessagesDuBlog(dossier.getSlug(), blog.getSlug());
            return {slugDossier: dossier.getSlug(), slugBlog: blog.getSlug(), messages};
          } catch (error) {
            console.log(`Erreur lors de la récupération de messages pour le blog ${blog.getSlug()}:`, error);
            return {slugDossier: dossier.getSlug(), slugBlog: blog.getSlug(), messages: []};
          }
        })
      )
    );

    return {dossiers, routesWithBlogs, routesCompletes};
  } catch (error) {
    console.log('Erreur lors de la récupération des routes du projet : ', error);
    return { dossiers: [], routesWithBlogs: [], routesCompletes: [] };
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
 */
export async function getDossierBlogsParams() {
  try {
    const { dossiers } = await getAllRoutes();
    
    const params = dossiers.map((dossier) => ({
      slugDossier: dossier.getSlug(),
    }));

    return params;
  } catch (error) {
    console.error('Erreur lors de la récupération de paramètres pour les blogs (getDossierBlogsParams)');
    return [];
  }
}

/**
 * Génère les paramètres pour la page des messages
 */
export async function getMessagesParams() {
  try {
    const { routesCompletes } = await getAllRoutes();
    
    const params = routesCompletes.map((route) => ({
      slugDossier: route.slugDossier,
      slugBlog: route.slugBlog,
    }));

    return params;
  } catch (error) {
    console.error('Erreur lors de la récupération de paramètres pour les messages (getMessagesParams)');
    return [];
  }
}

/**
 * Récupère les infos d'une route spécifique
 */
export async function getRouteData(slugDossier: string, slugBlog: string) {
  try {
    const { routesCompletes } = await getAllRoutes();
    
    return routesCompletes.find(
      (route) => route.slugDossier === slugDossier && route.slugBlog === slugBlog
    );
  } catch (error) {
    console.error('Erreur lors de la récupération de données d\'une route (getRouteData) pour :' + slugDossier + "/" + slugBlog);
    return null;
  }
}


/**
 * Récupère tous les dossiers pour la page d'accueil
 * @param variant Variante du site (old ou moderne)
 */
export async function getRouteDossiers(variant : SiteVariant) {
  try {
    const { dossiers } = await getAllRoutes();
    const dossiersAffiches = filtrerElements(dossiers, false, variant);
    
    return dossiersAffiches;
  } catch (error) { 
    console.error('Erreur lors de la récupération des dossiers (getRouteDossiers)');
    return [];
  }
}

/**
 * Récupère les messages pour une route spécifique
 * @param slugDossier Slug du dossier récupéré
 * @param slugBlog Slug du blog récupéré
 * @param variant Variante du site (old ou moderne)
 */
export async function getRouteMessages(slugDossier: string, slugBlog: string, variant : SiteVariant) {
  try {
    const { routesCompletes } = await getAllRoutes();
    
    const route = routesCompletes.find(
      (r) => r.slugDossier === slugDossier && r.slugBlog === slugBlog
    );
    if (!route) {
      throw new Error("Route inconnue");
    }
    const messages : Message[] = route.messages;
    const messagesAffiches : Message[] = filtrerElements(messages, false, variant);

    return messagesAffiches;
  } catch (error) {
    console.error('Erreur lors de la récupération de messages pour une route (getRouteMessages) pour :' + slugDossier + "/" + slugBlog);
    return [];
  }
}

/**
 * Récupère les blogs pour un dossier spécifique
 * @param slugDossier Slug du dossier récupéré
 * @param variant Variante du site (old ou moderne)
 */
export async function getRouteBlogsForDossier(slugDossier: string, variant : SiteVariant) {
  try {
    const { routesWithBlogs } = await getAllRoutes();
    
    const route = routesWithBlogs.find((r) => r.dossier.getSlug() === slugDossier);
    if (!route) {
      throw new Error("Route inconnue");
    }
    const blogs : Blog[] = route.blogs;
    const blogsAffiches : Blog[] = filtrerElements(blogs, false, variant);

    return blogsAffiches;
  } catch (error) {
    console.error('Erreur lors de la récupération de blogs pour un dossier (getRouteBlogsForDossier) pour : ' + slugDossier);
    return [];
  }
}