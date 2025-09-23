'use client';

import { useBlogs } from '@BlogsFront/hooks/useBlogs';
import { BlogList } from '@BlogsFront/components/blog/BlogList';

/**
 * Props pour le composant PageBlogsClient
 */
interface PageBlogsClientProps {
  idDossier: string;
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param idDossier ID du dossier dont les blogs doivent être affichés
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default function PageBlogsClient({ idDossier }: PageBlogsClientProps) {
  const { blogs, loading, error } = useBlogs(idDossier);

  if (loading) return <p>Chargement des blogs...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return <BlogList blogs={blogs} />;
}
