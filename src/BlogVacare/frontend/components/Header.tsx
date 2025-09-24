'use client';

import Link from "next/link";

/**
 * Méthode de composant pour afficher le header du site
 * @returns Composant React contenant le header du site
 */
export function Header() {
    return (
            <header className="bg-primary p-4 text-white shadow-md">
                <h1 className="text-2xl font-bold">Blog Vacare</h1>
                <nav>
                    <ul className="flex space-x-4 mt-2">
                        <li><Link href="/" className="hover:underline">Accueil</Link></li>
                    </ul>
                </nav>
            </header>
    );
}