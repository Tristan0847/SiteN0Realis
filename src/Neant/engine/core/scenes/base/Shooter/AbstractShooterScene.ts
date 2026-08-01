import {BaseScene} from "@/engine/core/scenes/base/BaseScene";
import {JPlayer, PlayerProps} from "@/engine/core/entities/shooter/JPlayer";
import {ProjectilePool, ProjectilePoolProps} from "@/engine/core/entities/shooter/ProjectilePool";
import {ShooterPlayerBar} from "@/engine/core/ui/shooter/ShooterPlayerBar";
import {AnySceneProps} from "@/engine/core/scenes/base/props";
import {SceneAsset} from "@/engine/core/scenes/base/SceneAsset";
import {Projectile} from "@/engine/core/entities/shooter/Projectile";
import {PauseOverlay} from "@/engine/core/ui/PauseOverlay";
import {GameOverOverlay} from "@/engine/core/ui/GameOverOverlay";
import {IconButton} from "@/engine/core/ui/IconButton";
import {Coordinates} from "@/engine/types/coordinates";
import Phaser from "phaser";

type GameState = "playing" | "pause" | "gameOver";

/**
 * Abstract class for shooter scenes
 */
export abstract class AbstractShooterScene extends BaseScene {

    protected player!: JPlayer;
    protected playerProjectilePool!: ProjectilePool;
    protected playerHud!: ShooterPlayerBar;

    private collisionMasks : Phaser.Physics.Arcade.Collider[] = [];

    protected pauseOverlay!: PauseOverlay;
    private exitBtnCoordinates: Coordinates;
    protected exitButton!: Phaser.GameObjects.Container;
    protected gameOverOverlay!: GameOverOverlay;

    protected gameState : GameState = "playing";

    protected constructor(
        props: AnySceneProps,
        assets?: SceneAsset[],
        exitBtnCoordinates: Coordinates = {
            x: 36,
            y: 64
        }
    ) {
        const baseAssetPath = "/assets/games/shooter/Yjaxtc-Ewtqjh/";
        assets = assets || [];
        assets.push({
                key: "JBullet",
                src: baseAssetPath + "JBullet.jpg",
                type: "image",
                pixelArt: true,
            },
            {
                key: "JShip",
                src: baseAssetPath + "JShip.png",
                type: "image",
                pixelArt: true,
            },
            {
                type: "image",
                key: "exit-icon",
                src: "/assets/games/menus/Exit logo.png",
                pixelArt: true
            })
        ;

        super({ key: props.id }, props, assets);
        this.exitBtnCoordinates = exitBtnCoordinates;
    }


    override create(): void {
        super.create();
        this.setPixelArtFilter();

        this.playerProjectilePool = new ProjectilePool(this, this.getPlayerProjectilePoolProps());

        const playerProps = this.getPlayerProps();
        const playerDisplayWidth = playerProps.displayWidth;

        const horizontalMargin = 20;
        const fullPlayerProps = {
            ...playerProps,
            minX: horizontalMargin + playerDisplayWidth / 2,
            maxX: this.scale.width - horizontalMargin - playerDisplayWidth / 2,
        }

        this.player = new JPlayer(this, fullPlayerProps);
        this.player.setDepth(403);

        // Creates the HUD
        this.playerHud = new ShooterPlayerBar(this, {
            x: this.scale.width / 2,
            y: this.scale.height - 40,
            width: this.scale.width - horizontalMargin * 4,
            height: 24,
            onPositionChange: (ratio: number) => {
                this.player.setTargetFromRatio(ratio);
            },
            onPressStart: () => {
                this.player.setFiring(true);
            },
            onPressEnd: () => {
                this.player.setFiring(false);
            },
        });
        this.playerHud.setDepth(403);

        // Creates the pause menu
        this.pauseOverlay = new PauseOverlay(this, {
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            width: 400,
            height: 460,
            onResume: () => this.setGameState("playing"),
            onRestart: () => this.emitSceneEvent("RELOAD_SCENE"),
            onQuit: () => this.emitSceneEvent("RETURN_TO_MENU"),
        });
        this.pauseOverlay.setVisible(false);
        this.pauseOverlay.setActive(false);

        this.gameOverOverlay = new GameOverOverlay(this, {
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            onRestart: () => this.emitSceneEvent("RELOAD_SCENE"),
            onQuit: () => this.emitSceneEvent("RETURN_TO_MENU"),
        })
        this.gameOverOverlay.setVisible(false);
        this.gameOverOverlay.setActive(false);

        // Creates the exit button
        this.exitButton = IconButton.createExitButton(
            this,
            this.exitBtnCoordinates.x,
            this.exitBtnCoordinates.y,
            () => this.setGameState("pause"),
        );
        this.exitButton.setDepth(500);
    }

