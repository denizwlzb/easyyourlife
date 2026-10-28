// Toutes les pièces, étapes et idées. Pour ajouter une pièce : copie un bloc room(...) plus bas.
const trier = zone => ({ titre: "Trier : garder, donner, jeter", taches: ["Prépare 3 bacs ou sacs : « garder », « donner », « jeter »", "Passe " + zone + " en revue : un objet à la fois, décision en 5 secondes", "Sors tout de suite les sacs « donner » et « jeter » de la pièce"] });
const nettoyer = extra => ({ titre: "Nettoyer", taches: ["Dépoussière les surfaces de haut en bas", extra, "Passe l'aspirateur ou le balai en dernier"] });
const decorer = () => ({ titre: "Décorer sans se ruiner", taches: ["Choisis UNE idée dans l'onglet « Déco pas chère »", "Mets-la en place, puis prends une photo avant/après"] });
const P = (nom, fixation, desc, recherche) => ({ nom, fixation, desc, recherche });
const D = (nom, cout, desc) => ({ nom, cout, desc });
const C = (nom, budget, desc) => ({ nom, budget, desc });
const room = (id, nom, emoji, accroche, visible, zone, organiser, extra, imprimante, diy, deco) => ({
  id, nom, emoji, accroche,
  etapes: [{ titre: "Ranger ce qui est visible", taches: visible }, trier(zone), { titre: "Organiser", taches: organiser }, nettoyer(extra), decorer()],
  imprimante, diy, deco
});

