import { Footer } from '@BlogsFront/components/Footer';
import { Header } from '@BlogsFront/components/Header';
import FondResonanceClient from '@BlogsFront/components/FondResonances';
import '@BlogsFront/styles/globals.css';
import { AuthProvider } from '@BlogsFront/contexts/AuthContext';
import { VariantProvider } from '@BlogsFront/contexts/VariantContext';

/**
 * Layout racine : commun à tout le site
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <VariantProvider variant='modern'>
      <AuthProvider>
        <Header/>

        <FondResonanceClient/>

        <main className="min-h-[70vh] p-6 mx-auto w-full max-w-8xl flex-grow">
            {children}
        </main>

        <Footer/>
      </AuthProvider>
    </VariantProvider>
  );
}
