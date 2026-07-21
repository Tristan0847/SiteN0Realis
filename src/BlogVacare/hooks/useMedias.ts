import {blogGetters} from "@BlogsFront/service/ServiceFactory";
import {useQuery} from "@tanstack/react-query";

/**
 * Hook de récupération du lien des medias
 */
export function useLienMedias() {
    const getter = blogGetters();

    const {data, isLoading, error} = useQuery({
        queryKey: ['communaute-media-link'],
        queryFn: () => getter.getLienMedias()
    });

    return {lien: data, isLoading, error};
}