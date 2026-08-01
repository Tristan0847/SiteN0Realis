import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import {PlayerProps} from "@/engine/core/entities/shooter/JPlayer";
import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {IEnemyPattern} from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {EnemyStillController} from "@/engine/core/entities/shooter/controllers/EnemyStillController";
import {StraightShootPattern} from "@/engine/core/entities/shooter/patterns/StraightShootPattern";


export class JPShooterFinal1 extends JPShooterSceneBase {
    constructor() {
        super("jp-shooter-final-1", "jp-dialog-7", "JP9.png", null, 250, 0, "soundtrack/JP_9.mp3", 250, true, false);
    }

    protected getPlayerProps(): Omit<PlayerProps, "minX" | "maxX"> {
        return {
            ...super.getPlayerProps(),
            projectileDamage: -10
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