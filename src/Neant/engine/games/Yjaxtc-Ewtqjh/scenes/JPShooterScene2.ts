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
export class JPShooterScene2 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-2", "jp-dialog-2", "JP2.png", "JP2_shooting.png", 300, null, "soundtrack/JP_2.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            minX: 450,
            maxX: this.scale.width - 450,
            speed: 87,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new StraightShootPattern({
                cooldownMs: 3000, damage: 6, poolKey: "basic", speed: 150
            }),
            new TripleShootPattern({
                cooldownMs: 1600, damage: 4, poolKey: "basic", speed: 80
            }),
        ];
    }
}