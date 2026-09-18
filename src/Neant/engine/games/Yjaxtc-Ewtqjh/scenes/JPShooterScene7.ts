import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {
    EnemyHorizontalMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyHorizontalMovementController";
import {LineShootPattern} from "@/engine/core/entities/shooter/patterns/LineShootPattern";

/**
 * First shooter scene
 */
export class JPShooterScene7 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-7", "jp-dialog-5", "JP6.png", "JP6_shooting.png", 200, null, "soundtrack/JP_7.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            minX: 500,
            maxX: this.scale.width - 500,
            speed: 100,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new LineShootPattern({
                cooldownMs: 1500,
                damage: 10,
                holeCountSize: 3,
                maxX: this.scale.width - 50,
                minX: 50,
                poolKey: "basic",
                speed: 200
            })
        ];
    }
}