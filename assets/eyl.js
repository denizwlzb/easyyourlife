/* =============================================================
   EasyYourLife — noyau commun
   Chargé par toutes les pages, après outils.js et nouveautes.js.
   ============================================================= */

/* --- Filet de sécurité : jamais de « Chargement… » sans explication --- */
(function () {
  function stuck() { var m = document.getElementById('main'); return m && /Chargement/.test(m.textContent) ? m : null; }
  function fatal(err, slow) {
    var m = stuck(); if (!m) return;
    var raw = String((err && err.message) || err || '');
    var msg = slow ? "Ça prend plus de temps que prévu. Vérifie ta connexion, puis recharge."
      : /createClient|supabase/i.test(raw) ? "Le service de comptes n'a pas répondu (connexion ou bloqueur de pub). Recharge la page."
      : "Une erreur est survenue : " + raw.replace(/[<>&]/g, '');
    m.innerHTML = '<div class="card empty"><div class="em">⚠️</div><h2>La page n\'a pas pu se charger</h2><p class="muted">' + msg + '</p><button class="btn" onclick="location.reload()">Recharger</button></div>';
  }
  window.addEventListener('error', function (e) { console.error(e.error || e.message); fatal(e.error || e.message); });
  window.addEventListener('unhandledrejection', function (e) { console.error(e.reason); fatal(e.reason); });
  setTimeout(function () { fatal(null, true); }, 12000);
})();

const SUPABASE_URL = 'https://nltqjkmwhozowgdbopwh.supabase.co';
// Clé publique (anon) : visible par conception. La sécurité repose sur les règles RLS.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdHFqa213aG96b3dnZGJvcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMTYxMzQsImV4cCI6MjEwODc5MjEzNH0.SzY_14tPhFAdPQd6kCbDaZIEDHZCgWB1NbRcrdCYKgk';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE = document.body.dataset.base || './';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hueOf = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
let ME = null;

/* --- Mémoire locale, toujours tolérante aux erreurs --- */
const store = {
  get(k, def) { try { const v = localStorage.getItem('eyl:' + k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } },
  set(k, v) { try { localStorage.setItem('eyl:' + k, JSON.stringify(v)); } catch (e) {} }
};

/* --- Petits utilitaires --- */
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

function confetti(n = 42) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cs = getComputedStyle(document.documentElement);
  const colors = ['--accent', '--good', '--info', '--ink'].map(v => cs.getPropertyValue(v).trim()).filter(Boolean);
  const box = document.createElement('div'); box.className = 'confetti'; document.body.appendChild(box);
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'), s = 6 + Math.random() * 8;
    p.style.cssText = `left:${Math.random() * 100}vw;width:${s}px;height:${s * 1.4}px;background:${colors[i % colors.length]}`;
    box.appendChild(p);
    p.animate([{ transform: 'translateY(-10vh) rotate(0)', opacity: 1 },
      { transform: `translate(${(Math.random() - .5) * 170}px,108vh) rotate(${Math.random() * 720}deg)`, opacity: 1 }],
      { duration: 1600 + Math.random() * 1200, delay: Math.random() * 350, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' });
  }
  setTimeout(() => box.remove(), 3600);
}

/* --- Feuille du bas (remplace les modales) --- */
function sheet(html, { celebrate = false, onOpen } = {}) {
  let s = $('#sheet');
  if (!s) { s = document.createElement('div'); s.id = 'sheet'; s.className = 'sheet'; document.body.appendChild(s); }
  s.innerHTML = `<div class="sheet-box" role="dialog" aria-modal="true">${html}</div>`;
  s.hidden = false;
  const close = () => { s.hidden = true; };
  s.onclick = e => { if (e.target === s) close(); };
  $$('[data-close]', s).forEach(b => { b.onclick = close; });
  document.addEventListener('keydown', function esc2(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc2); }
  });
  if (celebrate) confetti();
  if (onOpen) onOpen(s, close);
  return close;
}
const closeSheet = () => { const s = $('#sheet'); if (s) s.hidden = true; };

