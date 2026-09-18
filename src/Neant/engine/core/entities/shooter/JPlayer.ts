import Phaser from "phaser";
import {ProjectilePool} from "@/engine/core/entities/shooter/ProjectilePool";
import {HittableSprite} from "@/engine/core/entities/HittableSprite";

export interface PlayerProps {
    readonly textureKey: string;
    readonly maxHp: number;
    readonly hp: number;
    readonly x: number;
    readonly y: number;
    readonly displayWidth: number;
    readonly displayHeight: number;
    readonly speed: number;
    readonly minX: number;
    readonly maxX: number;
    readonly shootCooldownMs: number;
    readonly projectilePool: ProjectilePool;
    readonly projectileSpeed: number;
    readonly projectileDamage: number;
}

/**
 * Class for the J. player in the shooter
 */
export class JPlayer extends HittableSprite {
    private readonly speed: number;
    private readonly shootCooldownMs: number;
    private readonly projectilePool: ProjectilePool;
    private readonly projectileSpeed: number;
    private readonly projectileDamage: number;
    private firing : boolean = false;

    private readonly minX: number;
    private readonly maxX: number;
    private targetX: number;

    private lastShotAt = 0;

    /**
     * Constructor with the current scene and the player props
     * @param scene
     * @param props
     */
    constructor(scene: Phaser.Scene, props: PlayerProps) {
        super(scene, props.x, props.y, props.textureKey, props.maxHp, props.hp);

        this.speed = props.speed;
        this.minX = props.minX;
        this.maxX = props.maxX;
        this.targetX = Phaser.Math.Clamp(props.x, this.minX, this.maxX);

        this.shootCooldownMs = props.shootCooldownMs;
        this.projectilePool = props.projectilePool;
        this.projectileSpeed = props.projectileSpeed;
        this.projectileDamage = props.projectileDamage;

        this.setDisplaySize(props.displayWidth, props.displayHeight);
        this.setOrigin(0.5);
        this.setCollideWorldBounds(true);
        this.setX(this.targetX);
    }

    /**
     * Sets the player's new target position
     * @param ratio
     */
    public setTargetFromRatio(ratio: number): void {
        const clampedRatio = Phaser.Math.Clamp(ratio, 0, 1);

        this.targetX = Phaser.Math.Linear(
            this.minX,
            this.maxX,
            clampedRatio,
        );
    }

    /**
     * Preupdate method called to set values before the update
     * @param time
     * @param delta
     */
    public override preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        const body = this.body as Phaser.Physics.Arcade.Body|null;
        if (!body) return;

        const distanceToTarget = this.targetX - this.x;
        const epsilon = 1;

        if (Math.abs(distanceToTarget) <= epsilon) {
            this.setX(this.targetX);
            this.setVelocity(0, 0);
        } else {
            const direction = Math.sign(distanceToTarget);
            const velocityX = direction * this.speed;

            this.setVelocityX(velocityX);
            this.setVelocityY(0);

            const maxStep = this.speed * (delta / 1000);

            if (Math.abs(distanceToTarget) <= maxStep) {
                this.setX(this.targetX);
                this.setVelocity(0, 0);
            }
        }

        if (this.firing) {
            this.tryShoot(time);
        }
    }

    /**
     * Sets the player's firing state
     * @param firing
     */
    public setFiring(firing: boolean): void {
        this.firing = firing;
    }

    /**
     * Tries to shoot
     * @param time
     * @private
     */
    private tryShoot(time: number): void {
        if (time - this.lastShotAt < this.shootCooldownMs) {
            return;
        }

        const projectile = this.projectilePool.fire({
            x: this.x,
            y: this.y - this.displayHeight * 0.5,
            velocityX: 0,
            velocityY: -this.projectileSpeed,
            damage: this.projectileDamage,
            type: "player",
        });

        if (projectile) {
            this.lastShotAt = time;
        }
    }
}
