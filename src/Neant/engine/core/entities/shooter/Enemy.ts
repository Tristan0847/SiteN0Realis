import Phaser from "phaser";
import {ProjectilePool} from "@/engine/core/entities/shooter/ProjectilePool";
import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {IEnemyPattern} from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {HittableSprite} from "@/engine/core/entities/HittableSprite";

/**
 * Enemy props
 */
export interface EnemyProps {
    readonly textureKey: string;
    readonly textureKeyShooting?: string;
    readonly x: number;
    readonly y: number;
    readonly displayWidth: number;
    readonly displayHeight: number;
    readonly maxHp: number;
    readonly hp: number;
    readonly pools: Readonly<Record<string, ProjectilePool>>;
    readonly movementController: IEnemyMovementController;
    readonly shootPatterns: IEnemyPattern[];
}

/**
 * Enemy entity for the Shooter game
 */
export class Enemy extends HittableSprite {
    private readonly pools: Readonly<Record<string, ProjectilePool>>;
    private readonly movementController: IEnemyMovementController;
    private readonly shootPatterns: IEnemyPattern[];
    private spriteKey : string;
    private spriteKeyShooting : string;
    private shootingTextureDurationMs : number = 100;
    private shootingTimer : Phaser.Time.TimerEvent | undefined;
    private paused : boolean = false;

    constructor(scene: Phaser.Scene, props: EnemyProps) {
        super(scene, props.x, props.y, props.textureKey, props.maxHp, props.hp);

        this.spriteKey = props.textureKey;
        this.spriteKeyShooting = props.textureKeyShooting ?? props.textureKey;

        this.pools = props.pools;
        this.movementController = props.movementController;
        this.shootPatterns = props.shootPatterns;

        this.setDisplaySize(props.displayWidth, props.displayHeight);
        this.setOrigin(0.5);
        // Sets the body as immovable (until the movement controller changes it)
        this.setImmovable(true);
    }

    /**
     * Called before the update to update the movement and the shoot patterns
     * @param time
     * @param delta
     */
    public override preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        if (this.paused) return;

        this.movementController.update(this, time, delta);

        let hasFired = false;
        for (const pattern of this.shootPatterns) {
            hasFired ||= pattern.update(this, this.pools, time, delta);
        }

        if (hasFired) {
            if (this.spriteKey === this.spriteKeyShooting) {
                return;
            }

            this.shootingTimer?.remove(false);

            this.setTexture(this.spriteKeyShooting);

            // Puts the shooting texture if it exists and adds a timer for the moment the spries comes back to normal
            this.shootingTimer = this.scene.time.delayedCall(
                this.shootingTextureDurationMs,
                () => {
                    if (!this.active) {
                        return;
                    }

                    this.setTexture(this.spriteKey);
                    this.shootingTimer = undefined;
                },
            );
        }
    }

    /**
     * Sets the paused state of the enemy
     * @param paused
     */
    public setPaused(paused: boolean): void {
        this.paused = paused;
    }
}