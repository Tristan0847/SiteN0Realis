# Initialisation du projet

Le projet "Oeil de l'Occulte" est purement statique et n'utilise que des données enregistrées localement dans des fichiers MDX, il ne nécessite donc aucune configuration préalable. 

[Pour en savoir plus de l'architecture du projet](./Architecture.md)

# Création d'articles

Les articles sont à créer sous forme de fichiers MDX (format Markdown avec possibilité d'inclure des balises JSX) dans le dossier [contenu/articles](../../src/Wiki/contenu/articles) (créez-le s'il n'existe pas déjà). Ces derniers sont automatiquement récupérés par l'application à son lancement et affichés dans la liste des articles du Wiki.

**Attention à bien définir les fins de ligne des fichiers en LF (Unix) et non en CRLF (Windows), sous peine de rencontrer des erreurs lors de la lecture des fichiers.**
L'erreur suivante pourrait apparaître si cela n'est pas respecté, même si le reste de la syntaxe du document est valide : 
```
Warning: Found 1 problems in 1 documents.

 └── Invalid markdown in 1 documents. (Skipping documents)

     • truc.mdx" failed with YAMLParseError: Unexpected scalar at node end at line 38, column 24:

               valeur: "..."
```

## Frontmapper YAML

Chaque article doit commencer par un "frontmatter" YAML, permettant de définir des métadonnées sur l'article. Voici un exemple de frontmatter minimal : 

```yaml
---
titre: "La Tour d'Aggée"
slug: "tour-d-aggee"
dateCreation: 2002-04-12
auteur : "AntiR"
categorie: "Lieu"
slugCategorie: "lieu"
sousCategorie: "Comté de la Citadelle Rouge"
slugSousCategorie: "comte-citadelle-rouge"
cache: false
tags: 
  - "Ignavides"
  - "Citadelle Rouge"
  - "Sainte Fernande"
relations:
    explicit:
        - slug: "sainte-fernande"
          type: "Se situe à"
          force: 2
          bidirectionel: false
          description: "La Tour Rouge d'Aggée a été construite à Sainte Fernande"
infobox:
    type: "Lieu"
    image: "/articles/Lieu/Sainte Fernande/Tour/Tour Rouge.jpg"
    soustitreImage: "Tour d'Aggée (2001)"
    champs:
        - label: "Nom complet"
          valeur: "Tour Rouge d'Aggée"
        - label: "Date estimée de création"
          valeur: "An 921 après J.C."
        - label: "Commune"
          valeur: "Sainte Fernande"
        - label: "Hauteur"
          valeur: "12m"
---
```

Chacun des champs remplis sert à être réutilisé dans l'affichage de l'article (l'infobox, ses relations, son slug pour définir l'URL, etc.) et d'autres serviront également à classer l'article selon une recherche, ou à lier des articles entre eux sur les graphes de connaissances.

Pour expliquer chacun des champs de cet article utilisé à titre d'exemple : 
* 'titre' : Le titre complet de l'article.
* 'slug' : Le slug (identifiant unique) de l'article, utilisé pour générer son URL (ici, le slug "tour-d-aggee" génèrera l'URL "/article/tour-d-aggee").
* 'dateCreation' : La date de création de l'article (format YYYY-MM-DD).
* 'auteur' : Le nom de l'auteur de l'article (Ne dépend, pour le moment, d'aucun système d'authentification).
* 'categorie' : La catégorie principale de l'article (ex: "Lieu", "Personnage", "Événement", etc.).
* 'slugCategorie' : Le slug de la catégorie principale, utilisé pour générer l'URL de la catégorie.
* 'sousCategorie' (facultatif) : La sous-catégorie de l'article (ex: "Comté de la Citadelle Rouge").
* 'slugSousCategorie' (facultatif) : Le slug de la sous-catégorie, utilisé pour générer l'URL de la sous-catégorie.
* **'cache' (facultatif, false par défaut) : Permet de définir si un article doit être caché ou non sur le site (il peut apparaître dans les articles aléatoires, peut être l'un de ceux affiché sur la page d'accueil, mais n'est pas disponible à la recherche, à la navigation par catégorie, ou par le graphe de connaissances global de l'application).**
* 'tags' : Une liste de tags associés à l'article, utilisés pour une recherche par mots clefs.
* 'relations' : Une liste de relations explicites entre cet article et d'autres articles du Wiki, permettant de créer des liens entre eux. Chaque relation contient : 
  * 'slug' : Le slug de l'article lié.
  * 'type' : Le type de relation (ex: "Se situe à", "Créé par", etc.).
  * 'force' : Un entier représentant la force de la relation (plus le nombre est élevé, plus la relation est forte, ce qui se traduit sur le graphe de connaissance par une flèche plus ou moins épaisse).
  * 'bidirectionel' : Un booléen indiquant si la relation est bidirectionnelle ou non.
  * 'description' : Une description textuelle de la relation (affichée en bas de page si la section "Voir aussi" est renseignée).
* 'infobox' : Un objet contenant les informations à afficher dans l'infobox de l'article. Contient : 
  * 'type' (facultatif) : Le type d'infobox (ex: "Lieu", "Personnage", etc.), utilisé pour déterminer le style de l'infobox.
  * 'image' (facultatif) : Le chemin vers une image à afficher dans l'infobox.
  * 'soustitreImage' (facultatif) : Un sous-titre à afficher sous l'image.
  * 'champs' : Une liste de champs personnalisés à afficher dans l'infobox, chaque champ contenant : 
    * 'label' : Le label du champ (ex: "Nom complet", "Date de naissance", etc.).
    * 'valeur' : La valeur associée au label. Peut être une liste dont les éléments sont des objets (voir exemple ci-dessous).

Pour mieux saisir certaines particularités des fichiers YAML, voici un second exemple autrement plus complet : 

```yaml
---
titre: "Jonas R. Aleades"
slug: "jonas-aleades"
...
infobox:
    champs:
        - label: "Conjointes"
          type: "liste"
          valeur: 
            - nom: "Véronique Chauvelot"
              periode: "1967-1971"
            - nom: "Adeline Barannes"
              periode: "1971-1980"
            - nom: "Ariane 'Chaffet' R. Aleades"
              periode: "1978-1997"
            - nom: "Patricia Duroy (supposée)"
              periode: "1987-1989"
            - nom: "Marie-Joie R. Ignavides"
              periode: "1993-Aujourd'hui"
arbreGenealogique:
    membres:
        - id: "jonas-aleades"
          name: "Jonas R. Aleades"
          birth: "1947"
          death: ""
          gender: "Homme"
          pids:
            - "marie-joie-ignavides"
        - id: "marie-joie-ignavides"
          name: "Marie-Joie R. Ignavides"
          birth: "1967"
          death: ""
          gender: "Femme"
          pids:
            - "jonas-aleades"
        - id: "marie-joie-jr-aleades"
          name: "Marie-Joie Jr. R. Aleades"
          birth: "1996"
          death: ""
          gender: "Femme"
          mid: "jonas-aleades"
          fid: "marie-joie-ignavides"
        - id: "jonas-jr-aleades"
          name: "Jonas Jr. R. Aleades"
          birth: "1998"
          death: ""
          gender: "Homme"
          mid: "jonas-aleades"
          fid: "marie-joie-ignavides"
        - id: "jean-pierre-aleades"
          name: "Jean-Pierre R. Aleades"
          birth: "1999"
          death: ""
          gender: "Homme"
          mid: "jonas-aleades"
          fid: "marie-joie-ignavides"
---
```

Vous pouvez donc également ajouter une liste à un champ de l'infobox, chaque élément de la liste pouvant être un objet avec plusieurs propriétés (ici, le nom et la période de mariage de chaque conjointe de Jonas R. Aleades).

Vous pouvez également définir un arbre généalogique pour un personnage, en utilisant la section 'arbreGenealogique' dans le frontmatter. Cette section contient une liste de membres, chaque membre ayant :
* 'id' : Un identifiant unique pour le membre.
* 'name' : Le nom complet du membre.
* 'birth' : L'année de naissance du membre.
* 'death' : L'année de décès du membre (laisser vide si le membre est vivant).
* 'gender' : Le genre du membre (ex: "Homme", "Femme").
* 'pids' : Une liste d'identifiants des partenaires du membre (pour les conjoints).
* 'mid' : L'identifiant du père du membre (facultatif).
* 'fid' : L'identifiant de la mère du membre (facultatif).

Cette structure permet de représenter les relations familiales entre différents personnages d'un article que vous souhaiteriez décrire, mais par souci de simplicité de l'affichage, l'arbre généalogique affichera une relation par arbre (père-mère-enfants) et affichera les arbres séparément si un personnage a eu plusieurs partenaires.

## Contenu de l'article

L'article en lui-même s'écrit donc sous forme de Markdown classique, avec la possibilité d'inclure des balises JSX si nécessaire. Voici un exemple simple de contenu d'article : 

```mdx

## La Tour de la Citadelle Rouge

<SectionAvecImageFlottante>
<ImageFlottante src="/assets/articles/Lieu/Sainte Fernande/Tour/Tour Rouge vue de loin.jpg" alt="Tour d'Aggée (2001)" width="400px"/>

Si l'Église de la Citadelle Rouge persiste à décrire Sainte Fernande comme celle qui a sauvé son peuple et a vécu heureuse aux côtés d'un Patriarche, la Tour d'Aggée est principal témoin de l'enfer qu'a vécu l'unique survivante de Colmans.

Nul ne sait comment une telle structure aurait pu voir le jour en l'espace d'une nuit seulement et les hauts-placés de l'Église ont toujours affirmé qu'il s'agissait là d'un miracle provoqué par l'imaginaire d'Aggée R. Ignavides.

<Center>
<TexteRouge niveau={200}>Mais la vérité, c'est que Fernande et le peuple de Colmans ont subi le prix de ce miracle.</TexteRouge>  
<TexteRouge niveau={300}>L'apparition d'une Tour rougeâtre, la disparition de tout un peuple.</TexteRouge>  
<TexteRouge niveau={400}>L'innocente prière au pied de ce lieu de culte, le cruel sort réservé à celle qui l'habitait toutes ces années.</TexteRouge>
</Center>

<NDA auteur={frontmatter.auteur}>
Pour avoir visité cette tour et observé l'intérieur du cachot par moi-même, j'avouerais que cette expérience était à glacer le sang...  
De penser qu'une si jeune femme fut enfermée en ces lieux et y a probablement vécu le restant de ses jours...

Et si tout cela n'était pas assez, les écrits de la Citadelle Rouge expliqueront éventuellement comment les enfants du Patriarche David ont influencé le monde.  
**Ses enfants à lui, et à Sainte Fernande**...
</NDA>

</SectionAvecImageFlottante>

## Voir aussi

<ArticlesLies relations={frontmatter.relations.explicit} />
```

Le contenu de larticle peut contenir des titres, paragraphes, éléments mis en gras ou en italique, retrouvez à ce lien une [documentation complète sur le format Markdown](https://www.markdownguide.org/basic-syntax/).

La particularité du format MDX réside donc dans l'ajout de balises JSX permettant d'inclure des composants React personnalisés dans le contenu de l'article. Voici une liste non exhaustive des composants disponibles :
* `<ImageFlottante src="..." alt="..." position="left|right" width="..."/>` : Permet d'inclure une image flottante avec un texte autour. Les attributs 'position' et 'width' sont optionnels.
* `<SectionAvecImageFlottante>...</SectionAvecImageFlottante>` : Permet d'encapsuler une section entière avec une image flottante à l'intérieur. (Afin que l'image ne déborde pas sur la section suivante).
* `<Citation>...</Citation>` : Permet d'encapsuler un texte en tant que citation.
* `<TexteRouge niveau={100|200|300|400|500|600}>...</TexteRouge>` : Permet de mettre en évidence un texte en rouge, avec différents niveaux d'intensité.
* `<NDA auteur="...">...</NDA>` : Permet d'encapsuler un texte en tant que note de l'auteur.
* `<Center>...</Center>` : Permet de centrer le contenu à l'intérieur.
* `<ArticlesLies relations={...} />` : Permet d'afficher une section "Voir aussi" avec les articles liés, en utilisant les relations définies dans le frontmatter.

Vous retrouverez tous les composants disponibles dans le script [MDXContent](../../src/Wiki/components/mdx/MDXContent.tsx) les important.

# Utilisation du site

Le site est réalisé de sorte que la seule tâche à faire soit de remplir des articles en suivant les indications ci-dessus. Une fois les articles créés, il suffit de lancer l'application avec la commande ```npm run dev``` et de vous rendre au lien [localhost:3000/wiki](http://localhost:3000/wiki) pour accéder au Wiki et naviguer à travers les articles que vous avez créés.

Vos articles seront disponibles à la recherche et sur la [page de graphe de connaissance global](http://localhost:3000/wiki/graphe-de-connaissance) automatiquement pour ceux qui ne sont pas marqués comme "cache: true" dans leur frontmatter.  
Vous pouvez également accéder aux articles via leur URL directe, par exemple l'article avec le slug "tour-d-aggee" sera accessible à l'URL [localhost:3000/wiki/article/tour-d-aggee](http://localhost:3000/wiki/article/tour-d-aggee).

# Exemple d'article complet

Voici ci-dessous un exemple complet d'article en MDX, incluant le frontmatter YAML et le contenu de l'article. Vous pouvez vous en inspirer pour créer vos propres articles.

```
---
titre: "Le Dragon de la Citadelle Rouge"
slug: "dragon-de-la-citadelle-rouge"
dateCreation: 2001-02-05
auteur : "AntiR"
categorie: "Mythes et Légendes"
slugCategorie: "mythes-et-legendes"
sousCategorie: "Épisode démystifié"
slugSousCategorie: "episode-demystifie"
tags: 
  - "Citadelle Rouge"
  - "Dragon"
  - "Georges"
  - "Sainte Fernande"
relations:
    explicit:
        - slug: "sainte-fernande"
          type: "Aperçu à"
          force: 2
          bidirectionel: false
          description: "Le dragon de la Citadelle Rouge aurait été aperçu à Sainte Fernande"
infobox:
    type: "Épisode démystifié"
    image: "articles/Mythes/Dragon De La Citadelle/Dragon Rouge.jpg"
    soustitreImage: "Tableau représentant le triomphe de Georges sur le Dragon (William Thomas Horton, 1898)"
    champs:
        - label: "Nom complet"
          valeur: "Le Dragon de la Citadelle Rouge"
        - label: "Siècle du mythe"
          valeur: "XIIIème siècle après J.C."
        - label: "Lieu des faits"
          valeur: "Sainte Fernande"
        - label: "Démystifié ?"
          valeur: "Partiellement"
---


## Présentation du mythe

Le mythe du **Dragon de la Citadelle Rouge** (également connu comme celui du **Triomphe de Georges**) est l'un des plus célèbres du Comté éponyme.

Les écrits de la Citadelle Rouge décrivent son cas de la façon suivante : 
<Citation>
En Sainte Fernande, par un matin de printemps, un vilain vint réclamer audience : "Patriarche, Patriarche !" dit-il, "Un Dragon ! Un Dragon est arrivé en la Citadelle ! Nous devons fuir avant que mort par le feu s'en suive !"  

Le Patriarche répondit à la requête de son féal, déclenchant l'une des plus grandes chasses au dragon que la Cité ait connue.  
"Allons, nobles chevaliers, accomplissez votre tâche et revenez-nous triomphant de cette bête immonde !"
</Citation>

<Center>L'histoire se souvint de ce dragon comme <TexteRouge niveau={400}>le plus grand fléau</TexteRouge> de Sainte Fernande.</Center>

## Origines floues (XIIIème siècle)

### Un dragon invisible...

<ImageFlottante src="/assets/articles/Mythes/Dragon De La Citadelle/traces.png" alt="Schéma des traces de griffes et brûlures supposément laissées sur le corps de Louis l'Affabulateur" position="left" width="300px"/>

À ce jour, il est connu que nul dragon n'a existé, ce qui rend, par défaut, ce mythe mensonger et démystifié. Sa particularité ne réside cependant pas dans la chasse et le triomphe d'un tel monstre, mais aux origines mêmes de ce récit.  

Là où nombre de récits draconiques tirent leurs origines de chevaliers annonçant leur affrontement, de saints en devenir avertissant les populations locales ou même de rois cherchant à faire bonne figure, ici, le récit tire plutôt ses origines d'un simple féal.  
On pourrait croire que sa requête venait d'un noble cherchant une gloire nouvelle, que le féal aurait coulé des jours heureux suite à sa requête et qu'aussitôt le dragon annoncé, ce dernier aurait été tué.  
**Mais il n'en était rien.**

À la place, le fermier à l'origine du récit aurait succombé à de réelles blessures quelques jours après avoir demandé au Patriarche local de sauver sa famille et son peuple. La famille en question n'aura reçu aucune compensation et bien au contraire, ils insistèrent des années pour que leur proche ne soit pas mort en vain. Car, en effet, celui-ci était sévèrement blessé de coups de griffes et de brûlures qui ne devraient, pour l'époque, pas faire sens avec le contexte géopolitique de Sainte Fernande.

De même, alors qu'un récit de dragon aurait pour modèle classique "Au secours, au secours, un dragon va tous nous tuer" suivi d'un "En avant chevaliers, sauvons le peuple !" qui aboutirait à un "Nous avons atteint notre cible ! Remerciez-nous ! *(Acceptez qu'on taxe un peu plus que prévu ce qui était tout le but d'un tel mensonge)*" seulement quelques jours après, ici, le dragon ne fut jamais retrouvé, et le Patriarche de Sainte Fernande de l'époque ne tira aucun profit de cette histoire. 

Donc où chercher la vérité ? Vers un Patriarche qui n'a jamais su en tirer quoi que ce soit malgré l'opportunité parfaite ? Vers un paysan qui serait simplement devenu dément ? Ou vers une réelle créature qui aurait habité notre monde ?

### L'imaginaire d'un pipoteur

Beaucoup d'historiens s'accordent sur un point : le féal à l'origine de cette chasse aurait une réputation le précédant, celle d'un **"catastrophiste"**.  
*Louis de la Meule*, également appelé *Louis l'Affabulateur* par les récits de la Citadelle Rouge, avait souvent annoncé que de faux désastres s'abattraient sur Sainte Fernande :

Extrait de **Louis l'Affabulateur**, page 9 :
<Citation>
Entends-je? Est-ce les rats qui rampent en notre légendaire ville ? Épidémie ! Famine ! Tueries ! Nous allons tout voir ! Tout subir ! Craignez-les mes amis, notre Patriarche est en grand danger et vous ne tarderez pas à suivre !
</Citation>

Autre extrait de **Louis l'Affabulateur**, page 16 : 
<Citation>
Des géants, je vous dis ! J'ai aperçu des géants gros comme des cathédrales ! Derrière ma ferme, alors que je sortais les grains fraichement meulés, ils étaient là ! À un pas de Sainte Fernande et je suis le seul à les avoir vus !
</Citation>

Pas ou peu de ses mensonges ne bénéficiaient vraiment au Patriarche de Sainte Fernande, et même le dernier d'entre eux que fut celui du Dragon n'était pas vraiment d'un grand bénéfice.  

Certains théoriseraient donc que ce mythe parte d'un énième mensonge du pipoteur, et qu'il cherchait cette fois-ci l'attention du Patriarche. On pourrait supposer que ses blessures étaient dues à une punition de celui-ci, afin de rassurer son peuple, mais les faits qui suivront démentiront une telle hypothèse...

### Multiples témoignages
<SectionAvecImageFlottante>
<ImageFlottante src="/assets/articles/Mythes/Dragon De La Citadelle/dragon yeux.jpg" alt="Vitrail représentant les yeux du Dragon de la Citadelle Rouge (Vitraux de Mehoffer)" width="300px"/>

Plusieurs témoignages différents décrivent le Dragon Rouge de la même façon : Haut comme un moulin, écailles rouge foncées, oreilles pointues, queue épinée et surtout **un oeil rouge sang et un oeil d'une obscurité sans pareille**. Si le reste de ces caractéristiques peut paraître anodine, cette paire de yeux restera particulièrement ancrée dans l'imaginaire collectif pour une raison que nul ne comprend.  

2 points de vues s'opposent donc fondamentalement à ce sujet : 
- Soit on est face à l'un des plus beaux mensonges organisés qu'ait pu donner la Citadelle Rouge, bien qu'ils n'aient finalement eu aucun bénéfice à cette affaire
- Soit une part de réel se cacherait derrière le cas du Dragon de la Citadelle Rouge.

</SectionAvecImageFlottante>

## Le triomphe de Saint Georges (XIVème siècle)

### Réappropriation du mythe
<SectionAvecImageFlottante>
<ImageFlottante src="/assets/articles/Mythes/Dragon De La Citadelle/Saint georges triomphant.jpg" alt="Tableau représentant Saint Georges triomphant du Dragon de la Citadelle Rouge" width="500px"/>


En milieu du XIVème siècle, alors que l'histoire est devenue légende et que l'on se sert encore du dragon pour faire des petites frayeurs ou rappeler des menaces imminentes, le noble Chevalier **Georges R. Ignavides** se réapproprie le mythe et devient célèbre pour avoir abattu le Dragon qui terrorisait Sainte Fernande.  

On dit qu'il partit seul à la chasse du dragon et revint avec les écailles de ce dernier, aujourd'hui exposées à Sainte Fernande pour célébrer la gloire du Second Saint de ces terres sacrées. Il est important de noter que des examens récents ont pu déduire que ces mêmes écailles provenaient en réalité de **tortues à écailles rouges**.  
Ces écailles sont pour certains la preuve d'un miracle de la Citadelle Rouge, et pour d'autres le résultat d'un très long périple vers un marchand d'eaux douces.

Georges R. Ignavides épousa ensuite la princesse, fille unique du roi, en récompense de sa bravoure et fut canonisé en 1501 à titre posthume. Il fut inhumé aux côtés de la Sainte qui donne à ce village son nom.

</SectionAvecImageFlottante>

### L'étrange retour du dragon...

Si ce récit peut sembler se terminer comme n'importe quel autre, bien qu'avec beaucoup de retard, c'est un événement complémentaire qui précédait la victoire et la rendait justement possible qui permettra de conclure cet article : **la seconde apparition du Dragon.**

Encore une fois, alors que la vie suivait son cours au sein de Sainte Fernande, plusieurs personnes auraient aperçu le Dragon survoler leur village, disparaissant aussitôt qu'il apparût. C'est en réalité à la suite d'une panique totale que le Chevalier Georges décida de chercher à vaincre : il est tout aussi possible qu'il n'ait jamais forcé sa gloire sur le peuple et qu'au contraire, le peuple l'ait forcé à se forger une gloire.  

## Mystère irrésolu

La question demeure donc entière : si on a su prouver qu'aucune chasse au Dragon n'a porté ses fruits, les apparitions de ce dernier laissent croire qu'il y a réellement eu un jour un **Dragon de la Citadelle Rouge**.

<Center>
Caractérisé par de rares mais marquantes apparitions, par son oeil rouge sang et son oeil ténébreux, ainsi que par sa taille démesurée, le Dragon de la Citadelle sera pour toujours connu comme le plus grand fléau de Sainte Fernande.<br/>
<TexteRouge niveau={400}>**Et on craint aujourd'hui encore son potentiel retour...**</TexteRouge>
</Center>

<NDA auteur={frontmatter.auteur}>
Si vous me permettez une anecdote personnelle, j'ai découvert ce mythe dans mon enfance, alors que je parcourais un petit livre de contes que m'avait offert ma grand-mère. Je me souviens avoir été fasciné par tout ce que ce simple dragon avait engendré : la peur qu'il inspirait, la fortune promise sur sa tête, les petits rituels locaux pour l'éloigner, ... 

Mais je me souviens également avoir été profondément déçu d'apprendre qu'il n'avait jamais existé. Je ne suis pourtant pas tant du style à croire à ce genre de légendes, mais même sans y croire, il n'y avait aucune certitude de ne pas y croire. **Ne pas avoir la foi ne signifie pas n'en avoir aucune, simplement qu'on ignore qu'on en avait une jusqu'à ce qu'on soit mis face aux contradictions qu'elle impliquerait.**
</NDA>


## Voir aussi
<ArticlesLies relations={frontmatter.relations.explicit} />
```