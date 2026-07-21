import {useRepondrePost} from "@BlogsFront/hooks/useBlogsCommunautaires";
import { Button } from "@headlessui/react";

interface RepondrePostProps {
    slug : string;
}

/**
 * Formulaire de réponse à un post
 * @constructor
 */
export function RepondrePost({slug} : RepondrePostProps) {

    const {mutateAsync, isPending, error} = useRepondrePost();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const contenu = formData.get("contenu")?.toString().trim() ?? "";
        const media = formData.get("media");
        const file : File|null = media instanceof File && media.size > 0 ? media : null;

        if (!contenu) {
            return;
        }

        await mutateAsync({ slug, contenu, file });
        form.reset();
    };

    return (
        <article className="w-full border-4 border-stone-900 bg-stone-200 p-4 text-stone-900 shadow-[6px_6px_0_0_#1c1917]">
            <h3 className="border-b-2 border-stone-700 pb-3 text-lg font-bold uppercase tracking-wide">
                Répondre au post
            </h3>

            <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
                <label htmlFor="contenu" className="text-sm font-bold uppercase tracking-wide">
                    Contenu
                </label>

                <textarea
                    id="contenu"
                    name="contenu"
                    rows={4}
                    placeholder="Écris ta réponse..."
                    className="resize-none border-2 border-stone-500 bg-stone-100 px-3 py-2 text-sm leading-6 text-stone-900 shadow-inner outline-none placeholder:text-stone-500 focus:border-green-700"
                    disabled={isPending}
                    required
                />
                <input type="file" id="media" name="media" accept="image/*, video/*" className="border-1 border-gray-500/50 bg-gray-200 px-2 py-1 w-fit" />

                {error ? (
                    <p className="border-2 border-red-800 bg-red-100 px-3 py-2 text-sm text-red-900">
                        Une erreur est survenue.
                    </p>
                ) : null}

                <Button
                    type="submit"
                    disabled={isPending}
                    className="mx-auto border-2 border-stone-800 bg-green-100 px-4 py-2 font-bold uppercase tracking-wide text-stone-900 hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-100"
                >
                    {isPending ? "Envoi..." : "Répondre"}
                </Button>
            </form>
        </article>);
}