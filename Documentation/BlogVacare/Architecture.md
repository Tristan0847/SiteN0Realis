# Architecture du Blog de Vacare

## Back-end
__**[Back-end](../../src/BlogVacare/backend/)**__ (API REST, servant à la logique de l'application)
- **[app](../../src/BlogVacare/backend/app/)** : Routing de l'API
- **[middlewares](../../src/BlogVacare/backend/middlewares/)** : Traitements complémentaires de l'application (authentification, erreurs, ...)
- **[utils](../../src/BlogVacare/backend/utils/)** : Helpers réutilisables
- **[services](../../src/BlogVacare/backend/services/)** : Interactions avec les données du projet
- **[content](../../src/BlogVacare/backend/content/)** : données statiques (fichiers JSON demandés, ...)

## Front-end

__**[Front-end](../../src/BlogVacare/frontend/)**__ (Visuels du site récupérant les données de l'API) 
- **[app](../../src/BlogVacare/frontend/app/)** : Pages et routes Next.js (assemblage UI à partir des components)
- **[components](../../src/BlogVacare/frontend/components/)** : Composants UI purement visuels récupérant éventuellement des données
- **[hooks](../../src/BlogVacare/frontend/hooks/)** : permet d'appeler des données à récupérer depuis des services et de les mettre en forme ou de les réarranger pour une utilisation en components
- **[services](../../src/BlogVacare/frontend/services/)** : Interactions avec un back permettant de récupérer les données demandées par le front (appels API, appels du back-end,...)

- **[public/assets](../../src/BlogVacare/frontend/public/assets/)** : Images, sons, vidéos, ... contenu statique du site
- **[styles](../../src/BlogVacare/frontend/styles/)** : CSS, XCSS, ...

## Partagés

__**[Shared](../../src/BlogVacare/shared/)**__ (Documents partagés entre les projets frontend et backend) 
- **[model](../../src/BlogVacare/shared/model/)** : Objets utilisés aussi bien par le front que le back
- **[utils](../../src/BlogVacare/shared/utils/)** : Méthodes communes aux 2 projets

