import { Enemy } from "../Enemy";
import { ProjectilePool } from "../ProjectilePool";
import {AbstractRegularPattern} from "@/engine/core/entities/shooter/patterns/AbstractRegularPattern";

/**
 * Defines a straight shoot pattern for the enemy
 */
export class TripleShootPattern extends AbstractRegularPattern {
    public shoot(enemy: Enemy, pools: Readonly<Record<string, ProjectilePool>>): boolean {
        // Gets the current pool (associated pool to shoot bullets from)
        const pool = pools[this.poolKey];
        if (!pool) return false;

        // Shoots the projectile and checks if it exists before reinitializing the lastshotat value
        const projectile1 = pool.fire({
            x: enemy.x - 50,
            y: enemy.y,
            velocityX: 0,
            velocityY: this.speed,
            damage: this.damage,
            type: "hostile",
        });
        const projectile2 = pool.fire({
            x: enemy.x,
            y: enemy.y,
            velocityX: 0,
            velocityY: this.speed,
            damage: this.damage,
            type: "hostile",
        });
        const projectile3 = pool.fire({
            x: enemy.x + 50,
            y: enemy.y,
            velocityX: 0,
            velocityY: this.speed,
            damage: this.damage,
            type: "hostile",
        });

        return (projectile1 !== null || projectile2 !== null || projectile3 !== null);
    }
}
