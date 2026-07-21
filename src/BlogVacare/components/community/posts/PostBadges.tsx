interface PostBadgesProps {
    likes: number;
    partages: number;
    reponses?: number | null;
}

export function PostBadges({likes, partages, reponses = null}: PostBadgesProps) {

    return (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-stone-700">
            <span className="border border-green-800 bg-green-100 px-2 py-1 text-green-900">
                {likes} like{likes > 1 && "s"}
            </span>
            <span className="border border-stone-700 bg-stone-100 px-2 py-1">
                {partages} partage{partages > 1 && "s"}
            </span>
            {reponses !== null &&
                <span className="border border-stone-700 bg-gray-100 px-2 py-1">
                    {reponses} réponse{reponses > 1 && "s"}
                </span>
            }
        </div>
    )
}