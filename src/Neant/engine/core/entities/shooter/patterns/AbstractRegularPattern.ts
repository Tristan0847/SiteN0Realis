import {IEnemyPattern} from "@/engine/core/entities/shooter/patterns/IEnemyPattern";
import { Enemy } from "../Enemy";
import { ProjectilePool } from "../ProjectilePool";

/**
 * Props for the straight shoot pattern
 */
export interface RegularPatternProps {
    readonly poolKey: string;
    readonly cooldownMs: number;
    readonly speed: number;
    readonly damage: number;
}

/**
 * Defines a regular pattern happening every x milliseconds, only needs to override the update method to define the pattern
 */
export abstract class AbstractRegularPattern implements IEnemyPattern {
    protected readonly poolKey: string;
    protected readonly cooldownMs: number;
    protected readonly speed: number;
    protected readonly damage: number;
    protected timeSinceLastShot : number = 0;

    constructor(props: RegularPatternProps) {
        this.poolKey = props.poolKey;
        this.cooldownMs = props.cooldownMs;
        this.speed = props.speed;
        this.damage = props.damage;
    }

    update(
        enemy: Enemy,
        pools: Readonly<Record<string, ProjectilePool>>,
        time: number,
        delta: number
    ): boolean {
        this.timeSinceLastShot += delta;

        // Only shoots if the cooldown is over
        if (this.timeSinceLastShot < this.cooldownMs) {
            return false;
        }

        const projectilesFired = this.shoot(enemy, pools);
        if (projectilesFired) {
            this.timeSinceLastShot = 0;
        }

        return projectilesFired;
    }

    /**
     * Method to inherit to shoot the pattern
     * @param enemy
     * @param pools
     * @protected
     */
    public abstract shoot(enemy : Enemy, pools : Readonly<Record<string, ProjectilePool>>): boolean;
}
