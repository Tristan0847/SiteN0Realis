# Initialisation du projet

**Node.js est nécessaire à l'exécution de ce projet, trouvez un guide d'installation ci-dessous si vous ne l'avez pas, trouvez ci-dessous les commandes à exécuter sous environnement Linux :**
```
sudo apt update
sudo apt install nodejs 15.5.3
```

## Installation des dépendances

Plusieurs dépendances sont à installer avant de pouvoir lancer le projet, exécutez donc la commande suivante [à la racine du dépôt](../) avant d'exécuter n'importe quel projet :
```
npm install
```
**N'exécutez jamais `npm install` depuis un sous-dossier de projet** (`src/BlogVacare`, `src/Wiki`, ...) : le dépôt utilise les workspaces npm, toutes les dépendances sont installées et gérées depuis la racine.

## Configuration des projets

Seul le projet Blog de Vacare nécessite actuellement de réelles configurations, vous en trouverez le [guide d'installation au lien joint](./BlogVacare.md).
Suivez ses instructions, puis passez à la suite pour le démarrer et l'utiliser.

# Lancement et utilisation des projets

## Lancement individuel d'un projet

Il n'existe plus de commande à la racine pour lancer un projet en particulier (dev, build ou start) : chaque sous-projet expose ses propres scripts dans son propre `package.json`, à exécuter **depuis un terminal ouvert dans le dossier de ce projet** (celui qui contient son `package.json`), et non depuis la racine du dépôt.

Concrètement, ouvrez un terminal à la racine du projet concerné, par exemple :
```
cd src/Wiki
npm run dev
```
```
cd src/BlogVacare/frontend
npm run dev
```
```
cd src/Rats
npm run dev
```
```
cd src/Neant
npm run dev
```

Les mêmes projets exposent aussi `npm run build` (export statique dans un dossier `out`) et `npm run start` (démarrage du site déjà buildé), à exécuter de la même façon depuis leur propre dossier.

### Cas particulier : le back-end de BlogVacare

BlogVacare est le seul projet à dépendre d'un back-end (Laravel, sous Docker). Avant de lancer ou de builder son front-end (en mode `dev` comme en mode `build:export`), démarrez le back-end depuis son propre dossier :
```
cd src-back
docker compose up -d
```
**Si vous souhaitez arrêter vos serveurs, exécutez `Ctrl + C` au clavier sur le terminal l'ayant initialisé** (ou `docker compose down` pour le back-end).

## Export global de tous les projets

Pour exporter tous les projets exportables en une seule commande, placez-vous à la racine du dépôt et exécutez :
```
npm run export:all
```

Cette commande build chaque sous-projet exportable (BlogVacare, Wiki, Rats, Neant) et rassemble le résultat dans un unique dossier `out/` à la racine du dépôt, organisé par sous-domaine.

**⚠️ Le back-end de BlogVacare doit être démarré manuellement au préalable** (`cd src-back && docker compose up -d`, voir ci-dessus) **avant de lancer `npm run export:all`.** Le script ne le démarre pas lui-même : si le back-end n'est pas actif, l'export de BlogVacare est automatiquement ignoré (un message l'indique dans le terminal), les autres projets sont tout de même exportés normalement.

## Guide d'utilisation

Vous trouverez ci-dessous le guide d'utilisation de chaque projet :
* [Guide d'utilisation du Blog de Vacare](./BlogVacare.md)
* [Guide d'utilisation de l'Oeil de l'Occulte](./OeilDeLocculte.md)
* [Guide d'utilisation du Trou à Rats](./Rats.md)
* [Guide d'utilisation de 0](./0.md)