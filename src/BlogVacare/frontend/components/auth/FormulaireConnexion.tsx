"use client";

import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";
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

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);
    
    // Contenu de la page
    const titre = (variant == "old") ? "Connecte-toi pour venir parler !" : "Connectez-vous à votre compte";
    const votreNom = (variant == "old") ? "Ton pseudo :" : "Nom d'utilisateur";
    const votreNomPlaceholder = (variant == "old") ? "Entre ton pseudo !" : "Entrez votre nom d'utilisateur";
    const votreMdp = (variant == "old") ? "Ton mot de passe super secret :" : "Mot de passe";
        
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <section className="w-full max-w-md">
                <form onSubmit={gererSoumission} className={ styles.formConnexionDiv }>
                    {/* Titre */}
                    <div className="text-center mb-6">
                        <h1 className={ styles.formConnexionTitre }>Connexion</h1>
                        <p className={ styles.formConnexionSousTitre }>{ titre }</p>
                    </div>

                    {/* Affichage de l'erreur */}
                    {erreur && (
                        <div className={ styles.messageFormDiv }>
                            <div className={ styles.messageFormConteneur }>
                                <span className={ styles.messageFormContenu }>{erreur.message}</span>
                            </div>
                        </div>
                    )}

                    {/* Champs du formulaire */}
                    <div className={ styles.formConnexionConteneurChamp }>
                        <label htmlFor="nomUtilisateur" className={ styles.formConnexionLabel }>
                            { votreNom }
                        </label>
                        <input id="nomUtilisateur" type="text" value={nomUtilisateur} onChange={(e) => setNomUtilisateur(e.target.value)} className={ styles.formConnexionChamps } placeholder={ votreNomPlaceholder } required/>
                    </div>

                    <div className={ styles.formConnexionConteneurChamp }>
                        <label htmlFor="mdp" className={ styles.formConnexionLabel }>
                            { votreMdp }
                        </label>
                        <input id="mdp" type="password" value={mdp} onChange={(e) => setMdp(e.target.value)} className={ styles.formConnexionChamps }  placeholder="**************" required />
                    </div>

                    {/* Bouton de soumission */}
                    <button 
                        type="submit" disabled={chargement} className={ styles.formConnexionSoumission }>
                        {chargement ? (
                            <span className="flex items-center justify-center gap-2">
                                {variant == "old" && <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                }
                                
                                Connexion en cours...
                            </span>
                        ) : (
                            "Se connecter"
                        )}
                    </button>
                </form>
            </section>
        </div>
    );





}