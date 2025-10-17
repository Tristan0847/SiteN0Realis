import { JwtPayload } from "@BlogsShared/model/Auth";

/**
 * Interface de gestion de JSON Web Tokens pour l'authentification
 */
export interface I_JWTUtil {

    /**
     * Méthode de génération du token JSON
     * @param payload Données à intégrer au token
     * @returns Jeton généré
     */
    genererTokenAcces(payload : JwtPayload) : string;

    /**
     * Méthode de génération du token JSON
     * @param payload Données à intégrer au token
     * @returns Jeton généré
     */
    genererRefreshToken(payload : JwtPayload) : string;

    /**
     * Méthode de vérification de token d'accès à l'application
     * @param token Token à vérifier
     * @returns Payload du token vérifié
     */
    verifierTokenAcces(token : string) : JwtPayload;

    /**
     * Méthode de vérification de token refresh à l'application
     * @param token Token à vérifier
     * @returns Payload du token vérifié
     */
    verifierTokenRefresh(token : string) : JwtPayload;
}