
/**
 * Méthode calculant une date sous la forme de "Il y a ... ans/mois/jours"
 * @param date Date à afficher
 * @returns Date sous la forme de "Il y a ... ans/mois/jours"
 */
export function getDateString(date : string) : string {
    // Différence en secondes
    const diff = (new Date().getTime() - new Date(date).getTime())/1000;

    let retour = "Il y a ";
    // Si inférieur à 1 minute, afficher sous la forme de "À l'instant"
    if (diff < 60) {
        retour = "À l'instant";
    }
    // Si supérieur à 1 minute, afficher sous la forme de "il y a x minutes"
    else if (diff < 60 * 60) {
        const valeur = Math.floor(diff/60);
        retour += `${valeur} minute${valeur > 1 ? "s" : ""}`;
    }
    // Si supérieur à 1 heure, afficher sous la forme de "il y a x heures"
    else if (diff < 3600 * 24) {
        const valeur = Math.floor(diff/3600);
        retour += `${valeur} heure${valeur > 1 ? "s" : ""}`;
    }
    // Si supérieur à 24 heures, afficher sous la forme de "il y a x jours"
    else if (diff < 3600 * 24 * 30) {
        const valeur = Math.floor(diff/(3600*24));
        retour += `${valeur} jour${valeur > 1 ? "s" : ""}`;
    }
    // Si supérieur à 30 jours, afficher sous la forme de "il y a x mois"
    else if (diff < 3600 * 24 * 365) {
        retour += Math.floor(diff/(3600*24*30));
        retour += " mois";
    }
    // Si supérieur à 365 jours, afficher sous la forme de "il y a x ans"
    else {
        const valeur = Math.floor(diff/(3600 * 24 * 365));
        retour += `${valeur} an${valeur > 1 ? "s" : ""}`;
    }

    return retour;
}