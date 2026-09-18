"use client";
import dynamic from "next/dynamic";

const JPGameLoader = dynamic(() => import("../../../engine/games/Yjaxtc-Ewtqjh/JPGameLoader"), {
    ssr: false
});

/**
 * Page component for the JP game
 * @constructor
 */
export default function YEGamePage() {
    return (
        <JPGameLoader />
    )
}