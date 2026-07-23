"use client";
import { BaseGameRoot } from "./BaseGameRoot";
import { ShooterGameEngine, ShooterGameState, ShooterSceneEvent } from "@/engine/core/ShooterGameEngine";
import Phaser from "phaser";

interface ShooterGameRootProps {
    readonly shooterScenes: readonly (new () => Phaser.Scene)[];
}

/**
 * Shooter game component
 * @param shooterScenes Scenes to use
 * @constructor
 */
export function ShooterGameRoot({shooterScenes} : ShooterGameRootProps) {
    const createEngine = (game : Phaser.Game) =>
        new ShooterGameEngine(
            game,
            {
                initialSceneId: 'root', // scène initiale de ce shooter
                mainMenuId: "root", // menu principal
            }
        );

    return (
        <BaseGameRoot<ShooterGameState, ShooterSceneEvent>
            createEngine={createEngine}
            scenes={shooterScenes}
        />
    );
}