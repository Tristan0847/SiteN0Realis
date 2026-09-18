import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene5 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "speaker.v",
                text: "5.v1",
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
                            x: 350,
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
                text: "5.jp2",
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
                text: "5.v3",
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
                text: "5.jp4",
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
                            x: 450,
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
                text: "5.v5",
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
                text: "5.jp6",
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
                            x: 450,
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
                text: "5.v7",
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
                            x: 447,
                            y: 450
                        },
                        width: 320,
                        height: 320,
                        opacity: 0.57
                    },
                ],
            },
        ]

        super("jp-dialog-5", "jp-shooter-8", sections, "soundtrack/JP_DIALOGUE_3.mp3");
    }
}