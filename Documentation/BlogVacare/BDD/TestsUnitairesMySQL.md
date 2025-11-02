# Tests unitaires du site

Technologie utilisée :
- vitest: 4.0.6

## Configuration des tests

Pour exécuter les tests unitaires du site, mettez en place la Base De Données de tests en créant votre schéma : 


```
CREATE SCHEMA blogvacare_test;
USE blogvacare_test;
```

Puis insérez les données de tests dans celle-ci :
```
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Blog;
DROP TABLE IF EXISTS Dossier;
DROP TABLE IF EXISTS ElementSupprime;
DROP TABLE IF EXISTS Utilisateur;

CREATE TABLE Utilisateur(
   nomUtilisateur VARCHAR(50),
   motDePasseHache VARCHAR(550) NOT NULL,
   estAdmin BOOLEAN NOT NULL,
   PRIMARY KEY(nomUtilisateur)
);

CREATE TABLE ElementSupprime(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomUtilisateur VARCHAR(50) NOT NULL,
  raisonSuppression VARCHAR(500), 
  datesuppression DATETIME DEFAULT CURRENT_TIMESTAMP,
  cache BOOLEAN DEFAULT FALSE,
  FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur) ON DELETE CASCADE
);

CREATE TABLE Dossier(
   id VARCHAR(36) PRIMARY KEY,
   titre VARCHAR(255) NOT NULL,
   slug VARCHAR(255) NOT NULL UNIQUE,
   dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
   description TEXT,
   nomUtilisateur VARCHAR(50) NOT NULL,
   idSuppression INT,
   FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur) ON DELETE CASCADE,
   FOREIGN KEY(idSuppression) REFERENCES ElementSupprime(id) ON DELETE SET NULL,
   INDEX idx_slug (slug)
);

CREATE TABLE Blog(
   id VARCHAR(36) PRIMARY KEY,
   titre VARCHAR(255) NOT NULL,
   slug VARCHAR(255) NOT NULL,
   idDossier VARCHAR(36) NOT NULL,
   nomUtilisateur VARCHAR(50) NOT NULL,
   dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
   idSuppression INT,
   UNIQUE KEY unique_slug_par_dossier (slug, idDossier),
   FOREIGN KEY(idDossier) REFERENCES Dossier(id) ON DELETE CASCADE,
   FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur) ON DELETE CASCADE,
   FOREIGN KEY(idSuppression) REFERENCES ElementSupprime(id) ON DELETE SET NULL,
   INDEX idx_dossier (idDossier),
   INDEX idx_slug (slug)
);

CREATE TABLE Message(
   id INT AUTO_INCREMENT,
   idBlog VARCHAR(36) NOT NULL,
   contenu TEXT NOT NULL,
   nomUtilisateur VARCHAR(50) NOT NULL,
   datePublication DATETIME DEFAULT CURRENT_TIMESTAMP,
   idSuppression INT,
   PRIMARY KEY(id, idBlog),
   FOREIGN KEY(idBlog) REFERENCES Blog(id) ON DELETE CASCADE,
   FOREIGN KEY(nomUtilisateur) REFERENCES Utilisateur(nomUtilisateur) ON DELETE CASCADE,
   FOREIGN KEY(idSuppression) REFERENCES ElementSupprime(id) ON DELETE SET NULL,
   INDEX idx_blog (idBlog)
);

INSERT INTO Utilisateur (nomUtilisateur, motDePasseHache, estAdmin) VALUES
('admin', '$2b$15$K9YGnKZX8h4vQj5pXqZ0Vu8gF2mK3hL5nQ7wR9tY1sU6vX2zA4bC', true),
('testuser', '$2b$15$K9YGnKZX8h4vQj5pXqZ0Vu8gF2mK3hL5nQ7wR9tY1sU6vX2zA4bC', false);

-- Dossiers de test
INSERT INTO Dossier (id, titre, slug, dateCreation, description, nomUtilisateur, idSuppression) VALUES
('d1', 'Discussions générales', 'discussions-generales', '2024-01-01 10:00:00', 'Espace pour discuter de tout et n''importe quoi', 'admin', NULL),
('d2', 'Aide et Support', 'aide-support', '2024-01-03 12:00:00', 'Besoin d''aide ? Par ici alors !', 'testuser', NULL);

-- Blogs de test
INSERT INTO Blog (id, titre, slug, idDossier, nomUtilisateur, dateCreation, idSuppression) VALUES
-- Dans "Discussions générales"
('b1', 'Bienvenue sur le forum', 'bienvenue-sur-le-forum', 'd1', 'admin', '2024-01-01 10:30:00', NULL),
('b2', 'Présentez-vous ici', 'presentez-vous-ici', 'd1', 'testuser', '2024-01-01 11:00:00', NULL),

-- Dans "Aide et Support"
('b3', 'Comment créer un blog ?', 'comment-creer-un-blog', 'd2', 'testuser', '2024-01-03 12:30:00', NULL);

-- Messages de test
INSERT INTO Message (idBlog, contenu, nomUtilisateur, datePublication, idSuppression) VALUES
-- Dans "Bienvenue sur le forum"
('b1', 'Bienvenue à tous sur ce nouveau forum ! N''hésitez pas à vous présenter et à poser vos questions.', 'admin', '2024-01-01 10:31:00', NULL),
('b1', 'Merci pour l''accueil !', 'testuser', '2024-01-01 10:45:00', NULL),

-- Dans "Présentez-vous ici"
('b2', 'Salut ! Je m''appelle TestUser et je suis employé chez N0Realis.', 'testuser', '2024-01-01 11:05:00', NULL),
('b2', 'Bienvenue TestUser ! Content de t''avoir parmi nous.', 'admin', '2024-01-01 11:10:00', NULL),
('b2', 'Merci !', 'testuser', '2024-01-01 11:20:00', NULL),

-- Dans "Comment créer un blog ?"
('b3', 'Bonjour, quelqu''un peut m''expliquer comment créer un nouveau blog ?', 'testuser', '2024-01-03 12:35:00', NULL),
('b3', 'Tu viens littéralement de le faire.', 'admin', '2024-01-03 12:40:00', NULL),
('b3', 'Merci Admin ! C''est parfait, j''ai réussi.', 'testuser', '2024-01-03 12:45:00', NULL);


-- Élément supprimé (pour tester les fonctionnalités de modération)
INSERT INTO ElementSupprime (id, nomUtilisateur, raisonSuppression, datesuppression, cache) VALUES
(1, 'admin', 'Contenu inapproprié', '2024-01-04 10:00:00', false),
(2, 'admin', 'Spam', '2024-01-04 10:05:00', true);

-- Blog supprimé (visible pour admin)
INSERT INTO Blog (id, titre, slug, idDossier, nomUtilisateur, dateCreation, idSuppression) VALUES
('b5', 'Blog supprimé test', 'blog-supprime-test', 'd1', 'testuser', '2024-01-04 09:00:00', 1);

-- Message dans le blog supprimé
INSERT INTO Message (idBlog, contenu, nomUtilisateur, datePublication, idSuppression) VALUES
('b5', 'Ceci est un message dans un blog supprimé.', 'testuser', '2024-01-04 09:05:00', NULL);

-- Message supprimé et caché
INSERT INTO Message (idBlog, contenu, nomUtilisateur, datePublication, idSuppression) VALUES
('b1', 'Message supprimé pour spam', 'testuser', '2024-01-04 10:10:00', 2);
```

## Création du fichier d'environnement
Créez ensuite, à partir du [modèle de fichier d'environnement](../../src/BlogVacare/backend/.env.sample) un fichier **.env.test** qui servira à rediriger vers là où vous hébergerez vos données.

Il devrait avoir la forme suivante : 
```
# Database de test
MYSQL_DB_HOST=127.0.0.1
MYSQL_DB_USER=root
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=blogvacare_test
MYSQL_DB_PORT=3306

# JWT pour les tests
JWT_TOKEN_ACCES=azertyuiop
JWT_TOKEN_REFRESH=qwertyuiop
JWT_TOKEN_ACCES_EXPIRATION=15m
JWT_TOKEN_REFRESH_EXPIRATION=7d
JWT_TOKEN_ACCES_EXPIRATION_NUM=900
JWT_TOKEN_REFRESH_EXPIRATION_NUM=604800

# Mode Node
NODE_ENV=test
```

## Exécution des tests

Vous pouvez, au choix, utiliser votre EDI pour exécuter les tests unitaires du site ou exécuter la commande suivante [à la racine du projet backend](../../../src/BlogVacare/backend/) :
```
npm run test
```