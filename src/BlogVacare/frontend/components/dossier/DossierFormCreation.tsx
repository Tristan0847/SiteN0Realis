"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Paramètres de création du formulaire
 */
interface FormulaireDossierProps {
    onSubmit: (nom: string, description: string) => Promise<void>;
    chargement: boolean;
    erreur: Error|null;
    estConnecte: boolean;
}

/**
 * Composant de formulaire de création de dossier
 * @param param0 Méthode à exécuter à la création du dossier, état de chargement ou d'erreur et si l'utilisateur est connecté ou non
 */
export function DossierFormCreation({onSubmit, chargement, erreur, estConnecte} : FormulaireDossierProps) {

    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");

    // Gestion de la soumission du formulaire
    const gererSoumission = async (e: React.FormEvent) => {
        e.preventDefault();

        // Exécution de la logique de création de dossier
        await onSubmit(nom, description);

        setNom("");
        setDescription("");
    }

    // Il faut être connecté pour créer le dossier
    if (!estConnecte) {
        return <section className="mx-auto px-4 py-5 max-w-4xl">
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md border-2 border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-orange-900">
                            Accès restreint
                        </h3>
                    </div>
                    
                    <p className="text-orange-800 mb-4">
                        Vous devez être connecté pour créer un dossier.
                    </p>
                    
                    <Link href="/connexion" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">Se connecter</Link>
                </div>
            </section>;
    }

    return(
    <section className="mx-auto px-4 py-5 max-w-4xl">
        <form onSubmit={gererSoumission} className="space-y-4 p-6 bg-slate-50 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary-dark">Créer un nouveau dossier de blogs</h3>

            {/*Affichage de l'erreur s'il y en a une*/}
            {erreur && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {erreur.message}
                </div>
            )}

            {/*Affichage des composants du formulaire*/}
            <div>
                <label htmlFor="nom" className="block, text-sm font-medium text-neutral-dark mb-1">Nom du dossier</label>
                <input id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} maxLength={255} className="w-full px-3 py-2 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
                
                <label htmlFor="description" className="block, text-sm font-medium text-neutral-dark mb-1">Description du dossier</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />

                <div className="flex gap-2">
                    <button type="submit" disabled={chargement} className="flex-1 bg-primary-light hover:bg-primary-dark text-black hover:text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50">
                        {chargement ? "Création en cours..." : "Créer le dossier"}
                    </button>
                </div>
            </div>

        </form>
    </section>
    )

}