'use client';

import Link from "next/link";

/**
 * Méthode de composant pour afficher le header du site
 * @returns Composant React contenant le header du site
 */
export function Header() {
    return (
            <header className="bg-gradient-to-b from-primary to-green-700 shadow-lg rounded-b-xl p-4 text-white text-center">
                <h1 className="text-3xl font-bold">Blog De Vacare</h1>
                <nav>
                    <ul className="flex items-center justify-center space-x-4 mt-2 text-2xl">
                        <li><Link href="/" className="hover:underline">Accueil</Link></li>
                    </ul>
                </nav>
            </header>
    );
}