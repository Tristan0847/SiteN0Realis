import {JPShooterSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterSceneBase";
import {PlayerProps} from "@/engine/core/entities/shooter/JPlayer";
import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {IEnemyPattern} from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import {
    EnemyHorizontalMovementController
} from "@/engine/core/entities/shooter/controllers/EnemyHorizontalMovementController";


export class JPShooterFinal4 extends JPShooterSceneBase {
    constructor() {
        super("jp-shooter-final-4", "jp-dialog-10", "JP1.png", null, 847, 0, "soundtrack/JP_1.mp3", 847, true, false);
    }

    protected getPlayerProps(): Omit<PlayerProps, "minX" | "maxX"> {
        return {
            ...super.getPlayerProps(),
            projectileDamage: -20
        };
    }

    protected getEnemyMovement(): IEnemyMovementController {
        return new EnemyHorizontalMovementController({
            maxX: this.scale.width - 400,
            minX: 400,
            speed: 85
        });
    }
    protected getEnemyShootPatterns(): IEnemyPattern[] {
        return [];
    }
}