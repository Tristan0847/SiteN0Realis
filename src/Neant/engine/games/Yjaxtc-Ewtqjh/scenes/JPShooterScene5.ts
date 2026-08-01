import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {BurstTripleShootPattern} from "@/engine/core/entities/shooter/patterns/BurstTripleShootPattern";
import {
    EnemyTeleportMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyTeleportMovementController";
import {SideShotsPattern} from "@/engine/core/entities/shooter/patterns/SideShotsPattern";

/**
 * First shooter scene
 */
export class JPShooterScene5 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-5", "jp-dialog-4", "JP4.png", "JP4_shooting.png", 650, null, "soundtrack/JP_5.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyTeleportMovementController({
            minX: 500,
            maxX: this.scale.width - 500,
            tpInterval: 2000,
            positionAmount: 3,
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new SideShotsPattern({
                amount: 4,
                angleDeg: 45,
                cooldownMs: 3000,
                damage: 3,
                direction: "right",
                minY: 0,
                maxY: this.scale.height,
                poolKey: "cell",
                speed: 75,
                startX: -24,
            }),
            new SideShotsPattern({
                amount: 4,
                angleDeg: 45,
                cooldownMs: 3000,
                damage: 3,
                direction: "left",
                minY: 0,
                maxY: this.scale.height,
                poolKey: "cell",
                speed: 75,
                startX: this.scale.width + 24,
            }),
            new BurstTripleShootPattern({
                cooldownMs: 2000, damage: 6, poolKey: "basic", speed: 135, burstInterval: 250, burstCount: 5
            })
        ];
    }
}