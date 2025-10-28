import { I_BlogService } from "@BlogsBack/service/interface/I_BlogService";
import { INTERFACESSERVICE, ServiceFactory } from "@BlogsBack/service/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

const service : I_BlogService = ServiceFactory.get<I_BlogService>(INTERFACESSERVICE.I_BlogService);

/**
 * Route de suppression d'un blog
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
                { status: 403 }
            );
        }

        // Récupération des paramètres
        const body = await request.json();
        const idBlog : string = body.idBlog;
        const raisonSuppression : string = body.raisonSuppression;
        const cache : boolean = body.cache || false;

        // Suppression du blog
        await service.supprimerBlog(idBlog, nomUtilisateur, raisonSuppression, cache);

        return NextResponse.json(
            { message: 'Blog supprimé avec succès' },
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