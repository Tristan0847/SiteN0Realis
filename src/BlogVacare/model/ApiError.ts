/**
 * Erreur renvoyée par l'API
 */
export class ApiError extends Error {
    constructor(message: string, public readonly status: number) {
        super(message);
        this.name = 'ApiError';
    }
}