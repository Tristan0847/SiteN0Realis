import Phaser from "phaser";
import {TextButton} from "./TextButton";

export interface PauseOverlayProps {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly onResume: () => void;
    readonly onRestart: () => void;
    readonly onQuit: () => void;
}

/**
 * Pause overlay component
 */
export class PauseOverlay extends Phaser.GameObjects.Container {
    /**
     * Creates a new pause overlay
     * @param scene
     * @param props
     */
    constructor(scene: Phaser.Scene, props: PauseOverlayProps) {
        super(scene, props.x, props.y);

        const backdrop = new Phaser.GameObjects.Rectangle(scene, 0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.45)
            .setOrigin(0.5);

        const panel = new Phaser.GameObjects.Rectangle(scene,0, 0, props.width, props.height, 0x10141f, 0.95)
            .setStrokeStyle(2, 0xffffff, 0.2);

        const title = new Phaser.GameObjects.Text(scene, 0, -200, "Pause", {
            fontSize: "28px",
            color: "#ffffff",
        }).setOrigin(0.5);

        const resumeButton = TextButton.create(
            scene,
             0,
            -100,
            "Reprendre",
            props.onResume
        );

        const restartButton = TextButton.create(
            scene,
            0,
            0,
            "Recommencer",
            props.onRestart
        );

        const quitButton = TextButton.create(
            scene,
            0,
            100,
            "Quitter",
            props.onQuit
        );

        this.add([backdrop, panel, title, resumeButton, restartButton, quitButton]);

        scene.add.existing(this);

        this.setDepth(1000);
        this.setScrollFactor(0);
    }

    override destroy(fromScene?: boolean) {
        this.removeAllListeners();
        this.iterate((child : Phaser.GameObjects.GameObject) => {
            child.removeAllListeners();

            if ("disableInteractive" in child && typeof child.disableInteractive === "function") {
                child.disableInteractive();
            }
        })

        super.destroy(fromScene);
    }
}