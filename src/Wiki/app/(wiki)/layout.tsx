import '@Wiki/styles/globals.css';
import 'svg-toolbelt/dist/svg-toolbelt.css';
import 'reactflow/dist/style.css';
import { Footer } from '@Wiki/components/Footer';
import { Header } from '@Wiki/components/Header';
import { Metadata } from 'next';

/**
 * Composant pour gérer les balises meta du site
 * @returns Objet Metadata contenant les balises meta
 */
export function generateMetadata(): Metadata {
    return {
        description: 'L\'Oeil de l\'Occulte',
        keywords: 'Oeil, Occulte, Tristan D., AntiR, TristanRC',
        authors: [{ name: 'Tristan D. - 2025, AntiR & Dr Owl - 06/2002, AntiR - 01/2001' }],
        icons: { icon: process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + '/assets/logo/Oeil-de-L_occulte.ico' : '/assets/logo/Oeil-de-L_occulte.ico' },
    };
}

/**
 * Layout principal du site
 * @param children Contenu de la page
 * @returns 
 */
export default function WikiLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="text-neutral-light font-sans flex flex-col min-h-screen bg-gray-900">
                <Header />

                <main className="container mx-auto px-4 py-8">
                    {children}
                </main>
                
                <Footer />
            </body>
        </html>
    );
}