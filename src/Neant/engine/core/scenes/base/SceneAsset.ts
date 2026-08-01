/**
 * Type of asset
 */
export type SceneAssetType = "image" | "audio";

/**
 * Asset to preload
 */
export interface SceneAsset {
    readonly key: string;
    readonly type: SceneAssetType;
    readonly src: string;
    readonly pixelArt?: boolean;
}