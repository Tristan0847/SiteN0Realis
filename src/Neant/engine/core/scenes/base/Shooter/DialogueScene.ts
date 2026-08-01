import {AnySceneProps, DialogueSceneProps} from "../props";
import {SceneAsset} from "../SceneAsset";
import {DialogueBox} from "@/engine/core/ui/shooter/DialogueBox";
import {DialogueTarget} from "@/engine/core/entities/shooter/DialogueTarget";
import {Projectile} from "@/engine/core/entities/shooter/Projectile";
import Phaser from "phaser";
import {AbstractShooterScene} from "@/engine/core/scenes/base/Shooter/AbstractShooterScene";

/**
 * Image slot for a dialogue (shows an image with a position and optional opacity)
 */
export interface DialogueImageSlot {
    readonly textureKey: string;
    readonly position: {
        readonly x: number;
        readonly y: number;
    }
    readonly width: number;
    readonly height: number;
    readonly opacity?: number;
}

/**
 * A section of the dialogue, with text and images
 * Optional transition, optional hp to reach the next section
 */
export interface DialogueSection {
    readonly speakerName: string;
    readonly text: string;
    readonly images: DialogueImageSlot[]|null; // Empty array : no image on screen, null : keep the same images as before
    readonly transition?: boolean;
    readonly currentTargetHp?: number;
}

/**
 * Props for an image in transition, with its targeted opacity
 */
interface DialogueImage {
    image : Phaser.GameObjects.Image;
    baseOpacity : number;
}

/**
 * Dialogue scene to manage dialogues
 */
export abstract class DialogueScene extends AbstractShooterScene {
    readonly props: DialogueSceneProps;
    protected readonly sections: DialogueSection[] = [];
    protected currentSectionIndex: number = 0;

    protected dialogueBox!: DialogueBox;
    protected dialogueTarget!: DialogueTarget;

    private readonly baseTargetHp: number = 15;
    private advancingSection : boolean = true;
    protected sectionImages: DialogueImage[] = [];

    protected transitioning : boolean = false;
    protected transitionInitialHp: number = 0;
    protected transitionImages : DialogueImage[] = [];
    protected transitionDialogueBox!: DialogueBox;
    private transitionKeepsCurrentImages = false;

    protected constructor(
        props: AnySceneProps,
        sections: DialogueSection[] = [],
        assets?: SceneAsset[]
    ) {
        if (props.type !== "dialogue") {
            throw new Error("Invalid scene type");
        }

        assets = assets || [];
        assets.push({
            src: "/assets/games/shooter/next.png",
            key: "next-dialogue",
            type: "image",
            pixelArt: true
        });

        super(props, assets, {x: 36, y: 670});
        this.props = props as DialogueSceneProps;
        this.sections = sections;
        this.currentSectionIndex = 0;
    }

    override create(): void {
        super.create();

        this.currentSectionIndex = 0;
        this.advancingSection = false;
        this.sectionImages = [];
        this.transitioning = false;
        this.transitionInitialHp = 0;
        this.transitionImages = [];
        this.transitionKeepsCurrentImages = false;

        this.dialogueBox = new DialogueBox(this);
        this.dialogueTarget = new DialogueTarget(this, this.scale.width - 85, 125, this.baseTargetHp, 40, 30);
        this.dialogueTarget.setDepth(402);
        this.transitionDialogueBox = new DialogueBox(this);
        this.transitionDialogueBox.setAlpha(0);
        this.dialogueBox.setDepth(400);
        this.transitionDialogueBox.setDepth(401);

        this.player.setDepth(403);
        this.playerProjectilePool.setDepth(403);
        this.playerHud.setDepth(403);

        // Adds collision masks (between the dialogue target and the player's projectiles)
        this.addCollisionMask(
            this.playerProjectilePool,
            this.dialogueTarget,
            DialogueTarget,
            (projectile, target) => this.handleTargetHit(projectile, target)
        );

        this.showCurrentSection();
    }

    override shutdown(): void {
        this.sectionImages = this.clearImages(this.sectionImages);
        this.transitionImages = this.clearImages(this.transitionImages);
        this.dialogueBox?.destroy();
        this.transitionDialogueBox?.destroy();
        this.dialogueTarget?.destroy();

        this.advancingSection = true;
        this.transitioning = false;
        this.transitionInitialHp = 0;
        this.currentSectionIndex = 0;
        this.transitionKeepsCurrentImages = false;

        super.shutdown();
    }

