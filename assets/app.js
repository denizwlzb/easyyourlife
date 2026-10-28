/* Filet de sécurité : une erreur ou un blocage ne doit jamais laisser « Chargement… » sans explication. */
(function () {
  function stuck() { var m = document.getElementById('main'); return m && m.textContent.trim() === 'Chargement…' ? m : null; }
  function fatal(err, slow) {
    var m = stuck(); if (!m) return;
    var raw = String((err && err.message) || err || '');
    var msg = slow ? "Ça prend plus de temps que prévu. Vérifie ta connexion, puis recharge la page."
      : /createClient|supabase/i.test(raw) ? "Le service de comptes n'a pas pu se charger (connexion ou bloqueur de publicités). Recharge la page."
      : "Une erreur est survenue : " + raw.replace(/[<>&]/g, '');
    m.innerHTML = '<div class="card empty"><span class="big-emoji">⚠️</span><h2>La page n\'a pas pu se charger</h2><p class="muted">' + msg + '</p><button class="btn" onclick="location.reload()">Recharger</button></div>';
  }
  window.addEventListener('error', function (e) { console.error(e.error || e.message); fatal(e.error || e.message); });
  window.addEventListener('unhandledrejection', function (e) { console.error(e.reason); fatal(e.reason); });
  setTimeout(function () { fatal(null, true); }, 12000);
})();

const SUPABASE_URL = 'https://nltqjkmwhozowgdbopwh.supabase.co';
// Clé publique (anon) : elle peut être visible, la sécurité repose sur les règles RLS de la base.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdHFqa213aG96b3dnZGJvcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMTYxMzQsImV4cCI6MjEwODc5MjEzNH0.SzY_14tPhFAdPQd6kCbDaZIEDHZCgWB1NbRcrdCYKgk';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE = document.body.dataset.base || './';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hueOf = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
let ME = null;

// ====== LISTE DES OUTILS : pour ajouter un outil, ajoute simplement une ligne ici ======
const TOOLS = [
  { id: 'rangement', nom: 'Ranger & décorer', emoji: '🏠', desc: 'Photographie ta pièce, reçois un plan sur mesure, compare l\'avant et l\'après.', href: 'rangement/', statut: 'dispo' },
  { id: 'bientot', nom: 'Prochain outil', emoji: '✨', desc: 'Un nouvel outil pour te simplifier la vie arrive bientôt.', href: '#', statut: 'bientot' }
];

/* ---------- Petits utilitaires ---------- */
function toast(msg, ms = 3200) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, ms);
}

function ago(d) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 60) return "à l'instant";
  const m = s / 60; if (m < 60) return `il y a ${Math.floor(m)} min`;
  const h = m / 60; if (h < 24) return `il y a ${Math.floor(h)} h`;
  const j = h / 24; if (j < 7) return `il y a ${Math.floor(j)} j`;
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
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

