import { BlogServiceApi } from '@BlogsFront/services/Implementation/BlogServiceApi';
import { MessageServiceApi } from '@BlogsFront/services/Implementation/MessageServiceApi';
import { DossierServiceApi } from '@BlogsFront/services/Implementation/DossierServiceApi';
import { AuthServiceApi } from '@BlogsFront/services/Implementation/AuthServiceApi';

/**
 * Création de symboles pour les interfaces (clé unique)
 * Permet d'éviter les erreurs de chaînes de caractères
 * et de s'assurer qu'une interface n'a qu'une seule instance
 * @see https://www.typescriptlang.org/docs/handbook/symbols.html
 */
export const INTERFACESSERVICE = {
    I_DossierService: Symbol.for('I_DossierService'),
    I_BlogService: Symbol.for('I_BlogService'),
    I_MessageService: Symbol.for('I_MessageService'),
    I_AuthService: Symbol.for('I_AuthService')
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
            case INTERFACESSERVICE.I_DossierService:
                return new DossierServiceApi();
            case INTERFACESSERVICE.I_BlogService:
                return new BlogServiceApi();
            case INTERFACESSERVICE.I_MessageService:
                return new MessageServiceApi();
            case INTERFACESSERVICE.I_AuthService:
                return new AuthServiceApi();
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
}
