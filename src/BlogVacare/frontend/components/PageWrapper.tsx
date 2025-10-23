'use client';

import MessageBox from "@BlogsFront/components/MessageBox";

/**
 * Paramètres du wrapper
 */
interface PageWrapperProps {
    chargement: boolean;
    erreur: Error | null;
    estVide: boolean;
    chargementMessage?: string;
    messageVide?: string;
    children: React.ReactNode;
}

/**
 * Wrapper de page gérant l'affichage de messages d'erreur, de chargement ou de données vides retournées
 * @param param0 Paramètres du wrapper
 * @returns Wrapper 
 */
export function PageWrapper({chargement, erreur, estVide, chargementMessage = "Chargement en cours...", messageVide = "Aucune donnée disponible", children}: PageWrapperProps) {
  if (chargement) return <MessageBox message={chargementMessage} type="loading" />;
  if (erreur) return <MessageBox message={`Erreur : ${erreur.message}`} type="error" />;
  if (estVide) return <MessageBox message={messageVide} type="info" />;
  
  return <div>{children}</div>;
}