"use client";
import { BaseGameRoot } from "./BaseGameRoot";
import { ShooterGameEngine, ShooterGameState, ShooterSceneEvent } from "@/engine/core/ShooterGameEngine";
import Phaser from "phaser";
import {NeantCookies} from "@lib/storage/cookies/neant";
import {useState} from "react";
import {CenteredLink} from "@/components/CenteredLink";

interface ShooterGameRootProps {
    readonly shooterScenes: readonly (new () => Phaser.Scene)[];
}

/**
 * Shooter game component
 * @param shooterScenes Scenes to use
 * @constructor
 */
export function ShooterGameRoot({shooterScenes} : ShooterGameRootProps) {
    const [gameEnded, setGameEnded] = useState<boolean>(false);


    const createEngine = (game : Phaser.Game) =>
        new ShooterGameEngine(
            game,
            {
                initialSceneId: 'jp-dialog-0', // scène initiale de ce shooter
                mainMenuId: "root", // menu principal
            },
            () => setGameEnded(true),
            NeantCookies.jp.currentScene,
        );

    return (
        !gameEnded ?
            <BaseGameRoot<ShooterGameState, ShooterSceneEvent>
                createEngine={createEngine}
                scenes={shooterScenes}
            />
        :
            <CenteredLink href={process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + "/memento/jp" : "/memento/jp"}>
                Les dernières résonances de JP...
            </CenteredLink>
    );
}