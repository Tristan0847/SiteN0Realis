'use client';

import { FormulaireInscription } from '@BlogsFront/components/auth/FormulaireInscription';
import { useVariant } from '@BlogsFront/contexts/VariantContext';
import { useInscription } from '@BlogsFront/hooks/useAuth';
import { useRouter } from 'next/navigation';

/**
 * Page affichant la page d'inscription du site
 * @returns {JSX.Element} Composant React pour la page d'inscription du site
 */
export default function PageInscriptionClient() {
    
    const { mutation: mutationInscription, chargement: hookLoading, erreur: hookError } = useInscription();
    const router = useRouter();
    const variant = useVariant();
    const baseUrl = (variant == "modern") ? "/" : "/" + variant;

    // A la soumission du formulaire
    const handleInscription = async (nomUtilisateur: string, mdp1: string, mdp2: string) => {
      const resultat = await mutationInscription(nomUtilisateur, mdp1, mdp2);
      
      // Si on a pu s'inscrire avec succès, on sera redirigé vers la page d'accueil
      if (resultat && resultat.succes) {
        router.push(baseUrl);
      }
    }
    
    return (
        <FormulaireInscription onSubmit={ handleInscription } chargement={hookLoading} erreur={hookError}  />
    );
}
