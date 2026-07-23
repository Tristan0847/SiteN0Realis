import {AnySceneProps} from "./props";
import {GAME_CONTEXT_REGISTRY_KEY, GameContext, GameState, SceneEvent} from "../../types";
import Phaser from "phaser";
import SettingsConfig = Phaser.Types.Scenes.SettingsConfig;
import {SceneAsset} from "./SceneAsset";

/**
 * Base scene for the application, can implement :<br/>
 * - create : called when the scene is created<br/>
 * - shutdown : called when the scene is shutdown<br/>
 * - preload : called before a scene is created, preloads the assets (give an asset list to the constructor to preload, can be override if needed)<br/>
 * - update : called every frame to update the game state<br/>
 */
export abstract class BaseScene<
    S extends GameState = GameState,
    E extends SceneEvent = SceneEvent
> extends Phaser.Scene {
    readonly props: AnySceneProps;
    protected gameContext!: GameContext<S, E>;
    protected readonly assets?: SceneAsset[];
    private backgroundMusic?: Phaser.Sound.BaseSound;
    protected readonly bgMusicKey = "background-music";

    /**
     * Constructor
     * @param config Phaser SceneConfig
     * @param props Scene props
     * @param assets
     */
    protected constructor(
        config: SettingsConfig,
        props: AnySceneProps,
        assets?: SceneAsset[]
    ) {
        super(config);
        this.props = props;

        if (props.audioPath && props.audioPath !== "") {
            assets = assets || [];
            assets.push({
                type: "audio",
                key: this.bgMusicKey,
                src: props.audioPath
            });
        }

        this.assets = assets;
    }

    // #region Scene lifecycle
    /**
     * Called when the scene is created
     */
    init(): void {
        const context = this.registry.get(GAME_CONTEXT_REGISTRY_KEY);

        if (!context) {
            throw new Error("Game context is missing, call engine.start() before starting a scene.");
        }

        this.gameContext = context as GameContext<S, E>;
    }

    /**
     * Preload function, called before a scene is created, preloads the assets
     */
    preload(): void {
        // No preload if no assets
        if (!this.assets || this.assets.length === 0) return;

        for (const asset of this.assets) {
            switch (asset.type) {
                case "image":
                    this.load.image(asset.key, asset.src);
                    break;

                case "audio":
                    this.load.audio(asset.key, asset.src);
                    break;
            }
        }

    }

    /**
     * Create function, called when the scene is created
     */
    create(): void {
        this.applyBackgroundColor();
        this.playBackgroundMusic();

        // Creates the shutdown event listener
        this.events.once(
            Phaser.Scenes.Events.SHUTDOWN,
            this.shutdown,
            this,
        );
    }

    /**
     * Shutdown function, called when the scene gets removed from the process
     */
    shutdown(): void {
        this.stopBackgroundMusic();
        this.clearWorld();
    }
    // #endregion

    // #region Scene configuration

    /**
     * Applies the base background color
     * @protected
     */
    protected applyBackgroundColor(): void {
        const color = this.props.bgColor || "000000";
        this.cameras.main.setBackgroundColor(`#${color}`);
    }

    /**
     * Plays the background music
     * @protected
     */
    protected playBackgroundMusic(): void {
        if (!this.props.audioPath) return;

        // Stops the current music before playing a new one
        this.stopBackgroundMusic();

        this.backgroundMusic = this.sound.add(this.bgMusicKey, {
            loop: true,
        });

        this.backgroundMusic.play();
    }

    /**
     * Stops the background music
     * @protected
     */
    protected stopBackgroundMusic(): void {
        this.backgroundMusic?.stop();
        this.backgroundMusic?.destroy();
        this.backgroundMusic = undefined;
    }

    /**
     * Clears the world to setup a new one
     * @protected
     */
    protected clearWorld(): void {
        this.children.removeAll(true);
    }
    // #endregion

    /**
     * Sends an event to the engine
     * @param type
     * @param sceneId
     * @param data
     * @protected
     */
    protected emitSceneEvent(type: E['type'], sceneId?: string, data?: unknown): void {
        if (this.gameContext) {
            this.gameContext.emit({ type, sceneId, data } as E);
        }
    }

    /**
     * Goes to the next scene if the current scene has one
     * @param data Optional data to pass to the next scene
     * @protected
     */
    protected goToNextScene(data: unknown = null): void {
        if (this.props.nextSceneId) {
            this.emitSceneEvent("LOAD_SCENE" as E['type'], this.props.nextSceneId, data);
        }
    }
}