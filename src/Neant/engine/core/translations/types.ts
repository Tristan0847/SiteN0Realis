export const SUPPORTED_LANGUAGES = ["fr", "en"] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];
export const DEFAULT_LANGUAGE: Language = "fr";

export type TranslationDict = { [key: string]: string|TranslationDict };