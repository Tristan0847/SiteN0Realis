import '@BlogsFront/styles/globals.css';

/**
 * Layout racine : commun à tout le site
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">

        <head>
            <title>Blog Vacare</title>
            <meta name="author" content="Tristan D. - 2025, Dr Owl - 2003" />
        </head>

        <body className="bg-neutral-light text-neutral-dark font-sans">
            <header className="bg-primary p-4 text-white shadow-md">
            <h1 className="text-2xl font-bold">Blog Vacare</h1>
            </header>

            <main className="min-h-[70vh] p-6">
                {children}
            </main>

            <footer className="bg-neutral p-4 text-center text-sm text-neutral-light">
                © 2025 N0Realis - Tous droits réservés
            </footer>
        </body>

        </html>
    );
}
