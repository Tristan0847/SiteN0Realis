import React, { useState } from "react";
import { FichierAbstract } from "./FichierAbstract";

/**
 * Composant tsx d'affichage d'un fichier
 * @param fichier Données du fichier à afficher
 * @returns Composant TSX du fichier
 */
export function ComposantFichier({ fichier }: { fichier: FichierAbstract }) {
    const [fichierVisible, setFichierVisible] = useState(false);

    return (
        <>
            <button
                id={fichier.getId()}
                className="rounded-lg p-4 hover:scale-105 max-w-sm z-10 hover:bg-gray-100/30 hover:cursor-pointer"
                onClick={() => setFichierVisible(true)}
            >
                <div className="flex items-center gap-3">
                    {fichier.getIcone()}
                    <h2 className={"text-lg font-semibold " + (fichier.getEstRouge() ? "text-red-600" : "text-white")}>
                        {fichier.getNom()}
                    </h2>
                </div>
            </button>

            {fichierVisible && (
                <>
                    <button
                        className="fixed inset-0 w-full h-full bg-gray/50 z-20"
                        onClick={() => setFichierVisible(false)}
                    />
                    <article className={"z-50 fixed inset-0 flex flex-col max-w-3/4 mx-auto bg-black border-1 duration-200 ease-in-out " + (fichier.getEstRouge() ? "border-red-600 text-red-600" : "border-white text-white")}>
                        {/* Header personnalisé*/}
                        <header className="flex items-center justify-between px-4 pt-2 mb-5 border-b-2 border-gray-700">
                            <h2 className="text-xl font-semibold">{fichier.getNom()}</h2>
                            <button className="text-sm hover:cursor-pointer" onClick={() => setFichierVisible(false)}>X</button>
                        </header>
                        <div className="flex-1 overflow-auto p-4 items-center">
                            {fichier.recupererContenuFichier()}
                            {fichier.getDescription() && (
                                <>
                                    <br />
                                    <p className="text-center">-----------------------------</p>
                                    <br />
                                    <p>{fichier.getDescription()}</p>
                                </>
                            )}
                        </div>
                    </article>
                </>
            )}
        </>
    );
}