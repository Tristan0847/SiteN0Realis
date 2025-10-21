'use client';

import { useBlogs } from '@BlogsFront/hooks/useBlogs';
import { BlogList } from '@BlogsFront/components/blog/BlogList';
import MessageBox from '@BlogsFront/components/MessageBox';
import { Blog, BlogJSON } from '@BlogsShared/model/Blog';

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
  
  const { donnees: hookBlogs, chargement: hookLoading, erreur: hookError } = useBlogs(slugDossier);
  
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

  return <BlogList blogs={blogs} slugDossier={slugDossier} />;
}
