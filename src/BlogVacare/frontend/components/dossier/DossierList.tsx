'use client';

import { Dossier } from '@BlogsShared/model/Dossier';
import { DossierItem } from '@BlogsFront/components/dossier/DossierItem';

/**
 * Props du composant DossierList
 */
type DossierListProps = {
    dossiers: Dossier[];
}

/**
 * Méthode de composant pour afficher une liste de Dossiers
 * @param dossiers Liste des Dossiers à afficher
 * @returns Composant React contenant la liste de Dossiers
 */
export function DossierList({ dossiers }: DossierListProps) {
    return (
        // Affichage ligne par ligne des dossiers
        <section>
            <div className="mb-4 rounded-lg shadow-md text-center border-4 border-stone-700 bg-white">
                <div className="border-b-2 border-stone-700 bg-gradient-to-b from-gray-300/50 to-white">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">Bienvenue sur le Blog de Vacare</h2>
                        <p className="text-black pb-2">
                            Anciennement blog de Vince et de son meilleur ami, ce forum est aujourd'hui celui de Vacare et, par conséquent, de <strong>N0Realis</strong>.<br/>
                            Espace réservé aux employés autorisés, ne contactez Vacare qu'en cas de nécessité absolue.<br/>
                            <strong>Nos rêves deviendront réalité.</strong>
                        </p>
                    </div>
                </div>

                <div className="border-b-2 pt-2 pb-1"/>

                <ul className="space-y-4 divide-y-2 divide-stone-800 pl-4 pr-4">
                {dossiers.map(d => (
                    <li key={d.getId()} className="last:divide-y-0">
                        <DossierItem dossier={d}/>
                    </li>
                ))}
                </ul>
            </div>
        </section>

    );
}