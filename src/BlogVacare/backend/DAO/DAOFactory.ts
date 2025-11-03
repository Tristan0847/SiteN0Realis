import path from 'path';
import { BlogDAOMySQL } from '@BlogsBack/DAO/Implementation/BlogDAOMySQL';
import { DossierDAOMySQL } from '@BlogsBack/DAO/Implementation/DossierDAOMySQL';
import { MessageDAOMySQL } from '@BlogsBack/DAO/Implementation/MessageDAOMySQL';
import { UtilisateurDAOMySQL } from '@BlogsBack/DAO/Implementation/UtilisateurDAOMySQL';
import { ElementSupprimeDAOMySQL } from '@BlogsBack/DAO/Implementation/ElementSupprimeDAOMySQL';

/**
 * Création de symboles pour les interfaces (clé unique)
 * Permet d'éviter les erreurs de chaînes de caractères
 * et de s'assurer qu'une interface n'a qu'une seule instance
 */
export const INTERFACESDAO = {
  I_BlogDAO: Symbol.for('I_BlogDAO'),
  I_DossierDAO: Symbol.for('I_DossierDAO'),
  I_MessageDAO: Symbol.for('I_MessageDAO'),
  I_ElementSupprimeDAO: Symbol.for('I_ElementSupprimeDAO'),
  I_UtilisateurDAO: Symbol.for('I_UtilisateurDAO')
};

/**
 * Classe de factory pour les DAOs (injecteur de dépendances)
 */
export class DAOFactory {
    
    // Liste d'instances créées
    private static instances = new Map<symbol, any>();

    /**
     * Méthode de récupération d'une instance d'un DAO
     * @param interfaceKey Clé de l'interface
     * @returns Instance du DAO
     */
    static get<T>(interfaceKey: symbol): T {
        if (!this.instances.has(interfaceKey)) {
            this.instances.set(interfaceKey, this.createInstance(interfaceKey));
        }

        return this.instances.get(interfaceKey);
    }

    // Méthode privée de création d'instances 
    private static createInstance(interfaceKey: symbol): any {
        switch (interfaceKey) {

            case INTERFACESDAO.I_DossierDAO:
                return new DossierDAOMySQL();
            case INTERFACESDAO.I_BlogDAO:
                return new BlogDAOMySQL();
            case INTERFACESDAO.I_MessageDAO:
                return new MessageDAOMySQL();
                
            case INTERFACESDAO.I_UtilisateurDAO:
                return new UtilisateurDAOMySQL();

            case INTERFACESDAO.I_ElementSupprimeDAO:
                return new ElementSupprimeDAOMySQL();            
            
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
}
