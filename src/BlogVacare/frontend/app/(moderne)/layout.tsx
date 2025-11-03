import { Footer } from '@BlogsFront/components/Footer';
import { Header } from '@BlogsFront/components/Header';
import '@BlogsFront/styles/globals.css';
import { AuthProvider } from '@BlogsFront/contexts/AuthContext';
import { VariantProvider } from '@BlogsFront/contexts/VariantContext';
import FondResonance from '@BlogsFront/components/FondResonances';
import { TypeConfigResonance } from '@BlogsFront/utils/Resonances/ResonanceConfig';

/**
 * Layout racine : commun à tout le site
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <VariantProvider variant='modern'>
      <AuthProvider>
        <div style={{ position: 'relative', minHeight: '100vh', background: "linear-gradient(90deg,rgba(255, 255, 255, 1) 0%, rgba(230, 230, 230, 1) 30%, rgba(212, 205, 205, 1) 50%, rgba(230, 230, 230, 1) 70%, rgba(255, 255, 255, 1) 100%)"}}>
          <FondResonance preset={TypeConfigResonance.modern}/>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header/>
            <main className="min-h-[85vh] p-6 mx-auto w-full max-w-8xl flex-grow">
              {children}
            </main>
            <Footer/>
          </div>
        </div>
      </AuthProvider>
    </VariantProvider>
  );
}
