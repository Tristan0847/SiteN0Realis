// Fichier de constantes globales de l'application

// URL de l'API
export const API_URL = process.env.NEXT_PUBLIC_LIEN_API_BACKEND ?? "http://localhost:8000/api/";

// Lien des fichiers de stockage local des données
export const BASE_DATA_PATH = "public/data";
export const BASE_DATA_PATH_BLOGS = BASE_DATA_PATH + "/blogvacare";
export const BASE_DATA_PATH_FETCH = "/data";
export const BASE_DATA_PATH_BLOGS_FETCH = BASE_DATA_PATH_FETCH + "/blogvacare";
export const BASE_DATA_PATH_COMMUNITY = BASE_DATA_PATH + "/community";
export const BASE_DATA_PATH_COMMUNITY_FETCH = BASE_DATA_PATH_FETCH + "/community";
export const BASE_DATA_PATH_COMMUNITY_ACCUEIL = BASE_DATA_PATH_COMMUNITY + "/accueil";
export const BASE_DATA_PATH_COMMUNITY_ACCUEIL_FETCH = BASE_DATA_PATH_COMMUNITY_FETCH + "/accueil";
export const BASE_DATA_PATH_COMMUNITY_TENDANCES = BASE_DATA_PATH_COMMUNITY + "/tendances";
export const BASE_DATA_PATH_COMMUNITY_TENDANCES_FETCH = BASE_DATA_PATH_COMMUNITY_FETCH + "/tendances";
export const BASE_DATA_PATH_COMMUNITY_POSTS = BASE_DATA_PATH_COMMUNITY + "/posts";
export const BASE_DATA_PATH_COMMUNITY_POSTS_FETCH = BASE_DATA_PATH_COMMUNITY_FETCH + "/posts";
export const BASE_DATA_PATH_COMMUNITY_USER = BASE_DATA_PATH_COMMUNITY + "/utilisateurs";
export const BASE_DATA_PATH_COMMUNITY_USER_FETCH = BASE_DATA_PATH_COMMUNITY_FETCH + "/utilisateurs";

// Modes de récupération de données
export const DATA_MODE : ('export' | 'production') = process.env.NEXT_BUILD_MODE as ('export' | 'production') || 'production';