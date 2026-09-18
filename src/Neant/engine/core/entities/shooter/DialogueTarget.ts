import Phaser from "phaser";
import {HittableSprite} from "@/engine/core/entities/HittableSprite";

/**
 * Target to make a dialogue advance
 */
export class DialogueTarget extends HittableSprite {

    private readonly animationAmplitude: number;
    private readonly animationSpeed: number;
    private readonly initialY: number;

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        hp : number,
        width: number,
        height: number,
        animationAmplitude: number = 10,
        animationSpeed: number = 5,
    ) {
        super(scene, x, y, "next-dialogue", hp, hp, false);
        this.setDisplaySize(width, height);

        this.animationAmplitude = animationAmplitude;
        this.animationSpeed = animationSpeed;
        this.initialY = y;

        this.startAnimation();
    }

    /**
     * Updates the hp of the target (resets it for the next dialogue)
     * @param hp
     */
    public setHp(hp : number): void {
        this.hp = hp;
    }

    /**
     * Starts the animation of the target
     * @private
     */
    private startAnimation(): void {
        const duration = (this.animationAmplitude / this.animationSpeed) * 1000;

        this.scene.tweens.add({
            targets: this,
            y: this.initialY - this.animationAmplitude,
            duration,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
        });
    }
}