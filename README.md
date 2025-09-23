# Architectures de projet

3 projets sont développés séparément sous ce même dépôt, ces derniers étant complémentaires et disponibles sous BlogVacare.com
- Blog Vacare : Page de blogs multi-utilisateurs, divisée en un projet back-end et un projet front-end
- Wiki : À venir
- CR : À venir

## Blog Vacare

__**Back-end**__ (API REST, servant à la logique de l'application)
- **app** : Routing de l'API
- **middlewares** : Traitements complémentaires de l'application (authentification, erreurs, ...)
- **utils** : Helpers réutilisables
- **services** : Interactions avec les données du projet
- **content** : données statiques (fichiers JSON demandés, ...)

__**Front-end**__ (Visuels du site récupérant les données de l'API) 
- **app** : Pages et routes Next.js (assemblage UI à partir des components)
- **components** : Composants UI purement visuels récupérant éventuellement des données
- **hooks** : permet d'appeler des données à récupérer depuis des services et de les mettre en forme ou de les réarranger pour une utilisation en components
- **services** : Interactions avec un back permettant de récupérer les données demandées par le front (appels API, appels du back-end,...)

__**Shared**__ 
- **model** : Objets utilisés aussi bien par le front que le back

**public/assets** : Images, sons, vidéos, ... contenu statique du site
**src/styles** : CSS, XCSS, ...
