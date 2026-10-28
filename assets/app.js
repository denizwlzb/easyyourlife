const SUPABASE_URL = 'https://nltqjkmwhozowgdbopwh.supabase.co';
// Clé publique (anon) : elle peut être visible, la sécurité repose sur les règles RLS de la base.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdHFqa213aG96b3dnZGJvcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMTYxMzQsImV4cCI6MjEwODc5MjEzNH0.SzY_14tPhFAdPQd6kCbDaZIEDHZCgWB1NbRcrdCYKgk';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE = document.body.dataset.base || './';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ====== LISTE DES OUTILS : pour ajouter un outil, ajoute simplement une ligne ici ======
const TOOLS = [
  { id: 'rangement', nom: 'Ranger & décorer', emoji: '🏠', desc: 'Une pièce tirée au sort, un plan complet : ranger, imprimer en 3D, bricoler, décorer pas cher. Gagne des badges !', href: 'rangement/', statut: 'dispo' },
  { id: 'bientot', nom: 'Prochain outil', emoji: '✨', desc: 'Un nouvel outil pour te simplifier la vie arrive bientôt.', href: '#', statut: 'bientot' }
];

function toast(msg, ms = 3200) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, ms);
}

function showModal(html) {
  let m = $('#modal');
  if (!m) { m = document.createElement('div'); m.id = 'modal'; m.className = 'modal'; document.body.appendChild(m); }
  m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}<button class="btn" id="modal-close">Super !</button></div>`;
  m.hidden = false;
  $('#modal-close').onclick = () => { m.hidden = true; };
  m.onclick = e => { if (e.target === m) m.hidden = true; };
}

function renderNav(user) {
  const el = $('#nav'); if (!el) return;
  el.innerHTML = `<div class="nav-in">
    <a class="brand" href="${BASE}index.html">✨ EasyYourLife</a>
    <nav>
      <a href="${BASE}rangement/">Ranger</a>
      <a href="${BASE}badges/">Badges</a>
      ${user
        ? `<a href="${BASE}profil/">Mon profil</a><button class="link" id="btn-logout">Déconnexion</button>`
        : `<a class="btn small" href="${BASE}connexion/">Connexion</a>`}
    </nav></div>`;
  const out = $('#btn-logout');
  if (out) out.onclick = async () => { await sb.auth.signOut(); location.href = BASE + 'index.html'; };
}

async function initPage() {
  const { data } = await sb.auth.getSession();
  const user = data && data.session ? data.session.user : null;
  renderNav(user);
  return user;
}

function renderTools(el) {
  el.innerHTML = TOOLS.map(t => t.statut === 'dispo'
    ? `<a class="tool" href="${BASE}${t.href}"><div class="ico">${t.emoji}</div><h3>${esc(t.nom)}</h3><p class="muted">${esc(t.desc)}</p><span class="pill">Disponible</span></a>`
    : `<div class="tool soon"><div class="ico">${t.emoji}</div><h3>${esc(t.nom)}</h3><p class="muted">${esc(t.desc)}</p><span class="pill">Bientôt</span></div>`
  ).join('');
}

async function myBadgeCodes(uid) {
  const { data } = await sb.from('user_badges').select('badge_code').eq('user_id', uid);
  return new Set((data || []).map(r => r.badge_code));
}

async function showBadgePopup(codes) {
  const { data } = await sb.from('badges').select('*').in('code', codes).order('sort_order');
  const list = data || [];
  const items = list.map(b => `<div class="pop-badge"><div class="ico">${esc(b.icon)}</div><div><b>${esc(b.name)}</b><br><small>${esc(b.description)}</small></div></div>`).join('');
  showModal(`<h2>🎉 Nouveau badge${list.length > 1 ? 's' : ''} !</h2>${items}`);
}

// Exécute une action puis affiche une fenêtre de félicitations si un badge a été gagné
async function withBadgeDiff(uid, action) {
  const before = await myBadgeCodes(uid);
  const res = await action();
  if (res && res.error) { toast('Oups : ' + res.error.message); return res; }
  const after = await myBadgeCodes(uid);
  const fresh = [...after].filter(c => !before.has(c));
  if (fresh.length) await showBadgePopup(fresh);
  return res;
}
