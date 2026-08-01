import {
    EnemyHorizontalMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyHorizontalMovementController";
import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {TripleShootPattern} from "@/engine/core/entities/shooter/patterns/TripleShootPattern";
import {BurstTripleShootPattern} from "@/engine/core/entities/shooter/patterns/BurstTripleShootPattern";

/**
 * First shooter scene
 */
export class JPShooterScene4 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-4", "jp-dialog-3", "JP3.png", "JP3_shooting.png", 300, null, "soundtrack/JP_4.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            minX: 300,
            maxX: this.scale.width - 300,
            speed: 100,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new BurstTripleShootPattern({
                cooldownMs: 800, damage: 6, poolKey: "basic", speed: 135, burstInterval: 250, burstCount: 5
            })
        ];
    }
}