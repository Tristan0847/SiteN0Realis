import {Metadata} from "next";
import {PagePostsRandoms} from "@BlogsFront/pagesclient/communaute/PagePostsRandoms";

export function generateMetadata(): Metadata {
    return {
        title: 'Posts aléatoires - AVOS Community',
    };
}

/**
 * Page montrant 5 posts au hasard
 * @constructor
 */
export default function Random() {

    return (
        <PagePostsRandoms />
    )
}