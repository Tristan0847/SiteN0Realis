import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";
import {setCookie} from "cookies-next";
import {NeantCookies} from "@lib/storage/cookies/neant";
import {COOKIE_GLOBAL_OPTIONS} from "@lib/storage/cookies/cookie-options";

export class JPDialogueScene10 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "",
                text: "Vous avez atteint la fin de ce Memento.",
                images: null,
            },
            {
                speakerName: "",
                text: "Sa fin est différente. Vous l'avez changé en découvrant une voie connue d'aucun.",
                images: null,
            },
            {
                speakerName: "",
                text: "Briser le cycle ne tenait hypothétiquement qu'à ce simple choix ?",
                images: null,
            },
        ]

        super("jp-dialog-10", "", sections, null, false);
    }

    protected override goToNextScene(data: unknown = null): void {
        setCookie(NeantCookies.jp.ending, "jp", COOKIE_GLOBAL_OPTIONS)

        this.endGame();
    }
}