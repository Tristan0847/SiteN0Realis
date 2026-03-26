/**
 * Layout des dossiers (contours blancs, intérieur glitché, etc.)
 * @param children Contenu de la page
 * @returns 
 */
export default function DossierLayout({ children }: { children: React.ReactNode }) {

    // Source de la vidéo
    const videoSrc : string = process.env.NEXT_PUBLIC_ASSET_PREFIXE + "/assets/Glitchs.mp4";

    return (
        <div className="relative p-8 border-2 border-white min-h-4/5 min-w-full overflow-hidden">
            <video src={videoSrc} autoPlay loop muted className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-4/5 object-cover opacity-25" />
            <div className="relative z-10 p-8 overflow-y-auto">
                <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
                    {children}
                </div>
            </div>
        </div>
    );
}