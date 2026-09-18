import {IEnemyMovementController} from "@/engine/core/entities/shooter/controllers/IEnemyMovementController";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";

/**
 * Props for the horizontal movement controller
 */
export interface HorizontalMovementProps {
    readonly minX : number;
    readonly maxX : number;
    readonly speed : number;
}

/**
 * Defines an horizontal movement for the enemy
 */
export class EnemyHorizontalMovementController implements IEnemyMovementController {
    private direction = 1;
    private readonly minX : number;
    private readonly maxX : number;
    private readonly speed : number;

    /**
     * Constructor with the props
     * @param props
     */
    constructor(props: HorizontalMovementProps) {
        this.minX = props.minX;
        this.maxX = props.maxX;
        this.speed = props.speed;
    }

    update(enemy: Enemy, time: number, delta: number): void {
        enemy.setVelocity(this.direction * this.speed, 0);

        if (enemy.x <= this.minX) {
            this.direction = 1;
        } else if (enemy.x >= this.maxX) {
            this.direction = -1;
        }
    }
}