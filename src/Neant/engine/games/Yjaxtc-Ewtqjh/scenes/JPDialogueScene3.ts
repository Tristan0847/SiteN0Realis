import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

class JPDialogueScene3 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "speaker.v",
                text: "3.1",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 750,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 350,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    }
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "3.1",
                images: null,
            },
            {
                speakerName: "speaker.v",
                text: "3.v2",
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
                text: "3.jp3",
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
                text: "3.jp4",
                images: [
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
                text: "3.jp5",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 500,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "speaker.v",
                text: "3.v6",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "3.jp7",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "speaker.v",
                text: "3.v8",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "speaker.jp",
                text: "3.jp9",
                images: [
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 310,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
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
        ]

        super("jp-dialog-3", "jp-shooter-5", sections, "soundtrack/JP_DIALOGUE_2.mp3");
    }
}

export default JPDialogueScene3