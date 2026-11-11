# ✨ EasyYourLife

Des outils gratuits pour se simplifier la vie, avec comptes, amis, badges, likes et photos — un peu comme un petit réseau social.
Premier outil : **Ranger & décorer** (photos de ta pièce → plan personnalisé par IA → avant / après).

Site statique sur **GitHub Pages** + **Supabase** (comptes, base, photos, fonction IA).

## Structure

```
index.html          Accueil : outils + fil des amis / Découvrir
connexion/          Inscription et connexion
rangement/          Outil 1 : liste des projets et tunnel en 5 étapes
apprendre/          Le déclic du jour : une découverte par jour, la même pour tous, avec débat
projet/             Page d'un projet : avant/après, likes, épingler, visibilité
profil/             Profil : photo, à la une, projets, badges, amis
badges/             Catalogue des badges
assets/style.css    Styles et 7 thèmes
assets/theme.js     Panneau de personnalisation (bouton 🎨)
assets/app.js       Connexion Supabase + fonctions communes + liste des outils
assets/rooms.js     Pièces et plan « classique » (sans IA)
assets/lecons.js     Les découvertes du jour (une entrée = une découverte)
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

## Anti-cache (important)

GitHub Pages garde les fichiers 10 minutes en cache. Pour qu'une page neuve ne se retrouve jamais avec un ancien script,
chaque fichier de `assets/` est appelé avec `?v=<empreinte>` dans les pages HTML. **Quand tu modifies un fichier de `assets/`,
mets à jour ce numéro** dans les pages HTML (il change à chaque modification du contenu). Un filet de sécurité dans `assets/app.js`
affiche un message clair avec un bouton « Recharger » si une page reste bloquée sur « Chargement… ».

## Le déclic du jour (apprendre/)

Une découverte par jour, **la même pour tout le monde** : elle dépend uniquement de la date (heure de Paris).
Le jour 0 est le 13 octobre 2026. Les découvertes sont dans `assets/lecons.js` : pour en ajouter, copie une entrée à la **fin** de la liste
(id unique). Le débat est rattaché à l'`id` : ne le modifie jamais une fois publié.
La série et le nombre de découvertes sont gardés sur l'appareil (localStorage).

### Activer le débat (une fois, dans Supabase > SQL Editor)

```sql
create table if not exists public.daily_takes (
  id uuid primary key default gen_random_uuid(),
  lesson text not null,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  parent_id uuid references public.daily_takes(id) on delete cascade,
  stance text check (stance in ('pour','contre')),
  body text not null default '' check (char_length(body) <= 400),
  created_at timestamptz not null default now(),
  check ((parent_id is null and stance is not null) or (parent_id is not null and stance is null and char_length(body) > 0))
);
create unique index if not exists daily_takes_one_per_lesson on public.daily_takes (lesson, user_id) where parent_id is null;
create index if not exists daily_takes_lesson_idx on public.daily_takes (lesson);
alter table public.daily_takes enable row level security;
create policy "membres lisent" on public.daily_takes for select to authenticated using (true);
create policy "membres ecrivent" on public.daily_takes for insert to authenticated with check (user_id = auth.uid());
create policy "auteur modifie" on public.daily_takes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "auteur supprime" on public.daily_takes for delete to authenticated using (user_id = auth.uid());
```

Tant que la table n'existe pas, la page affiche « Le débat ouvre bientôt » et le reste fonctionne normalement.
