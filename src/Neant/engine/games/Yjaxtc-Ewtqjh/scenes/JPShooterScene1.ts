import {
    EnemyHorizontalMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyHorizontalMovementController";
import {StraightShootPattern} from "@/engine/core/entities/shooter/patterns/StraightShootPattern";
import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";

/**
 * First shooter scene
 */
export class JPShooterScene1 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-1", "jp-dialog-1", "JP1.png", null, 250, null, "soundtrack/JP_1.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            minX: 500,
            maxX: this.scale.width - 500,
            speed: 70,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new StraightShootPattern({
                cooldownMs: 1500, damage: 5, poolKey: "basic", speed: 100
            })
        ];
    }
}