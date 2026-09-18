import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene8 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "speaker.jp",
                text: "8.jp1",
                images: [
                    {
                        textureKey: "kangouman",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 207,
                        opacity: 1
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 700,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "8.jp2",
                images: null,
            },
        ]

        super("jp-dialog-8", "jp-shooter-final-3", sections, "soundtrack/JP_DIALOGUE_6.mp3", false);
    }
}