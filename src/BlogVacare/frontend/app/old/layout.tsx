import { Footer } from '@BlogsFront/components/Footer';
import { Header } from '@BlogsFront/components/Header';
import FondResonanceClient from '@BlogsFront/components/FondResonances';
import '@BlogsFront/styles/globals.css';
import { AuthProvider } from '@BlogsFront/contexts/AuthContext';
import { Metadata } from 'next';
import { VariantProvider } from '@BlogsFront/contexts/VariantContext';

/**
 * Composant pour gérer les balises meta du site
 * @returns Objet Metadata contenant les balises meta
 */
export function generateMetadata(): Metadata {
  return {
    description: 'Forum de SuperFlashAtomicMan et Vince',
    keywords: 'Forum, Vince, SuperFlashAtomicMan, N0Realis, Dr Owl',
    authors: [{ name: 'Dr Owl' }],
    icons: '/assets/BlogVacare/SuperFlashAtomicMan_x_Vince.ico',
  };
}

/**
 * Layout de la vieille version du site : commun à tout le site
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <VariantProvider variant='old'>
      <AuthProvider>
        <Header/>

        <FondResonanceClient />

        <main className="min-h-[70vh] p-6 mx-auto w-full max-w-8xl flex-grow bg-[linear-gradient(0.25turn,rgba(255,255,255,1)_0%,rgba(167,167,167,1)_25%,rgba(0,0,0,1)_50%,rgba(167,167,167,1)_75%,rgba(255,255,255,1)_100%)]">
            {children}
        </main>

        <Footer/>
      </AuthProvider>
    </VariantProvider>
  );
}
