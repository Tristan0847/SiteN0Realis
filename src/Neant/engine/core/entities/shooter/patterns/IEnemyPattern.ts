import {Enemy} from "@/engine/core/entities/shooter/Enemy";
import { ProjectilePool } from "../ProjectilePool";

/**
 * Interface for the pattern of an enemy in the shooter game
 */
export interface IEnemyPattern {
    /**
     * Updates the pattern of the current enemy
     * @param enemy
     * @param pools
     * @param time
     * @param delta
     * @returns true if a bullet was shot, false otherwise
     */
    update(
        enemy: Enemy,
        pools: Readonly<Record<string, ProjectilePool>>,
        time: number,
        delta: number
    ): boolean;
}