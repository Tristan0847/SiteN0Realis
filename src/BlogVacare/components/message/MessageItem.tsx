'use client';

import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { getVariantStyles } from '@BlogsFront/lib/variant-styles';
import { Message } from '@BlogsFront/model/Blog';
import Image from "next/image";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SuppressionBox from '@BlogsFront/components/SuppressionBox';
import ElementSupprimeBox from '@BlogsFront/components/ElementSupprimeBox';

/**
 * Props du composant MessageItem
 */
type MessageItemProps = {
    message: Message;
    suppressionHandler?: (id: number, raison: string, cache: boolean) => Promise<void>;
}

/**
 * Fonction de composant permettant l'affichage d'un message envoyé en paramètre
 * @param message Message à afficher
 * @param suppressionHandler Gestion de la suppression d'un message
 * @returns Composant React
 */
export function MessageItem({ message, suppressionHandler }: MessageItemProps) {
    // Chemin vers l'avatar
    const avatarDefaut = `/assets/BlogVacare/Icones/Vince.jpg`;
    const avatarUtilisateur = `/assets/BlogVacare/Icones/${message.nom_utilisateur}.jpg`;
    const [avatarSrc, setAvatarSrc] = useState(avatarUtilisateur);
    const [afficherSupprime, setAfficherSupprime] = useState(false);

    // Formatage de la date
    const dateString = new Date(message.date_publication).toLocaleString('fr-FR', {timeZone: 'UTC'});

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    // Mise en place de la dialog box de suppression
    const [dialogBoxOuverte, setDialogBox] = useState(false);
    const suppression = message.element_supprime ?? message.element_supprime_visible ?? null;

    return (
        <div className={ styles.messageItem }>
            <div className={ styles.messageImgConteneur }>
                <Image
                    className={ styles.messageImg }
                    src={avatarSrc}
                    alt={`Avatar de ${message.nom_utilisateur}`}
                    width={64}
                    height={64}
                    onError={() => setAvatarSrc(avatarDefaut)}
                />
            </div>

            <div className={ styles.messageConteneur }>
                <span className={ styles.messagecontenuPseudo + " columns-2"}>
                    <div className='text-left'>
                        {message.nom_utilisateur}
                    </div>

                    {suppressionHandler && !suppression && (
                      <div className="text-right">
                        <button onClick={() => setDialogBox(true)} className={ styles.supprimerBtn }>Supprimer</button>
                
                        <SuppressionBox id={ message.id } type={ "message" } suppressionHandler={ suppressionHandler } dialogBoxOuverte={ dialogBoxOuverte } setDialogBox={ setDialogBox } />
                      </div>
                    )}

                </span>
                {suppression ? (
                    <div className={ styles.messageSupprimeBox }>
                        <ElementSupprimeBox type={ "message" } donnees= { suppression }/>
                        <button onClick={() => setAfficherSupprime(!afficherSupprime)} className={ styles.messageSupprimeBtn }>{afficherSupprime ? "Masquer" : "Voir quand même"}</button>
                        {afficherSupprime && (
                            <div className={`${styles.messageContenu} mt-3 opacity-90`}>
                                <ReactMarkdown
                                    components={{
                                        a: ({...props}) => (
                                            <a {...props} className="underline hover:font-bold" target='_blank' rel="noopener noreferrer" />
                                        )
                                    }}>
                                {message.contenu}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.messageContenu}>
                        <ReactMarkdown
                                    components={{
                                        a: ({...props}) => (
                                            <a {...props} className="underline hover:font-bold" target='_blank' rel="noopener noreferrer" />
                                        )
                                    }}>
                                {message.contenu}
                        </ReactMarkdown>
                    </div>
                )}
                <span className={ styles.messageDate }>Posté le {dateString}</span>
            </div>
        </div>
    );
}