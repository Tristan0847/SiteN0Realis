import {Metadata} from "next";
import {PageUtilisateur} from "@BlogsFront/pagesclient/communaute/PageUtilisateur";
import {getUtilisateursParams} from "@BlogsFront/lib/routes-config";

/**
 * Props pour le composant
 */
interface PageProps {
    params: Promise<{pseudo: string}>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {

    const parametres = await params;

    return {
        title: `AVOS Community - ${parametres.pseudo}`,
    };
}

/**
 * Page affichant le profil d'un utilisateur
 * @param params Paramètres de la route, incluant le nom de l'utilisateur
 * @returns {JSX.Element}
 */
export default async function Page({params}: PageProps) {

    const {pseudo} = await params;

    return <PageUtilisateur pseudo={pseudo} />
}

/**
 * Génère les paramètres de génération de pages statiques du projet (ici, chaque dossier de blogs)
 * @returns Liste de paramètres pour la génération statique
 */
export async function generateStaticParams() {
    return await getUtilisateursParams();
}

// Active les paramètres dynamiques
export const dynamicParams = false;