/* --- Images --- */
function compressImage(file, { max = 1280, quality = .82, square = false } = {}) {
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

/* =============================================================
   RÈGLES DE CONTENU ET MODÉRATION
   Trois niveaux, parce qu'aucun filtre automatique n'est fiable seul :
   1. tout est privé par défaut, publier est un geste volontaire ;
   2. un filtre de mots bloque les textes explicites ;
   3. n'importe qui peut signaler : au 2e signalement le contenu
      est masqué automatiquement en attendant une vérification.
   ============================================================= */
const REGLES = [
  'Pas de nudité, de contenu sexuel ni de sous-entendu de ce genre.',
  'Pas de violence, de sang, de blessures ni de contenu choquant.',
  'Pas de haine, de harcèlement ni de moquerie sur une personne.',
  'Pas de visage ni d\'information personnelle sans l\'accord de la personne.',
  'Des photos de ton logement et de tes projets, rien d\'autre.'
];
const REGLES_HTML = `<ul class="muted" style="font-size:.9rem;padding-left:1.15em;margin:0">${REGLES.map(r => `<li>${esc(r)}</li>`).join('')}</ul>`;

const MOTS_BLOQUES = ['porn','porno','pornographie','xxx','nude','nudes','sexe','sexy','bite','chatte','nichon','bais','enculé','salope','pute','pd ','negre','nègre','nique ta','ntm','viol','suicide','pendaison','gore','cadavre','sang ','égorg','decapit','décapit','pedo','pédo','zoophil','inceste'];
function texteInterdit(t) {
  const s = ' ' + String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') + ' ';
  return MOTS_BLOQUES.some(m => s.includes(m.normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
}
// À appeler avant tout envoi de texte public. Renvoie true si c'est bloqué.
function bloqueSiInterdit(t) {
  if (!texteInterdit(t)) return false;
  toast('Ce message ne respecte pas les règles du site.');
  return true;
}

// L'auteur accepte les règles une seule fois, avant sa première publication.
function demanderAccordRegles() {
  return new Promise(resolve => {
    if (store.get('regles-ok')) return resolve(true);
    sheet(`<h2>Avant de publier</h2>
      <p class="muted">Ce que tu publies peut être vu par d'autres membres. Les règles sont courtes :</p>
      ${REGLES_HTML}
      <p class="muted" style="margin-top:14px;font-size:.88rem">Un contenu signalé deux fois est masqué automatiquement le temps d'être vérifié.</p>
      <div class="btn-row" style="margin-top:18px">
        <button type="button" class="btn ghost" data-close>Annuler</button>
        <button type="button" class="btn" id="regles-ok">J'ai compris</button>
      </div>`, { onOpen: (s, close) => {
        $('#regles-ok', s).onclick = () => { store.set('regles-ok', 1); close(); resolve(true); };
        s.addEventListener('click', e => { if (e.target === s) resolve(false); });
        $$('[data-close]', s).forEach(b => b.addEventListener('click', () => resolve(false)));
      } });
  });
}

const MOTIFS = [
  ['sexuel', 'Nudité ou contenu sexuel'],
  ['violence', 'Violence, sang ou contenu choquant'],
  ['haine', 'Haine ou harcèlement'],
  ['perso', 'Donnée personnelle ou photo de quelqu\'un'],
  ['autre', 'Autre chose']
];
// cible : 'project' | 'media' | 'profile' | 'take'
function signaler(cible, id) {
  if (!ME) { toast('Connecte-toi pour signaler.'); return; }
  sheet(`<h2>Signaler</h2>
    <p class="muted">Dis-nous ce qui ne va pas. Le contenu est masqué automatiquement s'il est signalé par deux personnes.</p>
    <div id="motifs">${MOTIFS.map(([k, l]) => `<button type="button" class="choice" data-m="${k}"><span class="em">⚑</span><span><b>${esc(l)}</b></span></button>`).join('')}</div>
    <button type="button" class="btn ghost full" data-close>Annuler</button>`, {
    onOpen: (s, close) => {
      $('#motifs', s).onclick = async e => {
        const b = e.target.closest('[data-m]'); if (!b) return;
        b.disabled = true;
        const { error } = await sb.from('reports').insert({ target_type: cible, target_id: id, reporter_id: ME.id, reason: b.dataset.m });
        close();
        if (error) toast(/schema cache|does not exist/i.test(error.message) ? "Les signalements ne sont pas encore activés sur la base." : 'Oups : ' + error.message);
        else toast('Signalement envoyé. Merci.');
      };
    }
  });
}
const signalerBtn = (cible, id) => `<button type="button" class="link" data-signaler="${cible}:${esc(id)}">Signaler</button>`;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-signaler]'); if (!b) return;
  const [c, ...rest] = b.dataset.signaler.split(':');
  signaler(c, rest.join(':'));
});

/* =============================================================
   FAVORIS (gardés sur l'appareil)
   ============================================================= */
const favoris = () => store.get('favoris', ['rangement']);
const estFavori = id => favoris().includes(id);
function basculerFavori(id) {
  const f = favoris();
  const i = f.indexOf(id);
  if (i >= 0) f.splice(i, 1); else f.push(id);
  store.set('favoris', f);
  return i < 0;
}