function showModal(html, celebrate = false, closeLabel = 'Super !') {
  let m = $('#modal');
  if (!m) { m = document.createElement('div'); m.id = 'modal'; m.className = 'modal'; document.body.appendChild(m); }
  m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}${closeLabel ? `<button class="btn" id="modal-close">${esc(closeLabel)}</button>` : ''}</div>`;
  m.hidden = false;
  const c = $('#modal-close'); if (c) { c.onclick = () => { m.hidden = true; }; c.focus(); }
  m.onclick = e => { if (e.target === m) m.hidden = true; };
  if (celebrate) confetti();
}

/* ---------- Photos ---------- */
function compressImage(file, { max = 1280, quality = 0.82, square = false } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (square) { const s = Math.min(sw, sh); sx = (sw - s) / 2; sy = (sh - s) / 2; sw = sh = s; }
      const r = Math.min(1, max / Math.max(sw, sh));
      const c = document.createElement('canvas');
      c.width = Math.round(sw * r); c.height = Math.round(sh * r);
      c.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? resolve(b) : reject(new Error('Compression impossible')), 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image illisible')); };
    img.src = url;
  });
}

async function signedMap(paths, ttl = 3600) {
  const uniq = [...new Set((paths || []).filter(Boolean))], map = {};
  for (let i = 0; i < uniq.length; i += 80) {
    const { data } = await sb.storage.from('media').createSignedUrls(uniq.slice(i, i + 80), ttl);
    (data || []).forEach(u => { if (u.signedUrl) map[u.path] = u.signedUrl; });
  }
  return map;
}

const avatarSrc = p => p && p.avatar_path ? sb.storage.from('avatars').getPublicUrl(p.avatar_path).data.publicUrl : null;
function avatarHTML(p, size = '') {
  const name = (p && p.username) || '?';
  const src = avatarSrc(p);
  return `<span class="avatar ${size}" style="--h:${hueOf(name)}">${src ? `<img src="${esc(src)}" alt="" loading="lazy">` : esc(name.charAt(0).toUpperCase())}</span>`;
}

/* ---------- Projets : photos, paires avant/après, likes ---------- */
async function projectMedia(ids) {
  const out = {};
  ids.forEach(id => { out[id] = { before: [], after: [], progress: [] }; });
  if (!ids.length) return out;
  const { data } = await sb.from('media').select('id,project_id,kind,storage_path,angle,position,pinned,caption').in('project_id', ids).order('position');
  (data || []).forEach(m => { if (out[m.project_id] && out[m.project_id][m.kind]) out[m.project_id][m.kind].push(m); });
  return out;
}
const pairsOf = m => m.before.map(b => ({ before: b, after: m.after.find(a => a.position === b.position) || null }));
const bestPair = m => { const p = pairsOf(m); return p.find(x => x.after) || p[0] || (m.after[0] ? { before: null, after: m.after[0] } : null); };

async function likeInfo(ids, uid) {
  const info = {};
  ids.forEach(id => { info[id] = { n: 0, mine: false }; });
  if (!ids.length) return info;
  const { data } = await sb.from('likes').select('project_id,user_id').in('project_id', ids);
  (data || []).forEach(l => { const o = info[l.project_id]; if (o) { o.n++; if (l.user_id === uid) o.mine = true; } });
  return info;
}
const toggleLike = (pid, uid, liked) => liked
  ? sb.from('likes').delete().eq('project_id', pid).eq('user_id', uid)
  : sb.from('likes').insert({ project_id: pid, user_id: uid });

/* ---------- Curseur avant / après ---------- */
function sliderHTML(beforeUrl, afterUrl, extra = '') {
  if (!beforeUrl) return '';
  if (!afterUrl) return `<div class="ba single ${extra}"><img src="${esc(beforeUrl)}" alt="Avant" loading="lazy"><span class="ba-tag l">Avant</span></div>`;
  return `<div class="ba ${extra}" style="--pos:50%"><img class="ba-before" src="${esc(beforeUrl)}" alt="Avant" loading="lazy"><img class="ba-after" src="${esc(afterUrl)}" alt="Après" loading="lazy"><span class="ba-line"></span><span class="ba-knob">↔</span><span class="ba-tag l">Avant</span><span class="ba-tag r">Après</span><input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Comparer avant et après"></div>`;
}
function initSliders(root = document) {
  $$('.ba:not(.single)', root).forEach(el => {
    if (el._init) return; el._init = true;
    const range = $('.ba-range', el);
    const set = e => {
      const rect = el.getBoundingClientRect();
      const p = Math.min(100, Math.max(0, (e.clientX - rect.left) / rect.width * 100));
      el.style.setProperty('--pos', p + '%'); if (range) range.value = p;
    };
    el.addEventListener('pointerdown', e => { el._drag = true; el.setPointerCapture(e.pointerId); set(e); });
    el.addEventListener('pointermove', e => { if (el._drag) set(e); });
    el.addEventListener('pointerup', () => { el._drag = false; });
    el.addEventListener('pointercancel', () => { el._drag = false; });
    if (range) {
      range.addEventListener('input', () => el.style.setProperty('--pos', range.value + '%'));
      el.tabIndex = 0;
      el.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          const v = Math.min(100, Math.max(0, Number(range.value) + (e.key === 'ArrowLeft' ? -5 : 5)));
          range.value = v; el.style.setProperty('--pos', v + '%'); e.preventDefault();
        }
      });
    }
  });
}

