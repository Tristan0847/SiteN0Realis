import {cn} from "lib/utils/cn";

interface SectionTexteProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Bloc de bienvenue sur la page d'accueil
 * @constructor
 */
export function SectionTexte({children, className} : SectionTexteProps) {

    return (<section className={cn("border-2 border-stone-800 flex flex-col gap-4 p-4 bg-orange-200 md:mx-6", className)}>
        {children}
    </section>);
}