/* =============================================================
   OUTILS : rendu d'une tuile
   ============================================================= */
function tuileOutil(o, { favori = false } = {}) {
  const dispo = o.statut === 'dispo';
  const inner = `<div class="em" aria-hidden="true">${o.emoji}</div>
    <b>${esc(o.nom)}</b><p>${esc(o.court)}</p>
    ${dispo ? '' : '<span class="tag">Bientôt</span>'}`;
  const fav = favori ? `<button type="button" class="fav" data-fav="${esc(o.id)}" aria-pressed="${estFavori(o.id)}" aria-label="Mettre en favori">${estFavori(o.id) ? '★' : '☆'}</button>` : '';
  return dispo
    ? `<div class="tool" style="--h:${o.teinte}">${fav}<a href="${BASE}${o.href}" style="text-decoration:none;color:inherit">${inner}</a></div>`
    : `<div class="tool soon" style="--h:${o.teinte}">${inner}</div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-fav]'); if (!b) return;
  e.preventDefault();
  const on = basculerFavori(b.dataset.fav);
  b.setAttribute('aria-pressed', String(on)); b.textContent = on ? '★' : '☆';
  toast(on ? 'Ajouté à tes favoris' : 'Retiré de tes favoris');
  if (typeof window.onFavorisChange === 'function') window.onFavorisChange();
});

/* =============================================================
   THÈME : clair / sombre / automatique + couleur d'accent
   ============================================================= */
const ACCENTS = [
  ['#e9a81c', '#231d08', 'Miel'],
  ['#3f7d5a', '#ffffff', 'Sapin'],
  ['#2f5fd0', '#ffffff', 'Encre'],
  ['#c4523c', '#ffffff', 'Brique'],
  ['#8a4fc7', '#ffffff', 'Prune'],
  ['#17181c', '#ffffff', 'Noir']
];
function appliquerReglages() {
  const r = document.documentElement;
  const t = store.get('theme', 'auto');
  if (t === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t);
  const a = store.get('accent', 0);
  const [bg, ink] = ACCENTS[a] || ACCENTS[0];
  r.style.setProperty('--accent', bg); r.style.setProperty('--accent-ink', ink);
  r.setAttribute('data-text', store.get('texte', 'normal'));
}
appliquerReglages();

function ouvrirReglages() {
  const t = store.get('theme', 'auto'), a = store.get('accent', 0), tx = store.get('texte', 'normal');
  sheet(`<h2>Apparence</h2>
    <p class="muted" style="font-size:.9rem">Ces réglages restent sur cet appareil.</p>
    <h3 style="margin-top:18px">Thème</h3>
    <div class="seg" id="r-theme">
      ${[['auto', 'Automatique'], ['clair', 'Clair'], ['sombre', 'Sombre']].map(([k, l]) =>
        `<button type="button" data-v="${k}" aria-selected="${t === k}">${l}</button>`).join('')}
    </div>
    <h3>Couleur</h3>
    <div class="swatches" id="r-accent">
      ${ACCENTS.map(([bg, , nom], i) => `<button type="button" class="swatch" data-v="${i}" aria-pressed="${a === i}" style="background:${bg}" aria-label="${esc(nom)}" title="${esc(nom)}"></button>`).join('')}
    </div>
    <h3 style="margin-top:18px">Taille du texte</h3>
    <div class="seg" id="r-texte">
      ${[['normal', 'Normale'], ['grand', 'Grande']].map(([k, l]) =>
        `<button type="button" data-v="${k}" aria-selected="${tx === k}">${l}</button>`).join('')}
    </div>
    <button type="button" class="btn full" data-close style="margin-top:8px">Terminé</button>`, {
    onOpen: s => {
      const bind = (sel, key, attr) => {
        $(sel, s).onclick = e => {
          const b = e.target.closest('[data-v]'); if (!b) return;
          const v = key === 'accent' ? Number(b.dataset.v) : b.dataset.v;
          store.set(key, v); appliquerReglages();
          $$('[data-v]', b.parentElement).forEach(x => x.setAttribute(attr, String(
            (key === 'accent' ? Number(x.dataset.v) : x.dataset.v) === v)));
        };
      };
      bind('#r-theme', 'theme', 'aria-selected');
      bind('#r-accent', 'accent', 'aria-pressed');
      bind('#r-texte', 'texte', 'aria-selected');
    }
  });
}

/* =============================================================
   NAVIGATION
   ============================================================= */
const ICONS = {
  home: '<path d="M3.6 11.3 12 4.2l8.4 7.1V20a1 1 0 0 1-1 1h-4.6v-5.6H9.2V21H4.6a1 1 0 0 1-1-1z"/>',
  tools: '<rect x="3.6" y="3.6" width="7" height="7" rx="2.2"/><rect x="13.4" y="3.6" width="7" height="7" rx="2.2"/><rect x="3.6" y="13.4" width="7" height="7" rx="2.2"/><rect x="13.4" y="13.4" width="7" height="7" rx="2.2"/>',
  news: '<path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h9A1.5 1.5 0 0 1 16 6.5V19H5.5A1.5 1.5 0 0 1 4 17.5z"/><path d="M16 9h2.5A1.5 1.5 0 0 1 20 10.5v7A1.5 1.5 0 0 1 18.5 19H16"/><path d="M7 9h6M7 12.5h6M7 16h4"/>',
  user: '<circle cx="12" cy="8.2" r="3.9"/><path d="M4.8 20.6c.5-3.8 3.5-6.1 7.2-6.1s6.7 2.3 7.2 6.1"/>'
};
const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

// Nombre de nouveautés jamais vues
function nouveautesNonVues() {
  if (typeof NOUVEAUTES === 'undefined') return 0;
  const vu = store.get('news-vu', '');
  return NOUVEAUTES.filter(n => n.date > vu).length;
}

function renderNav(user) {
  const p = location.pathname;
  const page = /\/outils\//.test(p) ? 'outils'
    : /\/nouveautes\//.test(p) ? 'nouveautes'
    : /\/(profil|connexion)\//.test(p) ? 'profil'
    : /\/(rangement|apprendre|projet)\//.test(p) ? 'outils' : 'accueil';
  const n = nouveautesNonVues();

  const head = $('#nav');
  if (head) {
    head.className = 'topbar';
    head.innerHTML = `<div class="topbar-in">
      <a class="brand" href="${BASE}index.html"><i>✨</i>EasyYourLife</a>
      <nav class="topnav" aria-label="Navigation principale">
        <a href="${BASE}index.html"${page === 'accueil' ? ' aria-current="page"' : ''}>Accueil</a>
        <a href="${BASE}outils/"${page === 'outils' ? ' aria-current="page"' : ''}>Outils</a>
        <a href="${BASE}nouveautes/"${page === 'nouveautes' ? ' aria-current="page"' : ''}>Nouveautés${n ? ' (' + n + ')' : ''}</a>
        <a href="${BASE}profil/"${page === 'profil' ? ' aria-current="page"' : ''}>${user ? 'Profil' : 'Connexion'}</a>
      </nav>
      <button type="button" class="iconbtn" id="btn-reglages" aria-label="Apparence">🎨</button>
    </div>`;
    $('#btn-reglages', head).onclick = ouvrirReglages;
  }

  let tb = $('#tabbar');
  if (!tb) { tb = document.createElement('nav'); tb.id = 'tabbar'; tb.className = 'tabbar'; tb.setAttribute('aria-label', 'Navigation'); document.body.appendChild(tb); }
  const items = [
    [BASE + 'index.html', 'home', 'Accueil', page === 'accueil', 0],
    [BASE + 'outils/', 'tools', 'Outils', page === 'outils', 0],
    [BASE + 'nouveautes/', 'news', 'Nouveautés', page === 'nouveautes', n],
    [user ? BASE + 'profil/' : BASE + 'connexion/', 'user', user ? 'Profil' : 'Compte', page === 'profil', 0]
  ];
  tb.innerHTML = items.map(([href, ic, label, on, badge]) =>
    `<a href="${href}"${on ? ' aria-current="page"' : ''}>${icon(ic)}${badge ? `<span class="badge">${badge > 9 ? '9+' : badge}</span>` : ''}${label}</a>`).join('');
}

async function initPage() {
  const { data } = await sb.auth.getSession();
  const user = data && data.session ? data.session.user : null;
  ME = null;
  if (user) {
    const { data: p } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    ME = p || { id: user.id, username: '?' };
    // Trace de passage, pour « les comptes actifs ». Silencieux si la colonne n'existe pas.
    sb.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', user.id).then(() => {}, () => {});
  }
  renderNav(user);
  return user;
}

/* --- Astuce « Sur l'écran d'accueil » (iPhone, une seule fois) --- */
function astuceInstall(container) {
  try {
    const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!iOS || navigator.standalone || store.get('astuce-install') || !container) return;
    const el = document.createElement('div');
    el.className = 'note';
    el.innerHTML = `<span class="em">📲</span><span><b>Utilise-le comme une appli</b> : appuie sur Partager, puis « Sur l'écran d'accueil ». <button type="button" class="link" id="astuce-x">Compris</button></span>`;
    container.prepend(el);
    $('#astuce-x', el).onclick = () => { store.set('astuce-install', 1); el.remove(); };
  } catch (e) {}
}

/* --- Avant / après --- */
function baHTML(avant, apres) {
  if (!avant && !apres) return '';
  if (!apres) return `<div class="ba"><img src="${esc(avant)}" alt="Avant" loading="lazy"><span class="ba-tag l">Avant</span></div>`;
  if (!avant) return `<div class="ba"><img src="${esc(apres)}" alt="Après" loading="lazy"><span class="ba-tag r">Après</span></div>`;
  return `<div class="ba cmp" style="--pos:50%"><img src="${esc(avant)}" alt="Avant" loading="lazy"><img class="ba-after" src="${esc(apres)}" alt="Après" loading="lazy"><span class="ba-line"></span><span class="ba-knob">↔</span><span class="ba-tag l">Avant</span><span class="ba-tag r">Après</span><input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Comparer avant et après"></div>`;
}
function initBA(root = document) {
  $$('.ba.cmp', root).forEach(el => {
    if (el._init) return; el._init = true;
    const range = $('.ba-range', el);
    const set = v => { el.style.setProperty('--pos', v + '%'); if (range) range.value = v; };
    const fromEvent = e => {
      const r = el.getBoundingClientRect();
      set(Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100)));
    };
    el.addEventListener('pointerdown', e => { el._d = true; el.setPointerCapture(e.pointerId); fromEvent(e); });
    el.addEventListener('pointermove', e => { if (el._d) fromEvent(e); });
    el.addEventListener('pointerup', () => { el._d = false; });
    el.addEventListener('pointercancel', () => { el._d = false; });
    if (range) range.addEventListener('input', () => set(range.value));
  });
}

