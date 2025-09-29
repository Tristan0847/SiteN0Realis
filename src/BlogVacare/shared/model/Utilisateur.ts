
/**
 * Classe représentant un utilisateur du site
 */
export class Utilisateur {
    
    private username: string = "";
    private motDePasse: string = "";
    private estAdmin: boolean = false;

    /**
     * Getter de l'username
     * @returns 
     */
    getUsername(): string {
        return this.username;
    }

    /**
     * Setter de l'Username
     * @param username 
     */
    setUsername(username: string): void {
        this.username = username;
    }

    /**
     * Getter du mot de pase
     * @returns 
     */
    getMotDePasse(): string {
        return this.motDePasse;
    }

    /**
     * Setter du mot de pase
     * @param motDePasse 
     */
    setMotDePasse(motDePasse: string): void {
        this.motDePasse = motDePasse;
    }

    /**
     * Getter du rôle de l'utilisateur
     * @returns 
     */
    getEstAdmin(): boolean {
        return this.estAdmin;
    }

    /**
     * Setter du rôle de l'utilisateur
     * @param estAdmin 
     */
    setEstAdmin(estAdmin: boolean): void {
        this.estAdmin = estAdmin;
    }

}
