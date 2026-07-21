import {Metadata} from "next";
import {PageTendances} from "@BlogsFront/pagesclient/communaute/PageTendances";

export function generateMetadata(): Metadata {
    return {
        title: 'Tendances - AVOS Community',
    };
}

/**
 * Page montrant les tendances du site
 * @constructor
 */
export default function Tendances() {

    return (
        <PageTendances />
    )
}