/* Thèmes et personnalisation. Chargé dans <head> pour éviter tout flash au chargement. */
(function () {
  var KEY = 'eyl_style_v1';
  var THEMES = [
    { id: 'ios', nom: 'iOS', emoji: '📱', dark: 'auto', desc: 'Comme une vraie appli iPhone', fonts: null, sw: ['#f2f2f7', '#ffffff', '#0a6cf0', '#34c759'] },
    { id: 'atelier', nom: 'Atelier', emoji: '🛠️', dark: false, desc: 'Établi clair, étiquettes jaunes', fonts: 'family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Figtree:wght@400..800', sw: ['#dfe7ea', '#ffffff', '#ff6b2c', '#ffd23f'] },
    { id: 'neon', nom: 'Nuit néon', emoji: '🌃', dark: true, desc: 'Violet profond, rose et cyan', fonts: 'family=Syne:wght@500..800&family=Outfit:wght@400..700', sw: ['#120b2e', '#1c1342', '#ff3ea5', '#3df0ff'] },
    { id: 'sakura', nom: 'Sakura', emoji: '🌸', dark: false, desc: 'Rose doux, coins très ronds', fonts: 'family=Fredoka:wght@400..700&family=Nunito:wght@400..800', sw: ['#ffe3ec', '#fff8fb', '#ff5c8a', '#c9b6ff'] },
    { id: 'foret', nom: 'Forêt', emoji: '🌲', dark: true, desc: 'Vert profond et ambre', fonts: 'family=Fraunces:opsz,wght@9..144,500..800&family=Figtree:wght@400..800', sw: ['#0f231a', '#17352a', '#ffb547', '#8fd694'] },
    { id: 'ocean', nom: 'Océan', emoji: '🌊', dark: false, desc: 'Bleu frais, ombres douces', fonts: 'family=Manrope:wght@400..800', sw: ['#d9efff', '#ffffff', '#3aa0ff', '#00d4b4'] },
    { id: 'brut', nom: 'Brut', emoji: '🖤', dark: false, desc: 'Noir, blanc, jaune, sans détour', fonts: 'family=Archivo+Black&family=Archivo:wght@400..700', sw: ['#ffffff', '#f1f1f1', '#ffe600', '#000000'] },
    { id: 'arcade', nom: 'Arcade', emoji: '🕹️', dark: true, desc: 'Pixels et salle de jeux', fonts: 'family=Press+Start+2P&family=Figtree:wght@400..800', sw: ['#1a1c2c', '#232846', '#ffcd75', '#ef7d57'] }
  ];
  var ACCENTS = ['#ff6b2c', '#ff3ea5', '#3aa0ff', '#22c55e', '#a855f7', '#facc15', '#14b8a6', '#ef4444'];
  var DEFAULTS = { theme: 'auto', accent: null, size: 'm', motion: 'on' };
  var SIZES = { s: '15px', m: '16px', l: '18px' };

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  var state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function effective() {
    if (state.theme === 'auto') return matchMedia('(prefers-color-scheme: dark)').matches ? 'neon' : 'atelier';
    return THEMES.some(function (t) { return t.id === state.theme; }) ? state.theme : 'atelier';
  }
  function inkFor(hex) {
    var c = hex.replace('#', '');
    var ch = [0, 2, 4].map(function (i) { var v = parseInt(c.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    var L = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
    return L > 0.179 ? '#111111' : '#ffffff';
  }
  function loadFonts(id) {
    var t = THEMES.filter(function (x) { return x.id === id; })[0];
    if (!t || !t.fonts || document.querySelector('link[data-eyl-font="' + id + '"]')) return;
    if (!document.querySelector('link[data-eyl-pre]')) {
      var a = document.createElement('link'); a.rel = 'preconnect'; a.href = 'https://fonts.googleapis.com'; a.setAttribute('data-eyl-pre', '1');
      var b = document.createElement('link'); b.rel = 'preconnect'; b.href = 'https://fonts.gstatic.com'; b.crossOrigin = 'anonymous';
      document.head.appendChild(a); document.head.appendChild(b);
    }
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?' + t.fonts + '&display=swap';
    l.setAttribute('data-eyl-font', id);
    document.head.appendChild(l);
  }

  function apply() {
    var id = effective();
    var t = THEMES.filter(function (x) { return x.id === id; })[0];
    var de = document.documentElement;
    de.setAttribute('data-theme', id);
    de.setAttribute('data-motion', state.motion === 'off' ? 'off' : 'on');
    de.style.colorScheme = t.dark === 'auto' ? 'light dark' : (t.dark ? 'dark' : 'light');
    de.style.fontSize = SIZES[state.size] || SIZES.m;
    if (state.accent) { de.style.setProperty('--accent', state.accent); de.style.setProperty('--accent-ink', inkFor(state.accent)); }
    else { de.style.removeProperty('--accent'); de.style.removeProperty('--accent-ink'); }
    loadFonts(id);
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
    var dm = false; try { dm = matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
    m.content = t.dark === 'auto' ? (dm ? '#000000' : t.sw[0]) : t.sw[0];
    var vt = document.getElementById('eyl-vt');
    if (id === 'ios' && state.motion !== 'off') {
      if (!vt) { vt = document.createElement('style'); vt.id = 'eyl-vt'; vt.textContent = '@view-transition{navigation:auto}'; document.head.appendChild(vt); }
    } else if (vt) { vt.remove(); }
  }
  apply();
  try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (state.theme === 'auto' || state.theme === 'ios') apply(); }); } catch (e) {}

  /* ----- Panneau ----- */
  var panel = null, overlay = null, lastFocus = null;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function build() {
    overlay = document.createElement('div'); overlay.className = 'panel-overlay'; overlay.hidden = true;
    panel = document.createElement('aside'); panel.className = 'theme-panel'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'Personnaliser le style');
    var tiles = '<button type="button" class="theme-tile" data-pick="auto"><span class="sw"><i style="background:#dfe7ea"></i><i style="background:#120b2e"></i></span><b>🖥️ Automatique</b><small>Suit le mode clair ou sombre de ton appareil</small></button>' +
      THEMES.map(function (t) {
        return '<button type="button" class="theme-tile" data-pick="' + t.id + '"><span class="sw">' + t.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span><b>' + t.emoji + ' ' + esc(t.nom) + '</b><small>' + esc(t.desc) + '</small></button>';
      }).join('');
    var accs = ACCENTS.map(function (c) { return '<button type="button" class="acc" data-acc="' + c + '" style="background:' + c + '" aria-label="Accent ' + c + '"></button>'; }).join('');
    panel.innerHTML =
      '<div class="panel-head"><h2>🎨 Ton style</h2><button type="button" class="btn small ghost panel-close" aria-label="Fermer">✕</button></div>' +
      '<p class="muted">Choisis une ambiance. Elle est gardée sur cet appareil.</p>' +
      '<h3>Thème</h3><div class="theme-grid">' + tiles + '</div>' +
      '<h3>Couleur d\'accent</h3><div class="acc-row">' + accs + '<input type="color" id="tp-color" aria-label="Couleur personnalisée"><button type="button" class="btn small ghost" id="tp-accreset">Couleur du thème</button></div>' +
      '<h3>Taille du texte</h3><div class="seg" id="tp-size"><button type="button" data-size="s">Petit</button><button type="button" data-size="m">Normal</button><button type="button" data-size="l">Grand</button></div>' +
      '<label class="switch-row"><input type="checkbox" class="chk" id="tp-motion"> <span>Animations</span></label>' +
      '<button type="button" class="btn ghost" id="tp-reset">Tout réinitialiser</button>';
    document.body.appendChild(overlay); document.body.appendChild(panel);

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel && !panel.hidden) close(); });
    panel.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.classList.contains('panel-close')) return close();
      if (t.dataset.pick) state.theme = t.dataset.pick;
      else if (t.dataset.acc) state.accent = t.dataset.acc;
      else if (t.id === 'tp-accreset') state.accent = null;
      else if (t.dataset.size) state.size = t.dataset.size;
      else if (t.id === 'tp-reset') state = Object.assign({}, DEFAULTS);
      else return;
      save(); apply(); refresh();
    });
    panel.querySelector('#tp-color').addEventListener('input', function (e) { state.accent = e.target.value; apply(); refresh(true); });
    panel.querySelector('#tp-color').addEventListener('change', function () { save(); });
    panel.querySelector('#tp-motion').addEventListener('change', function (e) { state.motion = e.target.checked ? 'on' : 'off'; save(); apply(); });
  }
  function refresh(keepColor) {
    var picked = state.theme;
    [].forEach.call(panel.querySelectorAll('[data-pick]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.pick === picked)); });
    [].forEach.call(panel.querySelectorAll('[data-acc]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.acc === state.accent)); });
    [].forEach.call(panel.querySelectorAll('[data-size]'), function (b) { b.setAttribute('aria-selected', String(b.dataset.size === state.size)); });
    panel.querySelector('#tp-motion').checked = state.motion !== 'off';
    if (!keepColor) panel.querySelector('#tp-color').value = state.accent || '#ff6b2c';
  }
  function open() {
    lastFocus = document.activeElement;
    if (!panel) build();
    refresh(); overlay.hidden = false; panel.hidden = false;
    panel.querySelector('.panel-close').focus();
  }
  function close() {
    if (!panel) return;
    overlay.hidden = true; panel.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  window.EYL_THEME = { open: open, close: close, apply: apply, themes: THEMES };
})();
