import {BaseScene} from "./BaseScene";
import {AnySceneProps, ShooterSceneProps} from "./props";
import {SceneAsset} from "./SceneAsset";

/**
 * Scene defining a shooter page
 */
export abstract class ShooterScene extends BaseScene {
    readonly props: ShooterSceneProps;

    protected constructor(
        props: AnySceneProps,
        assets?: SceneAsset[]
    ) {
        if (props.type !== "shooter") {
            throw new Error("Invalid scene type");
        }

        super({ key: props.id }, props, assets);
        this.props = props as ShooterSceneProps;
    }

    override create(): void {
        super.create();

        // Instancier joueur

        // Instancier boss

        // Instancier HUD

        // Instancier Scrollbar du joueur

        // Lier scrollbar au joueur
    }

    /**
     * Called every frame to update the game state
     * @param time
     * @param delta
     */
    override update(time: number, delta: number): void {
        super.update(time, delta);
        // TODO logique de gameplay
    }

    override shutdown(): void {
        super.shutdown();
    }
}