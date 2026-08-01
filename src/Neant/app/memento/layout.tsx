import '@/styles/globals.css';

export const metadata = {
    title: 'Memento',
    description: '...',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className="min-h-full bg-black">
        <body className="bg-black font-serif text-gray-400">
            <main className="bg-black flex flex-col mb-24 max-w-4xl max-lg:mx-6 mx-auto gap-64">
                {children}
            </main>
        </body>
        </html>
    )
}
