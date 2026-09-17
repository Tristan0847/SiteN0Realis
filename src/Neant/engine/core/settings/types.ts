import {AudioBus} from "@/engine/core/audio/AudioBusEnum";
import {DEFAULT_LANGUAGE, Language} from "@/engine/core/translations/types";

export type AudioBusVolumes = Record<AudioBus, number>;

export interface GameSettingsConfig {
    readonly language : Language;
    readonly audio: AudioBusVolumes;
    readonly fullscreen: boolean;
}

export const DEFAULT_SETTINGS: GameSettingsConfig = {
    language: DEFAULT_LANGUAGE,
    audio: {
        [AudioBus.MUSIC]: 0.7,
        [AudioBus.VOICE]: 1,
        [AudioBus.EFFECTS]: 1,
        [AudioBus.VOID]: 0
    },
    fullscreen: false,
};