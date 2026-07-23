import {GameState, SceneEvent, GameContext, GAME_CONTEXT_REGISTRY_KEY} from "./types";
import {ScenePersistence} from "./ScenePersistence";
import {Game} from "phaser";

/**
 * Game engine configuration
 */
export interface GameEngineConfig {
    initialSceneId: string;
    mainMenuId?: string;
}

/**
 * Generic game engine
 */
export abstract class AbstractGameEngine<
    S extends GameState,
    E extends SceneEvent
> {
    // #region Properties/Constructor
    protected readonly game: Game;
    protected readonly config : Readonly<GameEngineConfig>;
    protected state : S;

    private readonly context : GameContext<S, E>;
    private readonly persistence : ScenePersistence;

    private currentSceneId : string|null = null;
    private started : boolean = false;

    /**
     * Returns the game state in readonly (no way to modify it from a scene, needs an emitEvent call)
     */
    getState(): Readonly<S> {
        return this.state;
    }

    /**
     * State setter
     * @param newState
     */
    setState(newState: S): void {
        this.state = newState;
    }

    /**
     * Game constructor (abstract, to inherit)
     * @param game Game instance
     * @param config Game configuration
     * @param initialState Initial state of the game, with default values (default player HP, boss HP, ...)
     * @param persistence Scene persistence manager
     * @protected
     */
    protected constructor(
        game: Game,
        config: GameEngineConfig,
        initialState: S,
        persistence: ScenePersistence = new ScenePersistence(),
    ) {
        this.game = game;
        this.config = config;
        this.state = initialState;
        this.persistence = persistence;

        this.assertSceneExists(config.initialSceneId);
        if (config.mainMenuId) {
            this.assertSceneExists(config.mainMenuId);
        }

        this.context = {
            emit: (event : E): void => this.dispatchSceneEvent(event),
            getState: () => this.state,
        }
    }
    // #endregion


    /**
     * Starts the game (menu or initial/saved scene)
     */
    start(): void {
        // Starts only if not started yet (secures against multiple calls)
        if (this.started) {
            return;
        }

        // Sets the game context registry, for scenes to access the emitEvent and context
        this.game.registry.set(GAME_CONTEXT_REGISTRY_KEY, this.context);
        this.started = true;

        if (this.config.mainMenuId) {
            this.loadScene(this.config.mainMenuId);
        } else {
            this.loadInitialScene();
        }
    }

    /**
     * Scene event dispatcher, to pass an event from the scene to the engine (flag manager)
     */
    dispatchSceneEvent(event: E): void {
        switch (event.type) {
            case "LOAD_SCENE":
                if (!event.sceneId) {
                    throw new Error("Missing parameter 'sceneId' to the 'LOAD_SCENE' call");
                }
                this.loadScene(event.sceneId, event.data);
                break;

            case "RETURN_TO_MENU":
                this.returnToMenu();
                break;

            case "RELOAD_SCENE":
                this.reloadCurrentScene();
                break;

            default:
                this.handleSceneEvent(event, this.getState());
                break;
        }
    }

    /**
     * To implement for each game : transforms the event in a list of actions
     * @param event
     * @param state
     * @protected
     */
    protected abstract handleSceneEvent(event: E, state: Readonly<S>): void;

    // #region Scene handlers

    /**
     * Throws an error if the required scene does not exist
     * @param sceneId
     * @private
     */
    private assertSceneExists(sceneId: string): void {
        if (!this.game.scene.keys[sceneId]) {
            throw new Error(`Unknown Phaser scene ${sceneId}`);
        }
    }

    /**
     * Loads the initial scene (saved or initial)
     * @protected
     */
    protected loadInitialScene(): void {
        const savedSceneId = this.persistence.load();
        const sceneId = (savedSceneId && this.game.scene.keys[savedSceneId]) ? savedSceneId : this.config.initialSceneId;

        this.loadScene(sceneId);
    }

    /**
     *
     * @param sceneId
     * @param data
     * @protected
     */
    protected loadScene(sceneId: string, data?: unknown): void {
        this.assertSceneExists(sceneId);

        const scene = this.game.scene.getScene(sceneId);

        // If the scene is already active, do nothing
        if (scene.sys.isActive()) {
            return;
        }

        this.game.scene.start(sceneId, data as object);
        this.currentSceneId = sceneId;
    }

    /**
     * Returns to the main menu
     * @protected
     */
    protected returnToMenu(): void {
        if (this.config.mainMenuId) {
            this.loadScene(this.config.mainMenuId);
        }
    }

    /**
     * Reloads the current scene
     * @protected
     */
    protected reloadCurrentScene(): void {
        if (!this.currentSceneId) {
            return;
        }

        this.game.scene.start(this.currentSceneId);
    }
    // #endregion
}