"use client";
import {usePost} from "@BlogsFront/hooks/useBlogsCommunautaires";
import {Post} from "@BlogsFront/components/community/posts/Post";
import {Reponse} from "@BlogsFront/components/community/posts/Reponse";
import {RepondrePost} from "@BlogsFront/components/community/posts/RepondrePost";
import {ChargementCommunaute} from "@BlogsFront/components/community/Chargement";
import {useAuthContexte} from "@BlogsFront/contexts/AuthContext";
import {useLienMedias} from "@BlogsFront/hooks/useMedias";

interface PagePostProps {
    slug: string;
}

/**
 * Page affichant un post et ses réponses
 * @param slug Slug du post
 * @constructor
 */
export function PagePost({slug}: PagePostProps) {

    const {data, isLoading, error} = usePost(slug);
    const {lien} = useLienMedias();
    const {estConnecte} = useAuthContexte();

    return (
        <>
            <div className="flex flex-col gap-0">
            {data && data.messages ?
                <>
                    <Post blog={data} lien={false} lienMedias={lien}/>
                    {data.messages.map((message) => (
                        <Reponse key={message.id} message={message} lienMedias={lien}/>
                    ))}
                    {estConnecte ? <RepondrePost slug={data.slug} /> : ""}
                </>
                :
                <ChargementCommunaute message="Votre post est en cours de chargement" />
            }
            </div>
        </>
    );
}