// Réseau d'abord, cache en secours : le jeu marche hors ligne après la première visite.
const CACHE = 'horde-v17';
const FILES = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'fonts/IMFellDWPica-Regular.ttf',
  ...['foret', 'champs', 'brume', 'montagne', 'ruines', 'orage', 'feu', 'nuit', 'chemin', 'cloitre', 'cave', 'royaume', 'village', 'titre', 'mine', 'bd1', 'bd2', 'bd3', 'bd4', 'mine1', 'mine2', 'mine3'].map(n => `bg/${n}.png`),
  ...['gobelin', 'loup', 'archer', 'pyro', 'pillard', 'barque', 'sanglier', 'coupebourse', 'chaman', 'squelette', 'brume', 'crapaud', 'troll',
    'rocher', 'os', 'pont', 'vexa', 'murg', 'grizzlak', 'cheval', 'vache', 'grotte', 'oeuf', 'duel', 'caisse', 'pepites', 'trophee', 'pomme',
    'ferme', 'parchemin', 'chateau', 'des', 'cible', 'coffre', 'roue', 'dragon', 'couronne', 'chapeau', 'diable', 'fete', 'potion', 'hache',
    'boule', 'carte', 'lezard', 'pieces', 'valise', 'luth', 'hibou', 'slime', 'dragonnet', 'renard', 'griffon', 'dragonpet', 'phenix', 'colporteur', 'tourinf', 'creature'].map(n => `img/a_${n}.png`),
  'img/map.jpg',
  ...['roi_aldric', 'la_horde', 'gazette_du_royaume', 'bastien_marchand', 'rosa_la_fermiere', 'pik_espion', 'ysolde_voit_tout', 'sir_gauvin',
    'marchand_louche', 'margot_potions', 'brac_mercenaires', 'krotz_preteur', 'bourbak_les_des', 'grizzlak_roi_gobelin', 'vorthax_l_ancien',
    'skrag_hurleur', 'reine_vexa', 'grand_chaman_murg', 'bouldour'].map(n => `img/p_${n}.png`),
  ...['forge', 'remparts', 'ecuries', 'chapelle', 'marche', 'tresor', 'chateau1', 'chateau2', 'chateau3', 'chateau4', 'maison1', 'maison2',
    'ouvrier', 'drapeau', 'caserne', 'taverne', 'tour', 'banque', 'atelier', 'mine', 'wagon', 'arsenal'].map(n => `img/v_${n}.png`),
  ...['forge', 'remparts', 'ecuries', 'chapelle', 'marche', 'tresor', 'caserne', 'taverne', 'tour', 'banque', 'atelier', 'arsenal'].map(n => `img/v_${n}2.png`),
  ...['milice', 'archers', 'chevaliers', 'catapultes', 'mages'].map(n => `img/u_${n}.png`),
  // v17 : expéditions, PNJ, royaume vivant
  'bg/donjon.png', 'bg/lac.png', ...['cle', 'feu', 'mimique', 'paysan', 'paysanne', 'piege', 'poisson', 'porte', 'relique', 'voleur', 'ysalis'].map(n => `img/a_${n}.png`), 'img/p_ysalis_sorciere.png',
  // v14 : chapitres VI à X, nouveaux bâtiments, icônes pixel
  'bg/marais.png', 'bg/labyrinthe.png', 'bg/terresmortes.png', 'bg/volcan.png', 'bg/neant.png', 'img/a_morgrel.png', 'img/a_kragor.png', 'img/a_malvorn.png', 'img/a_azgal.png', 'img/a_nyxthar.png', 'img/a_moustique.png', 'img/a_croco.png', 'img/a_noye.png', 'img/a_champi.png', 'img/a_scorpion.png', 'img/a_serpent.png', 'img/a_golem.png', 'img/a_chauvesouris.png', 'img/a_spectre.png', 'img/a_vampire.png', 'img/a_cercueil.png', 'img/a_cultiste.png', 'img/a_demon.png', 'img/a_meteore.png', 'img/a_chien.png', 'img/a_forgedemon.png', 'img/a_portail.png', 'img/a_oeil.png', 'img/a_tentacule.png', 'img/a_masque.png', 'img/p_morgrel_sorciere.png', 'img/p_kragor_minotaure.png', 'img/p_malvorn_roi_liche.png', 'img/p_azgal_flammes.png', 'img/p_nyxthar_empereur.png', 'img/p_elwen_elfe.png', 'img/p_orlan_mage.png', 'img/v_fonderie.png', 'img/v_academie.png', 'img/v_menagerie.png', 'img/v_fonderie2.png', 'img/v_academie2.png', 'img/v_menagerie2.png', 'img/i_fast.png', 'img/i_note.png', 'img/i_noteoff.png', 'img/i_padlock.png', 'img/i_auto.png', 'img/i_banner.png', 'img/map2.jpg',
  ...'amulet angel angry apple axe backpack bag bank beard beer bigstar blood boar boat bone book books boom boomerang boot bow bricks bridge build cart castle check chest climb clover coin comet cow crate cross crown cycle dagger deal devil dgreen dice dive dorange dragon dred drum duel dyellow ecu egg eye farmer feather flag flame fleur flycoins fog frog gem gift gloves goblin guard hammer helmet hole horn horse house infinity key lizard lock log lute mail map medal meh mirror music mute ogre orb party phone pickaxe potion prince queen rapier rider ring rock rocket ruin run sad sandal satchel scale scream scroll shell shield shoes shop skull slot sound sparkle star swords talisman target telescope temple tophat torch trident troll trophy turtle volcano wheel wizard wolf'.split(' ').map(n => `img/i_${n}.png`)];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
