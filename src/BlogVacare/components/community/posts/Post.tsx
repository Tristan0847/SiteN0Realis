import {Blog, Message} from "@BlogsFront/model/Blog";
import Link from "next/link";
import {PostHead} from "@BlogsFront/components/community/posts/PostHead";
import {PostBadges} from "@BlogsFront/components/community/posts/PostBadges";
import {ReactMarkdownElement} from "@BlogsFront/components/UI/ReactMarkdownElement";
import MediaViewer from "@BlogsFront/components/community/posts/PostMedia";

interface PostProps {
    blog: Blog;
    lien?: boolean;
    lienMedias?: string;
}

/**
 * Composant affichant un post de feed
 * @param blog Blog à afficher
 * @param lien True si le post doit avoir un lien clickable pour renvoyer à sa page individuelle, false sinon
 * @param lienMedias Lien des medias
 * @constructor
 */
export function Post({blog, lien = true, lienMedias = ""} : PostProps) {

    if (!blog.message_post) {
        return (<p>Post invalide</p>);
    }

    // Calcul de la date
    const message : Message = blog.message_post;

    return (
        <article className="border-4 border-stone-900 bg-stone-200 p-4 w-5xl text-stone-900 shadow-[6px_6px_0_0_#1c1917]">
            <PostHead nomUtilisateur={message.nom_utilisateur} datePublication={message.date_publication} supprime={blog.id_suppression !== null && blog.id_suppression !== undefined}/>
            {lien ?
                <Link href={"/community/post/" + blog.slug} className="">
                    <ReactMarkdownElement className="mt-4 border-2 border-stone-400 bg-stone-100 px-3 py-3 text-sm leading-6 shadow-inner hover:bg-gray-100/80">
                        {message.contenu}
                    </ReactMarkdownElement>
                </Link>
                :
                <ReactMarkdownElement className="mt-4 border-2 border-stone-400 bg-stone-100 px-3 py-3 text-sm leading-6 shadow-inner">
                    {message.contenu}
                </ReactMarkdownElement>
            }
            {lienMedias && message.media && message.media.length > 0 &&
                <MediaViewer lienMedia={lienMedias + "/" + message.media} />
            }
            <PostBadges likes={message.likes} partages={message.partages} reponses={blog.nombre_reponses ? blog.nombre_reponses - 1 : undefined} />
        </article>
    );
}