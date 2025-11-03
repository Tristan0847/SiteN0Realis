
/**
 * Interface de gestion de hachage du mot de passe
 */
export interface I_PasswordHashUtil {

    /**
     * Méthode de hachage d'un mot de passe
     * @param motDePasse Mot de passe à hacher 
     * @returns Mot de passe haché
     */
    hash(motDePasse : string) : Promise<string>;

    /**
     * Méthode de comparaison de hachage de mot de passe
     * @param motDePasse Mot de passe
     * @param motDePasseHash Mot de passe haché
     * @returns True si les 2 mots de passe correspondent, false sinon
     */
    compare(motDePasse : string, motDePasseHash : string) : Promise<boolean>;
}