const ROOMS = [
  room('chambre', 'Chambre', '🛏️', "Un espace calme où tout a sa place.",
    ["Ramasse les vêtements au sol : propres → pliés, sales → panier", "Remets vaisselle, verres et emballages à leur place", "Fais le lit (ça change tout en 1 minute)", "Vide le dessus de la commode et de la table de chevet : garde 3 objets max"],
    "ton placard et tes tiroirs",
    ["Plie en rouleau ou à la verticale pour voir tous tes vêtements d'un coup d'œil", "Regroupe les petits objets dans des boîtes ou bacs étiquetés", "Libère le dessous du lit : une boîte plate par type d'objet"],
    "Change les draps si ça fait plus de 2 semaines",
    [P("Support de casque à pince", "Clip sur le bord du bureau ou de l'étagère", "Un crochet en C qui se pince, aucun perçage.", "headphone holder clip desk"),
     P("Crochets pour clés et sacs", "Plaque + adhésif double face", "Une petite plaque à coller derrière la porte.", "adhesive wall hook"),
     P("Passe-câbles de chevet", "Adhésif double face", "Guide les câbles de chargeur le long du meuble.", "cable clip bedside"),
     P("Support de téléphone en charge", "Pose simple sur la table de chevet", "Garde ton téléphone droit pendant la charge.", "phone stand charging")],
    [D("Boîtes à chaussures habillées", "0–2 €", "Recouvre-les de papier kraft ou de tissu et étiquette-les."),
     D("Pots en verre", "0 €", "Bocaux récupérés pour bijoux, élastiques, petits objets."),
     D("Cintres + pinces à linge", "1–3 €", "Pour suspendre écharpes, ceintures et casquettes.")],
    [C("Guirlande lumineuse à piles", "5–10 €", "Ambiance douce autour du lit ou de la fenêtre."),
     C("Cadres avec tes photos", "3–8 €", "Imprime tes photos préférées et fixe-les avec des bandes adhésives."),
     C("Plante facile", "3–6 €", "Un pothos ou une plante artificielle pour la touche de vert."),
     C("Plaid ou housse de coussin", "5–12 €", "Change l'ambiance d'un coup, en friperie ou en promo.")]),

  room('salon', 'Salon', '🛋️', "Un coin détente qui donne envie de s'asseoir.",
    ["Rassemble ce qui traîne (télécommandes, mugs, courrier) dans un panier", "Remets livres, jeux et magazines à leur place", "Plie les plaids et remets les coussins en place", "Vide la table basse : garde une seule pièce de déco"],
    "tes étagères et ton meuble TV",
    ["Donne un « domicile » à chaque télécommande (panier ou support)", "Regroupe câbles et chargeurs avec des attaches", "Trie les livres par taille ou par couleur sur les étagères"],
    "Nettoie l'écran de la TV et les surfaces",
    [P("Support de télécommandes", "Adhésif sur le côté du canapé ou du meuble", "Plus jamais de télécommande perdue.", "remote control holder wall"),
     P("Clips de câbles pour meuble TV", "Adhésif double face", "Garde les fils invisibles et rangés.", "cable management clip"),
     P("Support de manettes", "Adhésif sur le côté du meuble", "Un crochet pour poser les manettes de jeu.", "controller holder"),
     P("Serre-livres en L", "Glisse sous les livres", "Maintient les livres droits sans fixation.", "bookend L shape")],
    [D("Panier ou caisse en bois", "0–5 €", "Pour plaids, jouets ou magazines. Les cagettes marchent très bien."),
     D("Poche en feutre à coller", "2–4 €", "Une pochette pour télécommandes, collée sur le côté du canapé."),
     D("Pots de confiture", "0 €", "Pour bougies, stylos ou petits objets.")],
    [C("Housses de coussins", "5–15 €", "Change la couleur du salon sans changer le canapé."),
     C("Mur de cadres", "5–15 €", "Fixe-les avec des bandes adhésives réutilisables, sans trou."),
     C("Plantes", "3–10 €", "Une grande plante ou plusieurs petites sur une étagère."),
     C("Lampe d'appoint chaude", "8–15 €", "La lumière chaude change totalement l'ambiance le soir.")]),

  room('cuisine', 'Cuisine', '🍳', "Un plan de travail dégagé, des placards faciles à lire.",
    ["Lave ou range toute la vaisselle du plan de travail", "Garde sur le plan seulement ce que tu utilises chaque jour", "Regroupe les produits d'entretien dans un seul bac", "Vide l'évier et nettoie-le"],
    "tes placards et ton frigo",
    ["Vérifie les dates et jette ce qui est périmé", "Range les aliments secs dans des bocaux ou boîtes identiques, avec étiquette", "Place ce que tu utilises le plus à hauteur des yeux ou des mains"],
    "Nettoie l'intérieur du frigo et le dessus des placards",
    [P("Support d'éponge", "Adhésif ou ventouse dans l'évier", "Garde l'éponge au sec et hors du plan.", "sponge holder sink"),
     P("Crochets pour torchons et ustensiles", "Adhésif étanche", "Libère les tiroirs et rend tout accessible.", "kitchen utensil hook adhesive"),
     P("Organiseur de couvercles", "Pose dans un tiroir ou placard", "Fini les couvercles qui s'entassent.", "lid organizer"),
     P("Pinces à sachets", "Clip", "Referme les paquets de pâtes, riz, céréales.", "bag clip")],
    [D("Bocaux récupérés", "0 €", "Pâtes, riz, lentilles : visible, propre et empilable."),
     D("Tringle à ventouse", "2–5 €", "Pour suspendre ustensiles et tasses sous un meuble."),
     D("Étagère d'appoint en cagettes", "0–5 €", "Poncées et empilées, elles font un rangement solide.")],
    [C("Herbes aromatiques", "2–5 €", "Basilic ou menthe sur le rebord de la fenêtre."),
     C("Lot de torchons assortis", "5–10 €", "Une touche de couleur utile."),
     C("Étiquettes pour bocaux", "0–3 €", "Écrites à la main ou imprimées, ça fait tout de suite propre."),
     C("Planche à découper en décor", "3–10 €", "Posée contre le mur, elle sert aussi de déco.")]),

  room('salle_de_bain', 'Salle de bain', '🛁', "Propre, simple, avec chaque produit à sa place.",
    ["Regroupe produits et flacons sur un plateau", "Jette les produits vides ou périmés", "Plie les serviettes et remets le linge sale au panier", "Vide le dessus du lavabo : garde 2 ou 3 objets"],
    "tes tiroirs et ton armoire à pharmacie",
    ["Un bac par usage : visage, cheveux, dents, pharmacie", "Sépare le maquillage dans des petits bacs ou un organiseur", "Garde un seul produit en cours, le reste ailleurs"],
    "Détartre la robinetterie et nettoie le miroir",
    [P("Support de brosses à dents", "Adhésif ou ventouse", "Garde les brosses séparées et sèches.", "toothbrush holder wall"),
     P("Crochets étanches pour serviettes", "Adhésif étanche", "Aucun perçage dans le carrelage.", "bathroom towel hook adhesive"),
     P("Support de rasoir", "Adhésif sur carrelage", "Le rasoir sèche et ne traîne plus.", "razor holder"),
     P("Séparateurs de tiroir sur mesure", "Pose dans le tiroir", "Imprimés à la taille exacte de ton tiroir.", "drawer organizer divider")],
    [D("Pots en verre", "0 €", "Pour cotons, coton-tiges et élastiques."),
     D("Étagère de coin à ventouses", "3–8 €", "Libère de la place dans la douche."),
     D("Panier en osier", "3–8 €", "Pour les serviettes roulées, très joli et pas cher.")],
    [C("Distributeur de savon assorti", "3–8 €", "Remplace les flacons de couleurs différentes."),
     C("Tapis de bain doux", "5–12 €", "Confort et touche de couleur."),
     C("Plante qui aime l'humidité", "3–6 €", "Fougère ou pothos."),
     C("Bougie ou diffuseur", "3–8 €", "Une odeur agréable donne une impression de propreté.")]),

  room('entree', 'Entrée', '🚪', "La première impression de la maison.",
    ["Range les chaussures : une seule paire par personne dehors", "Trie le courrier : garder, jeter, à traiter", "Remets manteaux et sacs sur les patères ou cintres", "Vide les poches et le vide-poches"],
    "ton meuble ou ton coin d'entrée",
    ["Crée un coin « clés, portefeuille, badge »", "Ajoute une zone pour le courrier à traiter", "Fais la rotation de saison pour les manteaux et chaussures"],
    "Lave le sol et le paillasson",
    [P("Crochets pour clés et sacs", "Adhésif ou plaque à coller", "Un endroit unique pour poser tes clés.", "key hook adhesive"),
     P("Vide-poche à coller", "Adhésif sur le meuble", "Plateau pour clés, monnaie, écouteurs.", "key tray"),
     P("Support de parapluie", "Accroche sur la porte", "Le parapluie mouillé ne traîne plus.", "umbrella holder door"),
     P("Étiquettes de patères", "Adhésif", "Chacun sait où poser sa veste.", "coat hook label")],
    [D("Cagette en rangement à chaussures", "0–5 €", "Empile-en deux pour un petit meuble."),
     D("Boîte à courrier", "0–2 €", "Une boîte à chaussures décorée suffit."),
     D("Planche à patères récup", "3–8 €", "Planche récupérée avec patères collées ou vissées sur la planche, pas au mur.")],
    [C("Miroir", "5–15 €", "Agrandit visuellement l'entrée."),
     C("Paillasson sympa", "5–10 €", "Une touche d'humour à l'entrée."),
     C("Plante ou fleurs séchées", "3–6 €", "Accueillant et sans entretien."),
     C("Petit cadre ou citation", "2–5 €", "Un détail qui donne du caractère.")]),

  room('bureau', 'Bureau', '💻', "Un plan de travail clair pour mieux se concentrer.",
    ["Débarrasse le plan : garde écran, clavier, souris", "Fais 3 piles de papiers : à faire, à classer, à jeter", "Range stylos et petit matériel dans un pot", "Rapporte tasses et assiettes à la cuisine"],
    "tes tiroirs et tes dossiers",
    ["Passe les câbles dans des attaches ou un tube", "Classe les papiers importants dans une pochette ou un classeur", "Organise tes fichiers numériques : un dossier par thème, noms clairs"],
    "Nettoie l'écran, le clavier et la souris",
    [P("Support de casque sous le bureau", "Clip ou adhésif sous le plateau", "Libère le plan et protège le casque.", "headphone hook under desk"),
     P("Passe-câbles et clips", "Adhésif double face", "Garde tous les câbles groupés.", "cable management desk"),
     P("Support de téléphone / chargeur", "Pose simple", "Ton téléphone visible sans le tenir.", "phone dock stand"),
     P("Organiseur de tiroir sur mesure", "Pose dans le tiroir", "Un compartiment par objet.", "desk drawer organizer")],
    [D("Pot à stylos récup", "0 €", "Un pot de conserve ou une boîte de café."),
     D("Boîtes à chaussures en classeurs", "0 €", "Étiquetées par thème."),
     D("Pinces à linge pour câbles", "0–1 €", "Fixées au bord du bureau, elles retiennent les câbles.")],
    [C("Lampe d'appoint chaude", "8–15 €", "Moins de fatigue visuelle le soir."),
     C("Affiches ou cadres", "3–10 €", "Motivation et personnalité."),
     C("Petite plante", "3–6 €", "Un point de vert pour se reposer l'œil."),
     C("Sous-main", "5–12 €", "Protège le bureau et structure l'espace.")]),

  room('balcon', 'Balcon / extérieur', '🌿', "Un petit coin dehors où l'on aime rester.",
    ["Évacue déchets, feuilles et cartons", "Range outils et pots vides dans un coin", "Rentre ou lave couverts et verres éventuels", "Dégage le passage : rien au sol qui gêne"],
    "ton coffre ou ton coin de rangement extérieur",
    ["Rassemble pots et outils de jardin au même endroit", "Utilise la hauteur : étagère ou jardinière suspendue", "Range à l'abri ce qui craint l'eau"],
    "Balaye et lave le sol, nettoie table et chaises",
    [P("Crochets de rambarde", "Clip sur la rambarde", "Pour outils légers ou petits pots, sans perçage. Utilise du PETG ou de l'ASA dehors : le PLA ramollit au soleil.", "railing hook planter"),
     P("Support d'arrosoir", "Clip", "Garde l'arrosoir accroché et sec.", "watering can hook"),
     P("Clips pour guirlande", "Clip sur la rambarde", "Installe une guirlande sans clous. PETG ou ASA conseillé.", "string light clip"),
     P("Étiquettes de plantes", "Piquet", "Réutilisables, résistantes à l'extérieur en PETG.", "plant label stake")],
    [D("Palette récup en étagère", "0–10 €", "Poncée et posée contre le mur."),
     D("Pots en boîtes de conserve", "0–2 €", "Peints, avec des trous de drainage."),
     D("Cagette en table d'appoint", "0–5 €", "Retournée, elle fait une petite table.")],
    [C("Guirlande solaire", "5–12 €", "Aucune prise nécessaire."),
     C("Coussins d'extérieur", "8–15 €", "Transforme une chaise dure en coin confortable."),
     C("Plantes faciles", "3–10 €", "Lavande ou aromatiques."),
     C("Table pliante", "10–20 €", "Se range à plat quand tu n'en as pas besoin.")])
];


