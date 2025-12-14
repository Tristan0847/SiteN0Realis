"use client";
/**
 * Props du composant NDA
 */
interface NDAProps {
    auteur: string;
    children?: React.ReactNode;
}

/**
 * Composant de Note de l'auteur
 * @param auteur Auteur de la note
 * @param children Contenu de la note
 * @returns 
 */
export function NDA({ auteur, children }: NDAProps) {
    
    let titre = "Note d";
    // Si c'est une voyelle, on ajoute une apostrophe
    const voyelles = ['a', 'e', 'i', 'o', 'u', 'y'];
    if (voyelles.includes(auteur.charAt(0).toLowerCase())) {
        titre += "'";
    } else {
        titre += "e ";
    }
    titre += "" + auteur; 

    return (
        <div className="border border-red-300 bg-yellow-900 bg-opacity-20 rounded-lg p-4 my-6">
            <h4 className="text-red-100 font-bold mb-2">{titre}</h4>
            <span className="mb-2">
                {children}
            </span>
        </div>
    );
}