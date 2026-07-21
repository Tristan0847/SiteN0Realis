import {Message} from "@BlogsFront/model/Blog";
import {PostHead} from "@BlogsFront/components/community/posts/PostHead";
import {PostBadges} from "@BlogsFront/components/community/posts/PostBadges";
import {ReactMarkdownElement} from "@BlogsFront/components/UI/ReactMarkdownElement";
import MediaViewer from "@BlogsFront/components/community/posts/PostMedia";

interface ReponseProps {
    message: Message;
    lienMedias?: string;
}

/**
 * Composant affichant une réponse à un post
 * @param message Message à afficher
 * @param lienMedias Lien des medias
 * @constructor
 */
export function Reponse({message, lienMedias = ""} : ReponseProps) {

    return (
        <article className="w-5xl border-4 border-stone-900 bg-stone-200 p-4 text-stone-900 shadow-[6px_6px_0_0_#1c1917]">
            <PostHead nomUtilisateur={message.nom_utilisateur} datePublication={message.date_publication}/>

            <ReactMarkdownElement className="mt-4 border-2 border-stone-400 bg-stone-100 px-3 py-3 text-sm leading-6 shadow-inner">
                {message.contenu}
            </ReactMarkdownElement>
            {lienMedias && message.media && message.media.length > 0 &&
                <MediaViewer lienMedia={lienMedias + "/" + message.media} />
            }

            <PostBadges likes={message.likes} partages={message.partages} />
        </article>
    );
}