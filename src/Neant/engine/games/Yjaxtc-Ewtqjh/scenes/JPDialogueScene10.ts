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
                text: "10.1",
                images: null,
            },
            {
                speakerName: "",
                text: "10.2",
                images: null,
            },
            {
                speakerName: "",
                text: "10.3",
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