import { Metadata } from "next";
import { PageVacareArrive } from "./pageclient";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Vacare arrive.`,
    };
}

/**
 * Page annonçant l'arrivée de Vacare
 * @returns {JSX.Element} Composant React pour la page annonçant l'arrivée de Vacare
 */
export default async function Page() {
  
    return <PageVacareArrive />
}
