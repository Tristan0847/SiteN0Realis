import {ImageDeProfil} from "@BlogsFront/components/UI/ImageDeProfil";
import {getDateString} from "@BlogsFront/utils/DateGetter";
import Link from "next/link";
import {cn} from "lib/utils/cn";

interface PostHeadProps {
    nomUtilisateur: string;
    datePublication: string;
    supprime?: boolean;
}

/**
 * En-tête de post
 * @param nomUtilisateur
 * @param datePublication
 * @param supprime
 * @constructor
 */
export function PostHead({nomUtilisateur, datePublication, supprime = false} : PostHeadProps) {
    const date = getDateString(datePublication);

    const badgesClasses = "border border-stone-700 bg-stone-100 px-2 py-1 text-xs uppercase tracking-widest text-stone-700";
    return (
        <div className="flex items-start justify-between gap-3 border-b-2 border-stone-700 pb-3">
            <div className="flex items-center gap-3">
                <div className="border-2 border-stone-800 bg-stone-100 p-1 shadow-[2px_2px_0_0_#44403c]">
                    <ImageDeProfil
                        nom_utilisateur={nomUtilisateur}
                        classNames="bg-neutral-200"
                    />
                </div>

                <div className="flex flex-col">
                    <Link href={`/community/user/${nomUtilisateur}`} target="_blank" className="text-lg font-bold tracking-wide text-stone-900 hover:underline">
                        @{nomUtilisateur}
                    </Link>
                </div>
            </div>

            <div className="flex flex-col">
                <span className={badgesClasses}>
                    {date}
                </span>
                {supprime && <span className={cn(badgesClasses, "text-red-600 bg-red-100/70")}>
                    Supprimé
                </span>}
            </div>
        </div>
    )
}