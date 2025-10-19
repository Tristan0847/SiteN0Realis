'use client';

import { useBlogs } from '@BlogsFront/hooks/useBlogs';
import { BlogList } from '@BlogsFront/components/blog/BlogList';
import MessageBox from '@BlogsFront/components/MessageBox';
import { Blog, BlogJSON } from '@BlogsShared/model/Blog';
import { useEffect, useState } from 'react';

/**
 * Props pour le composant PageBlogsClient
 */
interface PageBlogsClientProps {
  idDossier: string;
  blogsPrecharges?: BlogJSON[];
}

/**
 * Page affichant les blogs d'un dossier spécifique
 * @param idDossier ID du dossier dont les blogs doivent être affichés
 * @param blogsPrecharges Blogs JSON préchargés en cas d'export statique
 * @returns {JSX.Element} Composant React pour la page des blogs d'un dossier
 */
export default function PageBlogsClient({ idDossier, blogsPrecharges }: PageBlogsClientProps) {
  
  const { blogs: hookBlogs, loading: hookLoading, error: hookError } = useBlogs(idDossier);

  // On utilise les données de préchargement si elles sont présentes, sinon celles du hook
  const blogs = blogsPrecharges ? blogsPrecharges.map(b => Blog.fromJSON(b)) : hookBlogs;
  
  const loading = blogsPrecharges ? false : hookLoading;
  const error = blogsPrecharges ? null : hookError;

  if (loading) return <MessageBox message="Chargement des blogs..." type="loading" />;
  if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

  return <BlogList blogs={blogs} idDossier={idDossier} />;
}
