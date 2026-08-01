import {
    AbstractRegularPattern,
    RegularPatternProps
} from "@/engine/core/entities/shooter/patterns/AbstractRegularPattern";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";
import {ProjectilePool} from "@/engine/core/entities/shooter/ProjectilePool";
import Phaser from "phaser";

export interface SideShotsProps extends RegularPatternProps {
    readonly minY : number;
    readonly maxY : number;
    readonly startX : number;
    readonly direction: "left" | "right";
    readonly amount : number;
    readonly angleDeg : number;
}

/**
 * Defines a pattern of bullets coming from one of the sides of the screen, going down and with a given angle
 */
export class SideShotsPattern extends AbstractRegularPattern {
    private readonly yPositions : number[];
    private readonly startX : number;
    private readonly direction: "left" | "right";
    private readonly angleDeg : number;

    constructor(
        props : SideShotsProps
    ) {
        super(props);
        this.yPositions = this.createYPositions(props.minY, props.maxY, props.amount);
        this.startX = props.startX;
        this.direction = props.direction;
        this.angleDeg = props.angleDeg;
    }

    public shoot(
        _enemy: Enemy,
        pools: Readonly<Record<string, ProjectilePool>>,
    ): boolean {
        const pool = pools[this.poolKey];

        if (!pool) {
            return false;
        }

        const spriteAngleDeg = this.getSpriteAngleDeg();
        const velocityAngleDeg = 90 + spriteAngleDeg;

        const velocity = new Phaser.Math.Vector2().setToPolar(
            Phaser.Math.DegToRad(spriteAngleDeg),
            this.speed,
        );

        let hasFired = false;

        for (const y of this.yPositions) {
            const projectile = pool.fire({
                x: this.startX,
                y,
                velocityX: velocity.x,
                velocityY: velocity.y,
                damage: this.damage,
                type: "hostile",
                angle: velocityAngleDeg,
            });

            hasFired ||= projectile !== null;
        }

        return hasFired;
    }

    /**
     * Creates the Y positions array to send the bullets at
     * @param minY
     * @param maxY
     * @param positionAmount
     * @private
     */
    private createYPositions(
        minY: number,
        maxY: number,
        positionAmount: number,
    ): number[] {
        if (positionAmount === 1) {
            return [(minY + maxY) / 2];
        }

        const step = (maxY - minY) / (positionAmount - 1);

        return Array.from(
            {length: positionAmount},
            (_, index) => minY + index * step,
        );
    }

    /**
     * Gets the angle of the projectile
     * @private
     */
    private getSpriteAngleDeg(): number {
        return this.direction === "right"
            ? this.angleDeg
            : 180 - this.angleDeg;
    }
}