    override update(time: number, delta: number): void {
        super.update(time, delta);

        this.playerProjectilePool.recycleOutsideScreen(
            this.scale.width,
            this.scale.height,
        );
    }

    override shutdown(): void {
        this.gameState = "playing";
        this.setPauseOverlay(false);

        this.playerProjectilePool?.deactivateAll();
        this.player?.destroy();
        this.playerHud?.destroy();

        this.gameOverOverlay?.destroy();
        this.pauseOverlay?.destroy();
        this.exitButton?.destroy();

        this.collisionMasks.forEach((collider) => collider.destroy());
        this.collisionMasks = [];

        super.shutdown();
    }

    //#region Collision mask management
    /**
     * Method to add a collision mask between a projectile pool and a target
     * @param projectilePool Pool that throws the bullets that needs to be checked
     * @param target Target being hit by the bullets
     * @param targetType
     * @param onHit Method used on hit
     * @protected
     */
    protected addCollisionMask<TTarget extends Phaser.GameObjects.GameObject>(
        projectilePool: ProjectilePool,
        target: TTarget,
        targetType: new (...args: never[]) => TTarget,
        onHit: (projectile: Projectile, target: TTarget) => void,
    ): Phaser.Physics.Arcade.Collider {
        const collider = this.physics.add.overlap(
            projectilePool,
            target,
            (object1, object2) => {
                const projectile = object1 instanceof Projectile
                    ? object1
                    : object2 instanceof Projectile
                        ? object2
                        : null;

                const typedTarget = object1 instanceof targetType
                    ? object1
                    : object2 instanceof targetType
                        ? object2
                        : null;

                if (!projectile || !typedTarget) {
                    return;
                }

                onHit(projectile, typedTarget);
            },
            undefined,
            this,
        );

        this.collisionMasks.push(collider);

        return collider;
    }
    //#endregion

    //#region Game state management

    protected setGameState(nextState : GameState): void {
        if (this.gameState === nextState) return;

        switch (nextState) {
            case "playing":
                this.onGameResume();
                break;

            case "pause":
                this.onGamePause();
                break;

            case "gameOver":
                this.onGameOver();
                break;
        }

        this.gameState = nextState;
    }

    // Methods can be overriden to implement custom behavior

    protected onGameResume(): void {
        this.setPauseOverlay(false);
        this.setGameOverOverlay(false);
        this.physics.resume();
    }

    protected onGamePause(): void {
        this.player.setFiring(false);
        this.physics.pause();
        this.setPauseOverlay(true);
    }

    protected onGameOver(): void {
        this.player.setFiring(false);
        this.physics.pause();
        this.playerProjectilePool.deactivateAll();
        this.setGameOverOverlay(true);
    }

    /**
     * Sets the visibility and activity of the pause overlay
     * @param input
     * @protected
     */
    protected setPauseOverlay(input: boolean): void {
        this.pauseOverlay.setVisible(input);
        this.pauseOverlay.setActive(input);
    }

    /**
     * Sets the visibility and activity of the game over overlay
     * @param input
     * @protected
     */
    protected setGameOverOverlay(input: boolean): void {
        this.gameOverOverlay.setVisible(input);
        this.gameOverOverlay.setActive(input);
    }

    //#endregion

    //#region Initializers

    /**
     * Gets the player projectile pool props
     * @protected
     */
    protected getPlayerProjectilePoolProps(): ProjectilePoolProps {
        return {
            textureKey: "JBullet",
            initialAmount: 80,
            displayWidth: 20,
            displayHeight: 40,
            hitbox: {
                width: 8,
                height: 16,
            },
        };
    }

    /**
     * Gets the player props
     * @protected
     */
    protected getPlayerProps(): Omit<PlayerProps, "minX" | "maxX"> {
        return {
            maxHp: 78,
            hp: 78,
            displayWidth: 40,
            displayHeight: 36,
            projectileDamage: 5,
            projectilePool: this.playerProjectilePool,
            projectileSpeed: 520,
            shootCooldownMs: 110,
            speed: 666,
            textureKey: "JShip",
            x: this.scale.width / 2,
            y: this.scale.height - 90,
        };
    }

    //#endregion
}