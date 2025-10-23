'use client';

import { useBlogs, useCreerBlog } from '@BlogsFront/hooks/useBlogs';
import { BlogList } from '@BlogsFront/components/blog/BlogList';
import MessageBox from '@BlogsFront/components/MessageBox';
import { Blog, BlogJSON } from '@BlogsShared/model/Blog';
import { BlogFormCreation } from '@BlogsFront/components/blog/BlogFormCreation';
import { useAuthContexte } from '@BlogsFront/contexts/AuthContext';
import { useDossier } from '@BlogsFront/hooks/useDossiers';

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
  
  const { donnees: hookBlogs, chargement: hookLoading, erreur: hookError, refetch: refetch } = useBlogs(slugDossier);
  const { donnees: dossier, chargement: hookDossierLoading, erreur: hookDossierErreur } = useDossier(slugDossier);
  
  // Hook de création de blogs
  const {mutation: mutation, chargement: chargementCreation, erreur: erreurCreation} = useCreerBlog();
  
  // Hook de contexte d'authentification (Vérification que l'on est connecté ou non)
  const { estConnecte, utilisateur, chargement: chargementAuth } = useAuthContexte();

  // Une fois un blog créé, on re-récupère la page
  const handleCreation = async (nom: string, premierMessage: string) => {
    if (!dossier) {
      throw new Error("Identifiant du dossier manquant");
    }
    
    const resultat = await mutation(nom, premierMessage, dossier.getId());
    refetch();
  }
  
  const loading = blogsPrecharges ? false : hookLoading;
  const error = blogsPrecharges ? null : hookError;

  if (loading) return <MessageBox message="Chargement des blogs..." type="loading" />;
  if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

  // Chargement des blogs
  let blogs: Blog[];
  
  if (blogsPrecharges) {
    blogs = blogsPrecharges.map(b => Blog.fromJSON(b));
  } else if (hookBlogs) {
    blogs = hookBlogs;
  } else {
    return <MessageBox message="Aucun blog disponible" type="info" />;
  }

  return( 
  <div>
    <BlogFormCreation onSubmit={handleCreation} chargement={ chargementCreation } erreur={ erreurCreation } estConnecte= {estConnecte }/>
        
    <BlogList blogs={blogs} slugDossier={slugDossier} />
    </div>);
}
