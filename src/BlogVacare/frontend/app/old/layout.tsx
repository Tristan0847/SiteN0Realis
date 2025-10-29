import { Footer } from '@BlogsFront/components/Footer';
import { Header } from '@BlogsFront/components/Header';
import FondResonanceClient from '@BlogsFront/components/FondResonances';
import '@BlogsFront/styles/globals.css';
import { AuthProvider } from '@BlogsFront/contexts/AuthContext';
import { Metadata } from 'next';
import { VariantProvider } from '@BlogsFront/contexts/VariantContext';
import { TypeConfigResonance } from '@BlogsFront/utils/Resonances/ResonanceConfig';
import FondResonance from '@BlogsFront/components/FondResonances';

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
        <div style={{ position: 'relative', minHeight: '100vh', background: "linear-gradient(90deg,rgba(255,255,255,1) 0%,rgba(167,167,167,1) 25%,rgba(0,0,0,1) 50%,rgba(167,167,167,1) 75%,rgba(255,255,255,1) 100%)"}}>
          <FondResonance preset={ TypeConfigResonance.old }/>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header/>

            <main className="min-h-[70vh] p-6 mx-auto w-full max-w-8xl flex-grow" style={{ zIndex:1 }}>
                {children}
            </main>

            <Footer/>
          </div>
        </div>
      </AuthProvider>
    </VariantProvider>
  );
}