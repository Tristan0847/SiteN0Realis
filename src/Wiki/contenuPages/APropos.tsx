"use client";

import OeilDeLOcculte from "@Wiki/components/OeilDeLOcculte";
import { A, H2, Strong } from "@Wiki/components/Wiki/ComposantsCustom";
import Link from "next/link";

/**
 * Méthode de génération du contenu de la page "À propos"
 */
export function PageAPropos() {
    return(<>
    <H2>Nos origines...</H2>
    <div className="text-xl space-y-4 pb-8">
        <p>Site collaboratif d'abord fondé en <Strong>Janvier 2001</Strong> par AntiR, l'Oeil de l'Occulte, autrefois appelé "WikiCR", avait pour vocation première de proposer un répertoire de réalités sombres et occultées, rédigée par ses soins, se basant sur ses recherche dans différents domaines.</p>
        <p>C'est un an plus tard, en <Strong>Juin 2002</Strong>, que le Dr Owl remarque ce site web et décide d'entamer les discussions avec AntiR pour co-diriger le site à ses côtés. Suite à différents échanges sur tout le travail réalisé par AntiR sur le moment et sur ce que Dr Owl pouvait apporter, ils décident de collaborer ensemble et de co-créer ce qui sera aujourd'hui connu comme <strong className="text-red-700">L'Oeil de l'Occulte.</strong></p>
    </div>
    <H2>Notre vision</H2>
    <div className="text-xl space-y-4 pb-8">
        <p>Au vu du contenu originellement disponible sur le site et de la sensibilité de certains sujets traités, la politique première de Dr Owl et d'AntiR fut la suivante :</p>
        <p className="underline text-center"><strong>AUCUN article ne pourra être modifié ou supprimé après publication.</strong></p>

        <p>Si une telle politique peut sembler dangereuse au premier abord, elle garantira au contraire l'intégrité de nos articles et la préservation de la vérité telle qu'elle aura été initialement rédigée, et non telle qu'elle pourrait être erronée par des partisans de mensonges alternatifs.</p>
        <p>Notre combat pour le réel, pour mettre la lumière sur les vérités de ce monde, ne se fera jamais que contre votre propre ignorance. Ce combat, il est directement mené contre ceux qui ont besoin que vous ne sachiez pas tout.</p>
        <p className="text-center text-red-700">La censure n'est et ne sera jamais une alternative en ces lieux.</p>
    </div>
    <H2>Pourquoi l'occulte ?</H2>
    <div className="text-xl space-y-4 pb-8">
        <p>Le choix de l'occulte comme symbole de notre site peut sembler directement nous placer comme de vils propagateurs d'obscurantisme, c'est la contradiction même derrière une telle intuition qui nous a poussés à en faire notre symbole.</p>
        <p>Car si ce qui s'oppose fermement à l'occultisme, à la triquetra inversée utilisée comme symbole de notre oeil, de notre vision, est effectivement la divinité : alors c'est cette même divinité qui vous force en réalité à l'obscurantisme.</p>
        <p>Tout comme les écrits saints de différentes époques ont pu aveugler nos ancêtres, voire nos actuels semblables, pendant de très longs siècles, vous demeurez aujourd'hui aveuglé par de nouveaux mensonges. Bien sûr, les prêcheurs sont de nature différente, leurs saints sont autrement divinisés et leur barbarie n'est plus autant visible. <strong className="text-center text-red-700">Mais ça n'en reste pas moins le même simulacre.</strong></p>
        <p>Nous choisissons donc de nous opposer à une telle lumière, nous choisissons la voie du doute, la voie des êtres libres. Nous ne vous demandons aucunement de nous croire au premier abord, nous vous invitons à vérifier par vous-mêmes, à cultiver votre curiosité et surtout à douter. Car si nous vous incitions à aveuglément croire à ce que nous cherchons à prouver, nous ne vaudrions pas mieux que nos adversaires.</p>
    </div>
    <div className="text-xl pb-8 text-center">
        <p className="pb-2 text-red-100">L'Oeil de l'Occulte n'est pas une croyance, un mouvement sectaire ou toute sorte de dogme.</p>
        <p className="pb-3 text-red-200">Nous ne sommes que quelques personnes lambda faisant part de leur esprit critique.</p>
        <p className="pb-4 text-red-300">Car la liberté, la vraie, c'est celle d'être conscient.</p>
        <p className="pb-4 text-red-400">Conscient du monde qui nous entoure, conscient des ficelles qui nous tirent.</p>
        <p className="pb-5 text-red-500">De tout ce que ce monde rejette, de tout ce que nous embrassons.</p>
        <p className="pb-6 text-red-600">De tout ce que vous occultez, de tout ce à quoi nous donnons une forme.</p>
        <p className="pb-7 text-red-700">De toutes les ténèbres que vous refusez.</p>
        <p className="text-red-800">Et du lourd fardeau qui nous incombe.</p>
    </div>
    <OeilDeLOcculte/>

    <p className="text-lg mt-12 text-center">Besoin d'un point de départ ? <A href="/article-aleatoire">Pourquoi ne pas essayer une page aléatoire ?</A></p>
    <Link href="/journal-d-anti-r/regard-fuyant" className="text-gray-700 text-center text-xl">...</Link>
    </>);
}