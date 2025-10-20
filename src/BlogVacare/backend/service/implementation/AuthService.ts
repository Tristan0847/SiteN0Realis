import { DAOFactory, INTERFACESDAO } from "@BlogsBack/DAO/DAOFactory";
import { I_UtilisateurDAO } from "@BlogsBack/DAO/Interface/I_UtilisateurDAO";
import { I_AuthService } from "@BlogsBack/service/interface/I_AuthService";
import { I_JWTUtil } from "@BlogsBack/utils/Interface/I_JWTUtil";
import { I_PasswordHashUtil } from "@BlogsBack/utils/Interface/I_PasswordHashUtil";
import { INTERFACESUTILS, UtilsFactory } from "@BlogsBack/utils/UtilsFactory";
import { AuthReponse, DonneesInscription, DonneesUtilisateur, JwtPayload } from "@BlogsShared/model/Auth";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";

/**
 * Service d'authentification au projet
 */
export class AuthService implements I_AuthService {

    private dao : I_UtilisateurDAO;
    private jwtUtil : I_JWTUtil;
    private passwordUtil : I_PasswordHashUtil;

    private readonly regexMdp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;

    /**
     * Constructeur du service
     */
    constructor() {
        this.dao = DAOFactory.get<I_UtilisateurDAO>(INTERFACESDAO.I_UtilisateurDAO);
        this.jwtUtil = UtilsFactory.get<I_JWTUtil>(INTERFACESUTILS.I_JWTUtil);
        this.passwordUtil = UtilsFactory.get<I_PasswordHashUtil>(INTERFACESUTILS.I_PasswordHashUtil);
    }


    async connexion(credentials : DonneesUtilisateur) : Promise<AuthReponse> {
        // Récupération du mot de passe de l'utilisateur
        const utilisateurDao = await this.dao.getMotDePasse(credentials.username);

        if (!utilisateurDao) {
            throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }

        // Comparaison avec le mot de passe entré
        const valide = await this.passwordUtil.compare(credentials.password, utilisateurDao.getMotDePasse());

        if (!valide) {
            throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }

        // Récupération du rôle de l'utilisateur
        const utilisateurRole = await this.dao.getRole(credentials.username);

        // Création des tokens de retour
        const payload : JwtPayload = {
            username: credentials.username,
            estAdmin: utilisateurRole.getEstAdmin(),
        };
        const tokenAcces = this.jwtUtil.genererTokenAcces(payload);
        const tokenRefresh = this.jwtUtil.genererRefreshToken(payload);

        const utilisateur = new Utilisateur();
        utilisateur.setUsername(credentials.username);
        utilisateur.setEstAdmin(utilisateurRole.getEstAdmin());


        return { utilisateur, tokenAcces, tokenRefresh };
    }

    async inscription(donnees : DonneesInscription) : Promise<AuthReponse> {

        if (donnees.mdp1 != donnees.mdp2) {
            throw new Error("Les 2 mots de passe entrés ne sont pas les mêmes");
        }

        if (!this.verifierMdp(donnees.mdp1)) {
            throw new Error("Mot de passe invalide, il doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial et avoir une longueur minimale de 12");
        }

        try {
            const utilisateurExistant = await this.dao.getRole(donnees.nomUtilisateur);
            if (utilisateurExistant) {
                throw new Error("Ce nom d'utilisateur existe déjà, veuillez en entrer un différent");
            }
        }
        // S'il y a eu une exception parce que l'utilisateur n'existe pas, on peut continuer
        catch (error) {
            if (!(error instanceof Error && error.message.includes('récupération du rôle'))) {
                throw error;
            }
        }

        // On entre donc l'utilisateur en BDD ensuite
        const mdpHash = await this.passwordUtil.hash(donnees.mdp1);

        const utilisateur = new Utilisateur();
        utilisateur.setUsername(donnees.nomUtilisateur);
        utilisateur.setMotDePasse(mdpHash);
        utilisateur.setEstAdmin(false);

        await this.dao.creerUtilisateur(utilisateur);

        // On génère les tokens de retour
        const payload: JwtPayload = {
            username: donnees.nomUtilisateur,
            estAdmin: false,
        };

        const tokenAcces = this.jwtUtil.genererTokenAcces(payload);
        const tokenRefresh = this.jwtUtil.genererRefreshToken(payload);

        // Retour de l'utilisateur sans mot de passe
        const utilisateurRetour = new Utilisateur();
        utilisateurRetour.setUsername(donnees.nomUtilisateur);
        utilisateurRetour.setEstAdmin(false);

        return {
            utilisateur : utilisateurRetour,
            tokenAcces,
            tokenRefresh,
        };
    }
    
    async rafraichirToken(tokenRefresh : string) : Promise<string> {
        const payload = this.jwtUtil.verifierTokenRefresh(tokenRefresh);

        const utilisateur = await this.dao.getRole(payload.username);

        if (!utilisateur) {
            throw new Error("Utilisateur introuvable");
        }

        const payloadRetour : JwtPayload = {
            username: payload.username,
            estAdmin: utilisateur.getEstAdmin(),
        };

        return this.jwtUtil.genererTokenAcces(payloadRetour);
    }

    async getUtilisateur(tokenAcces : string) : Promise<Utilisateur> {
        const payload = this.jwtUtil.verifierTokenAcces(tokenAcces);

        const utilisateur = await this.dao.getRole(payload.username);

        if (!utilisateur) {
            throw new Error('Utilisateur introuvable');
        }

        return utilisateur;
    }


    private verifierMdp(motDePasse : string) : boolean {
        return this.regexMdp.test(motDePasse);
    }
}