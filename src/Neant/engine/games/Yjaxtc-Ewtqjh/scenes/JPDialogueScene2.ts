import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueImageSlot, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene2 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "Kangou-Man",
                text: "Imaginez un peu l'idée ! Le voyage d'une vie, de la France à l'Australie ! ",
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
                speakerName: "Kangou-Man",
                text: "...",
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
                text: "...",
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
                speakerName: "#####",
                text: "Tu y crois toi ? Sacré garnement ce bon vieux Bauk !",
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
                speakerName: "JP",
                text: "#####, stop, arrête, putain, tu crois que je vois pas clair dans ton jeu ?!",
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
                speakerName: "#####",
                text: "Du calme, du calme, qu'est-ce qui me vaut donc une telle agression ?",
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
                speakerName: "#####",
                text: "On ne fait que passer du bon temps ensemble, pas vrai ?",
                images: null,
            },
            {
                speakerName: "JP",
                text: "OUVRE LES YEUX, ##### ! BAUK N'EST PAS ET NE SERA JAMAIS-",
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
                speakerName: "#####",
                text: "Ne t'avise même pas de prononcer son nom.",
                images: [],
            },
        ]

        super("jp-dialog-2", "jp-shooter-3", sections, "soundtrack/JP_DIALOGUE_2.mp3");
    }
}