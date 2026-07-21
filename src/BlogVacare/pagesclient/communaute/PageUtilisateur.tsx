"use client";
import {useFeedUtilisateur} from "@BlogsFront/hooks/useBlogsCommunautaires";
import {PostList} from "@BlogsFront/components/community/posts/PostList";
import {CommunityUtilisateur} from "@BlogsFront/components/community/Utilisateur";
import {useLienMedias} from "@BlogsFront/hooks/useMedias";

interface PageProps {
    pseudo: string;
}

/**
 * Page affichant un post et ses réponses
 * @param slug Slug du post
 * @constructor
 */
export function PageUtilisateur({pseudo}: PageProps) {

    const {blogs, utilisateur, isLoading, error} = useFeedUtilisateur(pseudo);
    const {lien} = useLienMedias();

    return (
        <>
            {utilisateur ? <CommunityUtilisateur utilisateur={utilisateur}/> : ""}
            <div className="flex flex-col gap-0">
                {error || (!isLoading && blogs.length === 0) ?
                    <div className="text-md bg-orange-100 border-l-4 border-orange-500 text-orange-900 p-4">
                        Cet utilisateur n'a pas écrit de blog.
                    </div>
                :
                    <PostList blogs={blogs} loading={isLoading} titre={"Blogs de " + pseudo} messageChargement={"Les blogs de " + pseudo + " sont en cours de chargement..."} lienMedias={lien} />
                }
            </div>
        </>
    );
}