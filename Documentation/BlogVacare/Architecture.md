# Architecture du Blog de Vacare

## Back-end
__**API REST, servant à la logique de l'application**__
- **[app](../../src/BlogVacare/backend/app/)** : Routing de l'API
- **[middleware.ts](../../src/BlogVacare/backend/middleware.ts)** : Middleware d'authentification du projet
- **[middlewares](../../src/BlogVacare/backend/middlewares/)** : Traitements complémentaires de l'application (authentification, erreurs, ...)
- **[services](../../src/BlogVacare/backend/services/)** : Package de services rendus à l'application (appelé par les routes, interagissant avec DAO et Utils)
- **[utils](../../src/BlogVacare/backend/utils/)** : Helpers réutilisables (hachage de mot de passe, JWT, ...)
- **[DAO](../../src/BlogVacare/backend/DAO/)** : Package d'interaction avec la base de données du projet
- **[config](../../src/BlogVacare/backend/config/)** : Package de configuration de bases de données du projet
- **[tests](../../src/BlogVacare/backend/tests/)** : Package de configuration des tests unitaires

## Front-end

__**Visuels du site récupérant les données de l'API**__ 
- **[app](../../src/BlogVacare/frontend/app/)** : Pages et routes Next.js (assemblage UI à partir des components)
- **[components](../../src/BlogVacare/frontend/components/)** : Composants UI purement visuels récupérant éventuellement des données
- **[contexts](../../src/BlogVacare/frontend/contexts/)** : Contextes encadrant l'application entière pour des fonctionnalités communes à toutes les pages (système de connexion, gestion des modes d'affichage, ...)
- **[hooks](../../src/BlogVacare/frontend/hooks/)** : permet d'appeler des données à récupérer depuis des services et de les mettre en forme ou de les réarranger pour une utilisation en components
- **[services](../../src/BlogVacare/frontend/services/)** : Interactions avec un back permettant de récupérer les données demandées par le front (appels API, appels du back-end,...)
- **[utils](../../src/BlogVacare/frontend/utils/)** : Helpers réutilisables (résonances en fond de page)
- **[lib](../../src/BlogVacare/frontend/lib/)** : Utils de génération/configuration (routes statiques, styles et variantes du site)

- **[public/assets](../../src/BlogVacare/frontend/public/assets/)** : Images, sons, vidéos, ... contenu statique du site
- **[styles](../../src/BlogVacare/frontend/styles/)** : CSS, XCSS, ...

## Partagés

__**Code partagé par les projets frontend et backend**__
- **[model](../../src/BlogVacare/shared/model/)** : Objets utilisés aussi bien par le front que le back
- **[utils](../../src/BlogVacare/shared/utils/)** : Méthodes communes aux 2 projets

# MCD du projet 

![MCD du Blog](./BDD/MCD.png)