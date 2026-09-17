import Phaser from "phaser";
import {NeantCookies} from "@lib/storage/cookies/neant";
import {
    AudioBusVolumes,
    DEFAULT_SETTINGS,
    GameSettingsConfig,
} from "./types";
import {Language, SUPPORTED_LANGUAGES} from "@/engine/core/translations/types";
import {AudioBus} from "@/engine/core/audio/AudioBusEnum";
import {getCookie, setCookie} from "cookies-next";
import {COOKIE_GLOBAL_OPTIONS} from "@lib/storage/cookies/cookie-options";

/**
 * Settings store to persist the game settings (language, audio volumes, fullscreen preference) and save it on the cookie
 * Read by TranslationStore, AudioManager, etc.
 */
class GameSettingsStore {
    private settings: GameSettingsConfig = DEFAULT_SETTINGS;
    private onBusVolumeChange?: ((bus: AudioBus, volume: number) => void);

    /**
     * To call once at app start, before any reading of settings by the rest of the engine.
     */
    public constructor() {
        this.settings = this.readFromCookie() ?? DEFAULT_SETTINGS;
    }

    public setOnBusVolumeChange(onChange: ((bus: AudioBus, volume: number) => void)): void {
        this.onBusVolumeChange = onChange;
    }

    public getSettings(): Readonly<GameSettingsConfig> {
        return this.settings;
    }

    public getLanguage(): Language {
        return this.settings.language;
    }

    public setLanguage(language: Language): void {
        if (!SUPPORTED_LANGUAGES.includes(language)) return;
        this.update({ ...this.settings, language });
    }

    public getBusVolume(bus: AudioBus): number {
        return this.settings.audio[bus];
    }

    public setBusVolume(bus: AudioBus, volume: number): void {
        this.update({
            ...this.settings,
            audio: { ...this.settings.audio, [bus]: Phaser.Math.Clamp(volume, 0, 1) },
        });
        this.onBusVolumeChange?.(bus, volume);
    }

    public getFullscreenPreference(): boolean {
        return this.settings.fullscreen;
    }

    public setFullscreenPreference(fullscreen: boolean): void {
        this.update({ ...this.settings, fullscreen });
    }

    private update(next: GameSettingsConfig): void {
        this.settings = next;
        this.writeToCookie(next);
    }

    private readFromCookie(): GameSettingsConfig | null {
        if (typeof document === "undefined") return null;

        const raw = getCookie(NeantCookies.common.config);

        if (!raw) return null;

        try {
            return this.sanitize(JSON.parse(decodeURIComponent(raw as string)));
        } catch {
            return null;
        }
    }

    /**
     * Merge the default values with the values from the cookie
     */
    private sanitize(raw: unknown): GameSettingsConfig {
        const input = (raw && typeof raw === "object") ? raw as Partial<GameSettingsConfig> : {};

        const language = (typeof input.language === "string"
            && (SUPPORTED_LANGUAGES as readonly string[]).includes(input.language))
            ? input.language as Language
            : DEFAULT_SETTINGS.language;

        const audio = Object.values(AudioBus).reduce((acc, bus) => {
            const value = input.audio?.[bus];
            acc[bus] = typeof value === "number"
                ? Phaser.Math.Clamp(value, 0, 1)
                : DEFAULT_SETTINGS.audio[bus];
            return acc;
        }, {} as AudioBusVolumes);

        const fullscreen = typeof input.fullscreen === "boolean"
            ? input.fullscreen
            : DEFAULT_SETTINGS.fullscreen;

        return { language, audio, fullscreen };
    }

    private writeToCookie(settings: GameSettingsConfig): void {
        if (typeof document === "undefined") return;

        setCookie(NeantCookies.common.config, JSON.stringify(settings), COOKIE_GLOBAL_OPTIONS);
    }
}

export const gameSettingsStore = new GameSettingsStore();