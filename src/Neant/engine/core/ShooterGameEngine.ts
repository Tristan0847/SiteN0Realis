import {
    AbstractGameEngine,
    GameEngineConfig,
} from "./AbstractGameEngine";
import type { GameState, SceneEvent } from "./types";

export interface ShooterGameState extends GameState {
    // à compléter plus tard (score, vies, etc.)
}

export type ShooterSceneEvent = SceneEvent;


/**
 * SHOOTER GAME ENGINE
 */
export class ShooterGameEngine extends AbstractGameEngine<
    ShooterGameState,
    ShooterSceneEvent
> {
    /**
     * Constructor
     * @param game
     * @param config
     * @param onGameEnded
     * @param persistenceKey
     */
    constructor(
        game: Phaser.Game,
        config: GameEngineConfig,
        onGameEnded : () => void,
        persistenceKey : string|undefined = undefined
    ) {
        const initialState: ShooterGameState = {};

        super(game, config, initialState, onGameEnded, persistenceKey);
    }

    protected handleSceneEvent(
        event: ShooterSceneEvent,
        state: Readonly<ShooterGameState>
    ): void {
        // Empty
    }
}