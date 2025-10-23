"use client";

import { useState } from "react";
import { AccesRestreint } from "@BlogsFront/components/auth/AccesRestreint";

/**
 * Paramètres de création du formulaire
 */
interface FormulaireMessageProps {
    onSubmit: (contenu: string) => Promise<void>;
    chargement: boolean;
    erreur: Error|null;
    estConnecte: boolean;
}

/**
 * Composant de formulaire de création de message
 * @param param0 Méthode à exécuter à la création du message, état de chargement ou d'erreur et si l'utilisateur est connecté ou non
 */
export function MessageFormCreation({onSubmit, chargement, erreur, estConnecte} : FormulaireMessageProps) {

    const [message, setMessage] = useState("");

    // Gestion de la soumission du formulaire
    const gererSoumission = async (e: React.FormEvent) => {
        e.preventDefault();

        // Exécution de la logique de création de message
        await onSubmit(message);

        setMessage("");
    }

    // Il faut être connecté pour créer le dossier
    if (!estConnecte) {
        return <AccesRestreint message={'Vous devez être connecté pour répondre à un blog.'} />;
    }

    return(
    <section className="mx-auto px-4 py-5 max-w-4xl">
        <form onSubmit={gererSoumission} className="space-y-4 p-6 bg-slate-50 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary-dark">Répondre</h3>

            {/*Affichage de l'erreur s'il y en a une*/}
            {erreur && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {erreur.message}
                </div>
            )}

            {/*Affichage du composant du formulaire*/}
            <div>
                <label htmlFor="nom" className="block, text-sm font-medium text-neutral-dark mb-1">Votre réponse :</label>
                <textarea id="nom" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={255} className="w-full px-3 py-2 my-5 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
                

                <div className="flex gap-2">
                    <button type="submit" disabled={chargement} className="flex-1 bg-primary-light hover:bg-primary-dark text-black hover:text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50">
                        {chargement ? "Réponse en cours..." : "Répondre au blog"}
                    </button>
                </div>
            </div>

        </form>
    </section>
    )

}