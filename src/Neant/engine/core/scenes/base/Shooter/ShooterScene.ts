import {AnySceneProps} from "../props";
import {SceneAsset} from "../SceneAsset";
import {Enemy, EnemyProps} from "@/engine/core/entities/shooter/Enemy";
import {JPlayer} from "@/engine/core/entities/shooter/JPlayer";
import {ProjectilePool, ProjectilePoolProps} from "@/engine/core/entities/shooter/ProjectilePool";
import {Projectile} from "@/engine/core/entities/shooter/Projectile";
import {HealthBar} from "@/engine/core/ui/shooter/HealthBar";
import {AbstractShooterScene} from "@/engine/core/scenes/base/Shooter/AbstractShooterScene";

/**
 * Scene defining a shooter page
 */
export abstract class ShooterScene extends AbstractShooterScene {
    protected boss!: Enemy;
    protected readonly bossTargetHp : number;
    protected bossProjectilePools: Record<string, ProjectilePool> = {};

    /**
     * Defines the direction of the target HP : false for targetHP inferior to the entered target, true for targetHP superior to the entered target
     * @protected
     */
    protected readonly targetDirection : boolean;

    protected playerHealthbar!: HealthBar;
    protected bossHealthbar!: HealthBar;

    protected constructor(
        props: AnySceneProps,
        assets?: SceneAsset[]
    ) {
        if (props.type !== "shooter") {
            throw new Error("Invalid scene type");
        }

        super(props, assets);
        this.bossTargetHp = props.targetHp ?? 0;
        this.targetDirection = props.targetDirection ?? false;
    }

    override create(): void {
        super.create();

        // Enemy projectile pool
        const entries = this.getEnemyProjectilePoolProps();
        this.bossProjectilePools = Object.fromEntries(
            Object.entries(entries).map(
                ([key, value]) => [key, new ProjectilePool(this, value)]
            )
        )

        // Creates the boss
        this.boss = new Enemy(this, this.getEnemyProps());

        // Player and boss health bars
        const healthbarHeight = 18;
        const healthbarMargin = 12;

        this.bossHealthbar = new HealthBar(this, this.boss, {
            x: 0,
            y: healthbarMargin,
            width: this.scale.width,
            height: healthbarHeight,
            fillColor: 0x878787,
        });

        this.playerHealthbar = new HealthBar(this, this.player, {
            x: 40,
            y: this.scale.height - healthbarHeight - healthbarMargin,
            width: this.scale.width - 80,
            height: healthbarHeight,
            fillColor: 0xeeee22,
        });

        // Adds collision masks
        this.addCollisionMask(
            this.playerProjectilePool,
            this.boss,
            Enemy,
            (projectile, boss) => this.handleEnemyHit(projectile, boss),
        );

        for (const pool of Object.values(this.bossProjectilePools)) {
            this.addCollisionMask(
                pool,
                this.player,
                JPlayer,
                (projectile, player) => this.handlePlayerHit(projectile, player),
            );
        }
    }

    override shutdown(): void {
        this.playerHealthbar?.destroy();
        this.bossHealthbar?.destroy();

        this.bossProjectilePools && Object.values(this.bossProjectilePools).forEach(pool => pool.deactivateAll());

        super.shutdown();
    }

    /**
     * Called every frame to update the game state
     * @param time
     * @param delta
     */
    override update(time: number, delta: number): void {
        if (this.gameState !== "playing") return;

        super.update(time, delta);

        // Recycles all of the projectiles
        Object.values(this.bossProjectilePools).forEach(pool =>
            pool.recycleOutsideScreen(
                this.scale.width,
                this.scale.height,
            )
        );
    }

    protected onGameResume(): void {
        this.boss.setPaused(false);
        super.onGameResume();
    }

    protected onGamePause(): void {
        this.boss.setPaused(true);
        super.onGamePause();
    }

    //#region Hit handlers
    /**
     * Handles the hit of a projectile on the boss
     * @param projectile
     * @param boss
     * @protected
     */
    protected handleEnemyHit(projectile: Projectile, boss: Enemy): void {
        boss.takeDamage(projectile.getDamage());
        projectile.deactivate();

        this.bossHealthbar?.refresh();

        // If the current boss HP is not within the end target HP, the boss is not killed
        const currentBossHP = boss.getCurrentHp();
        if ((this.targetDirection && currentBossHP > this.bossTargetHp) || (!this.targetDirection && currentBossHP < this.bossTargetHp)) {
            this.onBossKilled();
        }
    }

    /**
     * Handles the hit of a projectile on the player
     * @param projectile
     * @param player
     * @protected
     */
    protected handlePlayerHit(projectile: Projectile, player: JPlayer): void {
        player.takeDamage(projectile.getDamage());
        projectile.deactivate()

        this.playerHealthbar?.refresh();

        if (player.isDead()) {
            this.onPlayerKilled();
        }
    }

    protected onBossKilled(): void {
        this.goToNextScene();
    }

    protected onPlayerKilled(): void {
        this.setGameState("gameOver");
    }

    // #endregion

    // #region Abstract Getters
    // Abstract methods to define the props of each entity

    /**
     * Gets the enemy projectile pools props
     * @protected
     */
    protected abstract getEnemyProjectilePoolProps(): Record<string, ProjectilePoolProps>;

    /**
     * Gets the enemy props
     * @protected
     */
    protected abstract getEnemyProps(): EnemyProps;
    // #endregion
}