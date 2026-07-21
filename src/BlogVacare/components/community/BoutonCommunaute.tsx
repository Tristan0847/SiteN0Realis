import {Button} from "@headlessui/react";
import {cn} from "lib/utils/cn";

interface BoutonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    classNames?: string;
    message?: string;
}

/**
 * Bouton propre à AVOS Community
 * @param onClick Fonction appelée au clic
 * @param disabled Bouton inactif ou non
 * @param classNames Noms de classes
 * @param message Message à afficher avec le bouton
 * @constructor
 */
export function BoutonCommunaute({onClick, disabled, classNames, message = "Charger plus de blogs"}: BoutonProps) {
    return (
        <Button onClick={onClick} disabled={disabled} className={cn(
            "mx-auto mt-4 border-2 border-stone-800 bg-orange-200 p-4 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-400",
            classNames
        )}>
            {message}
        </Button>
    )
}