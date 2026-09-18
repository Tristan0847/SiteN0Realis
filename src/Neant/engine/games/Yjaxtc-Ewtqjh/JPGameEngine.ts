import {ShooterGameEngine} from "@/engine/core/ShooterGameEngine";
import {translationStore} from "@/engine/core/translations/TranslationStore";
import frMessages from "@/lib/translations/Yjaxtc-Ewtqjh/fr.json";
import enMessages from "@/lib/translations/Yjaxtc-Ewtqjh/en.json";

/**
 * JP GAME ENGINE
 */
export class JPGameEngine extends ShooterGameEngine {
    protected initTranslations(): void {
        super.initTranslations();
        translationStore.registerResources("fr", frMessages, "jp");
        translationStore.registerResources("en", enMessages, "jp");
    }
}