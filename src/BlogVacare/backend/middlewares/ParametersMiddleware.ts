/**
 * Middleware pour valider les paramètres de la requête
 */
export class ParametersMiddleware {

    /**
     * Valide les paramètres de la requête
     * @param request Requête à valider
     * @throws Erreur si un paramètre invalide est détecté
     */
    async run(request: Request): Promise<void> {
        const url = new URL(request.url);

        for (const [key, value] of url.searchParams.entries()) {
            // Vérifie que les paramètres ne contiennent que des caractères alphanumériques, tirets et underscores
            if (!/^[a-zA-Z0-9-_]+$/.test(value))
                throw new Error(`Paramètre invalide détecté : ${key}`);

            // Vérifie que les paramètres ne contiennent pas de caractères suspects (anti injection basique)
            if (/['"`;<>&|${}]/.test(value))
                throw new Error(`Caractères invalides détectés dans : ${key}`);

            // Vérifie que les paramètres ne sont pas trop longs (255 caractères max)
            if (value.length > 255)
                throw new Error(`Valeur trop longue pour : ${key}`);
        }
    }
}
