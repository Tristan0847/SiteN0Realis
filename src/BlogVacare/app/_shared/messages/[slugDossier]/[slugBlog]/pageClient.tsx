'use client';

import {MessageFormCreation} from '@BlogsFront/components/message/MessageFormCreation';
import {MessageList} from '@BlogsFront/components/message/MessageList';
import {PageWrapper} from '@BlogsFront/components/PageWrapper';
import {useAuthContexte} from '@BlogsFront/contexts/AuthContext';
import {useVariant} from '@BlogsFront/contexts/VariantContext';
import {useCreerMessage, useMessages, useSupprimerMessage} from '@BlogsFront/hooks/useMessages';
import {Message} from "@BlogsFront/model/Blog";
import {AccesRestreint} from "@BlogsFront/components/auth/AccesRestreint";

/**
 * Props pour le composant PageMessagesClient
 */
interface PageBlogsClientProps {
    slugDossier: string;
    slugBlog: string;
}

/**
 * Page affichant les messages d'un blog spécifique
 * @returns {JSX.Element} Composant React pour la page des messages d'un blog
 */
export default function PageMessagesClient({slugDossier, slugBlog}: PageBlogsClientProps) {

    // Hooks de messages récupérés, du blog correspondant, de création de message, d'authentification et d'éventuels messages d'erreurs
    const variante = useVariant();
    const { data: messages, isLoading: messagesLoading, error: hookError } = useMessages(slugDossier, slugBlog, variante);
    const {mutateAsync: mutationCreation, isPending: chargementCreation, error: erreurCreation} = useCreerMessage();
    const {mutateAsync: mutationSuppression} = useSupprimerMessage();
    const {estConnecte, utilisateur} = useAuthContexte();

    // Une fois un message créé, on re-récupère la page
    const handleCreation = async (contenu: string) => {
        await mutationCreation({slug_dossier: slugDossier, slug_blog: slugBlog, contenu});
    }

    // Gestion de la suppression d'un message 
    const handleSuppression = async (id: number, raisonSuppression: string, cache: boolean) => {
        await mutationSuppression({
            id: id,
            raison: raisonSuppression,
            cache: cache,
            slug_dossier: slugDossier,
            slug_blog: slugBlog
        });
    }

    // Gestion des données affichées pour un utilisateur admin ou non, ou pour le mode old
    const estAdmin = utilisateur?.est_admin ?? false;
    const suppressionHandler = estAdmin ? handleSuppression : undefined;

    return (
        <PageWrapper chargement={messagesLoading || chargementCreation} erreur={hookError} estVide={messages ? messages.length == 0 : true}
                     messageVide="Aucun message trouvé" chargementMessage="Chargement des messages...">
            {messages && <MessageList messages={messages} suppressionHandler={suppressionHandler}/>}
            {estConnecte ? <MessageFormCreation onSubmit={handleCreation} chargement={chargementCreation} erreur={erreurCreation} /> : <AccesRestreint message="Vous devez être connecté pour répondre à un blog." />}
        </PageWrapper>
    );
}