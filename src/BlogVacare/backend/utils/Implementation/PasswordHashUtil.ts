import { I_PasswordHashUtil } from "@BlogsBack/utils/Interface/I_PasswordHashUtil";
import bcrypt from "bcrypt";

/**
 * Classe de gestion de hachage de mot de passe
 */
export class PasswordHashUtil implements I_PasswordHashUtil {

    private readonly sel : number = 15;

    public async hash(motDePasse : string) : Promise<string> {
        return await bcrypt.hash(motDePasse, this.sel);
    }

    public async compare(motDePasse : string, motDePasseHash : string) : Promise<boolean> {
        return await bcrypt.compare(motDePasse, motDePasseHash);
    }
}