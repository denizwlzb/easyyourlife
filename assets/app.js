const SUPABASE_URL = 'https://nltqjkmwhozowgdbopwh.supabase.co';
// Clé publique (anon) : elle peut être visible, la sécurité repose sur les règles RLS de la base.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdHFqa213aG96b3dnZGJvcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMTYxMzQsImV4cCI6MjEwODc5MjEzNH0.SzY_14tPhFAdPQd6kCbDaZIEDHZCgWB1NbRcrdCYKgk';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE = document.body.dataset.base || './';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hueOf = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };

// ====== LISTE DES OUTILS : pour ajouter un outil, ajoute simplement une ligne ici ======
const TOOLS = [
  { id: 'rangement', nom: 'Ranger & décorer', emoji: '🏠', desc: 'Une pièce tirée au sort, un plan complet : ranger, imprimer en 3D, bricoler, décorer pas cher. Gagne des badges !', href: 'rangement/', statut: 'dispo' },
  { id: 'bientot', nom: 'Prochain outil', emoji: '✨', desc: 'Un nouvel outil pour te simplifier la vie arrive bientôt.', href: '#', statut: 'bientot' }
];

function toast(msg, ms = 3200) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, ms);
}

function confetti(n = 48) {
  if (document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cs = getComputedStyle(document.documentElement);
  const colors = ['--accent', '--tape', '--good', '--ink'].map(v => cs.getPropertyValue(v).trim()).filter(Boolean);
  const box = document.createElement('div'); box.className = 'confetti'; document.body.appendChild(box);
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'), s = 6 + Math.random() * 8;
    p.style.cssText = `left:${Math.random() * 100}vw;width:${s}px;height:${s * 1.4}px;background:${colors[i % colors.length]}`;
    box.appendChild(p);
    p.animate([
      { transform: 'translateY(-10vh) rotate(0deg)', opacity: 1 },
      { transform: `translate(${(Math.random() - .5) * 180}px,105vh) rotate(${Math.random() * 720}deg)`, opacity: 1 }
    ], { duration: 1600 + Math.random() * 1400, delay: Math.random() * 400, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' });
  }
  setTimeout(() => box.remove(), 3700);
}

function showModal(html, celebrate = false) {
  let m = $('#modal');
  if (!m) { m = document.createElement('div'); m.id = 'modal'; m.className = 'modal'; document.body.appendChild(m); }
  m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}<button class="btn" id="modal-close">Super !</button></div>`;
  m.hidden = false;
  $('#modal-close').onclick = () => { m.hidden = true; };
  $('#modal-close').focus();
  m.onclick = e => { if (e.target === m) m.hidden = true; };
  if (celebrate) confetti();
}

function renderNav(user) {
  const el = $('#nav'); if (!el) return;
  const path = location.pathname;
  const cur = seg => path.includes('/' + seg) ? ' aria-current="page"' : '';
  el.innerHTML = `<div class="nav-in">
    <a class="brand" href="${BASE}index.html">✨ EasyYourLife</a>
    <nav aria-label="Navigation principale">
      <a class="nl" href="${BASE}rangement/"${cur('rangement/')}>Ranger</a>
      <a class="nl" href="${BASE}badges/"${cur('badges/')}>Badges</a>
      ${user ? `<a class="nl" href="${BASE}profil/"${cur('profil/')}>Mon profil</a>` : ''}
      <button type="button" class="nl" id="btn-style" aria-haspopup="dialog">🎨 Style</button>
      ${user
        ? `<button type="button" class="nl" id="btn-logout">Déconnexion</button>`
        : `<a class="btn small" href="${BASE}connexion/">Connexion</a>`}
    </nav></div>`;
  const out = $('#btn-logout');
  if (out) out.onclick = async () => { await sb.auth.signOut(); location.href = BASE + 'index.html'; };
  const st = $('#btn-style');
  if (st) st.onclick = () => { if (window.EYL_THEME) window.EYL_THEME.open(); };
}

async function initPage() {
  const { data } = await sb.auth.getSession();
  const user = data && data.session ? data.session.user : null;
  renderNav(user);
  return user;
}

function renderTools(el) {
  el.innerHTML = TOOLS.map(t => t.statut === 'dispo'
    ? `<a class="tool" href="${BASE}${t.href}"><span class="tape">${esc(t.nom)}</span><div class="ico">${t.emoji}</div><p>${esc(t.desc)}</p><span class="pill">Disponible</span></a>`
    : `<div class="tool soon"><span class="tape">${esc(t.nom)}</span><div class="ico">${t.emoji}</div><p>${esc(t.desc)}</p><span class="pill">Bientôt</span></div>`
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
  showModal(`<h2>Nouveau badge${list.length > 1 ? 's' : ''} !</h2>${items}`, true);
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
