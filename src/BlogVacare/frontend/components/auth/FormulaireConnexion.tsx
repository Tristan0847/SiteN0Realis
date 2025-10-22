"use client";

import { useState } from "react";


/**
 * Paramètres de création du formulaire
 */
interface ConnexionProps {
    onSubmit: (nomUtilisateur: string, mdp: string) => Promise<void>;
    chargement: boolean;
    erreur: Error|null;
}

/**
 * Méthode de connexion au site
 * @param param0 Hook nécessaire à la connexion 
 */
export function FormulaireConnexion({ onSubmit, chargement, erreur} : ConnexionProps) {

    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [mdp, setMdp] = useState("");

    // Gestion de la soumission du formulaire
    const gererSoumission = async (e : React.FormEvent) => {
        e.preventDefault();

        await onSubmit(nomUtilisateur, mdp);

        setNomUtilisateur("");
        setMdp("");
    }
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <section className="w-full max-w-md">
                <form onSubmit={gererSoumission} className="space-y-6 p-8 bg-white rounded-xl shadow-2xl border border-primary-light/20">
                    {/* Titre */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-primary-dark mb-2">Connexion</h1>
                        <p className="text-neutral-dark/70 text-sm">Connectez-vous à votre compte</p>
                    </div>

                    {/* Affichage de l'erreur */}
                    {erreur && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-shake">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{erreur.message}</span>
                            </div>
                        </div>
                    )}

                    {/* Champs du formulaire */}
                    <div className="space-y-2">
                        <label htmlFor="nomUtilisateur" className="block text-sm font-semibold text-neutral-dark">
                            Nom d'utilisateur
                        </label>
                        <input id="nomUtilisateur" type="text" value={nomUtilisateur} onChange={(e) => setNomUtilisateur(e.target.value)} className="w-full px-4 py-3 border-2 border-primary-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white hover:border-primary-light/50" placeholder="Entrez votre nom d'utilisateur" required/>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="mdp" className="block text-sm font-semibold text-neutral-dark">
                            Mot de passe
                        </label>
                        <input id="mdp" type="password" value={mdp} onChange={(e) => setMdp(e.target.value)} className="w-full px-4 py-3 border-2 border-primary-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white hover:border-primary-light/50"  placeholder="**************" required />
                    </div>

                    {/* Bouton de soumission */}
                    <button 
                        type="submit" disabled={chargement} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        {chargement ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Connexion en cours...
                            </span>
                        ) : (
                            "Se connecter"
                        )}
                    </button>

                    {/* Lien vers inscription */}
                    <div className="text-center pt-4 border-t border-primary-light/20">
                        <p className="text-sm text-neutral-dark/70">
                            Pas encore de compte ?{' '}
                            <a href="/inscription" className="font-semibold text-primary hover:text-primary-dark transition-colors underline">
                                Inscrivez-vous
                            </a>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );





}