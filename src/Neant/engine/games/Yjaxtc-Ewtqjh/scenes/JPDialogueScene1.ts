import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueImageSlot, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene1 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "JP",
                text: "#####, pourquoi tu m'as amené ici ?",
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
                            y: 266
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    }
                ],
            },
            {
                speakerName: "#####",
                text: "Pour que tu rencontres mon ami !",
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
                        width: 288,
                        height: 288,
                        opacity: 0.87
                    },
                ],
            },
            {
                speakerName: "Kangou-Man",
                text: "Hey JP ! On m'a beaucoup parlé de toi, j'ai cru comprendre qu'on devrait s'entendre comme cul et chemise !",
                images: [
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 700,
                            y: 266
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.65
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 800,
                            y: 500
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
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
            },
            {
                speakerName: "JP",
                text: "#####, je veux pas...",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 690,
                            y: 460
                        },
                        width: 288,
                        height: 288,
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
                            x: 200,
                            y: 460
                        },
                        width: 192,
                        height: 207,
                        opacity: 1
                    }
                ],
            },
        ]

        super("jp-dialog-1", "jp-shooter-2", sections, "soundtrack/JP_DIALOGUE_1.mp3");
    }
}