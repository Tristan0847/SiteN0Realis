# Guide des commandes

**Node.js est nécessaire à l'exécution de ce projet, trouvez un guide d'installation ci-dessous si vous ne l'avez pas, trouvez ci-dessous les commandes à exécuter sous environnement Linux :**
```
sudo apt update
sudo apt install nodejs 15.5.3
```

## Installation des dépendances

Plusieurs dépendances sont à installer avant de pouvoir lancer le projet, exécutez donc la commande suivante avant d'exécuter n'importe quel projet : 
```
npm install
```

## Construction et exécution du projet

Une fois le projet téléchargé, placez-vous à sa racine et exécutez la commande suivante pour le construire :
```
npm run "build:all"
```

Une fois le site initialisé, vous pourrez le démarrer à tout moment à l'aide de la commande : 
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

# Lancement du projet Wiki
npm run "build:Wiki"
npm run "start:Wiki"
npm run "buildAndStart:Wiki"

# Lancement du projet CR
npm run "build:CR"
npm run "start:CR"
npm run "buildAndStart:CR"
```

**Si vous souhaitez arrêter vos serveurs, exécutez `Ctrl + C` au clavier sur le terminal l'ayant initialisé.**