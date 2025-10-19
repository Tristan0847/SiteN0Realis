import { I_BlogService } from '@BlogsFront/services/Interface/I_BlogService';
import { ServiceFactory, INTERFACES } from '@BlogsFront/services/ServiceFactory';
import type { Dossier } from '@BlogsShared/model/Dossier';
import type { Blog } from '@BlogsShared/model/Blog';
import type { Message } from '@BlogsShared/model/Message';

/**
 * Interface de structuration des routes
 */
interface RouteComplete {
  idDossier: string;
  idBlog: string;
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
    const blogService = ServiceFactory.get<I_BlogService>(INTERFACES.I_BlogService);

    // Récupération des dossiers
    const dossiers = await blogService.getAllDossiers();

    // Pour chaque dossier, on récupère le blog
    const routesWithBlogs: DossierAvecBlogs[] = await Promise.all(
      dossiers.map(async (dossier) => {
        try {
          const blogs = await blogService.getBlogsForDossier(dossier.getId());
          return { dossier, blogs };
        } catch (error) {
          console.log(`Erreur lors de la recherche de blogs pour le dossier ${dossier.getId()}:`, error);
          return { dossier, blogs: [] };
        }
      })
    );

    // Pour chaque blog, on récupère ses messages
    const routesCompletes: RouteComplete[] = await Promise.all(
      routesWithBlogs.flatMap(({ dossier, blogs }) =>
        blogs.map(async (blog) => {
          try {
            const messages = await blogService.getMessagesForBlog(blog.getId(), dossier.getId());
            return {idDossier: dossier.getId(), idBlog: blog.getId(), messages};
          } catch (error) {
            console.log(`Erreur lors de la récupération de messages pour le blog ${blog.getId()}:`, error);
            return {idDossier: dossier.getId(), idBlog: blog.getId(), messages: []};
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
      idDossier: dossier.getId(),
    }));

    return params;
  } catch (error) {
    console.error('Erreur lors de la récupération de paramètres pour les blogs (getDossierBlogsParams) :', error);
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
      idDossier: route.idDossier,
      idBlog: route.idBlog,
    }));

    return params;
  } catch (error) {
    console.error('Erreur lors de la récupération de paramètres pour les messages (getMessagesParams) :', error);
    return [];
  }
}

/**
 * Récupère les infos d'une route spécifique
 */
export async function getRouteData(idDossier: string, idBlog: string) {
  try {
    const { routesCompletes } = await getAllRoutes();
    
    return routesCompletes.find(
      (route) => route.idDossier === idDossier && route.idBlog === idBlog
    );
  } catch (error) {
    console.error('Erreur lors de la récupération de données d\'une route (getRouteData) :', error);
    return null;
  }
}


/**
 * Récupère tous les dossiers pour la page d'accueil
 */
export async function getRouteDossiers() {
  try {
    const { dossiers } = await getAllRoutes();
    
    return dossiers;
  } catch (error) {
    console.error('Erreur lors de la récupération des dossiers (getRouteDossiers) :', error);
    return [];
  }
}

/**
 * Récupère les messages pour une route spécifique
 */
export async function getRouteMessages(idDossier: string, idBlog: string) {
  try {
    const { routesCompletes } = await getAllRoutes();
    
    const route = routesCompletes.find(
      (r) => r.idDossier === idDossier && r.idBlog === idBlog
    );

    return route?.messages || [];
  } catch (error) {
    console.error('Erreur lors de la récupération de messages pour une route (getRouteMessages) :', error);
    return [];
  }
}

/**
 * Récupère les blogs pour un dossier spécifique
 */
export async function getRouteBlogsForDossier(idDossier: string) {
  try {
    const { routesWithBlogs } = await getAllRoutes();
    
    const route = routesWithBlogs.find((r) => r.dossier.getId() === idDossier);

    return route?.blogs || [];
  } catch (error) {
    console.error('Erreur lors de la récupération de blogs pour un dossier (getRouteBlogsForDossier) :', error);
    return [];
  }
}