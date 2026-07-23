import {BaseScene} from "./BaseScene";
import {AnySceneProps, DialogueSceneProps} from "./props";
import {SceneAsset} from "./SceneAsset";

/**
 * Image slot for a dialogue (shows an image with a position and optional opacity)
 */
export interface DialogueImageSlot {
    src: string;
    position: {
        x: number;
        y: number;
    }
    initialOpacity?: number;
}

/**
 * A section of the dialogue, with text and images
 * Optional transition with hp to reach the next section
 */
export interface DialogueSection {
    text: string;
    images: DialogueImageSlot[];
    transition?: {
        enabled: boolean;
        hp: number;
    }
}

/**
 * Dialogue scene to manage dialogues
 */
export abstract class DialogueScene extends BaseScene {
    readonly props: DialogueSceneProps;
    protected sections: DialogueSection[] = [];
    protected currentSectionIndex: number = 0;

    protected constructor(
        props: AnySceneProps,
        sections: DialogueSection[] = [],
        assets?: SceneAsset[]
    ) {
        if (props.type !== "dialogue") {
            throw new Error("Invalid scene type");
        }

        super({ key: props.id }, props, assets);
        this.props = props as DialogueSceneProps;
        this.sections = sections;
        this.currentSectionIndex = 0;
    }

    override create(): void {
        super.create();
        // TODO afficher la section initiale : texte image, opacité initiale
        this.showCurrentSection();
    }

    // #region Sections

    /**
     * Shows the current section
     * @protected
     */
    protected showCurrentSection(): void {
        const section = this.sections[this.currentSectionIndex];
        if (!section) {
            this.emitSceneEvent("SCENE_SUCCESS");
            return;
        }

        const { width, height } = this.scale;

        const text = this.add.text(width / 2, height / 2, section.text);
        text.setOrigin(0.5, 0.5);
        text.setAlign("center");
        text.setWordWrapWidth(width * 0.8);

        for (const imageSlot of section.images) {
            const image = this.add.image(imageSlot.position.x, imageSlot.position.y, imageSlot.src);
            if (imageSlot.initialOpacity) {
                image.setAlpha(imageSlot.initialOpacity);
            }
        }

        // TODO logique de transition
    }

    /**
     * Advances to the next section, next scene if no more sections
     * @protected
     */
    protected advanceSection(): void {
        if (this.currentSectionIndex < this.sections.length - 1) {
            this.currentSectionIndex++;
            this.clearWorld();
            this.showCurrentSection();
        } else {
            this.emitSceneEvent("SCENE_SUCCESS");
        }
    }

    // #endregion
}