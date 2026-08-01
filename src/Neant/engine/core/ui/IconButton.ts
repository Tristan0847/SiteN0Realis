import Phaser from "phaser";

export interface IconButtonOptions {
    readonly width?: number;
    readonly height?: number;
    readonly backgroundColor?: number;
    readonly hoverBackgroundColor?: number;
    readonly pressedBackgroundColor?: number;
    readonly borderWidth?: number;
    readonly borderColor?: number;
    readonly borderAlpha?: number;
    readonly iconAlpha?: number;
    readonly hoverIconAlpha?: number;
}

export class IconButton {
    static create(
        scene: Phaser.Scene,
        x: number,
        y: number,
        textureKey: string,
        onClick: () => void,
        options: IconButtonOptions = {},
    ): Phaser.GameObjects.Container {
        const {
            width = 48,
            height = 48,
            backgroundColor = 0x111111,
            hoverBackgroundColor = 0x2a2a2a,
            pressedBackgroundColor = 0x050505,
            borderWidth = 1,
            borderColor = 0xbbbbbb,
            borderAlpha = 0.74,
            iconAlpha = 0.25,
            hoverIconAlpha = 1,
        } = options;

        const background = scene.add
            .rectangle(0, 0, width, height, backgroundColor, 1)
            .setStrokeStyle(borderWidth, borderColor, borderAlpha);

        const icon = scene.add
            .image(0, 0, textureKey)
            .setOrigin(0.5)
            .setAlpha(iconAlpha);

        const margin = width / 6;
        const availableSize = width - (margin * 2);
        const scale = availableSize / icon.width;

        icon.setScale(scale);

        const button = scene.add.container(x, y, [background, icon]);

        const hitWidth = width + borderWidth;
        const hitHeight = height + borderWidth;
        const hitRect = new Phaser.Geom.Rectangle(
            -hitWidth / 2,
            -hitHeight / 2,
            hitWidth,
            hitHeight
        );

        button.setSize(hitWidth, hitHeight);
        button.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, hitWidth, hitHeight),
            Phaser.Geom.Rectangle.Contains
        );
        button.on(Phaser.Input.Events.POINTER_OVER, () => {
            background.setFillStyle(hoverBackgroundColor, 1);
            icon.setAlpha(hoverIconAlpha);
        });

        button.on(Phaser.Input.Events.POINTER_OUT, () => {
            button.setScale(1);
            background.setFillStyle(backgroundColor, 1);
            icon.setAlpha(iconAlpha);
        });

        button.on(Phaser.Input.Events.POINTER_DOWN, () => {
            button.setScale(0.96);
            background.setFillStyle(pressedBackgroundColor, 1);
        });

        button.on(Phaser.Input.Events.POINTER_UP, () => {
            button.setScale(1);
            background.setFillStyle(hoverBackgroundColor, 1);
            onClick();
        });

        return button;
    }

    static createExitButton(
        scene: Phaser.Scene,
        x: number,
        y: number,
        action: () => void,
        textureKey: string = "exit-icon"
    ): Phaser.GameObjects.Container {
        return IconButton.create(
            scene,
            x,
            y,
            textureKey,
            action,
            {
                width: 60,
                height: 60,
                backgroundColor: 0x111111,
                hoverBackgroundColor: 0x242424,
                pressedBackgroundColor: 0x050505,
                borderWidth: 2,
                borderColor: 0xe2e8f0,
                borderAlpha: 0.7,
            }
        );
    }
}