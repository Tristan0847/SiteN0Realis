#!/usr/bin/env node
/**
 * Builds every subproject and exports them to a unique dist/ directory.
 *
 * Usage : npm run export:all
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "out");
const BACKEND_DIR = path.join(ROOT, "src-back");

/**
 * - workspace   : path passed to --workspace, must be the same as a package.json
 * - buildScript : script npm to launch
 * - outDir      : Build program output directory (relative to workspace) to copy from
 * - destSlug    : Name of the subdirectory to copy to
 * - requiresBackend : true if the build requires the Laravel back-end
 */
const TARGETS = [
    {
        name: "BlogVacare",
        workspace: "src/BlogVacare/",
        buildScript: "build:export",
        outDir: "src/BlogVacare/out",
        destSlug: "",
        requiresBackend: true,
    },
    {
        name: "Wiki (Oeil de l'Occulte)",
        workspace: "src/Wiki",
        buildScript: "build",
        outDir: "src/Wiki/out",
        destSlug: "wiki",
        requiresBackend: false,
    },
    {
        name: "Rats",
        workspace: "src/Rats",
        buildScript: "build",
        outDir: "src/Rats/out",
        destSlug: "Rats",
        requiresBackend: false,
    },
    {
        name: "Neant",
        workspace: "src/Neant",
        buildScript: "build",
        outDir: "src/Neant/out",
        destSlug: "0",
        requiresBackend: false,
    },
];

function log(msg) {
    console.log(`\n\x1b[36m[export:all]\x1b[0m ${msg}`);
}

function fail(msg) {
    console.error(`\n\x1b[31m[export:all] ERREUR :\x1b[0m ${msg}`);
}

function isBackendUp() {
    try {
        const running = execSync("docker compose ps --status running --services", {
            cwd: BACKEND_DIR,
            stdio: ["pipe", "pipe", "ignore"],
        })
            .toString()
            .split("\n")
            .filter(Boolean);
        return running.includes("app") && running.includes("db");
    } catch {
        return false;
    }
}

function copyDir(src, dest) {
    fs.rmSync(dest, { recursive: true, force: true });
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
}

/**
 * Removes all .txt files from a directory and its subdirectories.
 * @param {string} dir - The directory to process.
 * @returns {number} The number of .txt files removed.
 */
function removeTxtFiles(dir) {
    if (!fs.existsSync(dir)) return;
    let removed = 0;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            removed += removeTxtFiles(fullPath);
        } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".txt") {
            fs.rmSync(fullPath, { force: true });
            removed++;
        }
    }
    return removed;
}


function main() {
    log(`Nettoyage de ${path.relative(ROOT, DIST_DIR)}/ ...`);
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
    fs.mkdirSync(DIST_DIR, { recursive: true });

    const results = [];

    for (const target of TARGETS) {
        log(`Build de ${target.name} (npm run ${target.buildScript} --workspace ${target.workspace})`);

        if (target.requiresBackend && !isBackendUp()) {
            fail(`${target.name} nécessite le backend actif (docker compose up -d) — build ignoré.`);
            results.push({ name: target.name, status: "SKIPPED (backend absent)" });
            continue;
        }

        try {
            execSync(`npm run ${target.buildScript} --workspace ${target.workspace}`, {
                cwd: ROOT,
                stdio: "inherit",
            });
        } catch {
            fail(`Le build de ${target.name} a échoué.`);
            results.push({ name: target.name, status: "ÉCHEC" });
            continue;
        }

        const sourceOut = path.join(ROOT, target.outDir);
        if (!fs.existsSync(sourceOut)) {
            fail(`Dossier de sortie introuvable pour ${target.name} : ${target.outDir}`);
            results.push({ name: target.name, status: "ÉCHEC (out introuvable)" });
            continue;
        }

        const dest = path.join(DIST_DIR, target.destSlug);
        copyDir(sourceOut, dest);
        const txtRemoved = removeTxtFiles(dest);
        log(`✔ ${target.name} exporté vers out/${target.destSlug}/${txtRemoved ? ` (${txtRemoved} .txt supprimé(s))` : ""}`);
        results.push({ name: target.name, status: "OK" });
    }

    log("Résumé de l'export :");
    for (const r of results) {
        console.log(`  - ${r.name.padEnd(28)} ${r.status}`);
    }

    const hasFailure = results.some((r) => r.status !== "OK");
    process.exit(hasFailure ? 1 : 0);
}

main();