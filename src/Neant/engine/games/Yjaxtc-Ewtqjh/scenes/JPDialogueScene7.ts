import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene7 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "speaker.jp",
                text: "7.jp1",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 750,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 350,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    },
                ],
            },
            {
                speakerName: "speaker.v",
                text: "7.v2",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 750,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 450,
                            y: 450
                        },
                        width: 320,
                        height: 320,
                        opacity: 0.87
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "7.jp3",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 750,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 350,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "7.jp4",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 850,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 350,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "7.jp5",
                images: [
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 350,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.45
                    },
                ],
            },
        ]

        super("jp-dialog-7", "jp-shooter-final-2", sections, "soundtrack/JP_DIALOGUE_6.mp3", false);
    }
}