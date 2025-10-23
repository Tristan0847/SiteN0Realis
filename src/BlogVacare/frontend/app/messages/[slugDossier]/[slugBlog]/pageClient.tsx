'use client';

import { MessageFormCreation } from '@BlogsFront/components/message/MessageFormCreation';
import { MessageList } from '@BlogsFront/components/message/MessageList';
import MessageBox from '@BlogsFront/components/MessageBox';
import { useAuthContexte } from '@BlogsFront/contexts/AuthContext';
import { useBlog } from '@BlogsFront/hooks/useBlogs';
import { useCreerMessage, useMessages } from '@BlogsFront/hooks/useMessages';
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
    
    const { donnees: hookMessages, chargement: hookLoading, erreur: hookError, refetch: refetch } = useMessages(slugDossier, slugBlog);
    const { donnees: blog, chargement: hookBlogLoading, erreur: hookBlogErreur } = useBlog(slugDossier, slugBlog);

    // Hooks pour la création de messages
    const { mutation: mutation, chargement: chargementCreation, erreur: erreurCreation } = useCreerMessage();
    const { estConnecte, utilisateur, chargement: chargementAuth } = useAuthContexte();
    
    const loading = messagesPrecharges ? false : hookLoading;
    const error = messagesPrecharges ? null : hookError;

    if (loading) return <MessageBox message="Chargement des messages..." type="loading" />;
    if (error) return <MessageBox message={`Erreur : ${error.message}`} type="error" />;

    
    // Une fois un message créé, on re-récupère la page
    const handleCreation = async (contenu: string) => {
      if (!blog) {
        throw new Error("Identifiant du blog manquant");
      }
      
      const resultat = await mutation(contenu, blog.getId());
      refetch();
    }

    // Chargement des messages
    let messages: Message[];
    
    if (messagesPrecharges) {
      messages = messagesPrecharges.map(b => Message.fromJSON(b));
    } else if (hookMessages) {
      messages = hookMessages;
    } else {
      return <MessageBox message="Aucun blog disponible" type="info" />;
    }

    return (
      <div>
        <MessageList messages={messages} />
        <MessageFormCreation onSubmit={ handleCreation } chargement={ chargementCreation } erreur={ erreurCreation } estConnecte={ estConnecte }/>
      </div>
    );
}