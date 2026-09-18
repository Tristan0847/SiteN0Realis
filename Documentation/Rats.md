# Architecture du Trou à Rats

__**Site 100% Front-End, utilisant du contenu dans des pages pour les interactions**__
- **[app](../src/Rats/app/)** : Pages et routes Next.js (assemblage UI à partir des composants)
- **[composants](../src/Rats/composants/)** : Composants UI visuels de mise en forme d'éléments du site
- **[contenuPages](../src/Rats/contenuPages/)** : Contenu visuel des pages (à créer pour créer des pages)
- **[service](../src/Rats/service/)** : Helpers réutilisables
-
- **[public/assets](../src/Rats/public/assets/)** : Images, sons, vidéos, ... contenu statique du site
- **[styles](../src/Rats/styles/)** : CSS, XCSS, ...

# Contenu 

Le site est purement front-end, sans particularité autre que d'avoir un sous-domaine avec du contenu par dossier, vous avez surtout accès aux composants de ce projet, qui pourraient prochainement être remaniés vers le projet [lib](../src/lib) afin de décharger celui-ci.