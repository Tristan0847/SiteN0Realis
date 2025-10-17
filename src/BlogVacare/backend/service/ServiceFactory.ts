import path from 'path';
import { AuthService } from './implementation/AuthService';
import { BlogService } from './implementation/BlogService';

/**
 * Création de symboles pour les interfaces (clé unique)
 * Permet d'éviter les erreurs de chaînes de caractères
 * et de s'assurer qu'une interface n'a qu'une seule instance
 */
export const INTERFACESSERVICE = {
    I_AuthService: Symbol.for("I_AuthService"),
    I_BlogService: Symbol.for("I_BlogService")
};

/**
 * Classe de factory pour les services (injecteur de dépendances)
 */
export class ServiceFactory {
    
    // Liste d'instances créées
    private static instances = new Map<symbol, any>();

    /**
     * Méthode de récupération d'une instance d'un service
     * @param interfaceKey Clé de l'interface
     * @returns Instance du service
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
            case INTERFACESSERVICE.I_AuthService:
                return new AuthService();
            case INTERFACESSERVICE.I_BlogService:
                return new BlogService();
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
}
