import Phaser from "phaser";

export interface HitEffectConfig {
    readonly animationKey: string;
    readonly soundKey?: string;
    readonly soundConfig?: Phaser.Types.Sound.SoundConfig;
    readonly displayWidth?: number;
    readonly displayHeight?: number;
}

/**
 * Visual effect displayed on hit, destroyed after animation
 */
export class HitEffect extends Phaser.GameObjects.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config: HitEffectConfig,
        onComplete?: () => void,
    ) {
        const firstFrameTexture = scene.anims.get(config.animationKey)?.frames[0]?.textureKey ?? "__DEFAULT";
        super(scene, x, y, firstFrameTexture);

        scene.add.existing(this);
        this.setOrigin(0.5);
        this.setDepth(410);

        if (config.displayWidth && config.displayHeight) {
            this.setDisplaySize(config.displayWidth, config.displayHeight);
        }

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
            onComplete?.();
        });

        this.play(config.animationKey);
    }
}