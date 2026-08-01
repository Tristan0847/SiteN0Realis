import Phaser from "phaser";
import {HittableSprite} from "@/engine/core/entities/HittableSprite";

export interface HealthBarProps {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly fillColor: number;
    readonly backgroundColor?: number;
    readonly borderColor?: number;
    readonly borderThickness?: number;
}

/**
 * HUD health bar for the Shooter entities (player and boss).
 */
export class HealthBar extends Phaser.GameObjects.Graphics {
    private readonly target: HittableSprite;
    private readonly barX: number;
    private readonly barY: number;
    private readonly barWidth: number;
    private readonly barHeight: number;
    private readonly fillColor: number;
    private readonly backgroundColor: number;
    private readonly borderColor: number;
    private readonly borderThickness: number;

    /**
     * Class constructor
     * @param scene
     * @param target
     * @param props
     */
    constructor(
        scene: Phaser.Scene,
        target: HittableSprite,
        props: HealthBarProps,
    ) {
        super(scene);

        this.target = target;
        this.barX = props.x;
        this.barY = props.y;
        this.barWidth = props.width;
        this.barHeight = props.height;
        this.fillColor = props.fillColor;
        this.backgroundColor = props.backgroundColor ?? 0x1b1b1b;
        this.borderColor = props.borderColor ?? 0xffffff;
        this.borderThickness = props.borderThickness ?? 2;

        scene.add.existing(this);

        this.setScrollFactor(0);
        this.setDepth(900);

        this.refresh();
    }

    /**
     * Draws the bar from the current target HP.
     */
    public refresh(): void {
        const currentHp = this.target.getCurrentHp();
        const maxHp = this.target.getMaxHp();

        const ratio = Phaser.Math.Clamp(currentHp / maxHp, 0, 1);
        const fillWidth = this.barWidth * ratio;

        this.clear();

        this.fillStyle(this.backgroundColor, 1);
        this.fillRect(
            this.barX,
            this.barY,
            this.barWidth,
            this.barHeight,
        );

        if (fillWidth > 0) {
            this.fillStyle(this.fillColor, 1);
            this.fillRect(
                this.barX,
                this.barY,
                fillWidth,
                this.barHeight,
            );
        }

        this.lineStyle(this.borderThickness, this.borderColor, 0.85);
        this.strokeRect(
            this.barX,
            this.barY,
            this.barWidth,
            this.barHeight,
        );
    }
}