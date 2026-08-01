import Phaser from "phaser";
import {Scene} from "phaser";
import {Projectile, ProjectileHitbox, ProjectileProps} from "@/engine/core/entities/shooter/Projectile";

/**
 * Props for a pool of projectile of the same size and type
 */
export interface ProjectilePoolProps {
    readonly textureKey: string;
    readonly initialAmount: number;
    readonly displayWidth: number;
    readonly displayHeight: number;
    readonly hitbox: ProjectileHitbox;
    readonly depth?: number;
}

/**
 * Fixed pool of identical projectiles, instances created on initialization, reused when available
 */
export class ProjectilePool extends Phaser.Physics.Arcade.Group {
    // #region Properties / Init
    readonly scene : Scene;
    private readonly options : ProjectilePoolProps;

    constructor(scene: Scene, options: ProjectilePoolProps) {
        super(scene.physics.world, scene, {
            maxSize: options.initialAmount,
            runChildUpdate: false,
            classType: Projectile
        });

        this.scene = scene;
        this.options = options;

        this.createProjectiles();
    }

    /**
     * Init the projectiles to use
     * @private
     */
    private createProjectiles(): void {
        for (let index = 0; index < this.options.initialAmount; index++) {
            const projectile = new Projectile(
                this.scene,
                this.options.textureKey,
                this.options.displayWidth,
                this.options.displayHeight,
                this.options.hitbox
            );

            if (this.options.depth) {
                projectile.setDepth(this.options.depth);
            }

            this.add(projectile, true);
        }
    }

    // #endregion

    /**
     * Fires a projectile from the pool, with the given parameters
     * @param options
     */
    fire(options: ProjectileProps): Projectile | null {
        const projectile = this.getFirstDead(false) as Projectile|null;

        if (!projectile) return null;

        projectile.launch(options);
        return projectile;
    }

    /**
     * Checks if each projectile is outside the screen and recycles it if it is (keeps the hidden projectiles off)
     * @param screenWidth
     * @param screenHeight
     * @param margin
     */
    recycleOutsideScreen(
        screenWidth : number,
        screenHeight: number,
        margin = 64
    ): void {
        for (const child of this.getChildren()) {
            const projectile = child as Projectile;
            if (projectile.active && projectile.isOutsideScreen(screenWidth, screenHeight, margin)) {
                projectile.deactivate();
            }
        }
    }

    /**
     * Deactivates all projectiles from the current pool
     */
    deactivateAll(): void {
        for (const child of this.getChildren()) {
            const projectile = child as Projectile;

            projectile.active && projectile.deactivate();
        }
    }

    //#region Getters

    public getProjectileDisplayWidth(): number {
        return this.options.displayWidth;
    }

    //#endregion
}