/* ---------- Stories à la une ---------- */
function openStory(items, meta = {}) {
  if (!items.length) return;
  let i = 0, timer = null;
  const el = document.createElement('div');
  el.className = 'story'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Story à la une');
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const onKey = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
  function close() { clearTimeout(timer); el.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); }
  function go(d) { i += d; if (i < 0) i = 0; if (i >= items.length) return close(); draw(); }
  function draw() {
    clearTimeout(timer);
    const it = items[i];
    el.innerHTML = `<div class="story-bars">${items.map((_, k) => `<i class="${k < i ? 'full' : ''}"><b class="${k === i ? 'run' : ''}"></b></i>`).join('')}</div>
      <div class="story-head">${meta.avatar || ''}<div><b>${esc(meta.who || '')}</b><small>${esc(meta.title || '')}</small></div><button class="story-x" aria-label="Fermer">✕</button></div>
      <img class="story-img" src="${esc(it.url)}" alt="">
      ${it.caption ? `<p class="story-cap">${esc(it.caption)}</p>` : ''}
      <button class="story-prev" aria-label="Précédent"></button><button class="story-next" aria-label="Suivant"></button>`;
    $('.story-x', el).onclick = close;
    $('.story-prev', el).onclick = () => go(-1);
    $('.story-next', el).onclick = () => go(1);
    timer = setTimeout(() => go(1), 5000);
  }
  document.addEventListener('keydown', onKey);
  draw();
}

/* ---------- Navigation ---------- */
function renderNav(user) {
  const el = $('#nav'); if (!el) return;
  const path = location.pathname;
  const cur = seg => path.includes('/' + seg) ? ' aria-current="page"' : '';
  const isHome = !/\/(rangement|badges|profil|connexion|projet)\//.test(path);
  el.innerHTML = `<div class="nav-in">
    <a class="brand" href="${BASE}index.html">✨ EasyYourLife</a>
    <nav class="nav-links" aria-label="Navigation principale">
      <a class="nl" href="${BASE}index.html"${isHome ? ' aria-current="page"' : ''}>Accueil</a>
      <a class="nl" href="${BASE}rangement/"${cur('rangement/')}>Ranger &amp; décorer</a>
      <a class="nl" href="${BASE}badges/"${cur('badges/')}>Badges</a>
      ${user ? `<a class="nl" href="${BASE}profil/"${cur('profil/')}>Profil</a>` : ''}
    </nav>
    <div class="nav-actions">
      <button type="button" class="icon-btn" id="btn-style" aria-haspopup="dialog" aria-label="Personnaliser le style et les thèmes" title="Style et thèmes">🎨</button>
      ${user
        ? `<a class="nav-avatar" href="${BASE}profil/" aria-label="Mon profil">${avatarHTML(ME || { username: '?' }, 'sm')}</a><button type="button" class="nl hide-sm" id="btn-logout">Déconnexion</button>`
        : `<a class="btn small" href="${BASE}connexion/">Connexion</a>`}
    </div></div>`;
  const out = $('#btn-logout');
  if (out) out.onclick = async () => { await sb.auth.signOut(); location.href = BASE + 'index.html'; };
  const st = $('#btn-style');
  if (st) st.onclick = () => { if (window.EYL_THEME) window.EYL_THEME.open(); };

  let tb = $('#tabbar');
  if (!tb) { tb = document.createElement('nav'); tb.id = 'tabbar'; tb.className = 'tabbar'; tb.setAttribute('aria-label', 'Navigation mobile'); document.body.appendChild(tb); }
  const tabAvatar = user && ME && ME.avatar_path ? avatarHTML(ME, 'sm') : null;
  const items = [
    [BASE + 'index.html', icon('home'), 'Accueil', isHome && !location.hash, ''],
    [BASE + 'index.html#outils', icon('grid'), 'Outils', false, ''],
    [BASE + 'rangement/?nouveau=1', icon('plus'), 'Créer', false, 'create'],
    [BASE + 'badges/', icon('badge'), 'Badges', path.includes('/badges/'), ''],
    [user ? BASE + 'profil/' : BASE + 'connexion/', tabAvatar || icon('user'), user ? 'Profil' : 'Connexion', path.includes('/profil/') || path.includes('/connexion/'), '']
  ];
  tb.innerHTML = items.map(([h, i, t, on, c]) => `<a class="${c}" href="${h}"${on ? ' aria-current="page"' : ''}><span class="i">${i}</span>${t}</a>`).join('');
}

