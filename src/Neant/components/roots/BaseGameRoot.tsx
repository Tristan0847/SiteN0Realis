"use client";

import { useEffect, useRef } from "react";
import type { AbstractGameEngine } from "@/engine/core/AbstractGameEngine";
import type { GameState, SceneEvent } from "@/engine/core/types";
import Phaser from "phaser";

const WIDTH = 1280;
const HEIGHT = 720;

interface BaseGameRootProps<S extends GameState, E extends SceneEvent> {
    readonly scenes: readonly (new () => Phaser.Scene)[];
    readonly createEngine: (game: Phaser.Game) => AbstractGameEngine<S, E>;
}

export function BaseGameRoot<S extends GameState, E extends SceneEvent>({ scenes, createEngine }: BaseGameRootProps<S, E>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Phaser.Game | null>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || initializedRef.current) return;
        initializedRef.current = true;

        const game = new Phaser.Game({
            parent: container,
            type: Phaser.AUTO,
            width: WIDTH,
            height: HEIGHT,

            // Arcade physics for 2D without gravity
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {
                        x: 0,
                        y: 0,
                    },
//                    debug: process.env.NODE_ENV === "development",
                    debug: false,
                }
            },

            scene: [],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: WIDTH,
                height: HEIGHT,
            },
            render: {
                antialias: true,
                antialiasGL: true,
                pixelArt: false,
                roundPixels: false,
            },
            input: {
                activePointers: 2
            },
        });

        gameRef.current = game;

        // Initialize the scenes
        game.events.once(Phaser.Core.Events.READY, () => {
            for (const SceneClass of scenes) {
                const scene = new SceneClass();
                const sceneId = scene.sys.settings.key;
                if (!sceneId) {
                    throw new Error(`The Phaser scene ${SceneClass.name} has no key, define one.`);
                }

                game.scene.add(sceneId, scene, false);
            }

            const engine = createEngine(game);
            engine.start();
        })

        return () => {
            game.destroy(true);
            gameRef.current = null;
            initializedRef.current = false;
        };
    }, [createEngine, scenes]);

    return (
        <main className="flex min-h-dvh w-full items-center justify-center overflow-hidden p-4">
            <section
                className="h-[66.666dvh] w-[66.666vw] min-h-56 min-w-72 overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl"
                aria-label="Game"
            >
                <div ref={containerRef} className="h-full w-full" />
            </section>
        </main>
    );
}