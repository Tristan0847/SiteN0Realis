import {useCreerBlogCommunautaire} from "@BlogsFront/hooks/useBlogsCommunautaires";
import {Button} from "@headlessui/react";

/**
 * Bloc de création de post
 * @constructor
 */
export function CreationPost() {

    const {isPending, isSuccess, mutateAsync} = useCreerBlogCommunautaire();

    const onSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const contenu = formData.get("contenu")?.toString() ?? "";
        const media = formData.get("media");
        const file : File|null = media instanceof File && media.size > 0 ? media : null;

        if (contenu.length > 0) {
            await mutateAsync({contenu, file});
            if (isSuccess) {
                form.reset();
            }
        }
    });

    return (<form onSubmit={onSubmit} className="flex flex-col gap-1">
        <label htmlFor="contenu">Que voulez-vous partagez aujourd&apos;hui ?</label>
        <textarea className="border-1 border-gray-500/50 bg-gray-200" id="contenu" name="contenu" placeholder="Écrivez-nous dès maintenant !" rows={2}></textarea>
        <input type="file" id="media" name="media" accept="image/*, video/*" className="border-1 border-gray-500/50 bg-gray-200 px-2 py-1 w-fit" />
        <Button type="submit" disabled={isPending} className="mx-auto border-2 border-gray-700 bg-green-100 px-2 py-1 font-semibold text-stone-900 hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-100">
            Partager !
        </Button>
    </form>);
}