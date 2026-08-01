import {JPDialogueSceneBase} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueSceneBase";
import {DialogueImageSlot, DialogueSection} from "../../../core/scenes/base/Shooter/DialogueScene";

export class JPDialogueScene5 extends JPDialogueSceneBase {

    constructor() {
        const sections : DialogueSection[] = [
            {
                speakerName: "#####",
                text: "Ecoute, je suis vraiment désolé mais je vois où tu voulais en venir...",
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
                text: "Ah ouais, et tu vas me baratiner quoi cette fois ? Qu'il y a aucune ressemblance entre eux ?",
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
                text: "Non justement ! Je le comprends aussi maintenant et ça me trouble d'autant plus... Tu crois qu'il le fait exprès ?",
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
                text: "Mais tu te fous de moi ou quoi, bien sûr qu'il le fait exprès après que tu lui ai sûrement montré toute sa vie pour forcer la ressemblance !",
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
                            x: 450,
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
                text: "Et puis quoi encore ! C'est plutôt à toi que je devrais faire ces accusations !",
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
                text: "Donc... aucun de nous 2 ne l'a tenu au jus? C'est qui au juste ? Une coïncidence pareille, c'est pas possible",
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
                            x: 450,
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
                text: "Il est venu me voir à l'ouverture du site pour y être inscrit... Tu crois qu'il savait depuis le début ?",
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
                            x: 447,
                            y: 450
                        },
                        width: 320,
                        height: 320,
                        opacity: 0.57
                    },
                ],
            },
        ]

        super("jp-dialog-5", "jp-shooter-8", sections, "soundtrack/JP_DIALOGUE_3.mp3");
    }
}