// Script d'export statique des données pour usage local du site

// Charge les variables d'environnement si ça n'est pas déjà fait
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());


import * as fs from "node:fs";
import path from "node:path";
import {Blog, Dossier, Message} from "@BlogsFront/model/Blog";
import {apiFetch} from "@BlogsFront/lib/apiFetch";
import {BASE_DATA_PATH, BASE_DATA_PATH_BLOGS} from "@BlogsFront/lib/constants";
import {Params} from "@BlogsFront/model/ExportParams";

/**
 * Méthode d'écriture d'un fichier JSON
 * @param cheminFichier Chemin du fichier
 * @param data Données à insérer dans le fichier
 */
async function ecrireJson(cheminFichier : string, data: unknown) {
    await fs.promises.mkdir(path.dirname(cheminFichier), { recursive: true });
    await fs.promises.writeFile(cheminFichier, JSON.stringify(data, null, 2), { encoding: "utf-8"} );
}

/**
 * Script pour le blog principal
 */
async function scriptBlogPrincipal() {
    // Nettoyage des anciennes données
    if (fs.existsSync(BASE_DATA_PATH_BLOGS)) {
        await fs.promises.rm(BASE_DATA_PATH_BLOGS, {recursive: true})
    }

    // Récupération des dossiers/blogs du projet
    const dossiers : Dossier[] = await apiFetch<Dossier[]>("export/dossiers");

    // Liste des routes pour l'export statique
    const params : Params = {
        "modern": {
            "dossiers": [],
            "blogs": [],
        },
        "old" : {
            "dossiers": [],
            "blogs": [],
        }
    };

    // Écriture de chaque dossier/blogs/liste de messages
    const dossiersModern : Dossier[] = [];
    const dossiersOld : Dossier[] = [];
    for (const dossier of dossiers) {
        // Écriture du fichier du dossier
        !dossier.id_suppression && dossiersModern.push({
            ...dossier,
            blogs: [],
        });
        !dossier.element_supprime && dossiersOld.push({
            ...dossier,
            blogs: [],
        })

        // Écriture des blogs du dossier
        const blogs : Blog[] = dossier.blogs?.map((blog) => ({
            ...blog,
            messages: []
        })) ?? [];
        const blogsModern : Blog[] = blogs.filter((blog : Blog) => !blog.id_suppression) ?? [];
        const blogsOld : Blog[] = blogs.filter((blog : Blog) => !blog.element_supprime) ?? [];

        if (blogsModern.length > 0) {
            await ecrireJson(path.join(BASE_DATA_PATH_BLOGS, "dossier", dossier.slug + ".json"), blogsModern);
            params["modern"]["dossiers"].push({slugDossier: dossier.slug});
        }
        if (blogsOld.length > 0) {
            await ecrireJson(path.join(BASE_DATA_PATH_BLOGS, "old", "dossier", dossier.slug + ".json"), blogsOld);
            params["old"]["dossiers"].push({slugDossier: dossier.slug});
        }

        // Écriture des messages du dossier
        for (const blog of dossier.blogs ?? []) {
            const messages : Message[] = (blog.messages && blog.messages.length > 0) ? blog.messages : [];
            // Ecriture en modern seulement si le blog n'est pas supprimé
            if (!blog.id_suppression && messages.length > 0) {
                const messagesModerne : Message[] = messages.filter((message : Message) => !message.id_suppression);
                messagesModerne.length > 0 && await ecrireJson(path.join(BASE_DATA_PATH_BLOGS, "blog", dossier.slug, blog.slug + '.json'), messagesModerne);
                params["modern"]["blogs"].push({slugDossier: dossier.slug, slugBlog: blog.slug});
            }
            // Ecriture en old si le blog n'est pas caché
            if (!blog.element_supprime && messages.length > 0) {
                const messagesOld : Message[] = messages.filter((message : Message) => !message.element_supprime);
                messagesOld.length > 0 && await ecrireJson(path.join(BASE_DATA_PATH_BLOGS, "old", "blog",dossier.slug, blog.slug + '.json'), messagesOld);
                params["old"]["blogs"].push({slugDossier: dossier.slug, slugBlog: blog.slug});
            }
        }
    }

    dossiersModern.length > 0 && await ecrireJson(path.join(BASE_DATA_PATH_BLOGS, "dossiers.json"), dossiersModern);
    dossiersOld.length > 0 && await ecrireJson(path.join(BASE_DATA_PATH_BLOGS, "old", "dossiers.json"), dossiersOld);

    await ecrireJson(path.join(BASE_DATA_PATH, "routes.json"), params);
}

// Exécution
scriptBlogPrincipal().catch((error) => {
    console.error(error);
    process.exit(1);
});