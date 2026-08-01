import {GameState, SceneEvent, GameContext, GAME_CONTEXT_REGISTRY_KEY, AnySceneEventType} from "./types";
import {ScenePersistence} from "./ScenePersistence";
import {Game} from "phaser";
import {BaseScene} from "@/engine/core/scenes/base/BaseScene";
import {MenuScene} from "@/engine/core/scenes/base/MenuScene";
import {BackgroundMusicManager} from "@/engine/core/BackgroundMusicManager";

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
    E extends SceneEvent<string> = SceneEvent<AnySceneEventType>
> {
    // #region Properties/Constructor
    protected readonly game: Game;
    protected readonly config : Readonly<GameEngineConfig>;
    protected state : S;

    private readonly context : GameContext<S, E>;
    private readonly persistence : ScenePersistence;
    private readonly backgroundMusicManager : BackgroundMusicManager;

    private currentSceneId : string|null = null;
    private started : boolean = false;

    /**
     * Callback to call when the game is over
     * @private
     */
    private onGameEnded : () => void;

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
     * @param onGameEnded
     * @param persistenceKey
     * @protected
     */
    protected constructor(
        game: Game,
        config: GameEngineConfig,
        initialState: S,
        onGameEnded : () => void,
        persistenceKey : string|undefined = undefined,
    ) {
        this.game = game;
        this.config = config;
        this.state = initialState;
        this.persistence = new ScenePersistence(persistenceKey);
        this.backgroundMusicManager = new BackgroundMusicManager(
            game.sound
        );
        this.onGameEnded = onGameEnded;

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

            case "LOAD_INITIAL_SCENE":
                this.loadInitialScene();
                break;

            case "RESET_SAVE":
                this.resetSave();
                break;

            case "MENU_READY":
                this.setCanResetSave();
                break;

            case "SCENE_READY":
                this.onSceneReady();
                break;

            case "RETURN_TO_MENU":
                this.returnToMenu();
                break;

            case "RELOAD_SCENE":
                this.reloadCurrentScene();
                break;

            case "GAME_ENDED":
                this.onGameEnded();
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

        // If the scene is already active, do nothing
        if (this.currentSceneId === sceneId) {
            return;
        }

        const previousSceneId = this.currentSceneId;
        this.currentSceneId = sceneId;

        if (previousSceneId) {
            this.game.scene.stop(previousSceneId);
        }

        this.game.scene.start(sceneId, data as object);
        this.currentSceneId = sceneId;

        // Checks if the current scene must be saved or not
        const scene = this.game.scene.getScene(sceneId) as BaseScene;

        if (scene && scene.getSave()) {
            this.persistence.save(sceneId);
        }
    }

    protected onSceneReady(): void {
        if (!this.currentSceneId) return;

        const scene = this.game.scene.getScene(this.currentSceneId) as BaseScene;
        this.backgroundMusicManager.play(
            scene.getBackgroundMusicSource(),
            scene.getBackgroundMusicKey(),
            scene.tweens,
        );
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

        this.game.scene.stop(this.currentSceneId);
        this.game.scene.start(this.currentSceneId);
    }
    //#endregion

    //#region Save management

    /**
     * Sets the save reset button visibility
     * @protected
     */
    protected setCanResetSave(): void {
        if (!this.currentSceneId || this.currentSceneId !== this.config.mainMenuId) {
            return;
        }

        const savedSceneId = this.persistence.load();
        const canReset = (savedSceneId !== null) && savedSceneId !== this.config.initialSceneId;

        const scene = this.game.scene.getScene(this.currentSceneId) as MenuScene;
        scene.setCanResetSave(canReset);
    }

    /**
     * Resets the save
     * @protected
     */
    protected resetSave(): void {
        if (!this.currentSceneId) {
            return;
        }

        this.persistence.clear();

        // Makes the button hidden after reset
        const scene = this.game.scene.getScene(this.currentSceneId) as MenuScene;
        scene.setCanResetSave(false);
    }


    //#endregion
}