/* ===== Personnalisation sans IA : ce que le membre indique modifie son plan ===== */
// visible / trier / organiser / nettoyer / deco = tâches ajoutées dans l'étape correspondante
// imprimante / diy / decoIdees = idées ajoutées en tête des listes
const PROBLEMS = [
  { id: 'vetements', label: 'Des vêtements qui traînent',
    visible: ["Rassemble tous les vêtements qui traînent en un seul tas, puis sépare : propres à plier, sales au panier, à donner"],
    organiser: ["Installe un panier ou un bac « à laver » à un endroit où tu le vois", "Prévois un coin « tenue du lendemain » (crochet ou cintre sur la porte) pour ne plus empiler sur une chaise"],
    imprimante: [P("Crochet de porte pour la tenue du lendemain", "Clip sur le haut de la porte", "Un crochet qui se pince sur la porte, aucun perçage.", "over door hook clip")],
    diy: [D("Cintre accroché en haut de la porte", "0–3 €", "Il sert de « chaise » pour les vêtements du jour.")] },
  { id: 'cables', label: 'Câbles et chargeurs partout',
    visible: ["Débranche ce qui ne sert pas et mets les câbles inutiles dans une boîte"],
    organiser: ["Regroupe les câbles d'une même zone avec des attaches ou des pinces", "Choisis un seul « poste de charge » pour tes appareils (une prise, un plateau)"],
    imprimante: [P("Clips et guide-câbles", "Adhésif double face", "Garde les fils le long du meuble.", "cable clip desk"), P("Station de charge", "Pose simple", "Un seul endroit pour tous les chargeurs.", "charging station organizer")],
    diy: [D("Pinces à linge ou bandes velcro", "0–3 €", "Pour attacher et repérer les câbles.")] },
  { id: 'surfaces', label: 'Surfaces encombrées (bureau, table, commode)',
    visible: ["Vide complètement la surface la plus encombrée et ne remets que 3 objets utiles"],
    organiser: ["Donne un plateau ou une boîte aux petits objets restants pour que la surface reste libre"],
    imprimante: [P("Organiseur de bureau modulable", "Pose simple", "Des cases pour stylos, clés et petits objets.", "desk organizer modular")],
    diy: [D("Plateau ou boîte récupérée", "0–5 €", "Regroupe les petits objets au lieu de les laisser éparpillés.")] },
  { id: 'peu_rangement', label: 'Pas assez de rangements',
    organiser: ["Utilise la hauteur : étagère, crochets ou boîtes empilables", "Exploite les espaces perdus : dessous de lit, dessus de porte, derrière une porte"],
    imprimante: [P("Crochets et petites étagères adhésives", "Adhésif double face", "Ajoutent du rangement sans percer.", "adhesive shelf bracket")],
    diy: [D("Cagettes ou boîtes empilées", "0–10 €", "Un meuble de rangement bon marché.")] },
  { id: 'trop_objets', label: 'Trop d\'objets, trop de choses',
    visible: ["Retire 10 objets dont tu ne te sers plus et mets-les dans un sac « à donner »"],
    trier: ["Pour chaque objet, pose-toi la question : « Je l'ai utilisé depuis 6 mois ? »"],
    diy: [D("Boîte « à donner » toujours ouverte", "0 €", "Tu y mets au fil de l'eau ce dont tu ne veux plus.")] },
  { id: 'poussiere', label: 'Poussière et saleté',
    nettoyer: ["Dépoussière avec un chiffon humide plutôt que sec, pour ne pas la remettre en l'air", "Libère le sol pour passer l'aspirateur facilement"],
    diy: [D("Chiffons microfibres", "3–6 €", "Retiennent mieux la poussière.")] },
  { id: 'deco', label: 'Il manque de la déco, de l\'ambiance',
    deco: ["Choisis une ambiance (2 ou 3 couleurs maximum) et garde seulement les objets déco qui vont avec"],
    decoIdees: [C("Lumière chaude", "5–15 €", "Une guirlande ou une petite lampe change toute l'ambiance."), C("Quelque chose de vivant", "3–8 €", "Une plante facile ou des fleurs séchées.")] },
  { id: 'papiers', label: 'Papiers et courrier qui s\'accumulent',
    visible: ["Trie le courrier : à jeter, à traiter cette semaine, à archiver"],
    organiser: ["Crée 3 emplacements : « à traiter », « à classer », « à garder » (pochettes ou boîtes)", "Fixe un moment par semaine pour traiter le courrier (10 minutes)"],
    diy: [D("Pochettes ou classeur", "2–8 €", "Un dossier par sujet.")] },
  { id: 'petits_objets', label: 'Petits objets qui se perdent',
    organiser: ["Donne une « maison » à chaque petit objet (clés, bijoux, écouteurs) dans un pot ou un plateau", "Étiquette les boîtes pour retrouver sans chercher"],
    imprimante: [P("Plateau vide-poche", "Pose simple", "Clés, écouteurs et monnaie au même endroit.", "key tray")],
    diy: [D("Pots en verre ou boîtes à chaussures", "0 €", "Un pot par catégorie de petits objets.")] },
  { id: 'sol', label: 'Sol encombré',
    visible: ["Ramasse tout ce qui est au sol : chaque objet retourne à sa place ou dans une boîte « en attente »"],
    organiser: ["Libère un passage d'au moins 60 cm entre la porte et le fond de la pièce"] }
];

