
interface ChargementProps {
    message?: string;
}

/**
 * Composant de chargement
 * @constructor
 */
export function ChargementCommunaute({message = ""} : ChargementProps) {

    return (
        <div className="flex flex-col justify-center items-left h-36 text-md bg-yellow-100 border-l-4 border-yellow-700 text-black p-4">
            <span>
                Chargement en cours...
            </span>
            {message !== "" ?
                <p className="text-xs">{message}</p>
                :
                ""
            }
        </div>
    );
}