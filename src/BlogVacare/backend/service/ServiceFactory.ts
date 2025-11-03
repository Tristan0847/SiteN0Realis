import { AuthService } from '@BlogsBack/service/implementation/AuthService';
import { BlogService } from '@BlogsBack/service/implementation/BlogService';
import { MessageService } from '@BlogsBack/service/implementation/MessageService';
import { DossierService } from '@BlogsBack/service/implementation/DossierService';

/**
 * Création de symboles pour les interfaces (clé unique)
 * Permet d'éviter les erreurs de chaînes de caractères
 * et de s'assurer qu'une interface n'a qu'une seule instance
 */
export const INTERFACESSERVICE = {
    I_AuthService: Symbol.for("I_AuthService"),
    I_DossierService: Symbol.for("I_DossierService"),
    I_BlogService: Symbol.for("I_BlogService"),
    I_MessageService: Symbol.for("I_MessageService")
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
            case INTERFACESSERVICE.I_DossierService:
                return new DossierService();
            case INTERFACESSERVICE.I_BlogService:
                return new BlogService();
            case INTERFACESSERVICE.I_MessageService:
                return new MessageService();
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
}
