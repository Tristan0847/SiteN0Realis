import {RegularPatternProps} from "@/engine/core/entities/shooter/patterns/AbstractRegularPattern";
import {TripleShootPattern} from "@/engine/core/entities/shooter/patterns/TripleShootPattern";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";
import {ProjectilePool} from "@/engine/core/entities/shooter/ProjectilePool";

/**
 * Defines a burst triple shoot pattern for the enemy
 */
export interface BurstTripleShootPatternProps extends RegularPatternProps {
    burstCount: number;
    burstInterval: number;
}

export class BurstTripleShootPattern extends TripleShootPattern {
    private readonly burstCount: number;
    private readonly burstInterval: number;

    private shotsRemaining = 0;
    private timeSinceLastBurst : number|null = null;

    constructor(props: BurstTripleShootPatternProps) {
        super(props);

        if (props.burstCount < 1 || props.burstInterval < 0) {
            throw new Error("Invalid burst triple shoot pattern props");
        }

        this.burstCount = props.burstCount;
        this.burstInterval = props.burstInterval;
    }

    public override update(enemy: Enemy, pools: Readonly<Record<string, ProjectilePool>>, time: number, delta: number): boolean {
        this.timeSinceLastShot += delta;
        if (this.timeSinceLastBurst !== null)
            this.timeSinceLastBurst += delta;

        // Defines the current last burst at if no last burst
        if (this.shotsRemaining === 0) {
            if (this.timeSinceLastShot < this.cooldownMs) {
                return false;
            }

            this.shotsRemaining = this.burstCount;
            this.timeSinceLastBurst = null;
        }

        if (this.timeSinceLastBurst !== null && this.timeSinceLastBurst < this.burstInterval) {
            return false;
        }

        const hasFired = this.shoot(enemy, pools);

        // A full projectile pool must not consume one burst shot.
        if (!hasFired) {
            return false;
        }

        this.shotsRemaining -= 1;
        this.timeSinceLastBurst = 0;

        if (this.shotsRemaining === 0) {
            this.timeSinceLastShot = 0;
            this.timeSinceLastBurst = null;
        }

        return hasFired;
    }
}