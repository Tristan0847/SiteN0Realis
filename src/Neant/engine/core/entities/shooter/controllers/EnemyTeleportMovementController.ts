import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";

/**
 * Props for the teleport movement controller
 */
export interface TeleportMovementProps {
    readonly minX : number;
    readonly maxX : number;
    readonly tpInterval : number;
    readonly positionAmount : number;
}

/**
 * Defines an horizontal movement for the enemy
 */
export class EnemyTeleportMovementController implements IEnemyMovementController {
    private readonly minX : number;
    private readonly maxX : number;
    private readonly tpInterval : number;
    private readonly xPositions : number[];
    private currentIndex : number = 0;

    private lastTpAt : number|null = null;

    /**
     * Constructor with the props
     * @param props
     */
    constructor(props: TeleportMovementProps) {
        this.minX = props.minX;
        this.maxX = props.maxX;
        this.tpInterval = props.tpInterval;

        this.xPositions = this.createXPositions(this.minX, this.maxX, props.positionAmount);
    }

    update(enemy: Enemy, time: number, delta: number): void {
        if (!this.lastTpAt) {
            this.lastTpAt = time;
            return;
        }

        // Only teleports once the interval is over
        if (time < this.lastTpAt + this.tpInterval) {
            return;
        }

        const index = (this.currentIndex + 1) % this.xPositions.length;
        enemy.setX(this.xPositions[index]);
        this.lastTpAt = time;
        this.currentIndex = index;
    }

    /**
     * Creates the x positions array to move from
     * @param minX
     * @param maxX
     * @param positionAmount
     * @private
     */
    private createXPositions(
        minX: number,
        maxX: number,
        positionAmount: number,
    ): number[] {
        if (positionAmount === 1) {
            return [(minX + maxX) / 2];
        }

        const step = (maxX - minX) / (positionAmount - 1);

        return Array.from(
            {length: positionAmount},
            (_, index) => minX + index * step,
        );
    }
}