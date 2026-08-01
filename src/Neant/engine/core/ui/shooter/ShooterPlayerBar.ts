import Phaser from "phaser";

export interface PlayerSpeedBarProps {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly onPositionChange: (input: number) => void;
    readonly onPressStart?: () => void;
    readonly onPressEnd?: () => void;

    readonly backgroundColor?: number;
    readonly handleColor?: number;
    readonly borderColor?: number;
    readonly alpha?: number;
}

/**
 * Bar to control the player's speed and shooting
 */
export class ShooterPlayerBar extends Phaser.GameObjects.Container {
    private readonly zone: Phaser.GameObjects.Rectangle;
    private readonly centerLine: Phaser.GameObjects.Rectangle;
    private readonly handle: Phaser.GameObjects.Rectangle;
    private readonly onPositionChange: (input: number) => void;
    private readonly onPressStart?: () => void;
    private readonly onPressEnd?: () => void;
    private readonly inputPlugin: Phaser.Input.InputPlugin;

    private readonly barWidth: number;
    private readonly barHeight: number;
    private currentHandleX = 0;
    private dragging = false;

    /**
     * Constructor
     * @param scene
     * @param props
     */
    constructor(scene: Phaser.Scene, props: PlayerSpeedBarProps) {
        super(scene, props.x, props.y);

        this.barWidth = props.width;
        this.barHeight = props.height;
        this.onPositionChange = props.onPositionChange;
        this.onPressStart = props.onPressStart;
        this.onPressEnd = props.onPressEnd;

        // Colors and styles
        this.inputPlugin = scene.input;
        const backgroundColor = props.backgroundColor ?? 0x2b2f3a;
        const handleColor = props.handleColor ?? 0xf8fafc;
        const borderColor = props.borderColor ?? 0xe2e8f0;
        const alpha = props.alpha ?? 0.95;

        // Background of the main bar
        const background = scene.add
            .rectangle(0, 0, this.barWidth, this.barHeight, backgroundColor, alpha)
            .setStrokeStyle(2, borderColor, 0.6);

        // Line on the center
        this.centerLine = scene.add
            .rectangle(0, 0, 2, this.barHeight + 10, borderColor, 0.8);

        // Handle to use
        this.handle = scene.add
            .rectangle(0, 0, 12, this.barHeight + 10, handleColor, 1)
            .setStrokeStyle(2, borderColor, 0.8);

        // Zone to detect pointer events
        this.zone = scene.add
            .rectangle(0, 0, this.barWidth, this.barHeight, 0x000000, 0.001)
            .setInteractive({ useHandCursor: true });

        this.add([
            background,
            this.centerLine,
            this.handle,
            this.zone,
        ]);

        scene.add.existing(this);

        this.zone.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
        scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);
        scene.input.on(Phaser.Input.Events.POINTER_UP, this.handlePointerUp, this);

        this.updateVisuals();
    }

    /**
     * Manually updates the input
     */
    public setInput(input: number): void {
        const halfWidth = this.barWidth / 2;
        const clamped = Phaser.Math.Clamp(input, -halfWidth, halfWidth);

        this.currentHandleX = Math.abs(clamped) < 4 ? 0 : clamped;

        this.updateVisuals();

        const ratio = (this.currentHandleX + halfWidth) / this.barWidth;

        this.onPositionChange(ratio);
    }

    /**
     * Cleans the global listeners
     */
    public override destroy(fromScene?: boolean): void {
        // Ends dragging by default
        this.dragging = false;
        this.onPressEnd?.();

        this.zone.off(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);

        this.inputPlugin.off(Phaser.Input.Events.POINTER_UP, this.handlePointerUp, this);
        this.inputPlugin.off(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);

        if (this.zone.scene) {
            this.zone.disableInteractive();
        }

        super.destroy(fromScene);
    }

    /**
     * Handles pointer down events
     * @param pointer
     * @private
     */
    private handlePointerDown(pointer: Phaser.Input.Pointer): void {
        this.dragging = true;
        this.onPressStart?.();
        this.updateFromPointer(pointer);
    }

    /**
     * Handles pointer move events
     * @param pointer
     * @private
     */
    private handlePointerMove(pointer: Phaser.Input.Pointer): void {
        if (!this.dragging || !pointer.isDown) {
            return;
        }

        this.updateFromPointer(pointer);
    }

    private handlePointerUp(): void {
        if (!this.dragging) {
            return;
        }

        this.dragging = false;
        this.onPressEnd?.();
    }

    /**
     * Updates the input value from the pointer position
     * @param pointer
     * @private
     */
    private updateFromPointer(pointer: Phaser.Input.Pointer): void {
        const localX = pointer.worldX - this.x
        this.setInput(localX);
    }

    /**
     * Updates the visuals of the bar
     * @private
     */
    private updateVisuals(): void {
        this.handle.x = this.currentHandleX;
    }
}