import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Interface de DAO sur la table utilisateur
 */
export interface I_UtilisateurDAO {

    /**
     * Méthode de création d'un utilisateur
     * @param utilisateur Utilisateur à créer
     */
    creerUtilisateur(utilisateur : Utilisateur) : Promise<void>;

    /**
     * Méthode de récupération du mot de passe stocké pour un nom d'utilisateur donné
     * @param username Nom de l'utilisateur dont on souhaite récupérer le mot de passe
     * @returns Mot de passe enregistré
     */
    getMotDePasse(username : string) : Promise<Utilisateur>;

    /**
     * Méthode de récupération du rôle de l'utilisateur (administrateur ou non)
     * @param username Nom de l'utilisateur dont on souhaite récupérer le rôle
     * @returns Rôle de l'utilisateur
     */
    getRole(username : string) : Promise<Utilisateur>;

}