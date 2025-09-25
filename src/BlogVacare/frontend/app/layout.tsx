import { Footer } from '@BlogsFront/components/Footer';
import { Header } from '@BlogsFront/components/Header';
import '@BlogsFront/styles/globals.css';
import { Metadata } from 'next';

/**
 * Composant pour gérer les balises meta du site
 * @returns Objet Metadata contenant les balises meta
 */
export function generateMetadata(): Metadata {
  return {
    description: 'Blog de Vacare',
    keywords: 'Blog, Vacare, Tristan D., N0Realis, TristanRC',
    authors: [{ name: 'Tristan D. - 2025, Dr Owl - 2003' }],
    icons: '/assets/BlogVacare/0.ico',
  };
}

/**
 * Layout racine : commun à tout le site
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="fr">
        
      <body className="bg-neutral-light text-neutral-dark font-sans flex flex-col min-h-screen">
          <Header/>

          <main className="min-h-[70vh] p-6 mx-auto w-full max-w-4xl flex-grow">
              {children}
          </main>

          <Footer/>
      </body>

      </html>
  );
}
