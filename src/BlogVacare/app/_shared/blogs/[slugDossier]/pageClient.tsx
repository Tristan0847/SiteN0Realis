'use client';

import {useBlogs, useCreerBlog, useSupprimerBlog} from '@BlogsFront/hooks/useBlogs';
import {BlogList} from '@BlogsFront/components/blog/BlogList';
import {Blog} from '@BlogsFront/model/Blog';
import {BlogFormCreation} from '@BlogsFront/components/blog/BlogFormCreation';
import {useAuthContexte} from '@BlogsFront/contexts/AuthContext';
import {PageWrapper} from '@BlogsFront/components/PageWrapper';
import {useVariant} from '@BlogsFront/contexts/VariantContext';

/**
 * Props pour le composant PageBlogsClient
 */
interface PageBlogsClientProps {
    slugDossier: string;
    blogsPrecharges?: Blog[];
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param slugDossier ID du dossier dont les blogs doivent être affichés
 * @param blogsPrecharges Blogs JSON préchargés en cas d'export statique
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default function PageBlogsClient({slugDossier, blogsPrecharges}: PageBlogsClientProps) {

    // Hook de blogs affichés à l'écran, du dossier correspondant, de création de blog, d'authentification et de données affichées sur la page
    const variante = useVariant();

    const {data: blogs, isLoading: hookLoading, error: hookError} = useBlogs(slugDossier, variante, blogsPrecharges);
    const {mutateAsync: mutationCreation, isPending: chargementCreation, error: erreurCreation} = useCreerBlog();
    const {mutateAsync: mutationSuppression} = useSupprimerBlog();
    const {utilisateur} = useAuthContexte();
    // const { donnees: blogs, chargement, erreur } = useDonneesPage(hookBlogs, hookLoading, hookError, blogsPrecharges, Blog.fromJSON );

    // Une fois un blog créé, on re-récupère la page
    const handleCreation = async (nom: string, premierMessage: string) => {
        await mutationCreation({nom, contenuPremierMessage: premierMessage, slug_dossier: slugDossier})
    }

    // Gestion de la suppression d'un blog
    const handleSuppression = async (id: number, raisonSuppression: string, cache: boolean) => {
        await mutationSuppression({id, raison: raisonSuppression, cache, slug_dossier: slugDossier});
    }

    // Gestion des données affichées pour un utilisateur admin ou non, ou pour le mode old
    const estAdmin = utilisateur?.est_admin ?? false;
    const suppressionHandler = estAdmin ? handleSuppression : undefined;

    return (
        <PageWrapper chargement={hookLoading} erreur={hookError} estVide={blogs ? blogs.length == 0 : false} messageVide="Aucun blog trouvé"
                     chargementMessage="Chargement des blogs...">
            <BlogFormCreation onSubmit={handleCreation} chargement={chargementCreation} erreur={erreurCreation}
                              estConnecte={utilisateur !== null}/>

            {blogs && <BlogList blogs={blogs} slugDossier={slugDossier} suppressionHandler={suppressionHandler}/>}
        </PageWrapper>
    );
}