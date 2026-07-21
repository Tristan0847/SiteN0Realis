import {ApiError} from "../model/ApiError";
import {API_URL} from "@BlogsFront/lib/constants";

/**
 * Méthode de fetch de données par API
 * @param input Route de l'API depuis celle définie en .env
 * @param init Paramètres éventuels de la requête
 */
export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${input}`, {
        credentials: init?.credentials || 'include',
        headers: {
            Accept: 'application/json',
            ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
            ...init?.headers,
        },
        ...init,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new ApiError(error.message || `HTTP ${response.status}`, response.status ?? 500);
    }

    const data = await response.json();
    return data as T;
}

/**
 * Fonction transformant le corps d'une requête en un FormData
 * @param body
 */
function toFormData(body: Record<string, string|number|boolean|File|Blob|null|undefined>): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(body)) {
        if (value === null || value === undefined) {
            continue;
        }

        if (value instanceof Blob) {
            formData.append(key, value);
            continue;
        }

        formData.append(key, String(value));
    }

    return formData;
}

/**
 * Méthode gérant l'envoi d'une requête POST et sa vérification de succès
 * @param url URL de la requête
 * @param body Corps de la requête
 */
export async function apiPost(url: string, body: Record<string, string|number|boolean|File|Blob|null|undefined>): Promise<void> {

    let requestBody : BodyInit;
    const headers : HeadersInit = {
        Accept: 'application/json',
    }

    // Vérification que le body ne contient pas de fichiers
    if (Object.values(body).some((value) => value instanceof Blob)) {
        requestBody = toFormData(body);
    } else {
        headers['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(body);
    }


    const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: requestBody,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new ApiError(error.message || `HTTP ${response.status}`, response.status ?? 500);
    }
}