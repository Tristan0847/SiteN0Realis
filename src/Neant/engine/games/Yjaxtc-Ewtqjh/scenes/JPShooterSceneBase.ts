import { EnemyProps } from "@/engine/core/entities/shooter/Enemy";
import { ProjectilePoolProps } from "@/engine/core/entities/shooter/ProjectilePool";
import {ShooterScene} from "../../../core/scenes/base/Shooter/ShooterScene";
import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {IEnemyPattern} from "@/engine/core/entities/shooter/patterns/IEnemyPattern";

/**
 * Base Shooter scene for the JP Game, reusable for all scenes
 */
export abstract class JPShooterSceneBase extends ShooterScene {

    private readonly bossBaseHp : number;
    private readonly bossMaxHp : number;

    protected constructor(
        id : string,
        nextSceneId : string,
        bossBaseImage: string,
        bossShootingImage: string|null = null,
        bossMaxHp : number = 100,
        bossBaseHp : number|null = null,
        audioRelativePath : string|null = null,
        targetHp : number|undefined = undefined,
        targetDirection : boolean|undefined = undefined,
        save : boolean = true,
    ) {
        const baseAssetPath = "/assets/games/shooter/Yjaxtc-Ewtqjh/";
        super({
            id,
            save,
            type: "shooter",
            nextSceneId: nextSceneId,
            bgColor: "#000000",
            audioPath: (audioRelativePath) ? baseAssetPath + audioRelativePath : undefined,
            targetHp,
            targetDirection
        }, [
            {
                key: "JPBullet",
                src: baseAssetPath + "JPBullet.png",
                type: "image",
                pixelArt: true,
            },
            {
                key: `JBoss:${id}`,
                src: baseAssetPath + bossBaseImage,
                type: "image",
                pixelArt: true,
            },
            {
                key: `JBossShooting:${id}`,
                src:  baseAssetPath +  (bossShootingImage ? bossShootingImage : bossBaseImage),
                type: "image",
                pixelArt: true,
            },
            {
                key: "CellBullet",
                src: baseAssetPath + "CellBullet.png",
                type: "image",
                pixelArt: true,
            }
        ]);

        this.bossMaxHp = bossMaxHp;
        this.bossBaseHp = bossBaseHp ?? bossMaxHp;
    }

    protected getEnemyProjectilePoolProps(): Record<string, ProjectilePoolProps> {
        return {
            basic: {
                textureKey: "JPBullet",
                initialAmount: 200,
                displayWidth: 42,
                displayHeight: 42,
                hitbox: {
                    width: 30,
                    height: 30,
                },
            },
            cell: {
                textureKey: "CellBullet",
                initialAmount: 150,
                displayHeight: 24,
                displayWidth: 18,
                hitbox: {
                    width: 12,
                    height: 10,
                },
            }
        };
    }

    protected getEnemyProps(): EnemyProps {
        return {
            displayWidth: 96,
            displayHeight: 96,
            maxHp: this.bossMaxHp,
            hp: this.bossBaseHp,
            movementController: this.getEnemyMovement(),
            pools: this.bossProjectilePools,
            shootPatterns: this.getEnemyShootPatterns(),
            textureKey: `JBoss:${this.props.id}`,
            textureKeyShooting: `JBossShooting:${this.props.id}`,
            x: this.scale.width / 2,
            y: 110,
        };
    }

    /**
     * Returns the movement controller for the enemy
     * @protected
     */
    protected abstract getEnemyMovement(): IEnemyMovementController;

    /**
     * Returns the shoot patterns for the enemy
     * @protected
     */
    protected abstract getEnemyShootPatterns(): IEnemyPattern[];
}