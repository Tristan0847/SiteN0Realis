import {DEFAULT_LANGUAGE, Language, TranslationDict} from "./types";
import {gameSettingsStore} from "@/engine/core/settings/GameSettingsStore";

/**
 * Global Translation store, without live update, updates upon next scene
 */
class TranslationStore {
    private resources: Partial<Record<Language, TranslationDict>> = {};

    /**
     * Registers a new dictionary resource to the store
     */
    public registerResources(language: Language, dict: TranslationDict, preKey: string = ""): void {
        const newRes = preKey ? { [preKey]: dict } : dict;

        this.resources[language] = {
            ...(this.resources[language] ?? {}),
            ...newRes,
        };
    }

    public getLanguage(): Language {
        return gameSettingsStore.getLanguage();
    }

    public t(key: string, params?: Record<string, string | number>): string {
        const raw = this.resolveKey(key, gameSettingsStore.getLanguage())
            ?? this.resolveKey(key, DEFAULT_LANGUAGE)
            ?? key;

        return this.interpolate(raw, params);
    }

    private resolveKey(key: string, language: Language): string | undefined {
        const dict = this.resources[language];
        if (!dict) return undefined;

        const value = key.split(".").reduce<TranslationDict | string | undefined>(
            (acc, part) => (acc && typeof acc === "object" ? acc[part] : undefined),
            dict,
        );

        return typeof value === "string" ? value : undefined;
    }

    private interpolate(text: string, params?: Record<string, string | number>): string {
        if (!params) return text;

        return text.replace(/{{(\w+)}}/g, (_, name) =>
            params[name] !== undefined ? String(params[name]) : `{{${name}}}`
        );
    }
}

export const translationStore = new TranslationStore();
export const t = (key: string, params?: Record<string, string | number>): string =>
    translationStore.t(key, params);