    //#region Handle target hit
    /**
     * Method to manage the hit of a target
     * @param projectile
     * @param target
     * @private
     */
    private handleTargetHit(projectile : Projectile, target : DialogueTarget): void {
        // Does nothing if the section is advancing
        if (this.advancingSection) {
            projectile.deactivate();
            return;
        }

        target.takeDamage(projectile.getDamage());
        projectile.deactivate();

        this.updateTransitionOpacity();

        if (target.isDead()) {
            this.advancingSection = true;

            // Empties the current pool to prevent from skipping to another dialogue by mistake
            this.playerProjectilePool.deactivateAll();

            this.advanceSection();
        }
    }

    /**
     * Method called to manage the transition for a bullet
     * @private
     */
    private updateTransitionOpacity(): void {
        if (!this.transitioning || this.transitionInitialHp <= 0) {
            return;
        }

        const progress = Phaser.Math.Clamp(
            1 - this.dialogueTarget.getCurrentHp() / this.transitionInitialHp,
            0,
            1,
        );

        const currentMultiplier = 1 - progress;
        const nextMultiplier = progress;

        if (!this.transitionKeepsCurrentImages) {
            for (const imageProps of this.sectionImages) {
                imageProps.image.setAlpha(
                    imageProps.baseOpacity * currentMultiplier,
                );
            }
        }

        this.dialogueBox.setAlpha(currentMultiplier);

        for (const imageProps of this.transitionImages) {
            imageProps.image.setAlpha(
                imageProps.baseOpacity * nextMultiplier,
            );
        }

        this.transitionDialogueBox.setAlpha(nextMultiplier);
    }

    //#endregion

    //#region Sections

    /**
     * Shows the current section
     * @protected
     */
    protected showCurrentSection(): void {
        const section = this.sections[this.currentSectionIndex];

        if (!section) {
            this.emitSceneEvent("LOAD_SCENE", this.props.nextSceneId);
            return;
        }

        const nextSection = this.sections[this.currentSectionIndex + 1];

        this.transitionImages = this.clearImages(this.transitionImages);

        this.dialogueBox.setAlpha(1);
        this.transitionDialogueBox.setAlpha(0);

        this.dialogueBox.setDialogue(
            section.speakerName,
            section.text,
        );

        this.transitioning = section.transition === true
            && nextSection !== undefined;
        this.transitionKeepsCurrentImages = this.transitioning && nextSection.images === null;

        const baseHp = section.currentTargetHp ?? this.baseTargetHp;

        this.transitionInitialHp = this.transitioning
            ? baseHp * 3
            : baseHp;

        this.dialogueTarget.setHp(this.transitionInitialHp);

        if (section.images !== null) {
            this.sectionImages = this.clearImages(this.sectionImages);

            for (const imageProps of section.images) {
                this.sectionImages.push(this.addImage(imageProps));
            }
        }

        if (this.transitioning) {
            this.transitionDialogueBox.setDialogue(
                nextSection.speakerName,
                nextSection.text,
            );

            if (nextSection.images !== null) {
                for (const imageProps of nextSection.images) {
                    this.transitionImages.push(this.addImage(imageProps, 0));
                }
            }
        }

        this.advancingSection = false;
    }

    /**
     * Adds an image on screen and return its instance
     * @param imageProps
     * @param baseOpacity
     * @private
     */
    private addImage(imageProps : DialogueImageSlot, baseOpacity : number|null = null): DialogueImage {
        const image = this.add.image(imageProps.position.x, imageProps.position.y, imageProps.textureKey);
        image.setAlpha((baseOpacity !== null) ? baseOpacity : imageProps.opacity ?? 1);
        image.setDisplaySize(imageProps.width, imageProps.height);

        return {
            image,
            baseOpacity: imageProps.opacity ?? 1
        };
    }

    /**
     * Advances to the next section, next scene if no more sections
     * @protected
     */
    protected advanceSection(): void {
        if (this.currentSectionIndex >= this.sections.length - 1) {
            this.goToNextScene();
            return;
        }

        if (this.transitioning) {
            this.sectionImages = this.transitionImages;
            this.transitionImages = [];
        }

        this.currentSectionIndex++;
        this.showCurrentSection();
    }

    /**
     * Method to clear the current images on the screen
     * @private
     */
    private clearImages(images : DialogueImage[]): DialogueImage[] {
        for (const image of images) {
            image.image.destroy();
        }

       return [];
    }
}