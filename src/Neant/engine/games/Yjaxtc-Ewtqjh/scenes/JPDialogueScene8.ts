import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene8 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "JP",
                text: "Vas-y, la caméra est lancée ! Il est enfin grand temps pour toi de le faire ! ",
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
                speakerName: "JP",
                text: "J'ai foi en toi, Bauk, je sais que tu l'auras !",
                images: null,
            },
        ]

        super("jp-dialog-8", "jp-shooter-final-3", sections, "soundtrack/JP_DIALOGUE_6.mp3", false);
    }
}