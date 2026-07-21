"use client";
import {useRandomFeed} from "@BlogsFront/hooks/useBlogsCommunautaires";
import {PostList} from "@BlogsFront/components/community/posts/PostList";
import {SectionTexte} from "@BlogsFront/components/community/SectionTexte";
import {BoutonCommunaute} from "@BlogsFront/components/community/BoutonCommunaute";
import {useLienMedias} from "@BlogsFront/hooks/useMedias";

/**
 * Page affichant 5 blogs au hasard
 * @constructor
 */
export function PagePostsRandoms() {
    const {blogs, isLoading, error, refetch} = useRandomFeed();
    const {lien} = useLienMedias();

    return <div className="flex flex-col gap-0">
        <SectionTexte className="mb-2">
            <span className="text-center text-lg">Découvrez 5 posts au hasard !</span>
            <BoutonCommunaute onClick={() => refetch()} disabled={isLoading} message="Charger 5 autres posts" classNames="bg-red-200" />
        </SectionTexte>
        {error || (!isLoading && blogs.length === 0) ?
            <div className="text-md bg-orange-100 border-l-4 border-orange-500 text-orange-900 p-4">
                Aucun blog n'a pu être récupéré.
            </div>
            : <PostList blogs={blogs} loading={isLoading} titre={"Blogs aléatoires"} messageChargement={"5 posts aléatoires sont en cours de chargement..."} lienMedias={lien}/>
        }
    </div>;
}