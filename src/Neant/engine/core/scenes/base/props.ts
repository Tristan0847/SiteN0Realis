
// Scene types
export type SceneType = "shooter" | "dialogue" | "menu";

/**
 * Scene props, usable for all scenes with : unique id, scene type, save (if the scene must be saved as the one to use at launch or not), the background color (black by default) and the background music path (no music by default)
 */
export interface BaseSceneProps {
    id: string;
    type: SceneType;
    save: boolean;
    bgColor?: string; // hex code without #
    audioPath?: string;
    nextSceneId?: string;
}

/**
 * Base shooter scene props, with boss data and player damage
 */
export interface ShooterSceneProps extends BaseSceneProps {
    type: "shooter";
    playerDamage: number;
    bossMaxHP : number;
    bossHP?: number; // = bossMaxHP if not defined
    bossThresholdHP?: number; // 0 by default
}

/**
 * Base dialogue scene props, with next scene id
 */
export interface DialogueSceneProps extends BaseSceneProps {
    type: "dialogue";
}

/**
 * Main menu scene props, with title, description and next scene id
 */
export interface MenuSceneProps extends BaseSceneProps {
    type: "menu";
    title: string;
    description?: string;
}

/**
 * Union of all the possible scenes
 */
export type AnySceneProps =
    | ShooterSceneProps
    | DialogueSceneProps
    | MenuSceneProps;