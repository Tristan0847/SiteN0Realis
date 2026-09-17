import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueImageSlot, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene2 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "speaker.bauk",
                text: "2.b1",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 690,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 400,
                            y: 266
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.57
                    },
                    {
                        textureKey: "kangouman",
                        position: {
                            x: 220,
                            y: 460
                        },
                        width: 288,
                        height: 310.5,
                        opacity: 1
                    }
                ],
                transition: true,
            },
            {
                speakerName: "speaker.bauk",
                text: "2.2",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 690,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 400,
                            y: 266
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.67
                    },
                    {
                        textureKey: "kangouman",
                        position: {
                            x: 220,
                            y: 460
                        },
                        width: 288,
                        height: 310.5,
                        opacity: 0.5
                    }
                ],
                transition: true,
            },
            {
                speakerName: "",
                text: "2.2",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 690,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 400,
                            y: 266
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    }
                ]
            },
            {
                speakerName: "speaker.v",
                text: "2.v3",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 700,
                            y: 400
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
                text: "2.jp4",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 690,
                            y: 460
                        },
                        width: 256,
                        height: 256,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 400,
                            y: 400
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    }
                ],
            },
            {
                speakerName: "speaker.v",
                text: "2.v5",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 700,
                            y: 400
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
                speakerName: "speaker.v",
                text: "2.v6",
                images: null,
            },
            {
                speakerName: "speaker.jp",
                text: "2.jp7",
                images: [
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 400,
                            y: 400
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 575,
                            y: 460
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "speaker.v",
                text: "2.v8",
                images: [],
            },
        ]

        super("jp-dialog-2", "jp-shooter-3", sections, "soundtrack/JP_DIALOGUE_2.mp3");
    }
}