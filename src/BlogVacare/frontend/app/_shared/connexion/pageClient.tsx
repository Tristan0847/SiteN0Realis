'use client';

import { FormulaireConnexion } from '@BlogsFront/components/auth/FormulaireConnexion';
import { useAuthContexte } from '@BlogsFront/contexts/AuthContext';
import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { useConnexion } from '@BlogsFront/hooks/useAuth';
import { useRouter } from 'next/navigation';

/**
 * Page affichant la page de connexion
 * @returns {JSX.Element} Composant React pour la page de connexion du site
 */
export default function PageConnexionClient() {
    
    const { mutation: mutationConnexion, chargement: hookLoading, erreur: hookError } = useConnexion();
    const { connexion: connexionContexte } = useAuthContexte();
    const router = useRouter();
    const variant = useVariant();
    const baseUrl = (variant == "modern") ? "/" : "/" + variant;

    // A la soumission du formulaire, on renvoie vers l'action de connexion
    const handleConnexion = async (nomUtilisateur: string, mdp: string) => {
      const resultat = await mutationConnexion(nomUtilisateur, mdp);
      
      if (resultat && resultat.succes) {
        connexionContexte(resultat.utilisateur);
        router.push(baseUrl);
      }
    }
    
    return (
        <FormulaireConnexion onSubmit={ handleConnexion } chargement={hookLoading} erreur={hookError}  />
    );
}
