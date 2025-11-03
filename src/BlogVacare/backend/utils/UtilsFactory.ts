import path from 'path';
import { I_PasswordHashUtil } from "@BlogsBack/utils/Interface/I_PasswordHashUtil";
import { PasswordHashUtil } from '@BlogsBack/utils/Implementation/PasswordHashUtil';
import { JWTUtil } from '@BlogsBack/utils/Implementation/JWTUtil';

/**
 * Création de symboles pour les interfaces (clé unique)
 * Permet d'éviter les erreurs de chaînes de caractères
 * et de s'assurer qu'une interface n'a qu'une seule instance
 */
export const INTERFACESUTILS = {
  I_PasswordHashUtil: Symbol.for('I_PasswordHashUtil'),
  I_JWTUtil: Symbol.for('I_JWTUTil')
};

/**
 * Classe de factory pour les utils (injecteur de dépendances)
 */
export class UtilsFactory {
    
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
            case INTERFACESUTILS.I_PasswordHashUtil:
                return new PasswordHashUtil();
            case INTERFACESUTILS.I_JWTUtil:
                return new JWTUtil();
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
}
