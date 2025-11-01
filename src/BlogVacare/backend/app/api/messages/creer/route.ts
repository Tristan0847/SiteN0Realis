import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_MessageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);

/**
 * Route de création d'un message
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
        const idBlog : string = body.idBlog;
        const contenu : string = body.contenu;

        // Création du message
        await service.creerMessage(contenu, nomUtilisateur, idBlog);

        // Retourne une réponse de succès
        return NextResponse.json(
            { message: 'Message créé avec succès' },
            { status: 201 }
        );
    }
    catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la création du message, veuillez entrer un contenu à celui-ci" },
            { status: 500 }
        );
    }


}