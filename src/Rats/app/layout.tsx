import '@Rats/styles/globals.css';
import { Metadata } from 'next';

/**
 * Composant pour gérer les balises meta du site
 * @returns Objet Metadata contenant les balises meta
 */
export function generateMetadata(): Metadata {
    return {
        description: 'Le Trou à Rats',
        keywords: 'Rats, N0Realis, Tristan D., Dr Owl, TristanRC',
        authors: [{ name: 'Tristan D. - 2026, Dr Owl - 06/2002' }],
    };
}

/**
 * Layout principal du site
 * @param children Contenu de la page
 * @returns 
 */
export default function RatsLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="text-white font-sourcesans flex flex-col min-h-screen bg-black">
                <main className="container mx-auto px-4 py-8">
                    {children}
                </main>
            </body>
        </html>
    );
}