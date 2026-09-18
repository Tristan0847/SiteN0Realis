import Phaser from "phaser";
import {t} from "@/engine/core/translations/TranslationStore";

export interface CheckboxOptions {
    readonly size?: number;
    readonly boxColor?: number;
    readonly checkColor?: number;
    readonly borderColor?: number;
    readonly labelColor?: string;
    readonly fontSize?: string;
}

export class Checkbox extends Phaser.GameObjects.Container {
    private checked: boolean;
    private readonly checkMark: Phaser.GameObjects.Rectangle;
    private readonly onChange?: (checked: boolean) => void;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        label: string,
        initialChecked: boolean,
        onChange?: (checked: boolean) => void,
        options: CheckboxOptions = {},
    ) {
        super(scene, x, y);

        const {
            size = 24,
            boxColor = 0x111111,
            checkColor = 0x4ade80,
            borderColor = 0xbbbbbb,
            labelColor = "#f5f5f5",
            fontSize = "16px",
        } = options;

        this.checked = initialChecked;
        this.onChange = onChange;

        const box = new Phaser.GameObjects.Rectangle(scene, 0, 0, size, size, boxColor, 1)
            .setStrokeStyle(1, borderColor, 0.8)
            .setOrigin(0, 0.5);

        const padding = size * 0.2;
        this.checkMark = new Phaser.GameObjects.Rectangle(
            scene, padding, 0, size - padding * 2, size - padding * 2, checkColor, 1,
        ).setOrigin(0, 0.5).setVisible(this.checked);

        const text = new Phaser.GameObjects.Text(scene, size + 12, 0, t(label), {
            color: labelColor,
            fontSize,
            wordWrap: { width: 480 },
        }).setOrigin(0, 0.5);

        const hitArea = new Phaser.GameObjects.Rectangle(
            scene, 0, 0, size + 12 + text.width, Math.max(size, text.height), 0x000000, 0.001,
        ).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });

        hitArea.on(Phaser.Input.Events.POINTER_UP, () => this.toggle());

        this.add([box, this.checkMark, text, hitArea]);
        scene.add.existing(this);
    }

    private toggle(): void {
        this.checked = !this.checked;
        this.checkMark.setVisible(this.checked);
        this.onChange?.(this.checked);
    }

    public isChecked(): boolean {
        return this.checked;
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