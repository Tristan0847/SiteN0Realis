import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";

/**
 * Controller for a still enemy
 */
export class EnemyStillController implements IEnemyMovementController {
    update(enemy: Enemy, time: number, delta: number): void {
        // Empty update function
    }
}