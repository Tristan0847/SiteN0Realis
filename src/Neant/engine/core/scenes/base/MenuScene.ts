import {BaseScene} from "./BaseScene";
import {MenuSceneProps} from "./props";
import {SceneAsset} from "./SceneAsset";
import {TextButton} from "@/engine/core/ui/TextButton";

/**
 * Menu scene
 */
export abstract class MenuScene extends BaseScene {
    readonly props: MenuSceneProps;

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

        const {width, height} = this.scale;

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
            currentY += descriptionText.height + 32;
        }

        TextButton.create(
            this,
            width / 2,
            currentY,
            "Rejoindre",
            () => {
                this.emitSceneEvent("LOAD_SCENE", this.props.nextSceneId);
            },
        )
    }
}