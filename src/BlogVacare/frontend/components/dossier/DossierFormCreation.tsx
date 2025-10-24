"use client";

import { useState } from "react";
import { AccesRestreint } from "@BlogsFront/components/auth/AccesRestreint";
import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";

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

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

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
        return <AccesRestreint message={"Vous devez être connecté pour créer un dossier."} />;
    }

    
    const titre = (variant == "old") ? "Crée ton dossier !" : "Créer un nouveau dossier de blogs";
    const bouton = (variant == "old") ? "Créer ton dossier !" : "Créer le dossier";

    return(
    <section className="w-full max-w-4xl mx-auto px-4 py-5">
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
                <label htmlFor="nom" className={ styles.formLabel }>Nom du dossier</label>
                <input id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} maxLength={255} className={ styles.formInput } required />
                
                <label htmlFor="description" className={ styles.formLabel }>Description du dossier</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={ styles.formInput } required />

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