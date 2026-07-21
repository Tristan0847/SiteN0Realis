import {BlogGettersInterface} from "@BlogsFront/service/interface/BlogGettersInterface";
import {DATA_MODE} from "@BlogsFront/lib/constants";
import {LocalBlogGetters} from "@BlogsFront/service/local/LocalBlogGetters";
import {DistantBlogGetters} from "@BlogsFront/service/distant/DistantBlogGetters";

/**
 * Méthode de récupération des getters de données
 * @returns {BlogGettersInterface} Instance de getters de données
 */
export function blogGetters(): BlogGettersInterface {
    let retour: BlogGettersInterface;
    switch (DATA_MODE) {
        case 'export':
            retour = new LocalBlogGetters();
            break;
        case 'production':
        default:
            retour = new DistantBlogGetters();
            break;
    }

    return retour;
}