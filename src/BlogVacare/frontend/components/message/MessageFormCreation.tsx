"use client";

import { useState } from "react";
import { AccesRestreint } from "@BlogsFront/components/auth/AccesRestreint";
import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";

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

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    const titre = (variant == "old") ? "Ajoute ta réponse au blog !" : "Répondre";

    return(
    <section className="mx-auto px-4 py-5 max-w-4xl">
        <form onSubmit={gererSoumission} className={ styles.formContainer }>
            <h3 className={ styles.formH3 }>{ titre }</h3>

            {/*Affichage de l'erreur s'il y en a une*/}
            {erreur && (
                <div className={ styles.messageFormDiv }>
                    {erreur.message}
                </div>
            )}

            {/*Affichage du composant du formulaire*/}
            <div>
                <label htmlFor="nom" className={ styles.formLabel }>Votre réponse :</label>
                <textarea id="nom" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={255} className={ styles.formInput } required />
                

                <div className="flex gap-2">
                    <button type="submit" disabled={chargement} className={ styles.formBouton }>
                        {chargement ? "Réponse en cours..." : "Répondre au blog"}
                    </button>
                </div>
            </div>

        </form>
    </section>
    )

}