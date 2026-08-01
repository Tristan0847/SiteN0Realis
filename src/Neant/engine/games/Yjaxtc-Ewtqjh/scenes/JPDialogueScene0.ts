import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene0 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "",
                text: "Immanquablement, nous étions condamnés à nous retrouver.",
                images: null,
            },
            {
                speakerName: "",
                text: "Nous souhaitons vous présenter un Memento.",
                images: null,
            },
            {
                speakerName: "",
                text: "Saurez-vous le lire jusqu'au bout ?",
                images: null,
            },
        ]

        super("jp-dialog-0", "jp-shooter-1", sections);
    }
}