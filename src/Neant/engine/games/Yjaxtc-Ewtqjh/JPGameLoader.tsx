"use client";

import {JPShooterGameRoot} from "@/components/roots/JPShooterGameRoot";
import {jpScenes} from "./JPSceneRegistry";

export default function JPGameLoader() {
    return <JPShooterGameRoot shooterScenes={jpScenes} />
}