/**
 * Type of asset
 */
export type SceneAssetType = "image" | "audio";

/**
 * Asset to preload
 */
export interface SceneAsset {
    key: string;
    type: SceneAssetType;
    src: string;
}