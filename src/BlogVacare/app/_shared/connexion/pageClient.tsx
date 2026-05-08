'use client';

import {FormulaireConnexion} from '@BlogsFront/components/auth/FormulaireConnexion';
import {useAuthContexte} from '@BlogsFront/contexts/AuthContext';
import {useRouter} from 'next/navigation';

/**
 * Page affichant la page de connexion
 * @returns {JSX.Element} Composant React pour la page de connexion du site
 */
export default function PageConnexionClient() {

    const {connexion: mutationConnexion, chargement, erreur} = useAuthContexte();
    const router = useRouter();

    // A la soumission du formulaire, on renvoie vers l'action de connexion
    const handleConnexion = async (nomUtilisateur: string, mdp: string) => {
        await mutationConnexion({nomUtilisateur, mdp});
        if (!erreur) {
            router.push('../');
        }
    }

    return (
        <FormulaireConnexion onSubmit={handleConnexion} chargement={chargement} erreur={erreur}/>
    );
}
