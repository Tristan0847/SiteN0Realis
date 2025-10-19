import { I_MessageService } from "@BlogsBack/service/interface/I_MessageService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_MessageService = ServiceFactory.get<I_MessageService>(INTERFACESSERVICE.I_MessageService);

/**
 * Route de suppression d'un message
 * @param request Requête entrante
 * @returns Réponse HTTP indiquant le succès ou l'échec de la suppression
 */
export async function DELETE(request: NextRequest) : Promise<NextResponse> {
    try {
        const nomUtilisateur = request.headers.get('x-username');
        const estAdmin = request.headers.get('x-est-admin') === 'true';

        if (!nomUtilisateur) {
            return NextResponse.json(
                { error: 'Utilisateur non authentifié' },
                { status: 401 }
            );
        }

        if (!estAdmin) {
            return NextResponse.json(
                { error: 'Utilisateur non autorisé à supprimer des dossiers' },
                { status: 403 }
            );
        }

        // Récupération des paramètres
        const body = await request.json();
        const idMessage : number = body.idMessage;
        const idBlog : string = body.idBlog;
        const raisonSuppression : string = body.raisonSuppression;
        const cache : boolean = body.cache || false;

        // Suppression du blog
        await service.supprimerMessage(idMessage, idBlog, nomUtilisateur, raisonSuppression, cache);

        return NextResponse.json(
            { message: 'Message supprimé avec succès' },
            { status: 200 }
        );
    }
    catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }

}