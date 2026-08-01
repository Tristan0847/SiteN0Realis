import Phaser from "phaser";

/**
 * A sprite that can be hit
 */
export class HittableSprite extends Phaser.Physics.Arcade.Sprite {

    protected readonly maxHp: number;
    protected hp: number;

    /**
     * Constructor with the current scene and the sprite props
     * @param scene
     * @param x
     * @param y
     * @param textureKey
     * @param maxHP Max HP the sprite can have
     * @param hp Current HP the sprite has, if null then maxHP is used
     * @param allowGravity
     */
    constructor(scene: Phaser.Scene, x: number, y: number, textureKey : string, maxHP: number, hp: number|null = null, allowGravity : boolean = false) {
        super(scene, x, y, textureKey);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.maxHp = maxHP;
        this.hp = (hp !== null) ? hp : maxHP;

        const body = this.body as Phaser.Physics.Arcade.Body|null;
        body?.setAllowGravity(allowGravity);
    }

    /**
     * Method to remove HP from the sprite
     * @param amount
     */
    public takeDamage(amount : number): void {
        this.hp -= amount;
    }

    /**
     * Returns the current HP of the sprite
     */
    public getCurrentHp(): number {
        return this.hp;
    }

    /**
     * Returns the max HP of the sprite
     */
    public getMaxHp(): number {
        return this.maxHp;
    }

    /**
     * Returns true if the sprite is dead
     */
    public isDead(): boolean {
        return this.hp <= 0;
    }
}