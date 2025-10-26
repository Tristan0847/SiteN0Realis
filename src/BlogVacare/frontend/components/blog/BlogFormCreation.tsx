"use client";

import { useState } from "react";
import { AccesRestreint } from "@BlogsFront/components/auth/AccesRestreint";
import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";

/**
 * Paramètres de création du formulaire
 */
interface FormulaireBlogProps {
    onSubmit: (nom: string, premierMessage: string) => Promise<void>;
    chargement: boolean;
    erreur: Error|null;
    estConnecte: boolean;
}

/**
 * Composant de formulaire de création de blog
 * @param param0 Méthode à exécuter à la création du blog, état de chargement ou d'erreur et si l'utilisateur est connecté ou non
 */
export function BlogFormCreation({onSubmit, chargement, erreur, estConnecte} : FormulaireBlogProps) {

    const [nom, setNom] = useState("");
    const [premierMessage, setPremierMessage] = useState("");

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    // Gestion de la soumission du formulaire
    const gererSoumission = async (e: React.FormEvent) => {
        e.preventDefault();

        // Exécution de la logique de création de blog
        await onSubmit(nom, premierMessage);

        setNom("");
        setPremierMessage("");
    }

    // Il faut être connecté pour créer le blog
    if (!estConnecte) {
        return <AccesRestreint message={"Vous devez être connecté pour créer un blog."} />;
    }

    
    const titre = (variant == "old") ? "Crée ton blog !" : "Créer un nouveau blog";
    const bouton = (variant == "old") ? "Créer ton blog !" : "Créer le blog";


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

            {/*Affichage des composants du formulaire*/}
            <div>
                <label htmlFor="nom" className={ styles.formLabel }>Nom du blog</label>
                <input id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} maxLength={255} className={ styles.formInput } required />
                
                <label htmlFor="premierMessage" className={ styles.formLabel }>Premier message du blog :</label>
                <textarea id="premierMessage" value={premierMessage} onChange={(e) => setPremierMessage(e.target.value)} rows={3} className={ styles.formInput } required />

                <div className="flex gap-2">
                    <button type="submit" disabled={chargement} className={ styles.formBouton }>
                        {chargement ? "Création en cours..." : bouton }
                    </button>
                </div>
            </div>

        </form>
    </section>
    )

}