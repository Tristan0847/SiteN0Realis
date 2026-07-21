import {JournalBauk} from "@Wiki/contenuPages/JournalOwl/Bauk";


/**
 * Méthode de génération des métadonnées
 * @returns Métadonnées de la page
 */
export async function generateMetadata() {
    return {
        "title" : "Au sujet de 'Bauk",
    }
}

/**
 * Journal du regard fuyant d'AntiR
 * @returns 
 */
export default function RegardFuyant() {
    return (<JournalBauk />);
}