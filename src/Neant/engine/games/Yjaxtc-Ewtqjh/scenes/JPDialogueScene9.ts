import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene9 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "speaker.jpjr",
                text: "9.jpjr1",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.8
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 700,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.8
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "9.jp2",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.5
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 700,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 0.5
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "9.jp3",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.25
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 0.25
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "9.jp4",
                images: [],
            },
        ]

        super("jp-dialog-9", "jp-shooter-final-4", sections, "soundtrack/JP_DIALOGUE_6.mp3", false);
    }
}