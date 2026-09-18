import Phaser from "phaser";
import {t} from "@/engine/core/translations/TranslationStore";

export interface SliderOptions {
    readonly width?: number;
    readonly trackHeight?: number;
    readonly handleRadius?: number;
    readonly trackColor?: number;
    readonly fillColor?: number;
    readonly handleColor?: number;
    readonly labelColor?: string;
    readonly fontSize?: string;
}

/**
 * Horizontal slider, calls on change while being dragged
 */
export class Slider extends Phaser.GameObjects.Container {
    private value: number;
    private readonly trackWidth: number;
    private readonly fill: Phaser.GameObjects.Rectangle;
    private readonly handle: Phaser.GameObjects.Arc;
    private readonly onChange: (value: number) => void;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        label: string,
        initialValue: number,
        onChange: (value: number) => void,
        options: SliderOptions = {},
    ) {
        super(scene, x, y);

        const {
            width = 240,
            trackHeight = 6,
            handleRadius = 12,
            trackColor = 0x2a2a2a,
            fillColor = 0x4ade80,
            handleColor = 0xffffff,
            labelColor = "#f5f5f5",
            fontSize = "16px",
        } = options;

        this.trackWidth = width;
        this.value = Phaser.Math.Clamp(initialValue, 0, 1);
        this.onChange = onChange;

        const labelText = new Phaser.GameObjects.Text(scene, 0, -22, t(label), {
            color: labelColor,
            fontSize,
        }).setOrigin(0, 0.5);

        const track = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, trackHeight, trackColor, 1)
            .setOrigin(0, 0.5);

        this.fill = new Phaser.GameObjects.Rectangle(scene, 0, 0, width * this.value, trackHeight, fillColor, 1)
            .setOrigin(0, 0.5);

        this.handle = new Phaser.GameObjects.Arc(scene, width * this.value, 0, handleRadius, 0, 360, false, handleColor, 1)
            .setInteractive({ useHandCursor: true, draggable: true });

        scene.input.setDraggable(this.handle);

        this.handle.on(Phaser.Input.Events.DRAG, (_pointer: Phaser.Input.Pointer, dragX: number) => {
            this.setValue(Phaser.Math.Clamp(dragX, 0, this.trackWidth) / this.trackWidth);
        });

        this.add([labelText, track, this.fill, this.handle]);
        scene.add.existing(this);
    }

    public getValue(): number {
        return this.value;
    }

    private setValue(value: number): void {
        this.value = Phaser.Math.Clamp(value, 0, 1);
        this.handle.x = this.trackWidth * this.value;
        this.fill.width = this.trackWidth * this.value;
        this.onChange(this.value);
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