import { Utilisateur } from "@BlogsFront/model/Auth";
import {ImageDeProfil} from "@BlogsFront/components/UI/ImageDeProfil";

/**
 * Props de l'utilisateur
 */
interface UtilisateurBanniereProps {
    utilisateur: Utilisateur;
}

/**
 * Composant affichant le profil d'un utilisateur (description, photo de profil, bannière, ...)
 * @param utilisateur Utilisateur à montrer
 * @constructor
 */
export function CommunityUtilisateur({utilisateur} : UtilisateurBanniereProps) {

    return (
        <div className="w-full border-2 border-gray-800 bg-gray-400 text-white shadow-[4px_4px_0_0_#000] ring-1 ring-gray-300">
            <div className="">
                <img src={utilisateur.banniere ? "/assets/BlogVacare/Community/Bannieres/" + utilisateur.banniere : "/assets/BlogVacare/Community/Croix.png"} className="w-full h-40 object-cover" alt=""/>
            </div>
            <div className="flex flex-row items-center justify-between border-b-2 border-stone-700">
                <div className="flex flex-row items-center gap-6">
                    <ImageDeProfil nom_utilisateur={utilisateur.nom_utilisateur} classNames="text-green-500" />
                    <p className="text-2xl font-bold text-white">
                        @{utilisateur.nom_utilisateur}
                        {utilisateur.est_admin ?
                            <span className="ml-2 bg-green-800 px-1 py-0 text-white">
                                Admin
                            </span>
                            : ""
                        }
                    </p>
                </div>
                <p className="">
                    {utilisateur.created_at && utilisateur.created_at.length > 0 &&
                        <>
                            Utilisateur ajouté le {new Date(utilisateur.created_at).toLocaleDateString()}
                        </>
                    }
                </p>
            </div>
            <div className="p-2 bg-gray-600">
                <p className="">
                    Description :
                    <br/>
                    {(utilisateur.description && utilisateur.description.length > 0)
                        ? <span className="">{utilisateur.description}</span>
                        : <span className=" italic">Non renseignée</span>
                    }
                </p>
            </div>
        </div>
    )

}