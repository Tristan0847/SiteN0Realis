# Architecture de l'Oeil de l'Occulte

__**API REST, servant à la logique de l'application**__
- **[app](../../src/Wiki/app/)** : Pages et routes Next.js (assemblage UI à partir des components)
- **[components](../../src/Wiki/components/)** : Composants UI visuels de mise en forme des données d'articles importés
- **[contenu/articles](../../src/Wiki/contenu/articles)** : Articles MDX importés par le site
- **[contenuPages](../../src/Wiki/contenuPages/)** : Contenu visuel des pages (composants client gérant l'affichage et l'assemblage de composants)
- **[model](../../src/Wiki/model/)** : Couche de classes logiques de l'application
- **[utils](../../src/Wiki/utils/)** : Helpers réutilisables (recherche et récupération d'articles par filtrage)
- **[scripts](../../src/Wiki/scripts/)** : Script d'initialisation de l'application (génération de l'index de recherche, ...)
- **[contentlayer.config.ts](../../src/Wiki/contentlayer.config.ts)** : Script de récupération des données récupérées dans les fichiers MDX
- 
- **[public/assets](../../src/Wiki/public/assets/)** : Images, sons, vidéos, ... contenu statique du site
- **[public/data](../../src/Wiki/public/data/)** : Données utilisées par le site (index de recherche, ...)
- **[styles](../../src/Wiki/styles/)** : CSS, XCSS, ...
