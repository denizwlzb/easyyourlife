# ✨ EasyYourLife

Un site-hub de petits outils pour se simplifier la vie, en français.
Premier outil : **Ranger & décorer** (une pièce tirée au sort, un plan complet, des idées d'impression 3D sans perçage, des alternatives DIY et de la déco pas chère).

Comptes, amis, badges et photos : fonctionnent avec **Supabase** (gratuit). Le site est statique et hébergé sur **GitHub Pages**.

## Structure

```
index.html            Accueil : une carte par outil
connexion/            Inscription et connexion
rangement/            Outil 1 : Ranger & décorer
profil/               Profil, badges, photos et amis
badges/               Catalogue des badges
assets/style.css      Styles
assets/app.js         Connexion Supabase + fonctions communes + liste des outils
assets/rooms.js       Pièces, étapes et idées
```

## Ajouter un nouvel outil

1. Crée un dossier, par exemple `mon-outil/index.html` (copie `rangement/index.html` comme base).
2. Ajoute une ligne dans `TOOLS` (fichier `assets/app.js`) : la carte apparaît sur l'accueil.
3. Pour donner des badges : ajoute des lignes dans la table `badges` (Supabase) et, si besoin, des règles dans la fonction `award_badges`.

## Réglages Supabase à faire une fois

Dans le tableau de bord Supabase, section **Authentication → URL Configuration** :

- **Site URL** : l'adresse de ton site GitHub Pages (par exemple `https://denizwlzb.github.io/easyyourlife/`)
- **Redirect URLs** : la même adresse avec `/**` à la fin

Dans **Authentication → Providers → Email**, tu peux désactiver « Confirm email » pour tester plus vite (à réactiver ensuite).

## Sécurité

- La clé utilisée dans `assets/app.js` est la clé **anon** : elle est faite pour être publique.
- Les données sont protégées par les règles de sécurité (RLS) de la base : chacun ne voit que ses données, et celles de ses amis acceptés.
- Ne mets **jamais** la clé `service_role` dans ce dépôt.
