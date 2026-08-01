import Phaser from "phaser";
import {TextButton} from "./TextButton";

export interface GameOverOverlayProps {
    readonly x: number;
    readonly y: number;
    readonly onRestart: () => void;
    readonly onQuit: () => void;
}

/**
 * Game over overlay component, showing a reset button and a quit button
 */
export class GameOverOverlay extends Phaser.GameObjects.Container {

    /**
     * Creates a new game over overlay
     * @param scene
     * @param props
     */
    constructor(scene: Phaser.Scene, props: GameOverOverlayProps) {
        super(scene, props.x, props.y);

        const backdrop = new Phaser.GameObjects.Rectangle(scene, 0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.72)
            .setOrigin(0.5);

        const title = new Phaser.GameObjects.Text(scene,0, -100, "GAME OVER", {
            fontSize: "96px",
            fontStyle: "normal",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center",
        }).setOrigin(0.5);

        const restartButton = TextButton.create(
            scene,
            0,
            50,
            "Recommencer",
            props.onRestart
        );

        const quitButton = TextButton.create(
            scene,
            0,
            150,
            "Quitter",
            props.onQuit
        );

        this.add([
            backdrop,
            title,
            restartButton,
            quitButton,
        ]);

        scene.add.existing(this);
        this.setDepth(1100);
        this.setScrollFactor(0);
    }

    override destroy(fromScene?: boolean): void {
        this.removeAllListeners();

        this.iterate((child: Phaser.GameObjects.GameObject) => {
            child.removeAllListeners();

            if ("disableInteractive" in child && typeof child.disableInteractive === "function") {
                child.disableInteractive();
            }
        });

        super.destroy(fromScene);
    }
}