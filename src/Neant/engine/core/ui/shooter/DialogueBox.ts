import Phaser from "phaser";

/**
 * Dialogue box for shooters
 */
export class DialogueBox extends Phaser.GameObjects.Container {
    private readonly speakerNameText: Phaser.GameObjects.Text;
    private readonly dialogueText: Phaser.GameObjects.Text;

    /**
     * Creates a new dialogue box
     * @param scene
     */
    constructor(scene: Phaser.Scene) {
        const marginX = 24;
        const topMargin = 24;
        const width = scene.scale.width - marginX * 2;
        const height = 128;

        super(
            scene,
            scene.scale.width / 2,
            topMargin + height / 2
        );

        const background = new Phaser.GameObjects.Rectangle(
            scene,
            0,
            0,
            width,
            height,
            0x10141f,
            0.96,
        )
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xd7dde8, 0.75);

        this.speakerNameText = new Phaser.GameObjects.Text(
            scene,
            -width / 2 + 18,
            -height / 2 + 14,
            "",
            {
                color: "#eeee22",
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
                fontStyle: "bold",
            },
        ).setOrigin(0, 0);

        this.dialogueText = new Phaser.GameObjects.Text(
            scene,
            -width / 2 + 18,
            -height / 2 + 48,
            "",
            {
                color: "#f5f5f5",
                fontFamily: "Arial, sans-serif",
                fontSize: "22px",
                lineSpacing: 6,
                wordWrap: {
                    width: width - 36,
                    useAdvancedWrap: true,
                },
            },
        ).setOrigin(0, 0);

        this.add([
            background,
            this.speakerNameText,
            this.dialogueText,
        ]);

        scene.add.existing(this);

        this.setDepth(500);
        this.setScrollFactor(0);
    }

    /**
     * Sets the speaker name and dialogue text (updates the container to prevent from recreating one for each new dialogue)
     * @param speakerName
     * @param text
     */
    public setDialogue(speakerName: string, text: string): void {
        this.speakerNameText.setText(speakerName);
        this.dialogueText.setText(text);
    }
}