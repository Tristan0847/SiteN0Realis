import '@/styles/globals.css';
import FondResonance from "@lib/components/FondResonances";
import {TypeConfigResonance} from "@lib/utils/Resonances/ResonanceConfig";

export const metadata = {
    title: 'Néant',
    description: '...',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className="min-h-full bg-black">
        <body className="min-h-dvh bg-black font-sans">
        <div className="relative flex min-h-dvh flex-col bg-black">
            <FondResonance preset={TypeConfigResonance.neant_faible} />

            <div className="relative z-10 flex min-h-dvh flex-col">
                <main className="flex min-h-dvh w-full flex-1">
                    {children}
                </main>
            </div>
        </div>
        </body>
        </html>
    )
}
