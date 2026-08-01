import {AbstractShooterScene} from "@/engine/core/scenes/base/Shooter/AbstractShooterScene";
import {HittableSprite} from "@/engine/core/entities/HittableSprite";
import {SceneAsset} from "@/engine/core/scenes/base/SceneAsset";
import {setCookie} from "cookies-next";
import {NeantCookies} from "@lib/storage/cookies/neant";
import Phaser from "phaser";
import {Projectile} from "@/engine/core/entities/shooter/Projectile";
import {COOKIE_GLOBAL_OPTIONS} from "@lib/storage/cookies/cookie-options";

/**
 * Shooter ending class
 */
export class JPShooterEnding extends AbstractShooterScene {

    private text!: Phaser.GameObjects.Text;
    private jp!: HittableSprite;
    private bauk!: HittableSprite;

    constructor() {
        const assets : SceneAsset[] = [
            {
                key: "bauk",
                src: "/assets/games/shooter/Yjaxtc-Ewtqjh/Dialogue/KangouMan.png",
                type: "image",
                pixelArt: true
            },
            {
                key: "jp",
                src: "/assets/games/shooter/Yjaxtc-Ewtqjh/Dialogue/JP.png",
                type: "image",
                pixelArt: true
            }
        ]
        super({
            id: "jp-shooter-ending",
            save: true,
            type: "shooter",
            nextSceneId: "jp-shooter-final-1",
            audioPath: "/assets/games/shooter/Yjaxtc-Ewtqjh/soundtrack/JP_DIALOGUE_5.mp3"
        }, assets);
    }

    override create() {
        super.create();

        this.jp = new HittableSprite(
            this,
            950,
            350,
            "jp",
            100,
            100
        ).setDisplaySize(288, 288);

        this.bauk = new HittableSprite(
            this,
            300,
            350,
            "bauk",
            100,
            100
        ).setDisplaySize(288, 288);

        const label = "Comment ce souvenir se termine-t-il ?";

        this.text = this.add.text(
            this.scale.width / 2,
            40,
            label,
            {
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                color: "#cccccc",
            },
        ).setOrigin(0.5, 0);

        this.addCollisionMask(
            this.playerProjectilePool,
            this.jp,
            HittableSprite,
            (projectile, enemy) => this.onEnemyHit(projectile, enemy, "jp")
        );
        this.addCollisionMask(
            this.playerProjectilePool,
            this.bauk,
            HittableSprite,
            (projectile, enemy) => this.onEnemyHit(projectile, enemy, "bauk")
        );
    }

    override shutdown() {
        this.jp?.destroy();
        this.bauk?.destroy();
        this.text?.destroy();

        super.shutdown();
    }

    private onEnemyHit(projectile : Projectile, enemy : HittableSprite, person : "jp" | "bauk"): void {
        enemy.takeDamage(projectile.getDamage());
        projectile.deactivate()

        if (enemy.isDead()) {
            if (person === "jp") {
                this.onJPKilled();
            } else {
                this.onBaukKilled();
            }
        }
    }

    private onBaukKilled(): void {
        setCookie(NeantCookies.jp.ending, "bauk", COOKIE_GLOBAL_OPTIONS);

        this.endGame();
    }

    private onJPKilled(): void {
        this.emitSceneEvent("LOAD_SCENE", this.props.nextSceneId);
    }
}