"use client";

import {useFeed} from "@BlogsFront/hooks/useBlogsCommunautaires";
import {PostList} from "@BlogsFront/components/community/posts/PostList";
import {SectionTexte} from "@BlogsFront/components/community/SectionTexte";
import {useAuthContexte} from "@BlogsFront/contexts/AuthContext";
import {CreationPost} from "@BlogsFront/components/community/posts/CreationPost";
import {useLienMedias} from "@BlogsFront/hooks/useMedias";

/**
 * Page d'accueil du blog AVOS
 * @constructor
 */
export function PageAccueilCommunaute() {

    const {items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useFeed();
    const {lien} = useLienMedias();
    const {estConnecte} = useAuthContexte();

    return (
        <>
            <SectionTexte>
                <p className="font-bold">
                    Bienvenue sur <span className="font-normal font-moogalator">AVOS Community</span> !
                </p>
                <p>
                    Site communautaire co-créé par @Dr-Owl, @Vince, @Ant et @❚❚❚❚❚❚❚❚❚❚❚❚❚❚❚❚❚❚❚❚ afin de rassembler des nos communautés respectives, peut-être plus à terme !
                </p>
                <p>
                    Partagez-nous vos passions, votre quotidien, vos idées, vos joies, vos peines, vos oeuvres, vos opinions : partagez ce que vous voulez !
                </p>
                {estConnecte ?
                    <CreationPost />
                    :
                    <p>Vous devez être connecté ou inscrit pour poursuivre !</p>
                }
            </SectionTexte>
            <PostList
                blogs={items}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                loading={isFetchingNextPage || isLoading}
                titre="Derniers blogs"
                lienMedias={lien}
            />
        </>
    );
}