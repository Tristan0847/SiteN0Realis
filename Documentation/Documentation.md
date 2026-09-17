# Architecture Globale du Monorepo N0Realis

Ce document sert de point d'entrée pour comprendre comment les différents projets du dépôt s'articulent entre eux. Pour le détail de chaque site, référez-vous à sa documentation dédiée (liens en bas de page). Pour l'installation et le lancement, voir le [Guide d'Installation](ArchitectureGlobale.md).

## Pourquoi un monorepo ?

Le dépôt regroupe plusieurs sites indépendants, hébergés sous le même nom de domaine, mais qui partagent :
- une base de configuration commune (Next.js, TypeScript, Tailwind, ESLint),
- un module utilitaire commun ([lib](../src/lib)),
- et pour certains, la même base de données / le même back-end.

Plutôt que de dupliquer ces éléments dans des dépôts séparés, chaque site est un **workspace npm** indépendant, mais résolu et installé depuis la racine.

## Structure de la racine

```
root/
├── package.json          # Déclare les workspaces + scripts d'orchestration globale
├── next.config.ts         # Config Next.js de base, dont héritent les sous-projets
├── postcss.config.mjs     # Config PostCSS/Tailwind de base
├── tsconfig.base.json     # Config TypeScript de base ("extends" par chaque sous-projet)
├── node_modules/          # Unique dossier de dépendances généré (hoisting npm workspaces)
├── src-back/               # Sous-projet Laravel (API back-end de BlogVacare)
└── src/                    # Sources de chaque sous-projet front (voir plus bas)
    ├── BlogVacare/
    ├── Wiki/
    ├── Rats/
    ├── Neant/
    ├── CR/                # À venir
    └── lib/                # Module partagé entre les sous-projets front
```

### Configuration commune héritée

Les fichiers `next.config.ts`, `postcss.config.mjs` et `tsconfig.base.json` à la racine constituent le socle commun de configuration :
- chaque `tsconfig.json` de sous-projet fait un `"extends": "../../tsconfig.base.json"` (voir celui de [BlogVacare](../src/BlogVacare/tsconfig.json) par exemple) et n'ajoute que ses propres alias de chemins (`paths`) ;
- les dépendances communes (Next.js, React, Tailwind, ESLint, etc.) sont déclarées avec leur version précise dans le `package.json` racine, puis référencées avec un simple `"*"` dans les `package.json` de chaque sous-projet. C'est donc la racine qui fait foi pour la résolution des versions.

### Un seul `node_modules`

Grâce au champ `"workspaces"` du `package.json` racine :
```json
"workspaces": [
    "src/Rats",
    "src/Neant",
    "src/BlogVacare",
    "src/CR",
    "src/Wiki",
    "src/lib"
]
```
npm installe et hisse (« hoist ») l'ensemble des dépendances dans un unique `node_modules` à la racine, partagé par tous les sous-projets. Cela signifie concrètement que :
- **une seule commande `npm install` à la racine suffit** pour tous les projets ;
- il ne faut **jamais lancer `npm install` depuis un sous-dossier** (`src/BlogVacare`, `src/Wiki`, ...), sous peine de dupliquer des dépendances ou de casser la résolution de `lib` ;
- ajouter/mettre à jour une dépendance commune se fait via la racine (`npm install <pkg> -w src/NomDuProjet` pour cibler un sous-projet précis).

### Le module `lib`

[src/lib](../src/lib) est un sous-projet à part entière (déclaré comme workspace) mais qui n'est pas un site : c'est une librairie interne important par les autres projets front comme une dépendance classique (`"lib": "*"` dans leurs `package.json`, voir [celui de BlogVacare](../src/BlogVacare/package.json)). Il a vocation à accueillir les composants/utilitaires réutilisés d'un site à l'autre (le projet [Rats](./Rats.md) mentionne d'ailleurs une prochaine migration de certains de ses composants vers `lib`).

## Panorama des sous-projets

| Projet | Type | Back-end associé | Particularité principale | Documentation |
|---|---|---|---|---|
| **BlogVacare** | Next.js (front) + Laravel (API) | [src-back](../src-back) via Docker | 2 modes d'affichage (rétro `/old` et moderne), mode `export` (lecture seule, HTML statique) vs mode `production` (dynamique) | [BlogVacare.md](./BlogVacare.md) |
| **Wiki** (*Oeil de l'Occulte*) | Next.js statique | Aucun | Contenu rédigé en MDX, indexé via `contentlayer2` + script de génération d'index de recherche | [OeilDeLocculte.md](./OeilDeLocculte.md) |
| **Rats** (*Trou à Rats*) | Next.js 100% front | Aucun | Contenu géré page par page, pas d'appel API | [Rats.md](./Rats.md) |
| **Neant** | Next.js + moteur de jeu (Phaser) | Aucun | Héberge le moteur de jeu interne (`AbstractGameEngine`) et ses implémentations | [0.md](./0.md) |
| **lib** | Module partagé (librairie interne) | — | Consommé comme dépendance par les autres sous-projets front | — |
| **CR** | À venir | — | — | — |

Tous les sous-projets front sont conçus pour être **exportables statiquement** (`npm run build` → dossier `out`) et peuvent aussi tourner en local via `npm run dev`.

## Le back-end (`src-back`)

Seul **BlogVacare** dépend d'un back-end. Il s'agit d'un projet Laravel 13 (PHP 8.3), avec authentification via `laravel/sanctum` et `tymon/jwt-auth`, exécuté via Docker Compose ([docker-compose.yml](../docker-compose.yml)) :

| Service | Rôle | Port exposé |
|---|---|---|
| `app` | PHP-FPM, exécute l'application Laravel | — |
| `nginx` | Serveur web, sert l'API | `8000` |
| `db` | Base de données MySQL 8.0 | `3306` |
| `phpmyadmin` | Interface d'administration de la base | `8080` |

Le front-end de BlogVacare communique avec cette API via la variable d'environnement `NEXT_PUBLIC_LIEN_API_BACKEND` (voir [BlogVacare.md](./BlogVacare.md#configuration-du-projet)).

## Cycle de build et de lancement

Le `package.json` racine ne porte plus qu'un seul script d'orchestration :
```json
"scripts": {
    "export:all": "node scripts/exportAll.js"
}
```
- **`npm run export:all`** (depuis la racine) : build chaque sous-projet exportable et rassemble le résultat dans un dossier `out/` unique — voir la section dédiée du [Guide d'Installation](ArchitectureGlobale.md#export-global-de-tous-les-projets).
- **Lancer un projet individuellement** (dev, build ou start) ne passe plus par la racine : chaque sous-projet expose ses propres scripts `dev`/`build`/`start` dans son propre `package.json`, à exécuter depuis un terminal ouvert **dans le dossier de ce projet**. Détail dans le [Guide d'Installation](ArchitectureGlobale.md#lancement-individuel-dun-projet).
