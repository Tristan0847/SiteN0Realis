import {ApiError} from "../model/ApiError";

/**
 * Méthode de fetch de données par API
 * @param input Route de l'API depuis celle définie en .env
 * @param init Paramètres éventuels de la requête
 */
export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LIEN_API_BACKEND}${input}`, {
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
 * Méthode gérant l'envoi d'une requête POST et sa vérification de succès
 * @param url URL de la requête
 * @param body Corps de la requête
 */
export async function apiPost(url: string, body: Record<string, string|number|boolean|null>): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LIEN_API_BACKEND}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new ApiError(error.message || `HTTP ${response.status}`, response.status ?? 500);
    }
}