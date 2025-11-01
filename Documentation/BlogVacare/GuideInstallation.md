# Installation du projet 

# Configuration du projet

Pour configurer votre projet, commencez par créer un fichier [.env à partir de l'exemple fourni](../../src/BlogVacare/frontend/.env.sample), vous n'aurez qu'à configurer le lien du [backend](../../src/BlogVacare/backend/) du projet dans la ligne "NEXT_PUBLIC_LIEN_API_BACKEND" ainsi que le mode de fonctionnement du site dans la ligne "NEXT_PUBLIC_NEXT_ENV".

Modes de fonctionnements du site : 
* **NEXT_PUBLIC_NEXT_ENV=export** : Mode servant à l'exportation du site sous forme de pages HTML, nécessitant d'autres ajustements comme décrit ci-dessous (actuellement : connexion et inscription désactivés en mode exportation, le site est en "lecture seule")
* **NEXT_PUBLIC_NEXT_ENV=production** : Mode servant à l'hébergement du site de façon dynamique (interactions en direct avec le backend, ajout et suppression de contenu, ...)

## Configurer l'exportation du site

Remplacez [next.config.ts](../../src/BlogVacare/frontend/next.config.ts) par le fichier [d'exportation correspondant](../../src/BlogVacare/frontend/next.config.ts.export) en le renommant "next.config.ts" à son tour, tout en retirant l'ancien (il est conseillé de garder le fichier de configuration initial de côté, en le renommant par exemple "next.config.ts.prod" si besoin de l'héberger à l'avenir.)

Dans le [fichier de variables d'environnement](../../src/BlogVacare/frontend/.env.sample), modifiez **NEXT_PUBLIC_NEXT_ENV** de la façon suivante : 
``NEXT_PUBLIC_NEXT_ENV=export```

Enfin, exécutez la commande suivante [à la racine du projet frontend](../../src/BlogVacare/frontend) :
```npm run build```

Votre projet devrait ensuite se trouver dans un dossier **out** sous forme de pages HTML.

# Mise en place de la Base de Données

Le choix de la base de données se fera dans la [Factory de services du backend](../../src/BlogVacare/backend/services/ServiceFactory.ts). Il vous suffira de décommenter la ligne correspondant à votre base de données et à commenter celle qui ne l'était pas au préalable.

La configuration diffèrera selon votre choix de Base de données : 
* [Configuration MySQL](BDD/MySQL.md)


## Modèle Conceptuel des Données

![UML du projet](./BDD/MCD.png)