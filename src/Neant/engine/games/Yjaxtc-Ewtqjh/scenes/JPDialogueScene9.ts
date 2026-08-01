import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueImageSlot, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene9 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "???",
                text: "Papa, papa, la fête de l'école, on peut y aller, on peut ?!",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 700,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "JP",
                text: "Parce que c'est une question ?",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
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
                speakerName: "JP",
                text: "Un peu qu'on y va !",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 450,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "JP",
                text: "Laisse-moi juste prévenir tonton Ed, il m'a dit qu'il attendait le signal pour que je l'invite !",
                images: [
                    {
                        textureKey: "jps-kid",
                        position: {
                            x: 250,
                            y: 450
                        },
                        width: 192,
                        height: 192,
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
        ]

        super("jp-dialog-9", "jp-shooter-final-4", sections, "soundtrack/JP_DIALOGUE_6.mp3", false);
    }
}