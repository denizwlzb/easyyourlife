/* Les découvertes du jour. Pour en ajouter : copie une entrée à la fin de la liste (id unique, sans espace).
   Le débat est rattaché à l'id : ne le change pas après publication. */
const LECONS = [
 {
  "id": "pomodoro",
  "cat": "Concentration",
  "emoji": "🍅",
  "titre": "La méthode Pomodoro",
  "accroche": "25 minutes à fond, 5 minutes de pause, et on recommence.",
  "points": [
   "Travaille 25 minutes sans interruption sur une seule tâche, puis fais 5 minutes de pause.",
   "Après quatre cycles, offre-toi une pause plus longue, de 15 à 30 minutes.",
   "Une idée parasite pendant le cycle ? Note-la sur un papier et occupe-t'en à la pause."
  ],
  "essai": "Lance un minuteur de 25 minutes sur la tâche que tu repousses depuis des jours.",
  "duree": "2 min",
  "debat": "Les pauses régulières aident à se concentrer au lieu de casser le rythme."
 },
 {
  "id": "interets-composes",
  "cat": "Argent",
  "emoji": "💶",
  "titre": "Les intérêts composés",
  "accroche": "Quand les intérêts rapportent eux-mêmes des intérêts.",
  "points": [
   "1 000 € placés à 5 % par an, sans rien retirer, deviennent environ 4 320 € au bout de 30 ans, contre 2 500 € avec des intérêts simples.",
   "Règle des 72 : divise 72 par le taux annuel pour estimer en combien d'années ton capital double. À 6 %, environ 12 ans.",
   "Le temps pèse plus que le montant, mais les frais, les impôts et l'inflation grignotent le résultat."
  ],
  "essai": "Teste un simulateur d'intérêts composés avec une somme à toi, puis ajoute 10 ans pour voir l'écart.",
  "duree": "3 min",
  "debat": "Mieux vaut épargner tôt, même de petites sommes, que d'attendre d'en avoir beaucoup.",
  "note": "Exemple pédagogique, pas un conseil financier."
 },
 {
  "id": "phishing",
  "cat": "Numérique",
  "emoji": "🎣",
  "titre": "Repérer un mail ou un SMS d'arnaque",
  "accroche": "Les arnaques jouent presque toujours sur l'urgence et la peur.",
  "points": [
   "Signaux d'alerte : « votre compte sera bloqué », une adresse d'expéditeur bizarre, une pièce jointe inattendue, une demande de mot de passe ou de paiement.",
   "Ne clique pas sur le lien : va sur le site officiel en tapant toi-même l'adresse.",
   "Une vraie banque ou administration ne demande jamais ton mot de passe ni ton code par message. Tu peux transférer un SMS suspect au 33700 et trouver de l'aide sur cybermalveillance.gouv.fr."
  ],
  "essai": "Ouvre ton dossier spam et compte combien de messages jouent sur l'urgence.",
  "duree": "3 min",
  "debat": "Apprendre à repérer les arnaques en ligne devrait être obligatoire à l'école."
 },
 {
  "id": "soupir-cyclique",
  "cat": "Bien-être",
  "emoji": "😮‍💨",
  "titre": "Le soupir cyclique",
  "accroche": "Une respiration toute simple pour redescendre en quelques minutes.",
  "points": [
   "Inspire par le nez, puis fais une deuxième petite inspiration pour remplir à fond, puis expire lentement par la bouche, le plus longtemps possible.",
   "Dans une étude de Stanford publiée en 2023 (une centaine de participants), 5 minutes par jour de cette respiration ont amélioré l'humeur, un peu plus que la méditation de pleine conscience.",
   "Si tu as le vertige, arrête et respire normalement. Ce n'est pas un traitement médical."
  ],
  "essai": "Fais 5 cycles maintenant : double inspiration par le nez, longue expiration par la bouche.",
  "duree": "2 min",
  "debat": "Respirer profondément est aussi efficace que méditer pour se calmer."
 },
 {
  "id": "dlc-ddm",
  "cat": "Cuisine",
  "emoji": "🥫",
  "titre": "DLC ou DDM ?",
  "accroche": "Deux mentions de date, deux sens très différents.",
  "points": [
   "« À consommer jusqu'au » (DLC) concerne la sécurité : viande, poisson, plats frais. Après la date, on ne mange pas.",
   "« À consommer de préférence avant » (DDM) concerne la qualité : pâtes, conserves, biscuits. Après, c'est souvent encore bon, parfois moins croustillant ou savoureux.",
   "Faire la différence évite de jeter de la nourriture encore parfaitement consommable."
  ],
  "essai": "Trie dans ton placard les produits à DDM dépassée : regarde, sens, goûte, puis décide.",
  "duree": "3 min",
  "debat": "On devrait supprimer les dates de durabilité minimale sur les produits secs."
 },
 {
  "id": "biais-confirmation",
  "cat": "Esprit critique",
  "emoji": "🔍",
  "titre": "Le biais de confirmation",
  "accroche": "On retient ce qui confirme ce qu'on pense déjà.",
  "points": [
   "On remarque plus facilement les infos qui vont dans notre sens et on trouve vite de bonnes raisons d'écarter les autres.",
   "Tout le monde est concerné, y compris les gens très intelligents. On ne s'en débarrasse pas, on le contourne.",
   "Astuce : cherche volontairement le meilleur argument contre ton opinion, et demande-toi ce qui pourrait te faire changer d'avis."
  ],
  "essai": "Choisis une de tes opinions et écris le meilleur argument du camp adverse.",
  "duree": "4 min",
  "debat": "On peut vraiment être objectif sur un sujet qui nous tient à cœur."
 },
 {
  "id": "dix-mille-pas",
  "cat": "Santé",
  "emoji": "🚶",
  "titre": "10 000 pas par jour : d'où ça vient ?",
  "accroche": "Un chiffre célèbre, mais pas médical à l'origine.",
  "points": [
   "Le chiffre vient d'une campagne de marketing japonaise des années 1960 pour un podomètre baptisé « manpo-kei », littéralement « compteur de 10 000 pas ».",
   "Des études plus récentes associent des bénéfices pour la santé dès environ 4 000 à 8 000 pas par jour selon l'âge, avec des gains qui s'aplatissent ensuite.",
   "Ce qui compte : bouger régulièrement, surtout si on passe beaucoup de temps assis."
  ],
  "essai": "Prends un appel ou une pause en marchant 10 minutes dehors.",
  "duree": "2 min",
  "debat": "Un objectif chiffré de pas par jour motive plus qu'il ne frustre."
 },
 {
  "id": "feynman",
  "cat": "Apprendre",
  "emoji": "👶",
  "titre": "La technique Feynman",
  "accroche": "Si tu sais l'expliquer simplement, c'est que tu as compris.",
  "points": [
   "Choisis un concept et explique-le avec des mots simples, comme à un enfant de dix ans.",
   "Là où tu bafouilles ou te réfugies dans le jargon, c'est que tu n'as pas encore compris : retourne à la source.",
   "Reformule, simplifie, recommence. La méthode porte le nom du physicien Richard Feynman, réputé pour ses explications limpides."
  ],
  "essai": "Explique à voix haute, en une minute, la dernière chose que tu as apprise.",
  "duree": "3 min",
  "debat": "Si tu ne sais pas expliquer quelque chose simplement, c'est que tu ne l'as pas vraiment compris."
 },
 {
  "id": "multiplier-par-11",
  "cat": "Maths",
  "emoji": "🔢",
  "titre": "Multiplier par 11 de tête",
  "accroche": "Un petit tour de magie qui marche à chaque fois.",
  "points": [
   "Pour un nombre à deux chiffres, écris la somme des deux chiffres entre eux : 36 × 11 → 3 (3+6) 6 = 396.",
   "Si la somme dépasse 9, retiens 1 sur le premier chiffre : 78 × 11 → 7 (7+8=15) 8 donne 858.",
   "Ça marche parce que 11 = 10 + 1 : tu additionnes le nombre décalé d'un cran avec lui-même."
  ],
  "essai": "Calcule 47 × 11 de tête (réponse : 517) puis essaie avec ton âge.",
  "duree": "2 min",
  "debat": "À l'ère des calculatrices, apprendre le calcul mental ne sert plus à rien."
 },
 {
  "id": "sauvegarde-3-2-1",
  "cat": "Numérique",
  "emoji": "💾",
  "titre": "La sauvegarde 3-2-1",
  "accroche": "Un seul exemplaire n'est pas une sauvegarde.",
  "points": [
   "3 copies de tes données importantes, sur 2 supports différents, dont 1 copie hors de chez toi (cloud ou disque chez un proche).",
   "Téléphone perdu, disque en panne, vol, rançongiciel : une seule copie, c'est un pari.",
   "Teste de temps en temps de récupérer un fichier. Une sauvegarde jamais testée n'est qu'une espérance."
  ],
  "essai": "Choisis tes 20 photos ou documents les plus précieux et vérifie qu'ils existent à deux endroits.",
  "duree": "5 min",
  "debat": "Mettre toutes ses photos dans le cloud suffit comme sauvegarde."
 },
 {
  "id": "un-entre-un-sort",
  "cat": "Maison",
  "emoji": "🏠",
  "titre": "Une chose entre, une chose sort",
  "accroche": "La règle qui empêche la maison de déborder.",
  "points": [
   "Quand tu achètes un objet (vêtement, livre, gadget), un objet équivalent quitte la maison : don, vente ou recyclage.",
   "Ton espace de rangement reste constant et l'accumulation s'arrête, sans gros week-end de tri.",
   "Avant d'acheter, pose-toi une question : où est-ce que je vais le ranger ?"
  ],
  "essai": "Trouve 5 objets que tu n'as pas utilisés depuis un an et mets-les dans un sac à donner.",
  "duree": "5 min",
  "debat": "Posséder moins d'objets rend plus heureux."
 },
 {
  "id": "cout-irrecuperable",
  "cat": "Cerveau",
  "emoji": "🪤",
  "titre": "Le piège du coût irrécupérable",
  "accroche": "Ce qui est déjà dépensé ne reviendra pas, quoi que tu décides.",
  "points": [
   "Tu as payé la place, alors tu restes jusqu'à la fin du film, même s'il est nul. Ce temps et cet argent sont perdus dans les deux cas.",
   "Pour décider, ne regarde que ce qui reste à gagner ou à perdre à partir de maintenant.",
   "Question utile : si je commençais aujourd'hui, est-ce que je choisirais ça ?"
  ],
  "essai": "Pense à un abonnement, un projet ou une série que tu continues par pure habitude.",
  "duree": "3 min",
  "debat": "Il faut toujours finir ce qu'on a commencé."
 },
 {
  "id": "cycles-sommeil",
  "cat": "Santé",
  "emoji": "😴",
  "titre": "Les cycles du sommeil",
  "accroche": "Une nuit, ce sont plusieurs cycles qui s'enchaînent.",
  "points": [
   "Une nuit se compose de plusieurs cycles d'environ 90 minutes (entre 70 et 120 selon les personnes) alternant sommeil léger, profond et paradoxal.",
   "Se réveiller en fin de cycle laisse souvent moins la tête dans le brouillard qu'en plein sommeil profond.",
   "Horaires réguliers, chambre fraîche et sombre, écrans coupés avant de dormir : ça aide plus que n'importe quel calcul."
  ],
  "essai": "Ce soir, coupe les écrans 30 minutes avant de te coucher et note comment tu te réveilles.",
  "duree": "3 min",
  "debat": "Dormir huit heures par nuit est indispensable pour tout le monde."
 },
 {
  "id": "droits-consommateur",
  "cat": "Droit",
  "emoji": "⚖️",
  "titre": "Tes droits de consommateur",
  "accroche": "Deux protections qu'on oublie souvent d'utiliser.",
  "points": [
   "Achat en ligne : tu as 14 jours après réception pour te rétracter, sans donner de motif (sauf exceptions comme les produits personnalisés ou périssables).",
   "Garantie légale de conformité : 2 ans sur un produit neuf (12 mois sur de l'occasion) pour un défaut présent dès l'achat, gratuite, sans payer d'extension.",
   "C'est le vendeur qui est responsable, pas le fabricant. Garde tes preuves d'achat et, en cas de litige, passe par un médiateur de la consommation."
  ],
  "essai": "Retrouve la facture de ton dernier gros achat et range-la dans un dossier, papier ou numérique.",
  "duree": "4 min",
  "debat": "Les extensions de garantie payantes ne valent presque jamais le coup.",
  "note": "Informations générales pour la France, pas un conseil juridique."
 },
 {
  "id": "ecoute-active",
  "cat": "Relations",
  "emoji": "👂",
  "titre": "L'écoute active",
  "accroche": "Écouter, ce n'est pas attendre son tour de parler.",
  "points": [
   "Reformule avec tes mots ce que l'autre vient de dire : « Si je comprends bien, tu… ».",
   "Pose des questions ouvertes (« Comment tu l'as vécu ? ») plutôt que fermées (« Ça t'a plu ? »).",
   "Évite de couper la parole, de donner un conseil trop vite ou de ramener la conversation à toi."
  ],
  "essai": "Dans ta prochaine conversation, reformule une fois avant de répondre.",
  "duree": "3 min",
  "debat": "Savoir écouter, ça s'apprend."
 },
 {
  "id": "ranger-frigo",
  "cat": "Cuisine",
  "emoji": "🧊",
  "titre": "Bien ranger son frigo",
  "accroche": "Chaque étage a sa fonction.",
  "points": [
   "La zone la plus froide (en bas, juste au-dessus du bac à légumes) est pour la viande et le poisson crus, bien emballés.",
   "Le frigo doit être à 4 °C maximum. La porte est la zone la moins fraîche : réserve-la aux boissons, sauces et produits bien conservables.",
   "Garde les restes dans des boîtes fermées, note la date et consomme-les en général sous 3 jours."
  ],
  "essai": "Vérifie la température de ton frigo avec un thermomètre : est-elle à 4 °C ou moins ?",
  "duree": "3 min",
  "debat": "On jette beaucoup trop vite des aliments encore bons."
 },
 {
  "id": "eisenhower",
  "cat": "Organisation",
  "emoji": "🗂️",
  "titre": "La matrice d'Eisenhower",
  "accroche": "Urgent ou important : ce n'est pas pareil.",
  "points": [
   "Quatre cases : urgent et important (fais-le), important mais pas urgent (planifie-le), urgent mais pas important (délègue ou réduis), ni l'un ni l'autre (laisse tomber).",
   "Le piège classique : passer ses journées sur l'urgent et ne jamais toucher à l'important non urgent (sport, projets, relations).",
   "La méthode est attribuée au président américain Dwight Eisenhower."
  ],
  "essai": "Range les tâches de ta semaine dans les quatre cases.",
  "duree": "4 min",
  "debat": "L'urgent prend beaucoup trop de place dans nos vies."
 },
 {
  "id": "etiquettes",
  "cat": "Santé",
  "emoji": "🏷️",
  "titre": "Lire une étiquette alimentaire",
  "accroche": "Trois réflexes pour comparer sans se faire avoir.",
  "points": [
   "Les ingrédients sont classés du plus présent au moins présent : du sucre en tête de liste, c'est qu'il y en a beaucoup.",
   "Compare avec les valeurs pour 100 g, pas par portion : les portions varient d'une marque à l'autre.",
   "Le Nutri-Score (A à E) aide à comparer des produits d'une même catégorie, mais il a des limites et ne dit rien du niveau de transformation."
  ],
  "essai": "Compare deux produits du même rayon grâce aux valeurs pour 100 g.",
  "duree": "3 min",
  "debat": "Le Nutri-Score est un bon outil pour choisir ce qu'on mange."
 },
 {
  "id": "loi-de-parkinson",
  "cat": "Organisation",
  "emoji": "📆",
  "titre": "La loi de Parkinson",
  "accroche": "Un travail s'étale jusqu'à remplir tout le temps disponible.",
  "points": [
   "Formulée par l'historien britannique Cyril Northcote Parkinson dans un article de The Economist en 1955.",
   "Si tu te donnes toute la semaine pour un devoir de deux heures, il finira par prendre toute la semaine.",
   "Remède : fixer des échéances courtes et réalistes, même artificielles."
  ],
  "essai": "Donne-toi la moitié du temps habituel pour une tâche d'aujourd'hui.",
  "duree": "2 min",
  "debat": "Les deadlines serrées rendent plus efficace plutôt que plus stressé."
 },
 {
  "id": "lecture-laterale",
  "cat": "Esprit critique",
  "emoji": "🕵️",
  "titre": "Vérifier une info en 3 questions",
  "accroche": "Avant de partager, vérifie.",
  "points": [
   "Qui parle ? Un média identifiable, un expert, ou un compte anonyme ?",
   "D'où ça vient ? Remonte à la source d'origine plutôt que de t'arrêter à une capture d'écran.",
   "Qui d'autre le dit ? Ouvre un nouvel onglet et regarde ce que d'autres sources fiables disent du même sujet : c'est la « lecture latérale »."
  ],
  "essai": "La prochaine info choquante que tu vois : cherche-la ailleurs avant de la partager.",
  "duree": "3 min",
  "debat": "On peut faire confiance aux médias traditionnels plus qu'aux réseaux sociaux."
 },
 {
  "id": "regle-20-20-20",
  "cat": "Santé",
  "emoji": "👀",
  "titre": "La règle 20-20-20",
  "accroche": "Un petit réflexe pour les yeux fatigués.",
  "points": [
   "Toutes les 20 minutes d'écran, regarde quelque chose à environ 6 mètres (20 pieds) pendant 20 secondes.",
   "Ça relâche les yeux qui travaillent en continu de près, et ça rappelle de cligner : on cligne bien moins devant un écran.",
   "Ça soulage la fatigue visuelle mais ne remplace pas un contrôle chez l'ophtalmo si la gêne persiste."
  ],
  "essai": "Règle un rappel toutes les 20 minutes pendant ta prochaine séance d'écran.",
  "duree": "2 min",
  "debat": "On devrait limiter le temps d'écran des adultes autant que celui des enfants."
 },
 {
  "id": "phrase-de-passe",
  "cat": "Numérique",
  "emoji": "🔐",
  "titre": "Une phrase de passe plutôt qu'un mot de passe",
  "accroche": "La longueur compte plus que la complexité.",
  "points": [
   "Quatre ou cinq mots tirés au hasard sont difficiles à deviner mais faciles à retenir.",
   "Un mot de passe différent par site : sinon une seule fuite en ouvre mille portes.",
   "Un gestionnaire de mots de passe fait le travail à ta place. Et active la double authentification partout où c'est possible."
  ],
  "essai": "Active la double authentification sur ta boîte mail principale.",
  "duree": "4 min",
  "debat": "Un gestionnaire de mots de passe est plus sûr que sa propre mémoire."
 },
 {
  "id": "sel-pomme-de-terre",
  "cat": "Cuisine",
  "emoji": "🥔",
  "titre": "Plat trop salé : le mythe de la pomme de terre",
  "accroche": "Une astuce de grand-mère qui ne tient pas vraiment.",
  "points": [
   "On dit qu'une pomme de terre crue « absorbe le sel ». En réalité, elle absorbe du liquide salé comme n'importe quel morceau, donc le plat reste aussi salé.",
   "Ce qui marche : diluer (eau, bouillon non salé, crème) ou ajouter des ingrédients sans sel pour augmenter la quantité.",
   "Une touche d'acidité (citron, vinaigre) peut masquer un peu la sensation de sel, sans l'enlever."
  ],
  "essai": "Goûte pendant la cuisson et sale en plusieurs fois : c'est plus sûr que rattraper après coup.",
  "duree": "2 min",
  "debat": "Les astuces de grand-mère en cuisine sont plutôt fiables."
 },
 {
  "id": "pareto",
  "cat": "Organisation",
  "emoji": "📈",
  "titre": "Le principe de Pareto (80/20)",
  "accroche": "Peu de causes, beaucoup d'effets.",
  "points": [
   "L'économiste Vilfredo Pareto avait remarqué qu'environ 80 % des terres d'Italie appartenaient à 20 % de la population.",
   "Dans beaucoup de situations, une petite part des causes produit l'essentiel des effets : quelques tâches, quelques clients, quelques habitudes comptent plus que les autres.",
   "Ce n'est pas une loi exacte, c'est une façon de se demander : quels 20 % me rapportent le plus ?"
  ],
  "essai": "Dans ta liste de la semaine, entoure les 20 % de tâches qui comptent vraiment.",
  "duree": "3 min",
  "debat": "Se concentrer sur l'essentiel, c'est se priver de choses importantes."
 },
 {
  "id": "langues-mots-courants",
  "cat": "Langues",
  "emoji": "🗣️",
  "titre": "Commencer une langue par les mots les plus courants",
  "accroche": "Quelques centaines de mots font déjà beaucoup.",
  "points": [
   "Dans la plupart des langues, quelques centaines de mots reviennent tout le temps et couvrent une grande partie de ce qu'on lit ou entend au quotidien.",
   "Apprends-les en phrases complètes plutôt qu'isolés : tu retiens aussi la grammaire.",
   "La régularité bat la durée : dix minutes par jour valent mieux qu'une heure le dimanche."
  ],
  "essai": "Cherche la liste des 100 mots les plus fréquents de la langue de ton choix et apprends-en 5.",
  "duree": "5 min",
  "debat": "Une appli ne remplace pas l'immersion pour apprendre une langue."
 },
 {
  "id": "numeros-urgence",
  "cat": "Sécurité",
  "emoji": "🚑",
  "titre": "Les numéros d'urgence",
  "accroche": "À connaître par cœur, avant d'en avoir besoin.",
  "points": [
   "15 : SAMU (urgence médicale). 18 : pompiers. 17 : police secours. 112 : numéro européen valable dans toute l'UE. 114 : numéro d'urgence par SMS pour les personnes sourdes ou malentendantes.",
   "Les trois gestes de base : Protéger (éviter un sur-accident), Alerter (appeler), Secourir.",
   "Au téléphone : donne l'adresse précise, ce qui s'est passé et le nombre de victimes, et ne raccroche que quand on te le dit."
  ],
  "essai": "Vérifie que ton adresse et ta personne à prévenir sont renseignées dans la fiche santé de ton téléphone.",
  "duree": "4 min",
  "debat": "Une formation aux premiers secours devrait être obligatoire pour tous."
 },
 {
  "id": "regle-50-30-20",
  "cat": "Argent",
  "emoji": "🧾",
  "titre": "La règle 50/30/20",
  "accroche": "Un repère simple pour répartir son budget.",
  "points": [
   "50 % de tes revenus nets pour les besoins (loyer, courses, transports), 30 % pour les envies, 20 % pour l'épargne ou le remboursement de dettes.",
   "Popularisée par Elizabeth Warren, aujourd'hui sénatrice américaine, dans un livre de 2005.",
   "C'est un repère, pas une loi : avec un petit revenu ou un loyer élevé, les proportions changent."
  ],
  "essai": "Classe les dépenses du mois dernier dans ces 3 cases et regarde où tu te situes.",
  "duree": "5 min",
  "debat": "La règle 50/30/20 est réaliste pour un étudiant.",
  "note": "Exemple pédagogique, pas un conseil financier."
 },
 {
  "id": "courbe-oubli",
  "cat": "Mémoire",
  "emoji": "🧠",
  "titre": "La courbe de l'oubli",
  "accroche": "On oublie vite, sauf si on révise au bon moment.",
  "points": [
   "Le psychologue Hermann Ebbinghaus a montré dans les années 1880 qu'on oublie une bonne partie d'une information nouvelle en quelques jours si on ne la revoit pas.",
   "La répétition espacée consiste à revoir une info à intervalles croissants : le lendemain, puis 3 jours, une semaine, un mois.",
   "Se tester (se poser des questions) fonctionne mieux que relire passivement."
  ],
  "essai": "Note trois choses apprises aujourd'hui et programme un rappel demain pour te les redemander.",
  "duree": "3 min",
  "debat": "Apprendre par cœur reste utile à l'ère des moteurs de recherche."
 },
 {
  "id": "effet-zeigarnik",
  "cat": "Cerveau",
  "emoji": "🧩",
  "titre": "L'effet Zeigarnik",
  "accroche": "Une tâche commencée mais pas finie reste en tête.",
  "points": [
   "Dans les années 1920, la psychologue Bluma Zeigarnik a observé que les tâches interrompues sont mieux mémorisées que les tâches terminées (les résultats varient selon les études).",
   "Utilise-le : commencer, même 5 minutes, rend la suite moins intimidante.",
   "Avant de t'arrêter, écris la prochaine action à faire : ton cerveau lâche plus facilement prise."
  ],
  "essai": "Commence 5 minutes une tâche que tu repousses, puis note la suite à donner.",
  "duree": "3 min",
  "debat": "Procrastiner, c'est juste de la paresse."
 },
 {
  "id": "regle-2-minutes",
  "cat": "Organisation",
  "emoji": "⏱️",
  "titre": "La règle des 2 minutes",
  "accroche": "Si ça prend moins de deux minutes, fais-le maintenant.",
  "points": [
   "Répondre à un message, ranger une tasse, noter un rendez-vous : ces mini-tâches coûtent plus cher à garder en tête qu'à exécuter.",
   "Au-delà de deux minutes, note la tâche quelque part et planifie-la.",
   "Le piège : enchaîner les petites tâches peut te faire fuir la grosse tâche importante."
  ],
  "essai": "Repère trois mini-tâches qui traînent et règle-les avant ce soir.",
  "duree": "2 min",
  "debat": "Il vaut mieux faire tout de suite les petites tâches plutôt que les regrouper plus tard."
 }
];
