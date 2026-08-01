import {BaseScene} from "./BaseScene";
import {MenuSceneProps} from "./props";
import {SceneAsset} from "./SceneAsset";
import {TextButton} from "@/engine/core/ui/TextButton";
import Phaser from "phaser";
import {GameState, MenuSceneEventTypes, SceneEvent} from "@/engine/core/types";

/**
 * Menu scene
 */
export abstract class MenuScene extends BaseScene<GameState, SceneEvent<MenuSceneEventTypes>> {
    readonly props: MenuSceneProps;
    private canResetSave : boolean = false;

    private joinBtn!: Phaser.GameObjects.Container;
    private resetBtn!: Phaser.GameObjects.Container;

    static readonly baseProps: Omit<MenuSceneProps, "id" | "nextSceneId" | "title" | "description" | "bgColor" | "audioPath"> = {
        type: "menu",
        save: false
    }

    protected constructor(
        title: string,
        nextSceneId : string,
        description? : string,
        id: string = 'root',
        bgColor : string = "000000",
        audioPath : string = "/assets/games/resonances-faibles.mp3",
        assets?: SceneAsset[]
    ) {
        const props : MenuSceneProps = {
            ...MenuScene.baseProps,
            id,
            title,
            description,
            nextSceneId,
            bgColor,
            audioPath,
        };

        super({ key: props.id }, props, assets);
        this.props = props;
    }

    override create(): void {
        super.create();

        const {width} = this.scale;

        let currentY = 128;

        // Centered title
        const titleText = this.add.text(
            width / 2,
            currentY,
            this.props.title,
            {
                align: "center",
                color: "#ffffff",
                fontSize: "32px"
            },
        );

        titleText.setOrigin(0.5, 0.5);
        currentY += 64;

        if (this.props.description) {
            const descriptionText = this.add.text(
                width / 2,
                currentY,
                this.props.description,
                {
                    align: "center",
                    color: "#ffffff",
                    fontSize: "18px",
                },
            );

            descriptionText.setOrigin(0.5, 0.5);

            // Moves the current Y depending on the description height
            currentY += descriptionText.height + 48;
        }

        this.joinBtn = TextButton.create(
            this,
            width / 2,
            currentY,
            "Rejoindre",
            () => {
                this.emitSceneEvent("LOAD_INITIAL_SCENE");
            },
        )

        this.resetBtn = TextButton.create(
            this,
            width / 2,
            currentY + 128,
            "Réinitialiser votre\nprogression.",
            () => {
                this.canResetSave && this.emitSceneEvent("RESET_SAVE");
            },
            {
                defaultColor: "#aa0000",
                hoverColor: "#ff6666",
                backgroundColor: "#111111",
                hoverBackgroundColor: "#1a1a1a",
                borderColor: 0x878787,
                borderAlpha: 0.47,
                fontSize: "24px",
            }
        );
        this.setCanResetSave(false);
        this.emitSceneEvent("MENU_READY");
    }

    override shutdown() {
        this.joinBtn?.destroy();
        this.resetBtn?.destroy();
        super.shutdown();
    }

    /**
     * Set if the reset save button should be visible and active
     * @param canResetSave
     */
    public setCanResetSave(canResetSave: boolean) {
        this.canResetSave = canResetSave;
        this.resetBtn?.setVisible(canResetSave);
        this.resetBtn?.setActive(canResetSave);
    }
}