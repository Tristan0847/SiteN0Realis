import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {SideShotsPattern} from "@/engine/core/entities/shooter/patterns/SideShotsPattern";
import {
    EnemyHorizontalMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyHorizontalMovementController";
import {StraightShootPattern} from "@/engine/core/entities/shooter/patterns/StraightShootPattern";

/**
 * First shooter scene
 */
export class JPShooterScene6 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-6", "jp-shooter-7", "JP5.png", "JP5_shooting.png", 500, null, "soundtrack/JP_6.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            minX: 500,
            maxX: this.scale.width - 500,
            speed: 140,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new SideShotsPattern({
                amount: 6,
                angleDeg: 30,
                cooldownMs: 3000,
                damage: 2,
                direction: "right",
                minY: 0,
                maxY: this.scale.height,
                poolKey: "cell",
                speed: 150,
                startX: -24,
            }),
            new SideShotsPattern({
                amount: 6,
                angleDeg: 30,
                cooldownMs: 3000,
                damage: 2,
                direction: "left",
                minY: 0,
                maxY: this.scale.height,
                poolKey: "cell",
                speed: 150,
                startX: this.scale.width + 24,
            }),
            new StraightShootPattern({
                cooldownMs: 1500, damage: 10, poolKey: "basic", speed: 200
            }),
        ];
    }
}