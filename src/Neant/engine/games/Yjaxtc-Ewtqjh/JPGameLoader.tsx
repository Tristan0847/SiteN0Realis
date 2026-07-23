"use client";

import {ShooterGameRoot} from "@/components/roots/ShooterGameRoot";
import {jpScenes} from "./JPSceneRegistry";

export default function JPGameLoader() {
    return <ShooterGameRoot shooterScenes={jpScenes} />
}