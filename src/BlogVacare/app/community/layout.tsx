import '@BlogsFront/styles/globals.css';
import {Metadata} from 'next';
import {AsideCommunity} from "@BlogsFront/components/community/Aside";
import {FooterCommunity} from "@BlogsFront/components/community/Footer";
import FondResonance from "lib/components/FondResonances";
import { TypeConfigResonance } from "lib/utils/Resonances/ResonanceConfig";

/**
 * Composant pour gérer les balises meta du site
 * @returns Objet Metadata contenant les balises meta
 */
export function generateMetadata(): Metadata {
    return {
        title: 'AVOS Community',
        description: 'AVOS Community',
        keywords: 'Blog, Vacare, AntiR, SuperFlashAtomicMan, Dr Owl, TristanRC',
        authors: [{name: 'Dr Owl, AntiR - 2010'}],
        icons: '/assets/BlogVacare/0.ico',
    };
}

/**
 * Layout racine : commun à tout le site
 */
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen"
            style={{
                background: "radial-gradient(circle," +
                    "rgba(122, 122, 122, 1) 0.1%, " +
                    "rgba(17, 212, 17, 1) 0.2%, " +
                    "rgba(37, 122, 37, 1) 10%, " +
                    "rgba(11, 143, 11, 1) 14.99%, " +
                    "rgba(8, 40, 7, 1) 15%, " +
                    "rgba(11, 143, 11, 1) 15.01%, " +
                    "rgba(17, 212, 17, 1) 20%, " +
                    "rgba(13, 143, 13, 1) 25%, " +
                    "rgba(0, 158, 0, 1) 29%, " +
                    "rgba(0, 150, 0, 1) 30%, " +
                    "rgba(0, 158, 0, 1) 31%, " +
                    "rgba(13, 143, 13, 1) 40%, " +
                    "rgba(32, 192, 32, 1) 50%, " +
                    "rgba(48, 138, 48, 1) 55%, " +
                    "rgba(0, 140, 0, 1) 75%, " +
                    "rgba(138, 200, 138, 1) 78%, " +
                    "rgba(13, 143, 13, 1) 79%, " +
                    "rgba(58, 140, 58, 1) 82%, " +
                    "rgba(82, 156, 82, 1) 87.3%, " +
                    "rgba(55, 255, 55, 1) 87.4%, " +
                    "rgba(82, 156, 82, 1) 87.5%, " +
                    "rgba(34, 230, 34, 1) 91%" +
                    ")"
            }}
        >
            <FondResonance preset={TypeConfigResonance.avos}/>
            <div className="relative min-h-screen font-mono z-10 mx-auto grid grid-cols-1 gap-4 xs:grid-cols-[15rem_minmax(0,1fr)] md:grid-cols-[25rem_minmax(0,1fr)] md:items-start">
                <AsideCommunity />
                <main className="min-w-0 min-h-[95vh]">
                    <div className="mx-4 md:mx-auto flex md:w-full max-w-7xl my-6 flex-col items-center gap-3">
                        {children}
                    </div>
                </main>
                <div className="col-span-full">
                    <FooterCommunity />
                </div>
            </div>
        </div>
    );
}

