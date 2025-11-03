import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);

/**
 * Route de création d'un blog
 * @param request Requête entrante
 * @returns Réponse HTTP indiquant le succès ou l'échec de la création
 */
export async function POST(request : NextRequest) : Promise<NextResponse> {

    try {
        // Récupération des headers entrés par le middleware d'authentification 
        const nomUtilisateur = request.headers.get('x-username');

        if (!nomUtilisateur) {
            return NextResponse.json(
                { error: 'Utilisateur non authentifié' },
                { status: 401 }
            );
        }

        // Récupération des paramètres
        const body = await request.json();
        const nom : string = body.nom;
        const contenuPremierMessage : string = body.contenuPremierMessage;
        const idDossier : string = body.idDossier;

        // Création du blog
        await service.creerBlog(nom, contenuPremierMessage, idDossier, nomUtilisateur);

        // Retourne une réponse de succès
        return NextResponse.json(
            { message: 'Blog créé avec succès' },
            { status: 201 }
        );
    }
    catch (error) {
        console.error("[Erreur API]", error);
        return NextResponse.json(
            { error: "Erreur lors de la création du blog, veuillez renseigner au moins un titre au blog" },
            { status: 500 }
        );
    }


}