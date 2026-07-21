/**
 * Interface représentant un élément supprimé
 */
export interface ElementSupprime {
    id: number;
    nom_utilisateur: string;
    raison_suppression: string;
    date_suppression: string;
    cache: boolean;
}

/**
 * Interface représentant un dossier de blogs
 */
export interface Dossier {
    id: number;
    titre: string;
    description: string;
    slug: string;
    date_creation: string;
    nom_utilisateur: string;
    blogs?: Blog[];
    element_supprime?: ElementSupprime|null;
    element_supprime_visible?: ElementSupprime|null;
    id_suppression: number;
}

/**
 * Interface représentant un blog
 */
export interface Blog {
    id: number;
    titre: string;
    slug: string;
    date_creation: Date;
    messages?: Message[]|null;
    premier_message?: Message|null;
    message_post?: Message|null;
    id_dossier: number;
    nom_utilisateur: string;
    element_supprime?: ElementSupprime|null;
    element_supprime_visible?: ElementSupprime|null;
    id_suppression: number;
    nombre_reponses?: number;
}

/**
 * Interface représentant un message
 */
export interface Message {
    id: number;
    id_blog: number;
    nom_utilisateur: string;
    contenu: string;
    date_publication: string;
    element_supprime?: ElementSupprime|null;
    element_supprime_visible?: ElementSupprime|null;
    id_suppression: number;
    likes: number;
    partages: number;
    media?:string;
}