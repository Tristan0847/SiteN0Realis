"use client";
import {useFeed} from "@BlogsFront/hooks/useBlogsCommunautaires";
import {SectionTexte} from "../../components/community/SectionTexte";
import {PostList} from "@BlogsFront/components/community/posts/PostList";
import {useLienMedias} from "@BlogsFront/hooks/useMedias";


export function PageTendances() {

    const {items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useFeed(true);
    const {lien} = useLienMedias();

    return (
        <>
            <SectionTexte>
                <p className="font-bold">
                    Découvrez les blogs les plus populaires du site !
                </p>
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