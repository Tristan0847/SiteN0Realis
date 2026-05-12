import { Dossier, Blog, Message } from "@BlogsFront/model/Blog";
import { SiteVariant } from "@BlogsFront/model/Variant";
import {BlogGettersInterface} from "@BlogsFront/service/interface/BlogGettersInterface";
import {AbstractLocalGetters} from "@BlogsFront/service/local/AbstractLocalGetters";
import {BASE_DATA_PATH_BLOGS_FETCH} from "@BlogsFront/lib/constants";

/**
 * Récupération des dossiers/blogs/messages par fichiers JSON récupérés du backend à l'export
 */
export class LocalBlogGetters extends AbstractLocalGetters implements BlogGettersInterface {

    /**
     * Constructeur de la classe
     */
    public constructor() {
        super(BASE_DATA_PATH_BLOGS_FETCH);
    }

    async getDossiers(variant: SiteVariant): Promise<Dossier[]> {
        return await this.lireJson<Dossier[]>(variant, "dossiers.json");
    }
    async getBlogs(slug_dossier: string, variant: SiteVariant): Promise<Blog[]> {
        return await this.lireJson<Blog[]>(variant, "dossier/" +  slug_dossier + ".json");
    }
    async getMessages(slug_dossier: string, slug_blog: string, variant: SiteVariant): Promise<Message[]> {
        return await this.lireJson<Message[]>(variant, "blog/" + slug_dossier + "/" + slug_blog + ".json");
    }
}