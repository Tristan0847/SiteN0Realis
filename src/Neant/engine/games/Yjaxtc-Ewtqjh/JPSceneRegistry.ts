"use client";
import {JPMenuScene} from "./scenes/JPMenuScene";
import {JPShooterScene1} from "./scenes/JPShooterScene1";
import {JPDialogueScene1} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene1";
import {JPDialogueScene2} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene2";
import JPDialogueScene3 from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene3";
import {JPDialogueScene4} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene4";
import {JPDialogueScene5} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene5";
import {JPDialogueScene6} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene6";
import {JPDialogueScene7} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene7";
import {JPDialogueScene8} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene8";
import {JPDialogueScene9} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene9";
import {JPDialogueScene0} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene0";
import {JPShooterScene2} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene2";
import {JPShooterScene3} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene3";
import {JPShooterScene4} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene4";
import {JPShooterScene5} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene5";
import {JPShooterScene6} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene6";
import {JPShooterScene7} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene7";
import {JPShooterScene8} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene8";
import {JPShooterScene9} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene9";
import {JPShooterScene10} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterScene10";
import {JPShooterEnding} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterEnding";
import {JPShooterFinal1} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterFinal1";
import {JPShooterFinal2} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterFinal2";
import {JPShooterFinal3} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterFinal3";
import {JPShooterFinal4} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPShooterFinal4";
import {JPDialogueScene10} from "@/engine/games/Yjaxtc-Ewtqjh/scenes/JPDialogueScene10";

export const jpScenes = [
    JPMenuScene,
    JPShooterScene1, JPShooterScene2, JPShooterScene3, JPShooterScene4, JPShooterScene5, JPShooterScene6, JPShooterScene7, JPShooterScene8, JPShooterScene9, JPShooterScene10,
    JPDialogueScene0, JPDialogueScene1, JPDialogueScene2, JPDialogueScene3, JPDialogueScene4, JPDialogueScene5, JPDialogueScene6, JPDialogueScene7, JPDialogueScene8, JPDialogueScene9, JPDialogueScene10,
    JPShooterEnding, JPShooterFinal1, JPShooterFinal2, JPShooterFinal3, JPShooterFinal4,
] as const;