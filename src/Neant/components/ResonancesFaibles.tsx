import FondResonance from "@lib/components/FondResonances";
import {TypeConfigResonance} from "@lib/utils/Resonances/ResonanceConfig";


export function ResonancesFaibles() {
    return (
        <div className="relative flex min-h-dvh flex-col bg-black">
            <FondResonance preset={TypeConfigResonance.neant} />
            <div className="relative z-10 flex min-h-dvh flex-col">
                <main className="flex min-h-dvh w-full flex-1 items-center justify-center">
                    <p className="text-center">
                        Nous rencontrons des problèmes de synchronisation avec vos résonances.<br/>
                        Peut-être pourriez-vous d&apos;abord rencontrer l&apos;une des miennes afin de faciliter notre rencontre ?
                    </p>
                </main>
            </div>
        </div>
    );
}