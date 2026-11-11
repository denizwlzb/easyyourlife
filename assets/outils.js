/* =============================================================
   LE CATALOGUE DES OUTILS
   Pour ajouter un outil : crée son dossier (ex. budget/index.html),
   puis ajoute une ligne dans OUTILS ci-dessous. Il apparaît tout seul
   sur l'accueil, dans la page Outils et dans les favoris.
   - cat  : une catégorie de CATEGORIES (en crée une nouvelle si besoin)
   - teinte : 0-360, la couleur de la tuile de l'outil
   - statut : 'dispo' ou 'bientot'
   ============================================================= */

const CATEGORIES = [
  { id: 'maison',   nom: 'Maison',          emoji: '🏠' },
  { id: 'tete',     nom: 'Culture & tête',  emoji: '🧠' },
  { id: 'argent',   nom: 'Argent',          emoji: '💶' },
  { id: 'sante',    nom: 'Santé & forme',   emoji: '🌿' },
  { id: 'orga',     nom: 'Organisation',    emoji: '🗓️' }
];

const OUTILS = [
  {
    id: 'rangement', nom: 'Ranger & décorer', emoji: '🧺', teinte: 28, cat: 'maison',
    court: 'Une pièce, un plan, un avant/après.',
    desc: "Choisis une pièce (ou laisse le hasard décider), reçois un plan d'action en étapes, et garde la photo avant/après.",
    href: 'rangement/', statut: 'dispo'
  },
  {
    id: 'apprendre', nom: 'Le déclic du jour', emoji: '💡', teinte: 265, cat: 'tete',
    court: 'Une découverte par jour, la même pour tous.',
    desc: "Chaque jour, un truc nouveau à apprendre en 3 minutes, identique pour tout le monde, puis un débat ouvert dessus.",
    href: 'apprendre/', statut: 'dispo'
  }
];

const outilById = id => OUTILS.find(o => o.id === id) || null;
const catById = id => CATEGORIES.find(c => c.id === id) || { id: 'autre', nom: 'Autres', emoji: '✨' };
