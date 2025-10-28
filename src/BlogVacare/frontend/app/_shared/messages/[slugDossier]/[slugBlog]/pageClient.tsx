'use client';

import { filtrerElements } from '@BlogsFront/app/_shared/pageMethodes';
import { MessageFormCreation } from '@BlogsFront/components/message/MessageFormCreation';
import { MessageList } from '@BlogsFront/components/message/MessageList';
import { PageWrapper } from '@BlogsFront/components/PageWrapper';
import { useAuthContexte } from '@BlogsFront/contexts/AuthContext';
import { SiteVariant, useVariant } from '@BlogsFront/contexts/VariantContext';
import { useBlog } from '@BlogsFront/hooks/useBlogs';
import { useDonneesPage } from '@BlogsFront/hooks/useDonneesPage';
import { useCreerMessage, useMessages, useSupprimerMessage } from '@BlogsFront/hooks/useMessages';
import { Message, MessageJSON } from '@BlogsShared/model/Message';

/**
 * Props pour le composant PageMessagesClient
 */
interface PageBlogsClientProps {
  slugDossier: string;
  slugBlog: string;
  messagesPrecharges?: MessageJSON[];
}

/**
 * Page affichant les messages d'un blog spécifique
 * @returns {JSX.Element} Composant React pour la page des messages d'un blog
 */
export default function PageMessagesClient({slugDossier, slugBlog, messagesPrecharges }: PageBlogsClientProps) {
    
    // Hooks de messages récupérés, du blog correspondant, de création de message, d'authentification et d'éventuels messages d'erreurs
    const { donnees: hookMessages, chargement: hookLoading, erreur: hookError, refetch: refetch } = useMessages(slugDossier, slugBlog);
    const { donnees: blog } = useBlog(slugDossier, slugBlog);
    const { mutation: mutation, chargement: chargementCreation, erreur: erreurCreation } = useCreerMessage();
    const { mutation: mutationSuppression } = useSupprimerMessage();
    const { estConnecte, utilisateur } = useAuthContexte();
    const { donnees: messages, chargement, erreur } = useDonneesPage(hookMessages, hookLoading, hookError, messagesPrecharges, Message.fromJSON );
    const variant = useVariant();
    
    // Une fois un message créé, on re-récupère la page
    const handleCreation = async (contenu: string) => {
      if (!blog) {
        throw new Error("Identifiant du blog manquant");
      }
      
      await mutation(contenu, blog.getId());
      refetch();
    }

    // Gestion de la suppression d'un message 
    const handleSuppression = async (id : string, raisonSuppression : string, cache : boolean) => {
      if (!blog) {
        throw new Error("Identifiant du blog manquant");
      }

      const intId = parseInt(id);

      await mutationSuppression(intId, blog.getId(), raisonSuppression, cache);
      refetch();
    }
    
    // Gestion des données affichées pour un utilisateur admin ou non, ou pour le mode old
    let estAdmin = utilisateur?.getEstAdmin() ?? false;
    const suppressionHandler = estAdmin ? handleSuppression : undefined;
    const messagesAffiches = filtrerElements(messages, estAdmin, variant);

    return (
      <PageWrapper chargement={chargement} erreur={erreur} estVide={messages.length == 0} messageVide="Aucun message trouvé" chargementMessage="Chargement des messages...">
        <MessageList messages={messagesAffiches} suppressionHandler={ suppressionHandler } />
        <MessageFormCreation onSubmit={ handleCreation } chargement={ chargementCreation } erreur={ erreurCreation } estConnecte={ estConnecte }/>
      </PageWrapper>
    );
}