import Phaser from "phaser";

export interface TextButtonOptions {
    readonly fontFamily?: string;
    readonly fontSize?: string;
    readonly defaultColor?: string;
    readonly hoverColor?: string;
    readonly backgroundColor?: string;
    readonly hoverBackgroundColor?: string;
    readonly paddingX?: number;
    readonly paddingY?: number;
    readonly stroke?: string;
    readonly strokeThickness?: number;
    readonly borderWidth?: number;
    readonly borderColor?: number;
    readonly borderAlpha?: number;
}

export class TextButton {
    public static create(
        scene: Phaser.Scene,
        x: number,
        y: number,
        label: string,
        onClick: () => void,
        options: TextButtonOptions = {},
    ): Phaser.GameObjects.Container {
        const {
            fontFamily = "Arial, sans-serif",
            fontSize = "47px",
            defaultColor = "#f5f5f5",
            hoverColor = "#ffffff",
            backgroundColor = "#111111",
            hoverBackgroundColor = "#2a2a2a",
            paddingX = 18,
            paddingY = 10,
            stroke = "#f5f5f5",
            strokeThickness = 0,
            borderWidth = 1,
            borderColor = 0xbbbbbb,
            borderAlpha = 0.74,
        } = options;

        const container = new Phaser.GameObjects.Container(scene, x, y);

        const text = new Phaser.GameObjects.Text(scene, 0, 0, label, {
            color: defaultColor,
            fontFamily,
            fontSize,
            padding: {
                x: paddingX,
                y: paddingY,
            },
            stroke,
            strokeThickness,
        }).setOrigin(0.5);

        const width = text.width;
        const height = text.height;

        const background = new Phaser.GameObjects.Rectangle(
            scene,
            0,
            0,
            width,
            height,
            Phaser.Display.Color.HexStringToColor(backgroundColor).color,
            1,
        )
            .setOrigin(0.5)
            .setStrokeStyle(borderWidth, borderColor, borderAlpha);

        const hitArea = new Phaser.GameObjects.Rectangle(
            scene,
            0,
            0,
            width,
            height,
            0x000000,
            0.001,
        )
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        hitArea.on(Phaser.Input.Events.POINTER_OVER, () => {
            text.setColor(hoverColor);
            background.setFillStyle(
                Phaser.Display.Color.HexStringToColor(hoverBackgroundColor).color,
                1,
            );
        });

        hitArea.on(Phaser.Input.Events.POINTER_OUT, () => {
            container.setScale(1);
            text.setColor(defaultColor);
            background.setFillStyle(
                Phaser.Display.Color.HexStringToColor(backgroundColor).color,
                1,
            );
        });

        hitArea.on(Phaser.Input.Events.POINTER_DOWN, () => {
            container.setScale(0.97);
        });

        hitArea.on(Phaser.Input.Events.POINTER_UP, () => {
            container.setScale(1);
            onClick();
        });

        container.add([
            background,
            text,
            hitArea,
        ]);

        scene.add.existing(container);

        return container;
    }
}