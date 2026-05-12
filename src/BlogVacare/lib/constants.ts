// Fichier de constantes globales de l'application

// URL de l'API
export const API_URL = process.env.NEXT_PUBLIC_LIEN_API_BACKEND ?? "http://localhost:8000/api/";

// Lien des fichiers de stockage local des données
export const BASE_DATA_PATH = "public/data";
export const BASE_DATA_PATH_BLOGS = BASE_DATA_PATH + "/blogvacare";
export const BASE_DATA_PATH_FETCH = "/data";
export const BASE_DATA_PATH_BLOGS_FETCH = BASE_DATA_PATH_FETCH + "/blogvacare";

// Modes de récupération de données
export const DATA_MODE : ('export' | 'production') = process.env.NEXT_BUILD_MODE as ('export' | 'production') || 'production';