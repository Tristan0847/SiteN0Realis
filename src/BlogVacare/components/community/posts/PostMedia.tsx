"use client";

import { useMemo, useState } from "react";

type MediaViewerProps = {
    lienMedia: string;
    alt?: string;
};

/**
 * Composant affichant un média (image ou vidéo) avec un bouton pour l'ouvrir en grand
 * @param lienMedia Lien du média
 * @param alt Alt éventuel
 * @constructor
 */
export default function MediaViewer({ lienMedia, alt = "" }: MediaViewerProps) {
    const [open, setOpen] = useState(false);

    const estVideo : boolean = useMemo(() => {
        const lower = lienMedia.toLowerCase();
        return (
            lower.includes(".mp4") ||
            lower.includes(".webm") ||
            lower.includes(".ogg") ||
            lower.includes(".mov")
        );
    }, [lienMedia]);

    return (
        <>
        <div className="group mt-4 overflow-hidden h-[600px] border border-orange-300 bg-orange-50 shadow-sm">
        {estVideo ?
            <video
                src={lienMedia}
                controls
                className="h-full w-full relative mx-auto overflow-hidden"
            />
        :
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative block h-full w-full cursor-zoom-in text-left"
                aria-label="Ouvrir le média en grand"
            >
                <div className="relative h-full w-full overflow-hidden bg-stone-100">
                    <img
                        src={lienMedia}
                        alt={alt}
                        loading="lazy"
                        className="h-full w-full object-cover object-center object-fit:cover group-hover:scale-[1.02]"
                    />
                </div>
            </button>
        }
        </div>
            {!estVideo && open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-center justify-center overflow-hidden bg-black">
                        <img
                            src={lienMedia}
                            alt={alt}
                            className="h-fit w-fit"
                        />
                    </div>
                </div>
            )}
        </>
    );
}