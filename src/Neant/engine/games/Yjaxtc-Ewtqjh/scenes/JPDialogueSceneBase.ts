import {DialogueScene, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";
import {SceneAsset} from "@/engine/core/scenes/base/SceneAsset";

/**
 * Base dialogue scene for the JP Shooter game (preloads the necessary assets and the player and its pool, only the dialogues are necessary)
 */
export abstract class JPDialogueSceneBase extends DialogueScene {

    protected constructor(
        id : string,
        nextSceneId : string,
        sections: DialogueSection[] = [],
        audioRelativePath : string|null = null,
        save : boolean = true
    ) {
        const baseAssetPath = "/assets/games/shooter/Yjaxtc-Ewtqjh/";
        const assets : SceneAsset[] = [
            {
                src: baseAssetPath + "Dialogue/Kxcrt.png",
                key: "Kxcrt",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/JP.png",
                key: "jp-dialog",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/JP_enfant.png",
                key: "jp-kid",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/Enfant de JP.png",
                key: "jps-kid",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/JP_papa.png",
                key: "jp-dad",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/KangouMan.png",
                key: "kangouman",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/Ant.png",
                key: "ant",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/Ami.png",
                key: "ami",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/static.jpg",
                key: "glitch",
                type: "image",
                pixelArt: true
            },
            {
                src: baseAssetPath + "Dialogue/prof.png",
                key: "prof",
                type: "image",
                pixelArt: true
            }
        ];

        super({
            id,
            nextSceneId,
            type: "dialogue",
            save,
            audioPath: (audioRelativePath) ? baseAssetPath + audioRelativePath : undefined,
        }, sections, assets);
    }
}