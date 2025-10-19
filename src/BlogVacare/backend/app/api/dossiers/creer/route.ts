import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);

/**
 * Route de création d'un dossier
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
        const nomDossier : string = body.nomDossier;
        const descriptionDossier : string = body.descriptionDossier;

        // Création du dossier
        await service.creerDossier(nomDossier, descriptionDossier, nomUtilisateur);

        // Retourne une réponse de succès
        return NextResponse.json(
            { message: 'Dossier créé avec succès' },
            { status: 201 }
        );
    }
    catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }


}