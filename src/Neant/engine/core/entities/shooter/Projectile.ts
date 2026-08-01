import Phaser from "phaser";

/** Type of the projectile (player or hostile) */
export type ProjectileType = "player" | "hostile";

/**
 * Props of a projectile : position and velocity (x and y both), damage and type
 */
export interface ProjectileProps {
    readonly x: number;
    readonly y: number;
    readonly velocityX: number;
    readonly velocityY: number;
    readonly damage: number;
    readonly type: ProjectileType;
    readonly angle?: number;
}

export interface ProjectileHitbox {
    readonly width : number;
    readonly height : number;
    readonly offset?: {
        readonly x : number;
        readonly y : number;
    };
}

/**
 * Projectile used in shooters
 */
export class Projectile extends Phaser.Physics.Arcade.Sprite
{
    private damage : number = 0;
    private projectileType: ProjectileType = "player";

    public getDamage(): number {
        return this.damage;
    }

    public getProjectileType(): ProjectileType {
        return this.projectileType;
    }

    constructor(
        scene: Phaser.Scene,
        textureKey: string,
        displayWidth: number,
        displayHeight: number,
        hitbox: ProjectileHitbox,
    ) {
        super(scene, 0, 0, textureKey);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setDisplaySize(displayWidth, displayHeight);

        const body = this.body as Phaser.Physics.Arcade.Body | null;

        if (body) {
            body.setAllowGravity(false);

            const scaleX = this.displayWidth / this.width;
            const scaleY = this.displayHeight / this.height;

            const bodyWidth = hitbox.width / scaleX;
            const bodyHeight = hitbox.height / scaleY;

            body.setSize(bodyWidth, bodyHeight, false);

            const offsetX = hitbox.offset?.x !== undefined
                ? hitbox.offset.x / scaleX
                : (this.width - bodyWidth) / 2;

            const offsetY = hitbox.offset?.y !== undefined
                ? hitbox.offset.y / scaleY
                : (this.height - bodyHeight) / 2;

            body.setOffset(offsetX, offsetY);
        }
        this.deactivate();
    }

    /**
     * Launches the projectile
     * @param options Props of the projectile
     */
    launch(options : ProjectileProps): void {
        this.damage = options.damage;
        this.projectileType = options.type;

        this.enableBody(
            true,
            Math.round(options.x),
            Math.round(options.y),
            true,
            true
        );

        this.setVelocity(options.velocityX, options.velocityY);
        this.setAngle(options.angle ?? 0)
    }

    /**
     * Deactivates the projectile
     */
    deactivate(): void {
        this.damage = 0;
        this.setVelocity(0, 0);
        this.disableBody(true, true);
    }

    /**
     * Checks if the projectile is outside the screen
     * @param screenWidth
     * @param screenHeight
     * @param margin
     */
    isOutsideScreen(
        screenWidth: number,
        screenHeight: number,
        margin: number = 64
    ): boolean {
        return (
            this.x < -margin
            || this.x > screenWidth + margin
            || this.y < -margin
            || this.y > screenHeight + margin
        );
    }
}