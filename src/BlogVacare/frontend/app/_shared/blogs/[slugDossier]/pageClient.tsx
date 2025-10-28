'use client';

import { useBlogs, useCreerBlog, useSupprimerBlog } from '@BlogsFront/hooks/useBlogs';
import { BlogList } from '@BlogsFront/components/blog/BlogList';
import { Blog, BlogJSON } from '@BlogsShared/model/Blog';
import { BlogFormCreation } from '@BlogsFront/components/blog/BlogFormCreation';
import { useAuthContexte } from '@BlogsFront/contexts/AuthContext';
import { useDossier } from '@BlogsFront/hooks/useDossiers';
import { useDonneesPage } from '@BlogsFront/hooks/useDonneesPage';
import { PageWrapper } from '@BlogsFront/components/PageWrapper';
import { SiteVariant, useVariant } from '@BlogsFront/contexts/VariantContext';
import { filtrerElements } from '@BlogsFront/app/_shared/pageMethodes';

/**
 * Props pour le composant PageBlogsClient
 */
interface PageBlogsClientProps {
  slugDossier: string;
  blogsPrecharges?: BlogJSON[];
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param slugDossier ID du dossier dont les blogs doivent être affichés
 * @param blogsPrecharges Blogs JSON préchargés en cas d'export statique
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default function PageBlogsClient({ slugDossier, blogsPrecharges }: PageBlogsClientProps) {
  
  // Hook de blogs affichés à l'écran, du dossier correspondant, de création de blog, d'authentification et de données affichées sur la page
  const { donnees: hookBlogs, chargement: hookLoading, erreur: hookError, refetch: refetch } = useBlogs(slugDossier);
  const { donnees: dossier } = useDossier(slugDossier);
  const {mutation: mutation, chargement: chargementCreation, erreur: erreurCreation} = useCreerBlog();
  const { mutation: mutationSuppression } = useSupprimerBlog();
  const { estConnecte, utilisateur } = useAuthContexte();
  const { donnees: blogs, chargement, erreur } = useDonneesPage(hookBlogs, hookLoading, hookError, blogsPrecharges, Blog.fromJSON );
  const variant = useVariant();

  // Une fois un blog créé, on re-récupère la page
  const handleCreation = async (nom: string, premierMessage: string) => {
    if (!dossier) {
      throw new Error("Identifiant du dossier manquant");
    }
    
    await mutation(nom, premierMessage, dossier.getId());
    refetch();
  }

  // Gestion de la suppression d'un blog
  const handleSuppression = async (id : string, raisonSuppression : string, cache : boolean) => {
    await mutationSuppression(id, raisonSuppression, cache);
    refetch();
  }

  // Gestion des données affichées pour un utilisateur admin ou non, ou pour le mode old
  let estAdmin = utilisateur?.getEstAdmin() ?? false;
  const suppressionHandler = estAdmin ? handleSuppression : undefined;
  const blogsAffiches = filtrerElements(blogs, estAdmin, variant);

  return( 
    <PageWrapper chargement={chargement} erreur={erreur} estVide={blogs.length == 0} messageVide="Aucun blog trouvé" chargementMessage="Chargement des blogs...">
      <BlogFormCreation onSubmit={handleCreation} chargement={ chargementCreation } erreur={ erreurCreation } estConnecte= {estConnecte }/>
          
      <BlogList blogs={blogsAffiches} slugDossier={slugDossier} suppressionHandler={ suppressionHandler } />
    </PageWrapper>
  );
}