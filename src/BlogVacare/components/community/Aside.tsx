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


    return (
        <aside className="h-fit w-full flex-col rounded-sm border-4 border-stone-900 bg-orange-100 p-4 text-stone-900 md:sticky md:top-6 md:flex md:ml-16 text-lg sm:text-xl">
            <div className="border-b border-zinc-200 px-4 py-5">
                <span className="sm:text-lg lg:text-2xl font-moogalator text-zinc-900">AVOS Community</span>
            </div>

            <nav className="flex-1 px-1 py-4" aria-label="Navigation principale">
                <ol className="flex flex-col gap-2">
                    {navItems.map(({label, href, icon}) => (
                        <li key={href}>
                            <Link href={href}
                                  className="flex items-center justify-between gap-3 rounded-lg px-1 py-2 font-bold hover:bg-green-500/30">
                                <div className="relative h-6 w-6">
                                    <Image src={"/assets/BlogVacare/Community/SVG/" + icon + ".svg"} alt="" fill/>
                                </div>
                                <span>{label}</span>
                                <div className="relative h-6 w-6">
                                    <Image src={"/assets/BlogVacare/Community/SVG/" + icon + ".svg"} alt="" fill/>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
                <hr className="border-b-1 border-gray-500/70 my-8"/>
                <ol className="flex flex-col gap-2">
                    <li className="text-center text-2xl font-bold border border-stone-700 bg-gradient-to-b from-green-500 to-green-100">Les créateurs</li>
                    {navItemsCreateurs.map(({label, href, icon}) => (
                        <li key={href}>
                            <Link href={href}
                                  className="flex items-center justify-between gap-3 rounded-lg px-1 py-2 font-bold hover:bg-green-500/30">
                                <div className="relative h-6 w-6">
                                    <Image src={"/assets/BlogVacare/Community/SVG/" + icon + ".svg"} alt="" fill/>
                                </div>
                                <span>{label}</span>
                                <div className="relative h-6 w-6">
                                    <Image src={"/assets/BlogVacare/Community/SVG/" + icon + ".svg"} alt="" fill/>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </aside>
    );
}