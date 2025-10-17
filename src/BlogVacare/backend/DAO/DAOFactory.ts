import path from 'path';
import { BlogDAOMySQL } from '@BlogsBack/DAO/Implementation/BlogDAOMySQL';

/**
 * Création de symboles pour les interfaces (clé unique)
 * Permet d'éviter les erreurs de chaînes de caractères
 * et de s'assurer qu'une interface n'a qu'une seule instance
 */
export const INTERFACESDAO = {
  I_BlogDAO: Symbol.for('I_BlogDAO'),
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
            case INTERFACESDAO.I_BlogDAO:
                return new BlogDAOMySQL();
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
}
