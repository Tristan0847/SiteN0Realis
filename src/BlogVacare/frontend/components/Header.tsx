'use client';

import { useAuthContexte } from "@BlogsFront/contexts/AuthContext";
import { useDeconnexion } from "@BlogsFront/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Méthode de composant pour afficher le header du site
 * @returns Composant React contenant le header du site
 */
export function Header() {
    
    // Hook de contexte d'authentification (Vérification que l'on est connecté ou non)
    const { estConnecte, utilisateur, chargement: chargementAuth, deconnexion: deconnexionContexte } = useAuthContexte();
    const router = useRouter();

    // Hook de déconnexion
    const { mutation: deconnecter } = useDeconnexion();
    const handleDeconnexion = async () => {
        await deconnecter();
        deconnexionContexte();
        router.push("/");
    };

    return (
            <header className="bg-gradient-to-b from-primary to-green-700 shadow-lg rounded-b-xl p-4 text-white text-center">
                <h1 className="text-3xl font-bold">Blog De Vacare</h1>
                <nav>
                    <ul className="flex items-center justify-center space-x-4 mt-2 text-2xl">
                        <li><Link href="/" className="hover:underline px-3 py-1 hover:bg-white/20">Accueil</Link></li>
                        {chargementAuth ? (
                            <li className="animate-pulse">Chargement...</li>
                        ) : estConnecte ? (
                            <>
                                <li>
                                    <button 
                                        onClick={handleDeconnexion}
                                        className="hover:underline px-3 py-1 rounded-md hover:bg-white/20 transition"
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                                <li className="text-primary-light font-semibold">
                                    👤 {utilisateur?.getUsername()}
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/connexion" className="hover:underline">
                                    Connexion
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
    );
}