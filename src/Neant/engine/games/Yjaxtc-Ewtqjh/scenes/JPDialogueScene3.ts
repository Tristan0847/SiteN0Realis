import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueImageSlot, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

class JPDialogueScene3 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "#####",
                text: "...",
                images: [
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 750,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 1
                    },
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 350,
                            y: 460
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
                    }
                ],
            },
            {
                speakerName: "JP",
                text: "...",
                images: null,
            },
            {
                speakerName: "#####",
                text: "Hey ! Tu savais que les kang-",
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
                text: "On croirait rêver ! Tu cherches quoi au juste ?",
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
                text: "Je parle, je parle et je parle, j'ai même initié une ou deux conversations, tout ça pour quoi ?",
                images: [
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
                text: "On le retrouvera jamais, c'est fini #####, tourne la page putain",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 500,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "#####",
                text: "Aucun rapport, je vois même pas de quoi tu parles tellement ça doit remonter à loiiin tout ça",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
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
                text: "Ah ouais ? Totalement oublié, plus rien ?",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
                            y: 450
                        },
                        width: 288,
                        height: 288,
                        opacity: 1
                    },
                ],
            },
            {
                speakerName: "#####",
                text: "Nada, finito pipo, vive l'avenir, que le passé repose en paix !",
                images: [
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
                    {
                        textureKey: "jp-dialog",
                        position: {
                            x: 600,
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
                text: "Ah ouais, alors ça veut dire quoi le \"S\" dans AVOS ?",
                images: [
                    {
                        textureKey: "Kxcrt",
                        position: {
                            x: 310,
                            y: 450
                        },
                        width: 192,
                        height: 192,
                        opacity: 0.87
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

        super("jp-dialog-3", "jp-shooter-5", sections, "soundtrack/JP_DIALOGUE_2.mp3");
    }
}

export default JPDialogueScene3