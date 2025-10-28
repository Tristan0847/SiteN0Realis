import { I_DossierService } from "@BlogsBack/service/interface/I_DossierService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_DossierService = ServiceFactory.get<I_DossierService>(INTERFACESSERVICE.I_DossierService);

/**
 * Route de suppression d'un dossier
 * @param request Requête entrante
 * @returns Réponse HTTP indiquant le succès ou l'échec de la suppression
 */
export async function DELETE(request: NextRequest) : Promise<NextResponse> {
    try {
        const nomUtilisateur = request.headers.get('x-username');
        const estAdmin = request.headers.get('x-est-admin') === '1';

        if (!nomUtilisateur) {
            return NextResponse.json(
                { error: 'Utilisateur non authentifié' },
                { status: 401 }
            );
        }

        if (!estAdmin) {
            return NextResponse.json(
                { error: 'Utilisateur non autorisé à supprimer des dossiers' },
                { status: 400 }
            );
        }

        // Récupération des paramètres
        const body = await request.json();
        const idDossier : string = body.idDossier;
        const raisonSuppression : string = body.raisonSuppression;
        const cache : boolean = body.cache || false;

        // Suppression du dossier
        await service.supprimerDossier(idDossier, nomUtilisateur, raisonSuppression, cache);

        return NextResponse.json(
            { message: 'Dossier supprimé avec succès' },
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