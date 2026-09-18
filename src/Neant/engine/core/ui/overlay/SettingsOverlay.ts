import Phaser from "phaser";
import {TextButton} from "../TextButton";
import {Checkbox} from "../Checkbox";
import {Slider} from "../Slider";
import {gameSettingsStore} from "@/engine/core/settings/GameSettingsStore";
import {AudioBus} from "@/engine/core/audio/AudioBusEnum";
import {Language} from "@/engine/core/translations/types";
import {t} from "@/engine/core/translations/TranslationStore";

const BUS_LABELS: Partial<Record<AudioBus, string>> = {
    [AudioBus.MUSIC]: "music",
    [AudioBus.VOICE]: "voices",
    [AudioBus.EFFECTS]: "sfx",
    [AudioBus.VOID]: "void",
};

export interface SettingsOverlayProps {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    /** Reloads the scene or not once the modifications are saved, default at false, can be changed depending on the scene type (menu can be reloaded, game scene not by default) */
    readonly defaultReloadScene: boolean;
    readonly onSave: () => void;
    readonly onCancel: () => void;
    readonly onRequestReloadScene?: () => void;
}

/**
 * Settings overlay popup, callable from the main or pause menu
 */
export class SettingsOverlay extends Phaser.GameObjects.Container {
    private pendingLanguage: Language;
    private readonly pendingVolumes: Partial<Record<AudioBus, number>> = {};
    private pendingFullscreen: boolean;
    private readonly reloadCheckbox: Checkbox;

    constructor(scene: Phaser.Scene, props: SettingsOverlayProps) {
        super(scene, props.x, props.y);

        const settings = gameSettingsStore.getSettings();
        this.pendingLanguage = settings.language;
        this.pendingFullscreen = settings.fullscreen;

        const backdrop = new Phaser.GameObjects.Rectangle(
            scene, 0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.45,
        ).setOrigin(0.5);

        const panel = new Phaser.GameObjects.Rectangle(scene, 0, 0, props.width, props.height, 0x10141f, 0.95)
            .setStrokeStyle(2, 0xffffff, 0.2);

        const title = new Phaser.GameObjects.Text(scene, 0, -props.height / 2 + 40, t("common.settings.title"), {
            fontSize: "28px",
            color: "#ffffff",
        }).setOrigin(0.5);

        const elements: Phaser.GameObjects.GameObject[] = [backdrop, panel, title];

        // Language
        const currentLangText = new Phaser.GameObjects.Text(scene, 0, -props.height / 2 + 130, "", {
            fontSize: "16px",
            color: "#9ca3af",
        }).setOrigin(0.5);

        const refreshLangText = () => currentLangText.setText(t('common.settings.lang_selection') + ` : ${this.pendingLanguage.toUpperCase()}`);
        refreshLangText();

        const frButton = TextButton.create(scene, -80, -props.height / 2 + 90, "common.settings.fr", () => {
            this.pendingLanguage = "fr";
            refreshLangText();
        }, { fontSize: "20px" });

        const enButton = TextButton.create(scene, 80, -props.height / 2 + 90, "common.settings.en", () => {
            this.pendingLanguage = "en";
            refreshLangText();
        }, { fontSize: "20px" });

        elements.push(currentLangText, frButton, enButton);

        // --- Volumes audio (2 colonnes) ---
        const buses = Object.values(AudioBus);
        const halfWidth = props.width / 2;
        const colGap = 40;
        const leftX = -halfWidth + 60;
        const rightX = colGap;

        let cursorY = -props.height / 2 + 200;
        let colIndex = 0;

        for (const bus of buses) {
            this.pendingVolumes[bus] = gameSettingsStore.getBusVolume(bus);

            const x = colIndex % 2 === 0 ? leftX : rightX;
            const sliderWidth = props.width / 2 - 120;

            const slider = new Slider(
                scene,
                x,
                cursorY,
                "common.settings.audio." + (BUS_LABELS[bus] ?? bus),
                this.pendingVolumes[bus] as number,
                (value) => { this.pendingVolumes[bus] = value; },
                { width: sliderWidth, labelColor: bus === AudioBus.VOID ? "#080407" : undefined, fillColor: bus === AudioBus.VOID ? 0 : undefined },
            );

            elements.push(slider);

            if (colIndex % 2 === 1) {
                cursorY += 70;
            }
            colIndex++;
        }

        // Si nombre impair de sliders, avancer le curseur une dernière fois
        if (buses.length % 2 === 1) {
            cursorY += 70;
        }

        // Fulscreen
        const fullscreenCheckbox = new Checkbox(
            scene, leftX, cursorY + 10, "common.settings.fullscreen",
            this.pendingFullscreen,
            (checked) => { this.pendingFullscreen = checked; },
        );
        elements.push(fullscreenCheckbox);
        cursorY += 50;

        // Reloads scene on save
        this.reloadCheckbox = new Checkbox(
            scene, leftX, cursorY + 40,
            "common.settings.restart_on_save",
            props.defaultReloadScene,
            undefined,
            { fontSize: "14px" },
        );
        const activeReloadCheckbox = props.onRequestReloadScene !== undefined;
        this.reloadCheckbox.setVisible(activeReloadCheckbox);
        this.reloadCheckbox.setActive(activeReloadCheckbox);
        elements.push(this.reloadCheckbox);

        // Actions
        const saveButton = TextButton.create(
            scene, 0, props.height / 2 - 100, "common.save_and_quit",
            () => this.handleSave(scene, props),
            { fontSize: "20px" },
        );

        const cancelButton = TextButton.create(
            scene, 0, props.height / 2 - 40, "common.cancel",
            () => props.onCancel(),
            { fontSize: "18px" },
        );

        elements.push(saveButton, cancelButton);

        this.add(elements);
        scene.add.existing(this);

        this.setDepth(1100);
        this.setScrollFactor(0);
    }

    private handleSave(scene: Phaser.Scene, props: SettingsOverlayProps): void {
        gameSettingsStore.setLanguage(this.pendingLanguage);

        for (const [bus, volume] of Object.entries(this.pendingVolumes)) {
            gameSettingsStore.setBusVolume(bus as AudioBus, volume as number);
        }

        // Changes the fullscreen state
        const isCurrentlyFullscreen = scene.scale.isFullscreen;
        if (this.pendingFullscreen && !isCurrentlyFullscreen) {
            scene.scale.startFullscreen();
        } else if (!this.pendingFullscreen && isCurrentlyFullscreen) {
            scene.scale.stopFullscreen();
        }
        gameSettingsStore.setFullscreenPreference(this.pendingFullscreen);

        if (this.reloadCheckbox.isChecked() && props.onRequestReloadScene) {
            props.onRequestReloadScene();
        }

        props.onSave();
    }

    override destroy(fromScene?: boolean) {
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