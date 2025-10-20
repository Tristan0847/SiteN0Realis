import { I_DossierService } from "@BlogsFront/services/Interface/I_DossierService";
import { Dossier } from "@BlogsShared/model/Dossier";

/**
 * Classe de service de dossier utilisant l'API de backend
 */
export class DossierServiceApi implements I_DossierService {

    private apiBaseUrl : string;

    constructor() {
        this.apiBaseUrl = process.env.NEXT_PUBLIC_LIEN_API_BACKEND ?? "http://localhost:3000/api";
    }


    async recupererDossiers() : Promise<Dossier[]> {
        const url = this.apiBaseUrl + "/dossiers/liste";
        const reponse = await fetch(url);

        if (!reponse.ok) {
            throw new Error("Erreur lors de la récupération des dossiers : " + reponse.statusText);
        }

        const dossiersJson = await reponse.json();
        const dossiers : Dossier[] = [];
        dossiersJson.forEach((dossierJson : string) => {
            const dossier = Dossier.fromJSON(dossierJson);
            dossiers.push(dossier);
        });

        return dossiers;
    }

    async recupererDossierParSlug(slugDossier : string) : Promise<Dossier> {
        const url = this.apiBaseUrl + "/dossiers/recuperation/" + slugDossier;
        const reponse = await fetch(url);

        if (!reponse.ok) {
            throw new Error("Erreur lors de la récupération du dossier " + slugDossier + " : " + reponse.statusText);
        }

        const dossierJson = await reponse.json();
        const dossier = Dossier.fromJSON(dossierJson);

        return dossier;
    }

    async creerDossier(nom : string, description : string) : Promise<void> {
        const url = this.apiBaseUrl + "/dossiers/creer";
        const body = JSON.stringify({
            nomDossier : nom,
            descriptionDossier: description
        });

        const requete : RequestInit = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include",
            body : body
        };

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "Erreur lors de la création du dossier");
        }
    }

    async supprimerDossier(idDossier : string, raisonSuppression : string, cache : boolean) : Promise<void> {
        const url = this.apiBaseUrl + "/dossiers/supprimer";

        const body = JSON.stringify({
            idDossier: idDossier,
            raisonSuppression: raisonSuppression,
            cache: cache
        });

        const requete : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
            credentials: "include",
            body: body
        }

        const reponse = await fetch(url, requete);

        if (!reponse.ok) {
            const erreur = await reponse.json();
            throw new Error(erreur.error || "Erreur lors de la suppression du dossier");
        }
    }
    
}