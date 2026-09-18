import {Blog} from "@BlogsFront/model/Blog";
import {Post} from "@BlogsFront/components/community/posts/Post";
import {ChargementCommunaute} from "@BlogsFront/components/community/Chargement";
import {BoutonCommunaute} from "@BlogsFront/components/community/BoutonCommunaute";

interface PostListProps {
    blogs: Blog[]|null;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    loading?: boolean;
    titre?: string;
    messageChargement?: string;
    lienMedias?: string;
}

/**
 * Composant listant les posts d'un feed
 * @param blogs Liste des blogs à afficher
 * @param fetchNextPage Fetch de la page suivante
 * @param hasNextPage Variable définissant si la liste a plus de pages ou non
 * @param loading Variable définissant si la liste est en cours de chargement ou non
 * @param titre Titre à afficher
 * @param messageChargement Message de chargement
 * @param lienMedias Lien des medias
 * @constructor
 */
export function PostList({blogs, fetchNextPage, hasNextPage, loading, titre, messageChargement = "Chargement des blogs", lienMedias = ""} : PostListProps) {

    return (<div className="flex flex-col border-2 border-double border-yellow-700 shadow-lg bg-yellow-200/70 rounded-xl p-4 min-w-0 w-full">
        <h2 className="text-2xl font-bold mb-4 break-words">
            {titre || "Liste de blogs"}
        </h2>
        <div className="flex flex-col items-center w-full min-w-0 gap-4">
            {blogs && blogs.map((blog) => (
                <Post key={blog.id} blog={blog} lienMedias={lienMedias} />
            ))}
        </div>
        {hasNextPage && fetchNextPage && (loading !== undefined) && (
            <BoutonCommunaute onClick={fetchNextPage} disabled={loading} />
        )}
        {loading ?
            <ChargementCommunaute message={messageChargement} />
            : ""
        }
    </div>);
}