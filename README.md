# ✨ EasyYourLife

Des outils gratuits pour se simplifier la vie, avec comptes, amis, badges, likes et photos — un peu comme un petit réseau social.
Premier outil : **Ranger & décorer** (photos de ta pièce → plan personnalisé par IA → avant / après).

Site statique sur **GitHub Pages** + **Supabase** (comptes, base, photos, fonction IA).

## Structure

```
index.html          Accueil : outils + fil des amis / Découvrir
connexion/          Inscription et connexion
rangement/          Outil 1 : liste des projets et tunnel en 5 étapes
projet/             Page d'un projet : avant/après, likes, épingler, visibilité
profil/             Profil : photo, à la une, projets, badges, amis
badges/             Catalogue des badges
assets/style.css    Styles et 7 thèmes
assets/theme.js     Panneau de personnalisation (bouton 🎨)
assets/app.js       Connexion Supabase + fonctions communes + liste des outils
assets/rooms.js     Pièces et plan « classique » (sans IA)
```

## Activer l'IA (plan personnalisé à partir des photos)

La fonction `room-plan` est déjà déployée sur Supabase. Il manque une clé d'API, à ajouter **dans Supabase** :
**Edge Functions → Secrets** (ou Project Settings → Edge Functions), puis :

| Secret | Rôle |
|---|---|
| `ANTHROPIC_API_KEY` | Clé de l'API Anthropic (option recommandée, payante à l'usage). |
| `AI_MODEL` | Facultatif. Par défaut `claude-haiku-5-5`. |
| `AI_USER_DAILY_LIMIT` | Facultatif. Plans IA par membre et par jour (défaut 5). |
| `AI_GLOBAL_DAILY_LIMIT` | Facultatif. Plafond global par jour (défaut 100). |

Alternative de test : `GEMINI_API_KEY` + `AI_MODEL` (nom du modèle Gemini à jour). Attention : le palier gratuit de Google
n'est pas prévu pour servir des utilisateurs situés dans l'EEE et peut réutiliser les contenus envoyés.

Sans clé, le site reste utilisable : le bouton « Plan classique » prend le relais.

## Ajouter un outil

1. Crée un dossier (par exemple `mon-outil/index.html`).
2. Ajoute une ligne dans `TOOLS` (`assets/app.js`) : il apparaît sur l'accueil et dans les stories d'outils.
3. Ses photos épinglées se rangent automatiquement dans un « à la une » à son nom sur les profils (champ `tool` des photos).

## Thèmes

Le bouton 🎨 de la barre du haut ouvre le panneau : 7 thèmes, mode automatique, couleur d'accent, taille du texte, animations.
Pour ajouter un thème : un bloc `:root[data-theme="nom"]` dans `assets/style.css` et une entrée dans `THEMES` (`assets/theme.js`).

## Réglages Supabase (une fois)

- **Authentication → URL Configuration** : Site URL = l'adresse de ton site GitHub Pages ; Redirect URLs = la même avec `/**`.
- **Authentication → Providers → Email** : activer la protection contre les mots de passe compromis.

## Sécurité

- La clé de `assets/app.js` est la clé **anon** (publique par conception). Les données sont protégées par les règles RLS de la base.
- Ne mets jamais la clé `service_role` ni une clé d'IA dans ce dépôt : elles vivent uniquement dans les secrets Supabase.
