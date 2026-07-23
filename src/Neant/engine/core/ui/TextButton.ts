import Phaser from "phaser";

/**
 * Text button options (hover color, font family, size, color, padding, ...)
 */
export interface TextButtonOptions {
    readonly fontFamily?: string;
    readonly fontSize?: string;
    readonly defaultColor?: string;
    readonly hoverColor?: string;
    readonly backgroundColor?: string;
    readonly hoverBackgroundColor?: string;
    readonly paddingX?: number;
    readonly paddingY?: number;
}

/**
 * UI class to create a text button
 */
export class TextButton {

    /**
     * Creates a text button
     * @param scene Scene to add the button to
     * @param x
     * @param y
     * @param label
     * @param onClick
     * @param options
     */
    static create(
        scene: Phaser.Scene,
        x: number,
        y: number,
        label: string,
        onClick: () => void,
        options: TextButtonOptions = {},
    ): Phaser.GameObjects.Text {
        const {
            fontFamily = "Arial, sans-serif",
            fontSize = "28px",
            defaultColor = "#f5f5f5",
            hoverColor = "#ffffff",
            backgroundColor = "#111111",
            hoverBackgroundColor = "#2a2a2a",
            paddingX = 18,
            paddingY = 10,
        } = options;

        const button = scene.add
            .text(x, y, label, {
                color: defaultColor,
                fontFamily,
                fontSize,
                backgroundColor,
                padding: {
                    x: paddingX,
                    y: paddingY,
                },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        button.on(Phaser.Input.Events.POINTER_OVER, () => {
            button.setStyle({
                color: hoverColor,
                backgroundColor: hoverBackgroundColor,
            });
        });

        button.on(Phaser.Input.Events.POINTER_OUT, () => {
            button.setScale(1);
            button.setStyle({
                color: defaultColor,
                backgroundColor,
            });
        });

        button.on(Phaser.Input.Events.POINTER_DOWN, () => {
            button.setScale(0.97);
        });

        button.on(Phaser.Input.Events.POINTER_UP, () => {
            button.setScale(1);
            onClick();
        });

        return button;
    }
}