import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene7 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "JP",
                text: "Dégage, #####, je sais ce que tu voulais, je l'ai pas fait",
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
                speakerName: "#####",
                text: "Pas fait ? Pas fait quoi ? Tu es bien allé au match de Bauk non ?",
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
                speakerName: "JP",
                text: "Ouais et je sais quels sentiments tu voulais que ça me provoque, ça a pas pris, ça prendra jamais !",
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
                speakerName: "JP",
                text: "J'aimerais te dire que je te souhaite une bonne continuation...",
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
                speakerName: "JP",
                text: "Mais je pense que je te souhaite surtout de trouver l'aide qu'il te faut pour surmonter son départ.",
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