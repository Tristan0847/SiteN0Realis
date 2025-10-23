
/**
 * Classe utilitaire de changements de format de date
 */
export class dateFormatUtil {

    /**
     * Méthode de reformatage d'une date sous format MySQL
     * @param date Date à formater
     * @returns Date formatée
     */
    public static dateToMySQLFormat(date : Date) : string {
        const dateString : string = date.toISOString();
        const dateSlice : string = dateString.slice(0,19);
        const dateRetour : string = dateSlice.replace("T", " ");

        return dateRetour;
    }
}