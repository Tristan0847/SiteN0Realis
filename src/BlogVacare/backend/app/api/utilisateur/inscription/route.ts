import { CookiesMiddleware } from "@BlogsBack/middlewares/CookiesMiddleware";
import { I_AuthService } from "@BlogsBack/service/interface/I_AuthService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { DonneesInscription } from "@BlogsShared/model/Auth";
import { NextRequest, NextResponse } from "next/server";

const service : I_AuthService = ServiceFactory.get<I_AuthService>(INTERFACESSERVICE.I_AuthService);
const cookiesMiddleware : CookiesMiddleware = new CookiesMiddleware();

/**
 * Route POST d'inscription
 * @param request Données de la requête (nom d'utilisateur et mot de passe)
 */
export async function POST(request : NextRequest) : Promise<NextResponse> {

    try {
        const parametres : DonneesInscription = await request.json();

        // Vérification des paramètres
        if (!parametres.nomUtilisateur || !parametres.mdp1 || !parametres.mdp2) {
            return NextResponse.json(
                { error: "Nom d'utilisateur et mot de passe requis"},
                { status: 400 }
            )
        }

        const retour = await service.inscription(parametres);

        // Création de la réponse 
        const reponse = NextResponse.json({
            succes: true,
            utilisateur: retour.utilisateur
        }, { status: 200 });

        // Définition des cookies avec les tokens
        cookiesMiddleware.setAuthCookies(reponse, retour.tokenAcces, retour.tokenRefresh);

        return reponse;
    }
    catch (error) {
        console.error("[Erreur API]", error);
        return NextResponse.json(
            { error : "Paramètres d'inscription invalides, veuillez à bien respecter les conditions de mot de passe" },
            { status: 401 }
        )
    }


}