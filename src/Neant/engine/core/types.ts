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
    | "SCENE_READY"
    | "LOAD_SCENE"
    | "RETURN_TO_MENU"
    | "RELOAD_SCENE"
    | "MENU_READY"
    | "GAME_ENDED";

/**
 * Menu scene types
 */
export type MenuSceneEventTypes = | DefaultSceneEventType | "RESET_SAVE" | "LOAD_INITIAL_SCENE";

export type AnySceneEventType = DefaultSceneEventType | MenuSceneEventTypes;

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
    E extends SceneEvent<string> = SceneEvent<DefaultSceneEventType>,
> {
    emit(event: E): void;
    getState(): Readonly<S>;
}