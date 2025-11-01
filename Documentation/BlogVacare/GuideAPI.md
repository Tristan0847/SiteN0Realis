# Guide de l'API REST 

## Configuration
- **Format de réponse**: JSON
- **Authentification**: JWT via cookies HTTP-only

## 🔒 Sécurité

- Tokens JWT stockés dans des cookies `httpOnly`
- CORS configuré pour les origines autorisées
- Middleware d'authentification sur routes protégées
- Mots de passe hachés avec bcrypt (salt rounds: 15)
- Validation des entrées côté serveur

## Authentification

### POST /utilisateur/connexion
Connecte un utilisateur et retourne des tokens JWT.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Réponse (200):**
```json
{
  "succes": true,
  "utilisateur": {
    "username": "string",
    "estAdmin": boolean
  }
}
```

**Erreurs:**
- `400` - Paramètres manquants
- `401` - Identifiants invalides

**Cookies définis:**
- `tokenAcces` - Expire dans 15 minutes
- `tokenRefresh` - Expire dans 7 jours

---

### POST /utilisateur/inscription
Crée un nouveau compte utilisateur.

**Body:**
```json
{
  "nomUtilisateur": "string",
  "mdp1": "string (min 12 chars, 1 maj, 1 min, 1 chiffre, 1 spécial)",
  "mdp2": "string (confirmation)"
}
```

**Réponse (200):**
```json
{
  "succes": true,
  "utilisateur": {
    "username": "string",
    "estAdmin": false
  }
}
```

**Erreurs:**
- `400` - Validation échouée
- `401` - Nom d'utilisateur déjà pris

---

### POST /utilisateur/refresh
Rafraîchit le token d'accès.

**Prérequis:** Cookie `tokenRefresh` valide

**Réponse (200):**
```json
{
  "succes": true,
  "message": "Token rafraîchi avec succès"
}
```

---

### POST /utilisateur/deconnexion
Déconnecte l'utilisateur (supprime les cookies).

**Réponse (200):**
```json
{
  "succes": true
}
```

---

### GET /utilisateur/me
Récupère l'utilisateur connecté.

**Headers requis:**
```
Cookie: tokenAcces=xxx
```

**Réponse (200):**
```json
{
  "username": "string",
  "estAdmin": boolean
}
```

**Erreurs:**
- `401` - Non authentifié

---

## Dossiers

### GET /dossiers/liste
Récupère tous les dossiers.

**Réponse (200):**
```json
[
  {
    "id": "uuid",
    "titre": "string",
    "slug": "string",
    "dateCreation": "ISO-8601",
    "description": "string",
    "utilisateur": {
      "username": "string"
    },
    "elementSupprime": null | {
      "id": number,
      "raisonSuppression": "string",
      "dateSuppression": "ISO-8601",
      "cache": boolean
    }
  }
]
```

---

### GET /dossiers/recuperation/[slugDossier]
Récupère un dossier spécifique.

**Paramètres URL:**
- `slugDossier` (string) - Slug du dossier

**Réponse (200):** (même structure que ci-dessus, objet unique)

**Erreurs:**
- `500` - Dossier introuvable

---

### POST /dossiers/creer
Crée un nouveau dossier (authentification requise).

**Headers requis:**
```
Cookie: tokenAcces=xxx
```

**Body:**
```json
{
  "nomDossier": "string (max 255 chars)",
  "descriptionDossier": "string"
}
```

**Réponse (201):**
```json
{
  "message": "Dossier créé avec succès"
}
```

**Erreurs:**
- `401` - Non authentifié
- `500` - Erreur création

---

### DELETE /dossiers/supprimer
Supprime un dossier (admin uniquement).

**Headers requis:**
```
Cookie: tokenAcces=xxx (admin)
```

**Body:**
```json
{
  "idDossier": "uuid",
  "raisonSuppression": "string",
  "cache": boolean
}
```

**Réponse (200):**
```json
{
  "message": "Dossier supprimé avec succès"
}
```

**Erreurs:**
- `401` - Non authentifié
- `403` - Droits insuffisants

---

## Blogs

### GET /blogs/liste/[slugDossier]
Récupère les blogs d'un dossier ainsi que leur premier message.

**Paramètres URL:**
- `slugDossier` (string)

**Réponse (200):**
```json
[
  {
    "id": "uuid",
    "nom": "string",
    "slug": "string",
    "dateCreation": "ISO-8601",
    "idDossier": "uuid",
    "utilisateur": { "username": "string" },
    "messages": [
      {
        "id": number,
        "contenu": "string (tronqué à 250 chars)",
        "date": "ISO-8601",
        "utilisateur": { "username": "string" }
      }
    ],
    "elementSupprime": null | {...}
  }
]
```

---

### GET /blogs/recuperation/[slugDossier]/[slugBlog]
Récupère un blog spécifique.

**Paramètres URL:**
- `slugDossier` (string)
- `slugBlog` (string)

**Réponse (200):** (même structure, sans les messages)

---

### POST /blogs/creer
Crée un blog (authentification requise).

**Body:**
```json
{
  "nom": "string (max 255)",
  "contenuPremierMessage": "string",
  "idDossier": "uuid"
}
```

**Réponse (201):**
```json
{
  "message": "Blog créé avec succès"
}
```

---

### DELETE /blogs/supprimer
Supprime un blog (admin uniquement).

**Body:**
```json
{
  "idBlog": "uuid",
  "raisonSuppression": "string",
  "cache": boolean
}
```

---

## Messages

### GET /messages/liste/[slugDossier]/[slugBlog]
Récupère les messages d'un blog.

**Réponse (200):**
```json
[
  {
    "id": number,
    "contenu": "string (markdown supporté)",
    "date": "ISO-8601",
    "utilisateur": { "username": "string" },
    "elementSupprime": null | {...}
  }
]
```

---

### POST /messages/creer
Crée un message (authentification requise).

**Body:**
```json
{
  "contenu": "string",
  "idBlog": "uuid"
}
```

---

### DELETE /messages/supprimer
Supprime un message (admin uniquement).

**Body:**
```json
{
  "idMessage": number,
  "idBlog": "uuid",
  "raisonSuppression": "string",
  "cache": boolean
}
```

---

## 📊 Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Accès refusé |
| 500 | Erreur serveur |
