import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene0 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "",
                text: "0.1",
                images: null,
            },
            {
                speakerName: "",
                text: "0.2",
                images: null,
            },
            {
                speakerName: "",
                text: "0.3",
                images: null,
            },
        ]

        super("jp-dialog-0", "jp-shooter-1", sections);
    }
}