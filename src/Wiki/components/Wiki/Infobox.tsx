import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

/**
 * Item d'une valeur de type liste dans une infobox
 */
interface InfoboxValeurItem {
    nom: string;
    periode?: string;
    statut?: string;
}

/**
 * Champs d'une infobox
 */
interface InfoboxChamp {
    label: string;
    valeur: string | InfoboxValeurItem[];
    type?: "simple" | "liste";
}

interface InfoboxProps {
    image?: string;
    soustitreImage?: string;
    type?: string;
    champs?: InfoboxChamp[];
}

/**
 * Méthode de génération d'une infobox
 * @param data Données de l'infobox
 * @returns Infobox
 */
export function Infobox({ data }: { data: InfoboxProps }) {
    const lienImage = data.image ? "/assets/" + data.image : "";
    return(
        <aside className="border border-gray-600 rounded-lg overflow-hidden bg-gray-700 float-right ml-6 mb-6 w-full sm:w-80 lg:w-96">
            {data.image && (
                <div className="relative w-full aspect-square bg-gray-700">
                    <Link href={ lienImage } target="_blank" rel="noopener noreferrer">
                        <Image
                            src={ process.env.NEXT_PUBLIC_ASSET_PREFIXE ? process.env.NEXT_PUBLIC_ASSET_PREFIXE + lienImage : lienImage }
                            alt={data.soustitreImage || ""}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </Link>
                    {data.soustitreImage && (
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-sm p-2 text-center">
                            {data.soustitreImage}
                        </div>
                    )}
                </div>
            )}

            {data.type && (
                <div className="bg-blue-700 text-white px-4 py-2 text-center font-bold">
                    {data.type}
                </div>
            )}

            {data.champs && data.champs.length > 0 && (
                <div className="divide-y divide-gray-400">
                    {data.champs.map((champ, key) => (
                        <ChampInfobox key={key} champ={champ} />
                    ))}
                </div>
            )}
        </aside>
    );

}


/**
 * Méthode de génération de champs d'infobox
 * @param champ Données du champ
 * @returns Composant de champ d'infobox
 */
function ChampInfobox({ champ }: { champ: InfoboxChamp }) {

    return(
        <div className="px-4 py-3 text-sm">
            <div className="font-semibold text-gray-100 mb-1">
                {champ.label}
            </div>
            <div className="text-gray-200">
                {traiterValeur(champ)}
            </div>
        </div>
    )
}

/**
 * Méthode de traitement de la valeur d'un champ d'infobox
 * @param champ Champs à traiter
 * @returns Valeur formatée du champ
 */
function traiterValeur(champ: InfoboxChamp) {

    let valeurRetour : ReactNode = null;

    if (champ.type === "liste" && Array.isArray(champ.valeur)) {
        valeurRetour = (
            <details className="group text-white">
                <summary className="cursor-pointer list-none marker:hidden rounded-md px-2 py-1 select-none border border-gray-400 bg-gray-700 hover:bg-gray-600 transition-colors duration-200 ease-in-out">
                    <span className="font-medium group-open:hidden">Voir la liste</span>
                    <span className="font-medium hidden group-open:inline">Cacher la liste</span>
                    <span className="float-right text-xs transition-transform duration-200 ease-in-out group-open:rotate-180">▼</span>
                </summary>
                <ul className="space-y-2 list-['-_']">
              {champ.valeur.map((item, i) => (
              <li key={i}>
                  {typeof item === 'object' ? (
                  <div className="flex flex-col">
                      <span className="font-medium">{item.nom}</span>
                      {item.periode && (
                      <span className="text-xs">{item.periode}</span>
                      )}
                      {item.statut && (
                      <span className="text-xs italic">{item.statut}</span>
                      )}
                  </div>
                  ) : (
                  <span>{item}</span>
                  )}
              </li>
              ))}
            </ul>
            </details>
        );
    } else if (Array.isArray(champ.valeur)) {
        valeurRetour = (
            <ul className="list-disc list-inside space-y-1">
                {champ.valeur.map((item, i) => (
                    <li key={i}>{item.toString()}</li>
                ))}
            </ul>
        );
    } else if (typeof champ.valeur === "string") {
        valeurRetour = (<div className="whitespace-pre-line">{champ.valeur}</div>);
    }
    else {
        valeurRetour = String(champ.valeur);
    }

    return valeurRetour;
}