# ✨ EasyYourLife

Des petits outils gratuits pour se simplifier la vie, avec comptes, amis et partage.
Site statique (GitHub Pages) + Supabase (comptes, base, photos).

**En ligne :** https://denizwlzb.github.io/easyyourlife/

## Structure

```
index.html            Accueil : stories des amis, outils favoris, comptes à découvrir
outils/               Le catalogue des outils, par catégorie
nouveautes/           Le journal des changements du site
connexion/            Inscription et connexion
profil/               Profil : projets, amis, badges, réglages
projet/               Un projet : avant/après, likes, qui peut le voir
rangement/            Outil : ranger & décorer (pièce choisie ou tirée au sort)
apprendre/            Outil : le déclic du jour (+ débat)
assets/eyl.css        Le système de design (couleurs, composants, thèmes)
assets/eyl.js         Le noyau : Supabase, navigation, favoris, modération
assets/outils.js      La liste des outils et des catégories
assets/nouveautes.js  La liste des nouveautés
assets/pieces.js      Les pièces et les plans de l'outil rangement
assets/lecons.js      Les découvertes du « déclic du jour »
base-de-donnees.sql   À exécuter une fois dans Supabase
```

## Ajouter un outil

1. Crée son dossier, par exemple `budget/index.html` (copie une page existante pour la structure).
2. Ajoute une ligne dans `OUTILS` (`assets/outils.js`) : id, nom, emoji, teinte, catégorie, description, dossier.
   S'il te faut une nouvelle catégorie, ajoute-la dans `CATEGORIES` juste au-dessus.
3. Ajoute une entrée en haut de `NOUVEAUTES` (`assets/nouveautes.js`).

L'outil apparaît alors tout seul sur l'accueil, dans la page Outils et dans les favoris.

## Le journal des nouveautés

**Chaque changement, même minuscule, mérite une ligne dans `assets/nouveautes.js`.**
Une entrée = une date, un type (`nouveau`, `amelioration`, `correction`, `design`), un outil
concerné (ou `null` pour tout le site), un titre et deux phrases.
Une pastille apparaît sur l'onglet « Nouveautés » tant que la personne n'a pas ouvert la page.

## Contenu sensible : comment c'est tenu

Aucun filtre automatique n'est fiable tout seul, donc trois niveaux se complètent :

1. **Privé par défaut.** Un projet se termine sur « Personne ». Publier est un geste volontaire,
   avec les règles rappelées à l'écran.
2. **Filtre de mots** sur tous les textes publics (pseudo, bio, légendes, débat) : `MOTS_BLOQUES`
   dans `assets/eyl.js`, à compléter au fil du temps.
3. **Signalement.** Chaque photo, projet, profil et message a un bouton « Signaler ». Au deuxième
   signalement, le contenu est masqué automatiquement (un projet repasse en privé, un compte
   public redevient privé) en attendant que tu regardes. La requête pour voir les signalements
   est en bas de `base-de-donnees.sql`.

Ce n'est pas une détection d'image : si un jour le site s'ouvre largement, il faudra une
modération automatique côté serveur avant publication.

## Thèmes

Le bouton 🎨 ouvre les réglages : clair, sombre ou automatique (celui du téléphone),
six couleurs d'accent, deux tailles de texte. Tout est gardé sur l'appareil.
Les couleurs vivent dans `:root` au début de `assets/eyl.css`.

## Réglages Supabase (une fois)

- **SQL Editor** : exécute `base-de-donnees.sql`.
- **Authentication → URL Configuration** : Site URL = l'adresse du site ; Redirect URLs = la même avec `/**`.
- **Authentication → Providers → Email** : activer la protection contre les mots de passe compromis.

## Sécurité

La clé de `assets/eyl.js` est la clé **anon**, publique par conception ; la sécurité repose sur
les règles RLS de la base. Ne mets jamais la clé `service_role` ni une clé d'IA dans ce dépôt.

## Anti-cache

GitHub Pages garde les fichiers en cache dix minutes. Chaque fichier de `assets/` est appelé avec
`?v=<numéro>` dans les pages HTML : **quand tu modifies un fichier de `assets/`, change ce numéro**
dans les pages qui l'utilisent, sinon un visiteur peut rester sur l'ancienne version.
