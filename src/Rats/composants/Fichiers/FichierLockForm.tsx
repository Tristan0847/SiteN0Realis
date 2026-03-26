"use client";

import { FormEvent, JSX, useState } from "react";
import { GestionnaireMotDePasse } from "@Rats/service/GestionnaireMotDePasse";

/**
 * Props du composant
 */
interface FormLockProps {
    question : string;
    gestionnaireMdp : GestionnaireMotDePasse;
    callbackSucces : (succes : boolean) => void;
};

/**
 * Composant de formulaire demandant le mot de passe d'un dossier
 * @param question Question posée
 * @param gestionnaireMdp Gestionnaire de mots de passe
 * @param callbackSucces Callback appelé lorsque le mot de passe est correct
 * @returns { JSX.Element } Composant React du formulaire
 */
export function FichierLockForm({ question, gestionnaireMdp, callbackSucces }: FormLockProps) : JSX.Element {

    // Etats du composant
    const [motDePasse, setMotDePasse] = useState("");
    const [erreur, setErreur] = useState<string | null>(null);
    const [chargement, setChargement] = useState(false);
    const [succes, setSucces] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErreur(null);
        setChargement(true);
        setSucces(false);

        try {
            const ok = await gestionnaireMdp.verifierMotDePasse(motDePasse);
            if (!ok) {
                setErreur("Mot de passe incorrect");
            } else {
                setSucces(true);
                callbackSucces(true);
            }
        } catch (err) {
            setErreur("Erreur lors de la vérification du mot de passe");
            callbackSucces(false);
        } finally {
            setChargement(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p>{ question }</p>

        {/* Champ de saisie, bloqué si la vérification est en cours ou que le mot de passe a été validé */}
        <input type="text" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} className="border px-2 py-1" placeholder="Entrez le mot de passe" disabled={chargement || succes}/>

        {erreur && <p className="text-red-600 text-sm">{erreur}</p>}
        {succes && (
            <p className="text-white text-sm">Dossier débloqué !</p>
        )}

        <button type="submit" className="bg-blue-900 mx-auto text-white px-5 py-1 rounded" disabled={chargement}>
            {chargement ? "Vérification en cours..." : "Débloquer"}
        </button>
        </form>
    );
}
