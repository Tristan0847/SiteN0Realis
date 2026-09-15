"use client";
import Link from "next/link";
import Image from "next/image";

/**
 * Composant d'aside du site
 * @constructor
 */
export function AsideCommunity() {
    const navItems = [
        {
            label: "Accueil",
            href: "/community",
            icon: "home"
        },
        {
            label: "Tendances",
            href: "/community/tendances",
            icon: "arrow-up"
        },
        {
            label: "Feed Aléatoire",
            href: "/community/random",
            icon: "dice"
        }/**,
         {
         label: "Mon Profil",
         href: "/community/user",
         icon: "user"
         }*/
    ];

    const navItemsCreateurs = [
        {
            label: "Dr Owl",
            href: "/community/user/DrOwl",
            icon: "eye"
        },
        {
            label: "Vince",
            href: "/community/user/Vince",
            icon: "user"
        },
        {
            label: "Ant",
            href: "/community/user/Ant",
            icon: "Citadelle"
        }
    ];


    const Nav = () => (
        <nav className="flex-1 min-w-0 px-1 py-4" aria-label="Navigation principale">
            <ol className="flex flex-col gap-2 min-w-0">
                {navItems.map(({label, href, icon}) => (
                    <li key={href} className="min-w-0">
                        <Link href={href}
                              className="flex items-center gap-3 rounded-lg px-1 py-2 font-bold hover:bg-green-500/30">
                            <div className="relative h-6 w-6 shrink-0">
                                <Image src={`/assets/BlogVacare/Community/SVG/${icon}.svg`} alt="" fill/>
                            </div>
                            <span className="min-w-0 break-words">{label}</span>
                        </Link>
                    </li>
                ))}
            </ol>
            <hr className="border-b-1 border-gray-500/70 my-8"/>
            <ol className="flex flex-col gap-2 min-w-0">
                <li className="text-center text-xl sm:text-2xl font-bold border border-stone-700 bg-gradient-to-b from-green-500 to-green-100 px-2 py-1 break-words">
                    Les créateurs
                </li>
                {navItemsCreateurs.map(({label, href, icon}) => (
                    <li key={href} className="min-w-0">
                        <Link href={href}
                              className="flex items-center gap-3 rounded-lg px-1 py-2 font-bold hover:bg-green-500/30">
                            <div className="relative h-6 w-6 shrink-0">
                                <Image src={`/assets/BlogVacare/Community/SVG/${icon}.svg`} alt="" fill/>
                            </div>
                            <span className="min-w-0 break-words">{label}</span>
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );

    return (
        <>
            <details className="md:hidden sticky top-0 z-20 min-w-0 border-4 border-stone-900 bg-orange-100 text-stone-900 text-lg">
                <summary className="cursor-pointer select-none px-4 py-3 font-moogalator text-base sm:text-lg break-words min-w-0 list-none flex items-center justify-between">
                    <span className="min-w-0 break-words">AVOS Community</span>
                    <span aria-hidden className="shrink-0 ml-2">☰</span>
                </summary>
                <div className="max-h-[70vh] overflow-y-auto border-t border-zinc-200">
                    <Nav/>
                </div>
            </details>

            <aside className="hidden md:flex md:flex-col min-w-0 h-fit self-start rounded-sm border-4 border-stone-900 bg-orange-100 p-4 text-stone-900 md:sticky md:top-6 text-lg sm:text-xl">
                <div className="min-w-0 border-b border-zinc-200 px-4 py-5">
                    <span className="block min-w-0 break-words text-base sm:text-lg lg:text-xl font-moogalator text-zinc-900">
                        AVOS Community
                    </span>
                </div>
                <Nav/>
            </aside>
        </>
    );
}