async function initPage() {
  const { data } = await sb.auth.getSession();
  const user = data && data.session ? data.session.user : null;
  ME = null;
  if (user) {
    const { data: p } = await sb.from('profiles').select('id,username,avatar_path,bio').eq('id', user.id).maybeSingle();
    ME = p;
  }
  renderNav(user);
  return user;
}

function renderTools(el) {
  el.innerHTML = TOOLS.map(t => t.statut === 'dispo'
    ? `<a class="tool" href="${BASE}${t.href}"><span class="tape">${esc(t.nom)}</span><div class="ico">${t.emoji}</div><p>${esc(t.desc)}</p><span class="pill">Disponible</span></a>`
    : `<div class="tool soon"><span class="tape">${esc(t.nom)}</span><div class="ico">${t.emoji}</div><p>${esc(t.desc)}</p><span class="pill">Bientôt</span></div>`
  ).join('');
}

/* ---------- Badges ---------- */
async function myBadgeCodes(uid) {
  const { data } = await sb.from('user_badges').select('badge_code').eq('user_id', uid);
  return new Set((data || []).map(r => r.badge_code));
}
function badgePopupHTML(list) {
  return list.map(b => `<div class="pop-badge"><div class="ico">${esc(b.icon)}</div><div><b>${esc(b.name)}</b><br><small>${esc(b.description)}</small></div></div>`).join('');
}
async function showBadgePopup(codes) {
  const { data } = await sb.from('badges').select('*').in('code', codes).order('sort_order');
  const list = data || [];
  showModal(`<h2>Nouveau badge${list.length > 1 ? 's' : ''} !</h2>${badgePopupHTML(list)}`, true);
}
// Exécute une action puis félicite si un badge a été gagné
async function withBadgeDiff(uid, action) {
  const before = await myBadgeCodes(uid);
  const res = await action();
  if (res && res.error) { toast('Oups : ' + res.error.message); return res; }
  const after = await myBadgeCodes(uid);
  const fresh = [...after].filter(c => !before.has(c));
  if (fresh.length) await showBadgePopup(fresh);
  return res;
}

/* ---------- Icônes de la barre d'onglets ---------- */
const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  badge: '<circle cx="12" cy="9" r="5.2"/><path d="M8.6 13.6 7 21l5-3 5 3-1.6-7.4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c.4-4 3.5-6.5 7.5-6.5s7.1 2.5 7.5 6.5"/>'
};
const icon = n => `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">${ICONS[n]}</svg>`;

/* Image seule (projet sans photo « avant ») */
function singleHTML(url, label, extra = '') {
  if (!url) return '';
  return `<div class="ba single ${extra}"><img src="${esc(url)}" alt="${esc(label)}" loading="lazy"><span class="ba-tag ${label === 'Après' ? 'r' : 'l'}">${esc(label)}</span></div>`;
}

/* Astuce « Sur l'écran d'accueil » pour iPhone (une seule fois) */
function installHint(container) {
  try {
    const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!iOS || navigator.standalone || localStorage.getItem('eyl_hint') === '1' || !container) return;
    const el = document.createElement('div');
    el.className = 'banner';
    el.innerHTML = `📲 <b>Utilise-la comme une appli</b> : appuie sur <b>Partager</b> (le carré avec la flèche), puis <b>« Sur l'écran d'accueil »</b>. <button type="button" class="link" id="hint-x">Compris</button>`;
    container.prepend(el);
    $('#hint-x', el).onclick = () => { try { localStorage.setItem('eyl_hint', '1'); } catch (e) {} el.remove(); };
  } catch (e) {}
}
