# Mise en place d'une base de données MySQL

Si vous avez déjà installé MySQL et créé une connexion à ce dernier, vous pouvez directement passer à l'étape de création de la base de données du site.

## Installation et configuration de MySQL

Installer MySQL Workbench (outil facilitant la gestion de base MySQL) pour créer votre base de données locale du projet : https://dev.mysql.com/downloads/workbench/

Créez ensuite une connexion ([guide officiel](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html)) et notez bien les différents paramètres de celle-ci qui seront réutilisés dans ce projet.
Testez la connexion, puis sauvegardez-la.

## Création de la base de données

Créez ensuite votre schéma en exécutant les lignes suivantes dans l'éditeur SQL de MySQL Workbench : 
```
CREATE SCHEMA BlogVacare;
USE BlogVacare;
```

Une fois dans ce schéma, créez vos différentes tables en exécutant les lignes suivantes :
```
CREATE TABLE Utilisateur(
   nomUtilisateur VARCHAR(50),
   motDePasseHache VARCHAR(550) NOT NULL,
   estAdmin BOOL NOT NULL,
   PRIMARY KEY(nomUtilisateur)
);

CREATE TABLE Dossier(
   id VARCHAR(150),
   titre VARCHAR(550) NOT NULL,
   description VARCHAR(2500),
   nomUtilisateur VARCHAR(50),
   PRIMARY KEY(id),
   FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur)
);

CREATE TABLE Blog(
   id VARCHAR(150),
   titre VARCHAR(550) NOT NULL,
   dateCreation DATETIME NOT NULL,
   idDossier VARCHAR(150),
   nomUtilisateur VARCHAR(50),
   PRIMARY KEY(id),
   FOREIGN KEY(idDossier) REFERENCES Dossier(id),
   FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur)
);

CREATE TABLE Message(
   idBlog VARCHAR(150),
   id INT,
   datePublication DATETIME NOT NULL,
   contenu VARCHAR(5000) NOT NULL,
   nomUtilisateur VARCHAR(50),
   PRIMARY KEY(idBlog, id),
   FOREIGN KEY(idBlog) REFERENCES Blog(id),
   FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur)
);
```

## Création des fichiers de configuration 

**Configurez ensuite ce projet pour qu'il utilise la bonne base de données correspondante** : 

Créez dans [config](../../../src/BlogVacare/backend/config/MySQL) un fichier **dbConfig.ts**. (Un échantillon [dbConfig.ts.sample](../../../src/BlogVacare/backend/config/MySQL/dbConfig.ts.sample) existe déjà et devrait demeurer inchangé)

Il devra se présenter sous le format suivant : 
```
export const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blogvacare',
  port: Number(process.env.DB_PORT) || 3306,
};
```

Si ça n'est pas déjà fait, créez ensuite un fichier de variables d'environnement .env [à la racine du projet](../../../) (Un échantillon complet [.env.sample](../../../.env.sample) existe avec des champs pré-remplis).

Il devra contenir les éléments suivants, à redéfinir selon vos besoins : 
```
MYSQL_DB_HOST=127.0.0.1
MYSQL_DB_USER=root
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=blogvacare
MYSQL_DB_PORT=3306
```

## Installation des dépendances du projet

Ce projet pouvant utiliser différentes bases de données, aucune dépendance ne sera ajoutée par défaut à celui-ci afin d'éviter l'installation de bibliothèques inutiles. Vous devrez donc ajouter manuellement au [package.json](../../../package.json) du projet la ligne ci-dessous de la façon suivante : 
```
{
  ...
  "scripts": {
  },

  // La ligne est à intégrer ici, sous "dependencies"
  "dependencies": {
    ...
    "mysql2": "^3.15.1",
    ...
  },
  "devDependencies": {
    ...
  }
}
```

## Modification de la Factory

Dernière étape pour lancer le projet sous MySQL : changer la factory pour qu'elle n'utilise plus la configuration précédente et opte pour MySQL. 

Dans [ServiceFactory](../../../src/BlogVacare/backend/services/ServiceFactory.ts), modifiez la fonction **createInstance** pour qu'elle utilise MySQL de la façon suivante :
```
    // Méthode privée de création d'instances 
    private static createInstance(interfaceKey: symbol): any {
        switch (interfaceKey) {
            case INTERFACES.I_BlogService:
                return new BlogServiceMySQL();
            default:
                throw new Error('Interface inconnue pour factory : ' + interfaceKey.toString());
        }
    }
```