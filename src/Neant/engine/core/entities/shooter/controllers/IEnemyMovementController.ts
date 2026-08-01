import {Enemy} from "@/engine/core/entities/shooter/Enemy";

/**
 * Interface for the movement controller of an enemy
 */
export interface IEnemyMovementController {
    /**
     * Updates the movement of the enemy (new position, velocity, ...)
     * @param enemy
     * @param time
     * @param delta
     */
    update(enemy: Enemy, time: number, delta: number): void;
}