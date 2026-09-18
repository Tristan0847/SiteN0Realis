import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {COOKIE_GLOBAL_OPTIONS} from "@lib/storage/cookies/cookie-options";

/**
 * Scene persistence, uses local storage and fallback cookie
 */
export class ScenePersistence {
    private readonly storageKey: string;

    constructor(storageKey = "game.currentSceneId") {
        this.storageKey = storageKey;
    }

    /**
     * Load current scene id from storage
     */
    load(): string | null {
        const value = getCookie(this.storageKey);

        return typeof value === "string" && value.length > 0 ? value : null;
    }

    /**
     * Save current scene id to storage
     * @param sceneId Scene id to save
     */
    save(sceneId: string): void {
        setCookie(this.storageKey, sceneId, COOKIE_GLOBAL_OPTIONS);
    }

    /**
     * Clear current scene id from storage
     */
    clear(): void {
        deleteCookie(this.storageKey, COOKIE_GLOBAL_OPTIONS);
    }
}