/* --- Lecteur de stories --- */
function ouvrirStories(items, meta = {}) {
  if (!items.length) return;
  let i = 0, timer = null;
  const el = document.createElement('div');
  el.className = 'viewer'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const onKey = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
  function close() { clearTimeout(timer); el.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); }
  function go(d) { i += d; if (i < 0) i = 0; if (i >= items.length) return close(); draw(); }
  function draw() {
    clearTimeout(timer);
    const it = items[i];
    el.innerHTML = `<div class="viewer-bars">${items.map((_, k) => `<i class="${k < i ? 'done' : ''}"><b class="${k === i ? 'run' : ''}"></b></i>`).join('')}</div>
      <div class="viewer-head">${meta.avatar || ''}<div><b>${esc(meta.qui || '')}</b><small>${esc(it.quand || meta.sous || '')}</small></div><button class="viewer-x" aria-label="Fermer">✕</button></div>
      <img class="viewer-img" src="${esc(it.url)}" alt="">
      ${it.legende ? `<p class="viewer-cap">${esc(it.legende)}</p>` : ''}
      <button class="viewer-nav prev" aria-label="Précédent"></button><button class="viewer-nav next" aria-label="Suivant"></button>`;
    $('.viewer-x', el).onclick = close;
    $('.viewer-nav.prev', el).onclick = () => go(-1);
    $('.viewer-nav.next', el).onclick = () => go(1);
    timer = setTimeout(() => go(1), 5000);
  }
  document.addEventListener('keydown', onKey);
  draw();
}

/* --- Badges gagnés --- */
async function mesBadges(uid) {
  const { data } = await sb.from('user_badges').select('badge_code').eq('user_id', uid);
  return new Set((data || []).map(r => r.badge_code));
}
async function avecBadges(uid, action) {
  const avant = await mesBadges(uid);
  const res = await action();
  if (res && res.error) { toast('Oups : ' + res.error.message); return res; }
  const apres = await mesBadges(uid);
  const neufs = [...apres].filter(c => !avant.has(c));
  if (neufs.length) {
    const { data } = await sb.from('badges').select('*').in('code', neufs).order('sort_order');
    sheet(`<h2>Nouveau badge !</h2>${(data || []).map(b =>
      `<div class="row" style="margin:14px 0"><span style="font-size:2rem">${esc(b.icon)}</span><div><b>${esc(b.name)}</b><br><small class="muted">${esc(b.description)}</small></div></div>`).join('')}
      <button type="button" class="btn full" data-close>Super</button>`, { celebrate: true });
  }
  return res;
}
