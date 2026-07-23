/**
 * Game state interface, extended depending on the game
 */
export interface GameState {
    // Empty or extended depending on the game
}

/**
 * Default scene types, can be extended depending on the game
 */
export type DefaultSceneEventType =
    | "LOAD_SCENE"
    | "RETURN_TO_MENU"
    | "RELOAD_SCENE";

/**
 * Base event the scenes can throw to the engine
 */
export interface SceneEvent<T extends string = DefaultSceneEventType> {
    type: T;
    sceneId?: string;
    data?: unknown;
}

/**
 * Internal Phaser key to use for the game context registry
 */
export const GAME_CONTEXT_REGISTRY_KEY = "__game_context__";

/**
 * Game context interface, used by each scene to emit events and get the game state
 */
export interface GameContext<
    S extends GameState = GameState,
    E extends SceneEvent = SceneEvent,
> {
    emit(event: E): void;
    getState(): Readonly<S>;
}