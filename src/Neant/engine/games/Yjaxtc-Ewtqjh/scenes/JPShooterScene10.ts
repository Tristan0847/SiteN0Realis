import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import { IEnemyMovementController } from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import { IEnemyPattern } from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {StraightShootPattern} from "@/engine/core/entities/shooter/patterns/StraightShootPattern";
import {EnemyStillController} from "@/engine/core/entities/shooter/controllers/EnemyStillController";
import {PlayerProps} from "@/engine/core/entities/shooter/JPlayer";

/**
 * First shooter scene
 */
export class JPShooterScene10 extends JPShooterSceneBase {

    constructor() {
        super("jp-shooter-10", "jp-dialog-6", "JP9.png", null, 847, null, "soundtrack/JP_9.mp3");
    }

    protected getPlayerProps(): Omit<PlayerProps, "minX" | "maxX"> {
        return {
            ...super.getPlayerProps(),
            projectileDamage: 15
        };
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyStillController();
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [
            new StraightShootPattern({
                cooldownMs: 3000,
                damage: 1,
                poolKey: "cell",
                speed: 55
            }),
        ];
    }
}