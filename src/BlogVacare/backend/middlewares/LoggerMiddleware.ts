/**
 * Middleware de journalisation des requêtes
 */
export class LoggerMiddleware {

    async run(request: Request): Promise<void> {
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    }

}