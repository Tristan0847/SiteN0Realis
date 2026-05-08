import { Metadata } from "next";
import { PageVacareArrive } from "./pageclient";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Dernier avertissement`,
        description: '2c6f 4qn jel 7bhlcbh 8pbhrcpicgbdr. F7 5mcp fpi978ck4, j8 Gke8j4ln A4phf4p mbh8 lbdbo.'
    };
}

/**
 * Page annonçant l'arrivée de Vacare
 * @returns {JSX.Element} Composant React pour la page annonçant l'arrivée de Vacare
 */
export default async function Page() {
  
    return <PageVacareArrive />
}
