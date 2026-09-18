import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {SideShotsPattern} from "@/engine/core/entities/shooter/patterns/SideShotsPattern";
import {RandomBullshitPattern} from "@/engine/core/entities/shooter/patterns/RandomBullshitPattern";
import {
    EnemyTeleportMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyTeleportMovementController";

/**
 * First shooter scene
 */
export class JPShooterScene9 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-9", "jp-shooter-10", "JP8.png", "JP8_shooting.png", 600, null, "soundtrack/JP_8.mp3");
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyTeleportMovementController({
            positionAmount: 4,
            tpInterval: 2000,
            minX: 500,
            maxX: this.scale.width - 500
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new RandomBullshitPattern({
                cooldownMs: 1000,
                damage: 10,
                poolKey: "basic",
                speed: 200
            }, {
                cooldownMs: 4000,
                damage: 10,
                holeCountSize: 6,
                maxX: this.scale.width - 50,
                minX: 50,
                poolKey: "basic",
                speed: 200
            }),
            new SideShotsPattern({
                amount: 4,
                angleDeg: 50,
                cooldownMs: 1000,
                damage: 2,
                direction: "right",
                minY: 200,
                maxY: this.scale.height,
                poolKey: "cell",
                speed: 125,
                startX: -24,
            }),
            new SideShotsPattern({
                amount: 4,
                angleDeg: 50,
                cooldownMs: 1000,
                damage: 2,
                direction: "left",
                minY: 200,
                maxY: this.scale.height,
                poolKey: "cell",
                speed: 125,
                startX: this.scale.width + 24,
            }),
        ];
    }
}