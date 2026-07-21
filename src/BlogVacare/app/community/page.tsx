import {Metadata} from "next";
import {PageAccueilCommunaute} from "@BlogsFront/pagesclient/communaute/PageAccueil";

export function generateMetadata(): Metadata {
    return {
        title: 'AVOS Community',
        description: 'Une communauté qui vous souhaite',
    };
}

/**
 * Page d'accueil du site
 * @constructor
 */
export default function Community() {

    return (
        <PageAccueilCommunaute />
    )
}