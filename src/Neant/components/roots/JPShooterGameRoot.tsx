"use client";
import { BaseGameRoot } from "./BaseGameRoot";
import { ShooterGameState, ShooterSceneEvent } from "@/engine/core/ShooterGameEngine";
import Phaser from "phaser";
import {NeantCookies} from "@lib/storage/cookies/neant";
import {useState} from "react";
import {CenteredLink} from "@/components/CenteredLink";
import {JPGameEngine} from "@/engine/games/Yjaxtc-Ewtqjh/JPGameEngine";

interface ShooterGameRootProps {
    readonly shooterScenes: readonly (new () => Phaser.Scene)[];
}

/**
 * Shooter game component
 * @param shooterScenes Scenes to use
 * @constructor
 */
export function JPShooterGameRoot({shooterScenes} : ShooterGameRootProps) {
    const [gameEnded, setGameEnded] = useState<boolean>(false);


    const createEngine = (game : Phaser.Game) =>
        new JPGameEngine(
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