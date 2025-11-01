# Initialisation du projet

**Node.js est nécessaire à l'exécution de ce projet, trouvez un guide d'installation ci-dessous si vous ne l'avez pas, trouvez ci-dessous les commandes à exécuter sous environnement Linux :**
```
sudo apt update
sudo apt install nodejs 15.5.3
```

## Installation des dépendances

Plusieurs dépendances sont à installer avant de pouvoir lancer le projet, exécutez donc la commande suivante à la racine du dépôt avant d'exécuter n'importe quel projet : 
```
npm install
```

## Configuration des projets

Seul le projet Blog de Vacare est actuellement disponible, vous en trouverez le [guide d'installation au lien joint](./BlogVacare/GuideInstallation.md).
Suivez ses instructions, puis passez à la suite pour le démarrer et l'utiliser.

# Lancement et utilisation des projets

## Construction et exécution du projet

Si vous souhaitez lancer tous les projets à la fois, placez-vous à la racine du dépôt et exécutez la commande suivante pour le construire : (Des erreurs peuvent surevnir si vous n'avez pas configuré les variables d'environnement, installé les dépendances ou configuré/lancé la Base De Données)
```
npm run "build:all"
```

Une fois les différents sites initialisés, vous pourrez les démarrer à tout moment à l'aide de la commande : 
```
npm run "start:all"
```

**Si vous souhaitez arrêter vos serveurs, exécutez `Ctrl + C` au clavier sur le terminal l'ayant initialisé.**

## Lancements individuels

Si vous souhaitez exécuter séparément les différents projets ou n'en exécuter qu'un seul, vous pouvez également vous placer à la racine d'un projet et exécuter la commande suivante : 
```
npm run "build"
npm run "start"
```

Sinon, les commandes suivantes sont mises à votre disposition à la racine du projet afin de vous permettre la manipulation de chaque projet de façon individuelle : 
```
# Lancement du projet Blog de Vacare (front et back à la fois)
npm run "build:BlogVacare"
npm run "start:BlogVacare"
npm run "buildAndStart:BlogVacare"
```

**Si vous souhaitez arrêter vos serveurs, exécutez `Ctrl + C` au clavier sur le terminal l'ayant initialisé.**

## Guide d'utilisation

Vous trouverez ci-dessous le guide d'utilisation de chaque projet : 
* [Guide d'utilisation du Blog de Vacare](./BlogVacare/GuideUtilisation.md)
* [Guide d'utilisation de l'API du Blog de Vacare](./BlogVacare/GuideAPI.md)