import { DAOFactory, INTERFACESDAO } from "@BlogsBack/DAO/DAOFactory";
import { I_DossierDAO } from "@BlogsBack/DAO/Interface/I_DossierDAO";
import { I_ElementSupprimeDAO } from "@BlogsBack/DAO/Interface/I_ElementSupprimeDAO";
import { Dossier } from "@BlogsShared/model/Dossier";
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";
import { Utilisateur } from "@BlogsShared/model/Utilisateur";
import { SlugsUtil } from "@BlogsShared/utils/SlugsUtil";
import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { v4 as uuidv4 } from 'uuid';

/**
 * Classe de service de gestion de dossiers
 */
export class DossierService implements I_DossierService {
    
    private dao : I_DossierDAO;
    private elementSupprimeDAO : I_ElementSupprimeDAO;

    constructor() {
        this.dao = DAOFactory.get<I_DossierDAO>(INTERFACESDAO.I_DossierDAO);
        this.elementSupprimeDAO = DAOFactory.get<I_ElementSupprimeDAO>(INTERFACESDAO.I_ElementSupprimeDAO);
    }
    
    async creerDossier(nom : string, description : string, nomUtilisateur : string) : Promise<void> {
        try {
            if (!nom || nom.trim().length === 0) {
                throw new Error("Le nom du dossier ne peut pas être vide");
            }

            const dossier = new Dossier();
            
            // Génération de l'ID
            const idDossier = uuidv4();
            dossier.setId(idDossier);

            dossier.setTitre(nom);
            dossier.setDescription(description);

            const slug = SlugsUtil.genererSlug(nom);
            dossier.setSlug(slug);

            const utilisateur = new Utilisateur();
            utilisateur.setUsername(nomUtilisateur);
            dossier.setUtilisateur(utilisateur);

            await this.dao.creerDossier(dossier);
        }
        catch (error) {
            throw error;
        }
    }

    async recupererDossiers() : Promise<Dossier[]> {
        try {
            return await this.dao.recupererDossiers();
        }
        catch (error) {
            throw error;
        }
    }
    
    async supprimerDossier(dossierId : string, nomUtilisateur : string, raisonSuppression : string, cache : boolean) : Promise<void> {
        try {
            if (!dossierId || dossierId.trim() === '') {
                throw new Error("ID du dossier invalide");
            }

            const elementSupprime = new ElementSupprime();
            elementSupprime.setRaisonSuppression(raisonSuppression);

            const utilisateur = new Utilisateur();
            utilisateur.setUsername(nomUtilisateur);
            elementSupprime.setUtilisateur(utilisateur);

            elementSupprime.setCache(cache);
            const date = new Date("now");
            elementSupprime.setDateSuppression(date);

            const elementSupprimeAvecID =  await this.elementSupprimeDAO.creerElementSupprime(elementSupprime);

            const dossierASupprimer = new Dossier();
            dossierASupprimer.setId(dossierId);
            dossierASupprimer.setElementSupprime(elementSupprimeAvecID);

            await this.dao.supprimerDossier(dossierASupprimer);
        }
        catch (error) {
            throw error;
        }
    }
        

}