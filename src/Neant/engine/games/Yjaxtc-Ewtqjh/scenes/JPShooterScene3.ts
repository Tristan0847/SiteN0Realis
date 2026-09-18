import {
    EnemyHorizontalMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyHorizontalMovementController";
import {StraightShootPattern} from "@/engine/core/entities/shooter/patterns/StraightShootPattern";
import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {TripleShootPattern} from "@/engine/core/entities/shooter/patterns/TripleShootPattern";

/**
 * First shooter scene
 */
export class JPShooterScene3 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-3", "jp-shooter-4", "JP3.png", "JP3_shooting.png", 500, null, "soundtrack/JP_3.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            minX: 450,
            maxX: this.scale.width - 450,
            speed: 100,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new StraightShootPattern({
                cooldownMs: 700, damage: 6, poolKey: "basic", speed: 150
            }),
            new TripleShootPattern({
                cooldownMs: 3500, damage: 8, poolKey: "basic", speed: 80
            }),
        ];
    }
}