function buildLocalPlan(roomId, brief) {
  const r = ROOMS.find(x => x.id === roomId) || ROOMS[0];
  const b = brief && typeof brief === 'object' ? brief : {};
  const ids = Array.isArray(b.problems) ? b.problems : [];
  const picked = PROBLEMS.filter(p => ids.includes(p.id));
  const keys = ['visible', 'trier', 'organiser', 'nettoyer', 'deco'];
  const etapes = r.etapes.map((e, i) => ({ titre: e.titre, taches: [...picked.flatMap(p => p[keys[i]] || []), ...e.taches] }));
  const merge = (own, extra, n) => { const seen = new Set(); return [...extra, ...own].filter(x => seen.has(x.nom) ? false : (seen.add(x.nom), true)).slice(0, n); };
  const note = String(b.description || '').trim().slice(0, 160);
  const total = etapes.reduce((s, e) => s + e.taches.length, 0);
  const resume = (picked.length
    ? `Plan sur mesure pour ${r.nom.toLowerCase()} : tes priorités (${picked.map(p => p.label.toLowerCase()).join(' ; ')}) passent en premier dans chaque étape.`
    : `Plan pour ${r.nom.toLowerCase()} : ${r.accroche}`) + (note ? ` Ta note : « ${note} ».` : '');
  return {
    resume, duree_totale_min: Math.round(total * 8 / 5) * 5, budget_total: '', etapes,
    imprimante: b.printer === false ? [] : merge(r.imprimante, picked.flatMap(p => p.imprimante || []), 6),
    diy: merge(r.diy, picked.flatMap(p => p.diy || []), 6),
    deco: merge(r.deco, picked.flatMap(p => p.decoIdees || []), 6)
  };
}
