import Phaser from "phaser";
import {TextButton} from "../TextButton";
import {SettingsOverlay} from "@/engine/core/ui/overlay/SettingsOverlay";
import {t} from "@/engine/core/translations/TranslationStore";

export interface PauseOverlayProps {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly onResume: () => void;
    readonly onRestart: () => void;
    readonly onQuit: () => void;
    readonly onRequestReloadScene?: () => void;
}

/**
 * Pause overlay component
 */
export class PauseOverlay extends Phaser.GameObjects.Container {

    private settingsOverlay: SettingsOverlay;
    private buttons: Phaser.GameObjects.Container[];

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

        const title = new Phaser.GameObjects.Text(scene, 0, -200, t("common.pause.title"), {
            fontSize: "28px",
            color: "#ffffff",
        }).setOrigin(0.5);

        this.settingsOverlay = new SettingsOverlay(scene, {
            x: 0,
            y: 0,
            width: 960,
            height: 620,
            defaultReloadScene: false, // ou true si la scène est un menu sans état de partie à perdre
            onSave: () => this.onSettingsChange(false),
            onCancel: () => this.onSettingsChange(false),
            onRequestReloadScene: props.onRequestReloadScene
        });
        this.settingsOverlay.setVisible(false);
        this.settingsOverlay.setActive(false);

        const resumeButton = TextButton.create(
            scene,
            0,
            -100,
            "common.pause.resume",
            props.onResume
        );

        const settingsButton = TextButton.create(
            scene,
            0,
            0,
            "common.settings.title",
            () => this.onSettingsChange(true)
        );

        const restartButton = TextButton.create(
            scene,
            0,
            100,
            "common.restart",
            props.onRestart
        );

        const quitButton = TextButton.create(
            scene,
            0,
            200,
            "common.quit",
            props.onQuit
        );

        this.buttons = [resumeButton, settingsButton, restartButton, quitButton];

        this.add([backdrop, panel, title, ...this.buttons, this.settingsOverlay]);

        scene.add.existing(this);

        this.setDepth(1000);
        this.setScrollFactor(0);
    }

    public onSettingsChange(activeOverlay: boolean): void {
        this.settingsOverlay.setActive(activeOverlay);
        this.settingsOverlay.setVisible(activeOverlay);

        this.buttons.forEach(button => {
            button.setActive(!activeOverlay);
            button.setVisible(!activeOverlay);
        });
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