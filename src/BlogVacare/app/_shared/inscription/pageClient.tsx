'use client';

import {FormulaireInscription} from '@BlogsFront/components/auth/FormulaireInscription';
import {useRouter} from 'next/navigation';
import {useAuthContexte} from "@BlogsFront/contexts/AuthContext";

/**
 * Page affichant la page d'inscription du site
 * @returns {JSX.Element} Composant React pour la page d'inscription du site
 */
export default function PageInscriptionClient() {

    const {inscription: mutateInscription, chargement, erreur} = useAuthContexte();
    const router = useRouter();


    // A la soumission du formulaire
    const handleInscription = async (nomUtilisateur: string, mdp1: string, mdp2: string) => {
        await mutateInscription({nomUtilisateur, mdp1, mdp2});
        if (!erreur) {
            router.push('../');
        }
    }

    return (
        <FormulaireInscription onSubmit={handleInscription} chargement={chargement} erreur={erreur}/>
    );
}
