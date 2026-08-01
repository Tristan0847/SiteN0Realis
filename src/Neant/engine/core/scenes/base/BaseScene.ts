import {AnySceneProps} from "./props";
import {DefaultSceneEventType, GAME_CONTEXT_REGISTRY_KEY, GameContext, GameState, SceneEvent} from "../../types";
import Phaser from "phaser";
import SettingsConfig = Phaser.Types.Scenes.SettingsConfig;
import {SceneAsset} from "./SceneAsset";
import {withAssetPrefix} from "@lib/utils/withAssetPrefix";

/**
 * Base scene for the application, can implement :<br/>
 * - create : called when the scene is created<br/>
 * - shutdown : called when the scene is shutdown<br/>
 * - preload : called before a scene is created, preloads the assets (give an asset list to the constructor to preload, can be override if needed)<br/>
 * - update : called every frame to update the game state<br/>
 */
export abstract class BaseScene<
    S extends GameState = GameState,
    E extends SceneEvent<string> = SceneEvent<DefaultSceneEventType>
> extends Phaser.Scene {
    //#region Attributes/properties
    readonly props: AnySceneProps;
    protected gameContext!: GameContext<S, E>;
    protected readonly assets?: SceneAsset[];

    protected readonly bgMusicKey?: string;
    protected readonly bgMusicSource?: string;

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
            this.bgMusicKey = `bgmusic:${props.id}`;
            this.bgMusicSource = withAssetPrefix(props.audioPath);

            assets = assets || [];
            assets.push({
                type: "audio",
                key: this.bgMusicKey,
                src: props.audioPath
            });
        }

        // Prefixes the assets
        assets?.forEach((asset) => {
            asset.src = withAssetPrefix(asset.src);
        })

        this.assets = assets;
    }

    /**
     * Returns the background music source
     */
    public getBackgroundMusicSource(): string | undefined {
        return this.props.audioPath || undefined;
    }

    /**
     * Returns the background music key
     */
    public getBackgroundMusicKey(): string | undefined {
        return this.bgMusicKey;
    }

    /**
     * Returns true if the scene must be saved
     */
    public getSave(): boolean {
        return this.props.save;
    }

    //#endregion

    //#region Scene lifecycle
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

        this.load.xhr.headers = {
            headers: {
                "Cache-Control": "no-cache"
            }
        };

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

        // Creates the shutdown event listener
        this.events.once(
            Phaser.Scenes.Events.SHUTDOWN,
            this.shutdown,
            this,
        );

        this.emitSceneEvent("SCENE_READY");
    }

    /**
     * Shutdown function, called when the scene gets removed from the process
     */
    shutdown(): void {
        this.clearWorld();
    }
    // #endregion

    // #region Scene configuration
    /**
     * Sets the pixel art filter for the scene
     * @protected
     */
    protected setPixelArtFilter(): void {
        if (this.assets) {
            for (const asset of this.assets) {
                if (asset.type !== "image" || !asset.pixelArt) {
                    continue;
                }

                this.textures
                    .get(asset.key)
                    .setFilter(Phaser.Textures.FilterMode.NEAREST);
            }
        }
    }
    /**
     * Applies the base background color
     * @protected
     */
    protected applyBackgroundColor(): void {
        const color = this.props.bgColor || "000000";
        this.cameras.main.setBackgroundColor(`#${color}`);
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

    protected endGame(): void {
        this.emitSceneEvent("GAME_ENDED");
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