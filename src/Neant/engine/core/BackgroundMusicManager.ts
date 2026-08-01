import Phaser from "phaser";

/**
 * Global background music manager, for tween transitions and same source management
 */
export class BackgroundMusicManager {
    private currentMusic?: Phaser.Sound.BaseSound;
    private currentSource?: string;

    private fadeInTween?: Phaser.Tweens.Tween;
    private fadeOutTween?: Phaser.Tweens.Tween;

    public constructor(
        private readonly sound: Phaser.Sound.BaseSoundManager,
        private readonly volume = 0.5,
        private readonly fadeDuration = 200,
    ) {
    }

    /**
     * Plays a music and stops the current one with transition
     * @param source
     * @param key
     * @param tweens The scene's tweens manager
     */
    public play(
        source: string | undefined,
        key: string | undefined,
        tweens: Phaser.Tweens.TweenManager,
    ): void {
        if (!source || !key) {
            this.stopImmediately();
            return;
        }

        if (
            this.currentSource === source
            && this.currentMusic?.isPlaying
        ) {
            return;
        }

        this.cancelTweens();

        const previousMusic = this.currentMusic;


        const nextMusic = this.sound.add(key, {
            loop: true,
            volume: 0,
        });

        this.currentMusic = nextMusic;
        this.currentSource = source;

        nextMusic.play();

        this.fadeInTween = tweens.add({
            targets: nextMusic,
            volume: this.volume,
            duration: this.fadeDuration,
            ease: "Sine.easeOut",
            onComplete: () => {
                if (this.currentMusic === nextMusic) {
                    this.fadeInTween = undefined;
                }
            },
        });

        if (!previousMusic) {
            return;
        }

        this.fadeOutTween = tweens.add({
            targets: previousMusic,
            volume: 0,
            duration: this.fadeDuration,
            ease: "Sine.easeIn",
            onComplete: () => {
                previousMusic.stop();
                previousMusic.destroy();

                this.fadeOutTween = undefined;
            },
        });
    }

    /**
     * Stops the current music with transition
     * @param tweens
     * @param onComplete
     */
    public stop(
        tweens: Phaser.Tweens.TweenManager,
        onComplete?: () => void,
    ): void {
        const music = this.currentMusic;

        if (!music) {
            onComplete?.();
            return;
        }

        this.cancelTweens();

        this.fadeOutTween = tweens.add({
            targets: music,
            volume: 0,
            duration: this.fadeDuration,
            ease: "Sine.easeIn",
            onComplete: () => {
                music.stop();
                music.destroy();

                if (this.currentMusic === music) {
                    this.currentMusic = undefined;
                    this.currentSource = undefined;
                }

                this.fadeOutTween = undefined;
                onComplete?.();
            },
        });
    }

    /**
     * Stops the current music without waiting for the transition
     */
    public stopImmediately(): void {
        this.cancelTweens();

        this.currentMusic?.stop();
        this.currentMusic?.destroy();

        this.currentMusic = undefined;
        this.currentSource = undefined;
    }

    public destroy(): void {
        this.stopImmediately();
    }

    private cancelTweens(): void {
        this.fadeInTween?.stop();
        this.fadeInTween = undefined;

        this.fadeOutTween?.stop();
        this.fadeOutTween = undefined;
    }
}