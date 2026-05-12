import {Metadata} from "next";
import FondResonance from "@BlogsFront/components/FondResonances";
import {TypeConfigResonance} from "@BlogsFront/utils/Resonances/ResonanceConfig";

export function generateMetadata(): Metadata {
    return {
        title: '...',
        description: 'Vous êtes en avance',
    };
}


export default function Community() {
    return (
        <div className="bg-black h-screen w-screen">
            <FondResonance preset={TypeConfigResonance.neant}/>
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-black text-lg z-10">Err. 421</h1>
            </div>
        </div>
    );
}