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
        // Local storage if available
        if (typeof window !== "undefined" && window.localStorage) {
            const value = window.localStorage.getItem(this.storageKey);
            return value || null;
        }

        // Fallback cookies
        if (typeof document !== "undefined") {
            const match = document.cookie
                .split(";")
                .map((c) => c.trim())
                .find((c) => c.startsWith(this.storageKey + "="));
            if (!match) return null;
            const [, raw] = match.split("=");
            return raw || null;
        }

        // Else, returns nothing
        return null;
    }

    /**
     * Save current scene id to storage
     * @param sceneId Scene id to save
     */
    save(sceneId: string): void {
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(this.storageKey, sceneId);
        }

        if (typeof document !== "undefined") {
            document.cookie = `${this.storageKey}=${sceneId};path=/;SameSite=Lax`;
        }
    }

    /**
     * Clear current scene id from storage
     */
    clear(): void {
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.removeItem(this.storageKey);
        }

        if (typeof document !== "undefined") {
            document.cookie = `${this.storageKey}=;path=/;SameSite=Lax;max-age=0`;
        }
    }
}