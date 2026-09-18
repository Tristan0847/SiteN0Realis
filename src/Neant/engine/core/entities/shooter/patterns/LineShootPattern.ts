import {
    AbstractRegularPattern,
    RegularPatternProps
} from "@/engine/core/entities/shooter/patterns/AbstractRegularPattern";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";
import {ProjectilePool} from "@/engine/core/entities/shooter/ProjectilePool";
import Phaser from "phaser";

export interface LineShootPatternOptions extends RegularPatternProps {
    minX: number;
    maxX: number;
    /**
     * Size of the hole between each projectile, counted in number of projectiles
     */
    holeCountSize : number;
}

/**
 * Pattern that shoots a line of projectiles, with a hole for the player to pass through
 */
export class LineShootPattern extends AbstractRegularPattern {
    private readonly minX : number;
    private readonly maxX : number;
    private readonly holeCountSize : number;

    public constructor(props : LineShootPatternOptions) {
        super(props);
        this.minX = props.minX;
        this.maxX = props.maxX;
        this.holeCountSize = props.holeCountSize;
    }

    public shoot(enemy: Enemy, pools: Readonly<Record<string, ProjectilePool>>): boolean {
        const pool = pools[this.poolKey];

        if (!pool) {
            return false;
        }

        const positions = this.createLinePositions(
            pool.getProjectileDisplayWidth(),
        );

        let hasFired = false;

        for (const x of positions) {
            if (x === null) {
                continue;
            }

            const projectile = pool.fire({
                x,
                y: enemy.y,
                velocityX: 0,
                velocityY: this.speed,
                damage: this.damage,
                type: "hostile",
            });

            hasFired ||= projectile !== null;
        }

        return hasFired;
    }

    /**
     * Creates an evenly-spaced line of projectile positions.
     * Null values represent the central hole.
     */
    private createLinePositions(
        projectileWidth: number,
    ): Array<number | null> {
        if (projectileWidth <= 0) {
            throw new Error("projectileWidth must be greater than zero.");
        }

        const availableWidth = this.maxX - this.minX;

        // Number of slots fitting in the interval, including both edges.
        const slotCount = Math.floor(
            availableWidth / projectileWidth,
        ) + 1;

        if (slotCount <= 0) {
            return [];
        }

        const positions : Array<number | null> = Array.from(
            {length: slotCount},
            (_, index) => this.minX + index * projectileWidth,
        );

        const actualHoleSize = Math.min(
            this.holeCountSize,
            slotCount,
        );

        // Clamps between 25% and 75% of the slot count
        const minHoleCenterIndex = Math.floor(slotCount * 0.25);
        const maxHoleCenterIndex = Math.ceil(slotCount * 0.75) - 1;

        const holeCenterIndex = Math.floor(
            Math.random() * (
                maxHoleCenterIndex
                - minHoleCenterIndex
                + 1
            ),
        ) + minHoleCenterIndex;

        const unclampedHoleStartIndex = Math.floor(
            holeCenterIndex - actualHoleSize / 2,
        );

        const holeStartIndex = Phaser.Math.Clamp(
            unclampedHoleStartIndex,
            0,
            slotCount - actualHoleSize,
        );

        for (
            let index = holeStartIndex;
            index < holeStartIndex + actualHoleSize;
            index += 1
        ) {
            positions[index] = null;
        }

        return positions;
    }
}