-- ============================================================================
--  EasyYourLife — à exécuter UNE FOIS dans Supabase > SQL Editor.
--  Tout est « si ça n'existe pas déjà » : relancer ce fichier ne casse rien.
--  Le site fonctionne même sans ce fichier ; ces lignes activent le débat,
--  les comptes publics et les signalements.
-- ============================================================================

-- 1. Comptes publics et présence -------------------------------------------
alter table public.profiles add column if not exists is_public     boolean     not null default false;
alter table public.profiles add column if not exists last_seen_at  timestamptz;
create index if not exists profiles_public_idx on public.profiles (last_seen_at desc) where is_public;

-- 2. Le débat du « déclic du jour » ----------------------------------------
create table if not exists public.daily_takes (
  id         uuid primary key default gen_random_uuid(),
  lesson     text not null,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  parent_id  uuid references public.daily_takes(id) on delete cascade,
  stance     text check (stance in ('pour','contre')),
  body       text not null default '' check (char_length(body) <= 400),
  hidden     boolean not null default false,
  created_at timestamptz not null default now(),
  check ((parent_id is null and stance is not null)
      or (parent_id is not null and stance is null and char_length(body) > 0))
);
alter table public.daily_takes add column if not exists hidden boolean not null default false;
create unique index if not exists daily_takes_un_avis on public.daily_takes (lesson, user_id) where parent_id is null;
create index if not exists daily_takes_lesson_idx on public.daily_takes (lesson);
alter table public.daily_takes enable row level security;

do $$ begin
  create policy "membres lisent"   on public.daily_takes for select to authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "membres ecrivent" on public.daily_takes for insert to authenticated with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auteur modifie"   on public.daily_takes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auteur supprime"  on public.daily_takes for delete to authenticated using (user_id = auth.uid());
exception when duplicate_object then null; end $$;

-- 3. Les signalements -------------------------------------------------------
create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('project','media','profile','take')),
  target_id   uuid not null,
  reporter_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  reason      text not null,
  created_at  timestamptz not null default now()
);
-- Une personne ne peut signaler un même contenu qu'une fois.
create unique index if not exists reports_une_fois on public.reports (target_type, target_id, reporter_id);
alter table public.reports enable row level security;

do $$ begin
  create policy "signaler" on public.reports for insert to authenticated with check (reporter_id = auth.uid());
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "voir mes signalements" on public.reports for select to authenticated using (reporter_id = auth.uid());
exception when duplicate_object then null; end $$;

-- 4. Masquage automatique au 2e signalement ---------------------------------
--    Un projet signalé repasse en « privé » : la règle de visibilité qui
--    existe déjà le cache alors à tout le monde sauf à son auteur.
create or replace function public.masquer_si_signale()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  select count(*) into n from public.reports
   where target_type = new.target_type and target_id = new.target_id;

  if n >= 2 then
    if new.target_type = 'project' then
      update public.projects set visibility = 'private' where id = new.target_id;
    elsif new.target_type = 'media' then
      update public.projects set visibility = 'private'
       where id = (select project_id from public.media where id = new.target_id);
    elsif new.target_type = 'profile' then
      update public.profiles set is_public = false where id = new.target_id;
    elsif new.target_type = 'take' then
      update public.daily_takes set hidden = true where id = new.target_id;
    end if;
  end if;
  return new;
end $$;

drop trigger if exists reports_masquage on public.reports;
create trigger reports_masquage after insert on public.reports
for each row execute function public.masquer_si_signale();

-- 5. Pour voir toi-même les signalements -------------------------------------
--    (à exécuter quand tu veux, dans le SQL Editor)
--    select r.*, p.username as signale_par
--      from public.reports r
--      join public.profiles p on p.id = r.reporter_id
--     order by r.created_at desc;
