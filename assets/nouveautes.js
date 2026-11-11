/* =============================================================
   LE JOURNAL DES NOUVEAUTÉS
   Ajoute une entrée EN HAUT de la liste à chaque changement,
   même tout petit (un thème, une couleur, une correction).
     date   : 'AAAA-MM-JJ'
     type   : 'nouveau' | 'amelioration' | 'correction' | 'design'
     outil  : l'id d'un outil, ou null si ça concerne tout le site
     titre  : une ligne, à la première personne du site
     texte  : 1 à 3 phrases, ce que ça change pour la personne
   ============================================================= */

const TYPES = {
  nouveau:      { nom: 'Nouveauté',    emoji: '🎉' },
  amelioration: { nom: 'Amélioration', emoji: '⚡' },
  correction:   { nom: 'Correction',   emoji: '🔧' },
  design:       { nom: 'Design',       emoji: '🎨' }
};

const NOUVEAUTES = [
  {
    date: '2026-11-11', type: 'design', outil: null,
    titre: 'Un site entièrement refait',
    texte: "Nouvelle interface pensée pour le téléphone d'abord : navigation en bas, textes qui ne se chevauchent plus, thème clair ou sombre qui suit ton téléphone."
  },
  {
    date: '2026-11-11', type: 'nouveau', outil: null,
    titre: 'Cette page',
    texte: "Tous les changements du site arrivent ici, même les plus petits. Une pastille sur l'onglet te prévient quand il y a du neuf."
  },
  {
    date: '2026-11-11', type: 'nouveau', outil: null,
    titre: 'Les favoris et le fil des amis',
    texte: "Épingle les outils que tu utilises : ils passent en haut de l'accueil. Juste au-dessus, les dernières photos de tes amis et des comptes publics à découvrir."
  },
  {
    date: '2026-11-11', type: 'nouveau', outil: null,
    titre: 'Des règles et un bouton pour signaler',
    texte: "Tout ce que tu publies est privé tant que tu ne décides pas le contraire. Chaque photo et chaque message peut être signalé, et un contenu signalé disparaît automatiquement le temps d'être vérifié."
  },
  {
    date: '2026-11-11', type: 'amelioration', outil: 'rangement',
    titre: 'Choisis ta pièce, ou laisse le hasard',
    texte: "Tu peux maintenant lancer une pièce au hasard quand tu ne sais pas par où commencer. Le plan s'affiche en étapes à cocher, avec ta progression."
  },
  {
    date: '2026-11-11', type: 'nouveau', outil: 'apprendre',
    titre: 'Le déclic du jour',
    texte: "Un bouton par jour, une découverte identique pour tout le monde, et un débat pour dire si tu es d'accord ou non."
  }
];
