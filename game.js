
'use strict';

/* =========================================================
   PENJAGA KEBUN NUSANTARA – logika game
   Isi soal & sejarah ada di questions.js
   ========================================================= */

const SAVE_KEY = 'penjagaKebun_v1';
const DAY_LEN = 75;          // detik per hari (waktu berjalan)
const PLOT_COST = [0, 0, 0, 0, 0, 0, 40, 70, 100];

/* ---------- Teks dua bahasa ---------- */
const DICT = {
  id: {
    gameName: 'Penjaga Kebun Nusantara',
    tag: 'Game bertani sambil belajar',
    lead: 'Rawat kebunmu melewati lima zaman sejarah Indonesia, dari kerajaan Nusantara sampai Proklamasi. Jawab pertanyaan saat menyiram tanaman untuk mendapat bonus, dan kumpulkan Arsip Sejarah!',
    chooseDiff: 'Pilih tingkat kesulitan',
    play: 'Mulai bertani',
    howTitle: 'Cara bermain',
    how1: 'Pilih bibit, lalu klik petak kosong untuk menanam. Klik petak yang sedang tumbuh untuk menyiramnya.',
    how2: 'Usir hama dengan mengklik petak yang terserang. Panen tanaman yang sudah matang, lalu jual di pasar.',
    how3: 'Setiap hari adalah satu zaman sejarah. Jawab soal Sejarah untuk membuka kartu Arsip Sejarah.',
    how4: 'Soal Matematika, Bahasa Indonesia, Bahasa Inggris, Sejarah, dan Pancasila memberi hadiah untuk kebunmu.',
    diffEasy: 'Mudah', diffEasyD: 'Air awet, tanaman tidak mati, soal tanpa batas waktu.',
    diffNormal: 'Normal', diffNormalD: 'Tanaman bisa layu, soal diberi waktu 25 detik.',
    diffHard: 'Sulit', diffHardD: 'Cepat kering, banyak hama, soal 15 detik.',
    best: 'Rekor {d}: {c} koin, {s}',
    weather: 'Cuaca', coins: 'Koin', target: 'Target',
    dayOf: 'Hari {d} dari 5',
    farm: 'Kebun', farmHint: 'Klik petak untuk menanam, menyiram, mengusir hama, atau memanen',
    seeds: 'Bibit', archive: 'Arsip Sejarah', market: 'Lumbung & Pasar', subjectsTitle: 'Nilai mapel',
    askChallenge: 'Minta tantangan sekarang',
    harvested: 'Panen', playAgain: 'Main lagi', menu: 'Menu utama',
    sunny: 'Cerah', rain: 'Hujan', drought: 'Kemarau',
    sunnyD: 'Cuaca biasa.', rainD: 'Hujan menyiram semua petak secara otomatis!', droughtD: 'Tanah 60% lebih cepat kering. Rajin menyiram!',
    lgThirsty: 'perlu disiram perlu disiram', lgPest: 'ulat ada hama', lgReady: 'siap panen siap panen', lgDead: 'layu layu (klik untuk bersihkan)', lgAuto: 'penyiram otomatis penyiram otomatis',
    locked: 'Beli {c} koin', empty: 'Tanam', growing: 'Tumbuh', thirsty: 'Haus!', pest: 'Hama!', ready: 'Panen!', dead: 'Layu',
    seedInfo: '{c} koin · {t} dtk', lockedEra: 'Zaman {e}',
    sell1: 'Jual 1', sellAll: 'Jual semua', stock: 'Stok {n}', price: '{p} koin',
    barnEmpty: 'Lumbung masih kosong. Panen dulu!',
    startDay: 'Mulai hari {d}', eraEffect: 'Pengaruh zaman ini',
    noCoins: 'Koin tidak cukup!', planted: '{n} ditanam.', bought: 'Petak baru dibuka!',
    harvestedT: 'Panen {n}!', taken: 'Aturan Tanam Paksa: panen {n} ini diserahkan kepada pemerintah kolonial.',
    sold: 'Terjual! +{c} koin', pestGone: 'Ulat diusir!', cleared: 'Petak dibersihkan.', watered: 'Disiram!',
    challenge: 'Tantangan {s}', timeLeft: 'Sisa waktu', next: 'Lanjut', correct: 'Benar!', wrong: 'Kurang tepat.', timeout: 'Waktu habis!',
    rwSejarah: 'Hadiah: +15 koin dan kartu Arsip Sejarah "{t}" terbuka!',
    rwSejarahFull: 'Hadiah: +25 koin (semua arsip zaman ini sudah terbuka).',
    rwMtk: 'Hadiah: +25 koin dari hitungan yang tepat.',
    rwBindo: 'Hadiah: pupuk! Semua tanaman tumbuh lebih cepat.',
    rwBing: 'Hadiah: pembeli asing memborong isi lumbungmu dengan harga 1,5×! (+{c} koin)',
    rwBingEmpty: 'Hadiah: pembeli asing memberi tip 20 koin (lumbungmu kosong).',
    rwPancasila: 'Hadiah: warga bergotong royong menyiram semua petak dan mengusir semua hama!',
    rwKik: 'Hadiah: promosimu berhasil! Harga jual naik 20% sampai akhir hari.',
    rwRpl: 'Hadiah: penyiram otomatis terpasang di satu petak!',
    rwRplFull: 'Hadiah: +20 koin (semua petak sudah punya penyiram otomatis).',
    penalty: 'Jawaban salah: -{c} koin.',
    noReward: 'Tidak ada hadiah kali ini, tapi baca pembahasannya ya.',
    cooldown: 'Tunggu sebentar sebelum meminta tantangan lagi.',
    winTitle: 'Kebun berhasil!', loseTitle: 'Target belum tercapai',
    msg3: 'Luar biasa! Kebunmu makmur dan arsip sejarahmu lengkap.',
    msg2: 'Hebat! Kumpulkan minimal 7 Arsip Sejarah untuk bintang ketiga.',
    msg1: 'Target tercapai! Coba kumpulkan lebih banyak koin.',
    msg0: 'Koinmu belum mencapai target. Coba tanam tanaman yang lebih mahal dan rajin menyiram.',
    soundOn: 'Suara: nyala', soundOff: 'Suara: mati',
    archLocked: 'Belum terbuka. Jawab soal Sejarah dengan benar!'
  },
  en: {
    gameName: 'Nusantara Garden Keeper',
    tag: 'Learn while you farm',
    lead: "Tend your garden through five eras of Indonesian history, from the archipelago's kingdoms to the Proclamation. Answer questions after watering plants to earn bonuses, and collect History Archive cards!",
    chooseDiff: 'Choose difficulty',
    play: 'Start farming',
    howTitle: 'How to play',
    how1: 'Pick a seed, then click an empty plot to plant. Click a growing plot to water it.',
    how2: 'Click plots affected by pests to remove them. Harvest ripe crops and sell them at the market.',
    how3: 'Each day is a historical era. Answer History questions to unlock History Archive cards.',
    how4: 'Maths, Indonesian, English, History, and Pancasila questions give rewards that help your garden.',
    diffEasy: 'Easy', diffEasyD: 'Water lasts long, crops never die, no question timer.',
    diffNormal: 'Normal', diffNormalD: 'Crops can wilt, 25 seconds per question.',
    diffHard: 'Hard', diffHardD: 'Dries fast, more pests, 15 seconds per question.',
    best: 'Best on {d}: {c} coins, {s}',
    weather: 'Weather', coins: 'Coins', target: 'Target',
    dayOf: 'Day {d} of 5',
    farm: 'Garden', farmHint: 'Click a plot to plant, water, remove pests, or harvest',
    seeds: 'Seeds', archive: 'History Archive', market: 'Barn & Market', subjectsTitle: 'Subject scores',
    askChallenge: 'Ask for a challenge now',
    harvested: 'Harvested', playAgain: 'Play again', menu: 'Main menu',
    sunny: 'Sunny', rain: 'Rain', drought: 'Dry season',
    sunnyD: 'Normal weather.', rainD: 'Rain waters every plot automatically!', droughtD: 'Soil dries 60% faster. Keep watering!',
    lgThirsty: 'perlu disiram needs water', lgPest: 'ulat pest', lgReady: 'siap panen ready to harvest', lgDead: 'layu wilted (click to clear)', lgAuto: 'penyiram otomatis auto-sprinkler',
    locked: 'Buy {c} coins', empty: 'Plant', growing: 'Growing', thirsty: 'Thirsty!', pest: 'Pest!', ready: 'Harvest!', dead: 'Wilted',
    seedInfo: '{c} coins · {t} s', lockedEra: 'Era {e}',
    sell1: 'Sell 1', sellAll: 'Sell all', stock: 'Stock {n}', price: '{p} coins',
    barnEmpty: 'Your barn is empty. Harvest first!',
    startDay: 'Start day {d}', eraEffect: 'Effect of this era',
    noCoins: 'Not enough coins!', planted: '{n} planted.', bought: 'New plot unlocked!',
    harvestedT: 'Harvested {n}!', taken: 'Forced Cultivation rule: this {n} harvest goes to the colonial government.',
    sold: 'Sold! +{c} coins', pestGone: 'Pest removed!', cleared: 'Plot cleared.', watered: 'Watered!',
    challenge: '{s} challenge', timeLeft: 'Time left', next: 'Continue', correct: 'Correct!', wrong: 'Not quite.', timeout: "Time's up!",
    rwSejarah: 'Reward: +15 coins and the History Archive card "{t}" is unlocked!',
    rwSejarahFull: 'Reward: +25 coins (all archive cards for this era are unlocked).',
    rwMtk: 'Reward: +25 coins for good maths.',
    rwBindo: 'Reward: fertiliser! All crops grow faster.',
    rwBing: 'Reward: a foreign buyer buys your whole barn at 1.5× price! (+{c} coins)',
    rwBingEmpty: 'Reward: a foreign buyer tips you 20 coins (your barn is empty).',
    rwPancasila: 'Reward: neighbours work together (gotong royong) to water every plot and remove all pests!',
    rwKik: 'Reward: your promotion worked! Prices are 20% higher until the end of the day.',
    rwRpl: 'Reward: an auto-sprinkler is installed on one plot!',
    rwRplFull: 'Reward: +20 coins (every plot already has an auto-sprinkler).',
    penalty: 'Wrong answer: -{c} coins.',
    noReward: 'No reward this time, but read the explanation.',
    cooldown: 'Wait a moment before asking for another challenge.',
    winTitle: 'Garden success!', loseTitle: 'Target not reached',
    msg3: 'Amazing! Your garden thrived and your history archive is complete.',
    msg2: 'Great! Collect at least 7 History Archive cards for the third star.',
    msg1: 'Target reached! Try to earn more coins.',
    msg0: 'Your coins did not reach the target. Try pricier crops and water more often.',
    soundOn: 'Sound: on', soundOff: 'Sound: off',
    archLocked: 'Locked. Answer a History question correctly!'
  }
};

/* ---------- Tanaman ---------- */
const CROPS = {
  padi:   { id: 'Padi', en: 'Rice', seed: 5, grow: 12, sell: 12, era: 1 },
  pisang: { id: 'Pisang', en: 'Banana', seed: 9, grow: 18, sell: 22, era: 1 },
  jagung: { id: 'Jagung', en: 'Corn', seed: 8, grow: 15, sell: 19, era: 2 },
  cabai:  { id: 'Cabai', en: 'Chili', seed: 12, grow: 20, sell: 30, era: 2 },
  kopi:   { id: 'Kopi', en: 'Coffee', seed: 18, grow: 26, sell: 46, era: 3 },
  tebu:   { id: 'Tebu', en: 'Sugarcane', seed: 22, grow: 30, sell: 56, era: 3 }
};

/* ---------- Tingkat kesulitan ---------- */
const DIFFS = {
  // growMul: tanaman tumbuh lebih lambat, priceMul: harga pasar lebih rendah
  easy:   { key: 'diffEasy',   water: 30, dryDeath: 0,  pest: 0.004, qTime: 0,  penalty: 0,  growMul: 1.0,  priceMul: 1.0,  target: 1000, start: 60, weather: [0.5, 0.35, 0.15] },
  normal: { key: 'diffNormal', water: 20, dryDeath: 32, pest: 0.008, qTime: 25, penalty: 0,  growMul: 1.15, priceMul: 0.9,  target: 1400, start: 50, weather: [0.5, 0.25, 0.25] },
  hard:   { key: 'diffHard',   water: 14, dryDeath: 20, pest: 0.013, qTime: 15, penalty: 15, growMul: 1.2,  priceMul: 0.85, target: 1500, start: 40, weather: [0.45, 0.15, 0.4] }
};
const WEATHER = { sunny: 'Cerah', rain: 'Hujan', drought: 'Kemarau' };

/* ---------- Simpanan ---------- */
let SAVE = (function () {
  const fresh = { lang: 'id', diff: 'normal', sound: true, best: {} };
  try { return Object.assign(fresh, JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')); } catch (e) { return fresh; }
})();
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(SAVE)); } catch (e) { /* abaikan */ } }

/* ---------- Bantuan ---------- */
const $ = (id) => document.getElementById(id);
const L = () => SAVE.lang;
function t(key, vars) {
  let s = (DICT[L()] && DICT[L()][key]) || DICT.id[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
const cName = (c) => CROPS[c][L()];
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const subjBadge = (s) => '<span class="subj-badge" style="background:' + SUBJECTS[s].color + '">' + SUBJECTS[s][L()] + '</span>';

/* ---------- Suara ---------- */
let actx = null;
function tone(f, d = .12, type = 'triangle', v = .07, delay = 0) {
  if (!SAVE.sound) return;
  try {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    const t0 = actx.currentTime + delay;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t0);
    g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
    o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + d + .02);
  } catch (e) { /* tanpa suara */ }
}
const SFX = {
  plant: () => { tone(500, .08); tone(650, .08, 'triangle', .06, .06); },
  water: () => { tone(900, .05, 'sine', .05); tone(700, .08, 'sine', .05, .05); },
  harvest: () => { tone(660, .08); tone(880, .1, 'triangle', .07, .07); tone(1180, .12, 'triangle', .06, .14); },
  coin: () => { tone(1300, .05, 'square', .04); tone(1700, .08, 'square', .04, .05); },
  pest: () => tone(220, .1, 'square', .05),
  right: () => [523, 659, 784].forEach((f, i) => tone(f, .14, 'square', .05, i * .1)),
  wrong: () => { tone(300, .2, 'sawtooth', .05); tone(220, .3, 'sawtooth', .05, .2); },
  day: () => [392, 523, 659, 784].forEach((f, i) => tone(f, .18, 'triangle', .06, i * .12)),
  bad: () => tone(160, .25, 'sawtooth', .05)
};

/* ---------- Keadaan permainan ---------- */
let G = null;
let loop = null;
let qTimer = null;

function newGame() {
  const d = DIFFS[SAVE.diff];
  G = {
    diff: SAVE.diff, day: 1, dayT: 0, qT: 0, coins: d.start,
    plots: Array.from({ length: 9 }, (_, i) => ({ open: i < 6, crop: null, prog: 0, water: 0, dry: 0, pest: false, dead: false, auto: false })),
    sel: 'padi', barn: {}, prices: {}, trend: {}, weather: 'sunny', boost: 1,
    archive: [], harvested: 0, eraHarvest: 0,
    stats: Object.fromEntries(Object.keys(SUBJECTS).map((s) => [s, { a: 0, c: 0 }])),
    asked: new Set(), bag: [], waterBatchPlots: [], paused: true, over: false, pendingQuestion: false, pendingAction: null
  };
}

/* ---------- Zaman, cuaca, harga ---------- */
function rollDay() {
  const w = DIFFS[G.diff].weather, r = Math.random();
  G.weather = r < w[0] ? 'sunny' : r < w[0] + w[1] ? 'rain' : 'drought';
  if (G.day === 1) G.weather = 'sunny';
  Object.keys(CROPS).forEach((c) => {
    const old = G.prices[c] || 1;
    const m = 0.75 + Math.random() * 0.6;
    G.trend[c] = m > old + 0.02 ? 'up' : m < old - 0.02 ? 'down' : '';
    G.prices[c] = m;
  });
  G.boost = 1;
}
function priceOf(c) {
  const eraBoost = G.day === 5 ? 1.3 : 1;
  return Math.max(1, Math.round(CROPS[c].sell * G.prices[c] * G.boost * eraBoost * DIFFS[G.diff].priceMul));
}
function growTime(c) { return Math.round(CROPS[c].grow * DIFFS[G.diff].growMul); }
function waterDur() { return DIFFS[G.diff].water * (G.day >= 4 ? 1.3 : 1); }
function cropOpen(c) { return CROPS[c].era <= G.day; }

/* ---------- Layar ---------- */
function show(id) {
  ['scr-title', 'scr-game', 'scr-result'].forEach((s) => { $(s).hidden = s !== id; });
  window.scrollTo(0, 0);
}

function applyLang() {
  document.documentElement.lang = L();
  document.title = t('gameName');
  document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === L()));
  $('btn-sound').textContent = SAVE.sound ? t('soundOn') : t('soundOff');
  renderTitle();
  if (G && !$('scr-game').hidden) renderAll();
  if (G && G.over) renderResult();
}

function renderTitle() {
  $('diffs').innerHTML = Object.keys(DIFFS).map((k) =>
    '<button type="button" class="diff" role="radio" data-diff="' + k + '" aria-checked="' + (SAVE.diff === k) + '"><b>' + t(DIFFS[k].key) + '</b><span>' + t(DIFFS[k].key + 'D') + '</span></button>').join('');
  const b = SAVE.best[SAVE.diff];
  $('best').textContent = b ? t('best', { d: t(DIFFS[SAVE.diff].key), c: b.coins, s: '★'.repeat(b.stars) + '☆'.repeat(3 - b.stars) }) : '';
}

/* ---------- Tampilan kebun ---------- */
function plotState(p) {
  if (!p.open) return 'locked';
  if (!p.crop) return 'empty';
  if (p.dead) return 'dead';
  if (p.prog >= growTime(p.crop)) return 'ready';
  if (p.pest) return 'pest';
  if (p.water <= 0) return 'thirsty';
  return 'grow';
}

function buildFarm() {
  $('farm').innerHTML = G.plots.map((_, i) => '<button type="button" class="plot" data-plot="' + i + '"></button>').join('');
}

function renderPlots() {
  const wd = waterDur();
  G.plots.forEach((p, i) => {
    const el = $('farm').children[i];
    const st = plotState(p);
    el.dataset.state = st;
    el.className = 'plot ' + st + (p.water > 0 && st !== 'locked' ? ' wet' : '');
    let lbl, flag = '', bars = '';
    if (st === 'locked') lbl = t('locked', { c: PLOT_COST[i] });
    else if (st === 'empty') lbl = t('empty') + ' ' + CROPS[G.sel][L()];
    else if (st === 'dead') lbl = t('dead');
    else {
      const c = CROPS[p.crop];
      const ratio = p.prog / growTime(p.crop);
      lbl = st === 'ready' ? t('ready') : st === 'pest' ? t('pest') : st === 'thirsty' ? t('thirsty') : cName(p.crop);
      if (st === 'ready') flag = 'ready';
      if (st === 'pest') flag = 'pest';
      if (st === 'thirsty') flag = 'water';
      if (st !== 'ready') bars = '<span class="p-bars"><span class="bar grow"><i style="width:' + Math.min(100, ratio * 100) + '%"></i></span><span class="bar water"><i style="width:' + Math.max(0, Math.min(100, p.water / wd * 100)) + '%"></i></span></span>';
    }
    el.setAttribute('aria-label', lbl + (p.crop && st !== 'dead' ? ' (' + cName(p.crop) + ')' : ''));
    const cropScale = p.crop ? (0.82 + Math.min(1, p.prog / growTime(p.crop)) * 0.42) : 1;
    const cropArt = p.crop && st !== 'dead' ? '<img class="crop-art" style="transform:scale(' + cropScale.toFixed(2) + ')" src="assets/crops/' + p.crop + '.png" alt="" aria-hidden="true">' : '';
    const baseArt = st === 'locked' ? 'lock' : st === 'dead' ? 'wilt' : 'soil';
    el.innerHTML = (p.auto ? '<img class="p-auto-img" src="assets/ui/sprinkler.svg" alt="Penyiram otomatis">' : '') +
      (flag ? '<img class="p-flag-img" src="assets/ui/' + flag + '.svg" alt="">' : '') +
      (cropArt || '<img class="p-emo-img" src="assets/ui/' + baseArt + '.svg" alt="">') +
      '<span class="p-lbl">' + lbl + '</span>' + bars;
  });
}

function renderHud() {
  const era = ERAS[G.day - 1];
  $('hud-daylbl').textContent = t('dayOf', { d: G.day }) + ' · ' + t(DIFFS[G.diff].key);
  $('hud-era').innerHTML = '<img class="hud-era-img" src="assets/archive/' + [1,3,5,7,9][G.day-1] + '.png" alt="">' + era.name[L()];
  $('daybar').style.width = Math.min(100, G.dayT / DAY_LEN * 100) + '%';
  $('hud-weather').innerHTML = '<img class="hud-icon" src="assets/ui/weather-' + G.weather + '.svg" alt="">' + t(G.weather);
  $('hud-coins').innerHTML = '<img class="hud-icon" src="assets/ui/coin.svg" alt="">' + G.coins;
  $('hud-target').innerHTML = '<img class="hud-icon" src="assets/ui/target.svg" alt="">' + DIFFS[G.diff].target;
}

function renderSeeds() {
  $('seeds').innerHTML = Object.keys(CROPS).map((c) => {
    const cr = CROPS[c], open = cropOpen(c);
    return '<button type="button" class="seed" data-seed="' + c + '" aria-pressed="' + (G.sel === c) + '"' + (open ? '' : ' disabled') + '>' +
      (open ? '<img class="s-art" src="assets/crops/' + c + '.png" alt="">' : '<img class="s-art locked-art" src="assets/ui/lock.svg" alt="Terkunci">') + '<b>' + cr[L()] + '</b>' +
      '<small>' + (open ? t('seedInfo', { c: cr.seed, t: growTime(c) }) : t('lockedEra', { e: cr.era })) + '</small></button>';
  }).join('');
}

function renderMarket() {
  const have = Object.keys(G.barn).filter((c) => G.barn[c] > 0);
  const rows = Object.keys(CROPS).filter((c) => cropOpen(c)).map((c) => {
    const n = G.barn[c] || 0;
    const tr = G.trend[c] === 'up' ? '<span class="up">▲</span>' : G.trend[c] === 'down' ? '<span class="down">▼</span>' : '';
    return '<div class="m-row"><img class="m-art" src="assets/crops/' + c + '.png" alt="">' +
      '<div><div class="m-name">' + cName(c) + '</div><div class="m-info">' + t('stock', { n }) + ' · ' + t('price', { p: priceOf(c) }) + ' ' + tr + '</div></div>' +
      '<button type="button" class="btn btn-xs" data-sell="' + c + '" data-n="1"' + (n ? '' : ' disabled') + '>' + t('sell1') + '</button>' +
      '<button type="button" class="btn btn-xs" data-sell="' + c + '" data-n="all"' + (n ? '' : ' disabled') + '>' + t('sellAll') + '</button></div>';
  }).join('');
  $('market').innerHTML = (have.length ? '' : '<p class="m-empty">' + t('barnEmpty') + '</p>') + rows;
}

function renderArchive() {
  $('archive').innerHTML = ARCHIVE.map((a, i) => {
    const open = G.archive.includes(i);
    return '<button type="button" class="arch' + (open ? '' : ' locked') + '" data-arch="' + i + '" aria-label="' + (open ? esc(a[L()].t) : t('archLocked')) + '" title="' + (open ? esc(a[L()].t) : t('lockedEra', { e: a.era })) + '">' + (open ? '<img class="arch-art" src="assets/archive/' + (i + 1) + '.png" alt="' + esc(a[L()].t) + '">' : a.era) + '</button>';
  }).join('');
  $('arch-count').textContent = G.archive.length + '/' + ARCHIVE.length;
}

function renderSubj(target) {
  $(target).innerHTML = Object.keys(SUBJECTS).map((s) =>
    '<div style="border-left:5px solid ' + SUBJECTS[s].color + '"><span>' + SUBJECTS[s][L()] + '</span><span>' + G.stats[s].c + '/' + G.stats[s].a + '</span></div>').join('');
}

function renderLegend() {
  $('legend').innerHTML = ['lgThirsty', 'lgPest', 'lgReady', 'lgDead', 'lgAuto'].map((k) => '<span>' + t(k) + '</span>').join('');
}

function renderAll() {
  renderHud(); renderPlots(); renderSeeds(); renderMarket(); renderArchive(); renderSubj('subj-score'); renderLegend();
}

let toastTimer = null;
function toast(msg) {
  $('toast').textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').textContent = ''; }, 3000);
}

/* ---------- Waktu berjalan ---------- */
function tick() {
  if (!G || G.paused || G.over || document.hidden || G.pendingQuestion) return;
  const dt = 0.5;
  const diff = DIFFS[G.diff];
  const wd = waterDur();
  const drain = G.weather === 'drought' ? 1.6 : 1;
  G.dayT += dt;
  G.qT += dt;
  G.plots.forEach((p) => {
    if (!p.open || !p.crop || p.dead) return;
    if (p.prog >= growTime(p.crop)) return;
    if (G.weather === 'rain' || p.auto) p.water = wd;
    if (p.water > 0) {
      p.water -= dt * drain;
      p.dry = 0;
      if (!p.pest) p.prog += dt * (p.growthBuff || 1);
    } else {
      p.dry += dt;
      if (diff.dryDeath && p.dry >= diff.dryDeath) { p.dead = true; p.pest = false; }
    }
    if (!p.pest && !p.dead && Math.random() < diff.pest * dt) p.pest = true;
  });
  renderHud();
  renderPlots();
  if (G.dayT >= DAY_LEN) { endDay(); return; }
}

/* ---------- Aksi petak ---------- */
function harvestPlot(i) {
  const p = G.plots[i];
  if (!p || plotState(p) !== 'ready') return;
  const crop = p.crop;
  const bonus = p.harvestBonus || 1;
  Object.assign(p, { crop: null, prog: 0, water: 0, dry: 0, pest: false, dead: false, harvestBonus: 1, growthBuff: 1 });
  G.harvested++;
  // Zaman 3: aturan Tanam Paksa, setiap panen kelima diserahkan
  if (G.day === 3) {
    G.eraHarvest++;
    if (G.eraHarvest % 5 === 0) {
      toast(t('taken', { n: cName(crop) }));
      SFX.bad();
      renderAll();
      return;
    }
  }
  G.barn[crop] = (G.barn[crop] || 0) + 1;
  if (bonus > 1) G.coins += Math.round(CROPS[crop].sell * (bonus - 1));
  SFX.harvest();
  toast(t('harvestedT', { n: cName(crop) }));
  renderMarket();
}

function clickPlot(i) {
  if (!G || G.paused || G.over) return;
  const p = G.plots[i];
  const st = plotState(p);
  if (st === 'locked') {
    if (G.coins < PLOT_COST[i]) { toast(t('noCoins')); SFX.bad(); return; }
    G.coins -= PLOT_COST[i]; p.open = true; SFX.coin(); toast(t('bought'));
  } else if (st === 'empty') {
    const c = CROPS[G.sel];
    if (G.coins < c.seed) { toast(t('noCoins')); SFX.bad(); return; }
    G.coins -= c.seed;
    Object.assign(p, { crop: G.sel, prog: 0, water: waterDur() * 0.5, dry: 0, pest: false, dead: false, growthBuff: 1, harvestBonus: 1 });
    SFX.plant(); toast(t('planted', { n: cName(G.sel) }));
  } else if (st === 'dead') {
    Object.assign(p, { crop: null, prog: 0, water: 0, dry: 0, pest: false, dead: false });
    toast(t('cleared'));
  } else if (st === 'pest') {
    p.pest = false; SFX.pest(); toast(t('pestGone'));
  } else if (st === 'ready') {
    // Panen langsung tanpa pertanyaan.
    harvestPlot(i);
    renderAll();
    return;
  } else if (st === 'thirsty' || st === 'grow') {
    // Siram langsung. Soal muncul setelah 3 petak berbeda disiram.
    p.water = waterDur();
    p.dry = 0;
    SFX.water();
    if (!G.waterBatchPlots.includes(i)) {
      G.waterBatchPlots.push(i);
      const remaining = 3 - G.waterBatchPlots.length;
      if (remaining > 0) {
        toast(L() === 'id'
          ? 'Disiram! Tinggal ' + remaining + ' petak lagi, lalu pertanyaan muncul.'
          : 'Watered! ' + remaining + ' more plot' + (remaining === 1 ? '' : 's') + ' until the question appears.');
      } else {
        const batch = G.waterBatchPlots.slice();
        G.waterBatchPlots = [];
        toast(L() === 'id' ? '3 petak sudah disiram! Saatnya menjawab pertanyaan.' : '3 plots watered! Time for a question.');
        renderHud(); renderPlots();
        challenge(null, { type: 'waterBatch', plots: batch });
        return;
      }
    } else {
      toast(L() === 'id'
        ? 'Petak ini sudah dihitung. Siram ' + (3 - G.waterBatchPlots.length) + ' petak berbeda lagi.'
        : 'This plot is already counted. Water ' + (3 - G.waterBatchPlots.length) + ' more different plots.');
    }
  }
  renderHud(); renderPlots();
}
function sell(c, n) {
  if (!G || G.paused || G.over) return;
  const have = G.barn[c] || 0;
  const qty = n === 'all' ? have : Math.min(1, have);
  if (!qty) return;
  const earn = qty * priceOf(c);
  G.barn[c] = have - qty;
  G.coins += earn;
  SFX.coin(); toast(t('sold', { c: earn }));
  renderHud(); renderMarket();
}

/* ---------- Hari ---------- */
function startDay() {
  rollDay();
  if (!cropOpen(G.sel)) G.sel = 'padi';
  G.dayT = 0; G.qT = 0;
  renderAll();
  const era = ERAS[G.day - 1];
  SFX.day();
  modal(
    '<img class="era-modal-art" src="assets/archive/' + [1,3,5,7,9][G.day-1] + '.png" alt="">' +
    '<p class="pill">' + t('dayOf', { d: G.day }) + '</p>' +
    '<div class="era-card"><p class="years">' + era.years[L()] + '</p><h2 id="modal-h">' + era.name[L()] + '</h2><p>' + era.story[L()] + '</p></div>' +
    '<p><b>' + t('eraEffect') + ':</b> ' + era.effect[L()] + '</p>' +
    '<p><b>' + t('weather') + ':</b> ' + t(G.weather) + '. ' + t(G.weather + 'D') + '</p>' +
    '<div class="modal-actions"><button type="button" class="btn btn-main" id="m-go">' + t('startDay', { d: G.day }) + '</button></div>',
    () => $('m-go').addEventListener('click', () => {
      closeModal();
      G.paused = false;
      renderAll();
    })
  );
}

function endDay() {
  if (G.day >= 5) { finish(); return; }
  G.day++;
  G.paused = true;
  startDay();
}

/* ---------- Tantangan mapel ---------- */
/* "Kantong" mapel: setiap 10 soal berisi 4 Sejarah + 1 dari tiap mapel lain,
   diacak. Sejarah tetap 40%, dan semua mapel pasti muncul. */
function pickSubject() {
  if (!G.bag.length) {
    Object.keys(SUBJECT_WEIGHT).forEach((s) => { for (let i = 0; i < SUBJECT_WEIGHT[s] / 10; i++) G.bag.push(s); });
    shuffle(G.bag);
  }
  return G.bag.pop();
}

function pickQuestion(subj) {
  let pool = QUESTIONS.map((q, i) => i).filter((i) => QUESTIONS[i].s === subj && !G.asked.has(i));
  if (subj === 'sejarah') {
    const eraPool = pool.filter((i) => QUESTIONS[i].era === G.day);
    if (eraPool.length) pool = eraPool;
  }
  if (!pool.length) {
    QUESTIONS.forEach((q, i) => { if (q.s === subj) G.asked.delete(i); });
    pool = QUESTIONS.map((q, i) => i).filter((i) => QUESTIONS[i].s === subj && (subj !== 'sejarah' || QUESTIONS[i].era <= G.day));
  }
  const i = pool[Math.floor(Math.random() * pool.length)];
  G.asked.add(i);
  return i;
}

function challenge(forced, gameplayAction = null) {
  if (!G || G.over || G.pendingQuestion) return;
  G.paused = true;
  G.pendingQuestion = true;
  G.pendingAction = gameplayAction;
  const subj = forced || pickSubject();
  const qi = pickQuestion(subj);
  const q = QUESTIONS[qi];
  const tx = q[L()];
  const isEssay = q.type === 'essay';
  const order = isEssay ? [] : shuffle((tx.o || []).map((_, i) => i));
  const qTime = gameplayAction ? 0 : DIFFS[G.diff].qTime;
  let answered = false;

  const actionLabel = gameplayAction
    ? (gameplayAction.type === 'waterBatch'
      ? (L() === 'id' ? 'Tantangan setelah menyiram 3 petak' : 'Challenge after watering 3 plots')
      : (L() === 'id' ? 'Tantangan penyiraman' : 'Watering challenge'))
    : t('challenge', { s: SUBJECTS[subj][L()] });

  const questionMarkup = isEssay
    ? '<label class="essay-label" for="q-essay">' + (L() === 'id' ? 'Tulis jawabanmu:' : 'Write your answer:') + '</label>' +
      '<textarea id="q-essay" class="q-essay" rows="3" placeholder="' + (L() === 'id' ? 'Ketik jawaban di sini...' : 'Type your answer here...') + '"></textarea>' +
      '<div class="modal-actions"><button type="button" class="btn btn-main" id="q-submit">' + (L() === 'id' ? 'Kirim jawaban' : 'Submit answer') + '</button></div>'
    : '<div class="q-opts" id="q-opts">' + order.map((oi, pos) => '<button type="button" class="btn" data-o="' + oi + '"><b>' + String.fromCharCode(65 + pos) + '.</b> ' + esc(tx.o[oi]) + '</button>').join('') + '</div>';

  modal(
    '<div class="question-top"><div>' + subjBadge(subj) + '</div><button type="button" class="btn btn-xs q-minimize" id="q-minimize">' + (L() === 'id' ? 'Minimalkan −' : 'Minimize −') + '</button></div>' +
    '<h2 id="modal-h">' + esc(actionLabel) + '</h2>' +
    '<p class="q-meta">' + (L() === 'id' ? 'Kelas ' : 'Grade ') + q.grade + (L() === 'id' ? ' SD · ' : ' · ') + esc(q.topic || '') + '</p>' +
    '<p class="q-text">' + esc(tx.q) + '</p>' +
    (q.code ? '<pre class="q-code">' + esc(q.code) + '</pre>' : '') +
    (qTime ? '<div class="q-timer" aria-hidden="true"><div id="q-bar" style="width:100%"></div></div>' : '') +
    questionMarkup + '<div id="q-after"></div>',
    (root) => {
      const finishQ = (picked, essayText = '') => {
        if (answered) return;
        let right = false;
        if (isEssay) {
          const submitted = normalizeAnswer(essayText);
          const accepted = (L() === 'en' ? (q.accept_en || [q.answer_en || q.answer || '']) : (q.accept || [q.answer || ''])).map(normalizeAnswer).filter(Boolean);
          right = accepted.some((answer) => submitted === answer || (answer.length > 3 && submitted.includes(answer)));
        } else {
          right = picked === q.a;
        }
        answered = true;
        clearInterval(qTimer);
        G.stats[subj].a++;
        if (right) G.stats[subj].c++;
        root.querySelectorAll('#q-opts .btn').forEach((b) => {
          b.disabled = true;
          const oi = Number(b.dataset.o);
          if (oi === q.a) b.classList.add('right');
          else if (oi === picked) b.classList.add('wrong');
        });
        const rewardText = right ? giveReward(subj) : (L() === 'id' ? 'Tidak ada pengurangan koin. Tanaman tetap seperti semula.' : 'No coins deducted. The crop stays as it was.');
        if (right) {
          SFX.right();
          if (gameplayAction) {
            if (gameplayAction.type === 'waterBatch') {
              gameplayAction.plots.forEach((plotIndex) => {
                const wateredPlot = G.plots[plotIndex];
                if (wateredPlot && wateredPlot.crop && !wateredPlot.dead) {
                  wateredPlot.growthBuff = Math.max(wateredPlot.growthBuff || 1, 1.8);
                  wateredPlot.prog = Math.min(growTime(wateredPlot.crop), wateredPlot.prog + 3);
                  wateredPlot.harvestBonus = 1.25;
                }
              });
            }
          }
        } else {
          SFX.wrong();
        }
        const explanation = tx.e || '';
        root.querySelector('#q-after').innerHTML =
          '<p class="q-exp"><b>' + (right ? t('correct') : picked === -1 ? t('timeout') : t('wrong')) + '</b> ' + esc(explanation) + '</p>' +
          '<p><b>' + rewardText + '</b></p>' +
          (gameplayAction && !right ? '<p class="q-exp">' + (gameplayAction.type === 'waterBatch'
            ? (L() === 'id' ? 'Air tetap diberikan ke ketiga petak. Tidak ada pengurangan koin; bonus pertumbuhan tidak didapat.' : 'The three plots stay watered. No coins are deducted; the growth bonus is not awarded.')
            : (L() === 'id' ? 'Tidak ada pengurangan koin. Air tetap tersimpan, tetapi bonus pertumbuhan tidak didapat.' : 'No coins deducted. Water remains, but the growth bonus is not awarded.')) + '</p>' : '') +
          '<div class="modal-actions"><button type="button" class="btn btn-main" id="q-next">' + t('next') + '</button></div>';
        $('q-next').addEventListener('click', () => {
          closeModal();
          G.pendingQuestion = false;
          G.pendingAction = null;
          $('question-dock').hidden = true;
          G.paused = false;
          G.qT = 0;
          renderAll();
        });
        $('q-next').focus();
        renderHud(); renderPlots(); renderMarket(); renderArchive(); renderSubj('subj-score');
      };

      const minimize = () => {
        if (answered) return;
        clearInterval(qTimer);
        $('modal').hidden = true;
        $('question-dock').hidden = false;
        G.paused = false;
        toast(L() === 'id' ? 'Pertanyaan disimpan. Klik tombol soal untuk melanjutkan.' : 'Question saved. Click the question button to resume.');
      };
      root.querySelector('#q-minimize').addEventListener('click', minimize);
      const dock = $('question-dock');
      dock.onclick = () => {
        if (!G || !G.pendingQuestion || answered) return;
        dock.hidden = true;
        $('modal').hidden = false;
        G.paused = true;
      };

      if (isEssay) {
        root.querySelector('#q-submit').addEventListener('click', () => finishQ(null, root.querySelector('#q-essay').value));
        root.querySelector('#q-essay').addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) finishQ(null, root.querySelector('#q-essay').value);
        });
      } else {
        root.querySelector('#q-opts').addEventListener('click', (e) => {
          const b = e.target.closest('[data-o]');
          if (b) finishQ(Number(b.dataset.o));
        });
      }
      if (qTime) {
        let left = qTime;
        qTimer = setInterval(() => {
          if (document.hidden || $('modal').hidden) return;
          left -= 0.1;
          const bar = $('q-bar');
          if (bar) bar.style.width = Math.max(0, left / qTime * 100) + '%';
          if (left <= 0) finishQ(-1);
        }, 100);
      }
    }
  );
}

function normalizeAnswer(value) {
  return String(value || '').toLowerCase().trim()
    .replace(/[.,!?;:'"`]/g, '')
    .replace(/\s+/g, ' ');
}
function giveReward(subj) {
  if (subj === 'sejarah') {
    let cand = ARCHIVE.map((a, i) => i).filter((i) => !G.archive.includes(i) && ARCHIVE[i].era === G.day);
    if (!cand.length) cand = ARCHIVE.map((a, i) => i).filter((i) => !G.archive.includes(i) && ARCHIVE[i].era <= G.day);
    if (!cand.length) { G.coins += 25; return t('rwSejarahFull'); }
    const i = cand[0];
    G.archive.push(i);
    G.coins += 15;
    return t('rwSejarah', { t: ARCHIVE[i][L()].t });
  }
  if (subj === 'mtk') { G.coins += 25; return t('rwMtk'); }
  if (subj === 'bindo') {
    G.plots.forEach((p) => { if (p.crop && !p.dead) p.prog = Math.min(growTime(p.crop), p.prog + 8); });
    return t('rwBindo');
  }
  if (subj === 'bing') {
    let earn = 0;
    Object.keys(G.barn).forEach((c) => { earn += Math.round(G.barn[c] * priceOf(c) * 1.5); G.barn[c] = 0; });
    if (!earn) { G.coins += 20; return t('rwBingEmpty'); }
    G.coins += earn;
    return t('rwBing', { c: earn });
  }
  if (subj === 'pancasila') {
    G.plots.forEach((p) => { if (p.crop) { p.water = waterDur(); p.pest = false; p.dry = 0; } });
    return t('rwPancasila');
  }
  if (subj === 'kik') { G.boost = 1.2; return t('rwKik'); }
  if (subj === 'rpl') {
    const p = G.plots.find((x) => x.open && !x.auto);
    if (!p) { G.coins += 20; return t('rwRplFull'); }
    p.auto = true;
    return t('rwRpl');
  }
  return '';
}

function penalize() {
  const pen = 0;
  if (pen) { G.coins = Math.max(0, G.coins - pen); return t('penalty', { c: pen }); }
  return t('noReward');
}

/* ---------- Selesai ---------- */
function finish() {
  G.over = true; G.paused = true;
  clearInterval(loop);
  // Sisa panen di lumbung otomatis dijual
  Object.keys(G.barn).forEach((c) => { G.coins += G.barn[c] * priceOf(c); G.barn[c] = 0; });
  const target = DIFFS[G.diff].target;
  let stars = 0;
  if (G.coins >= target) stars = 1;
  if (G.coins >= target * 1.4) stars = 2;
  if (stars === 2 && G.archive.length >= 7) stars = 3;
  G.stars = stars;
  const b = SAVE.best[G.diff];
  if (!b || G.coins > b.coins) SAVE.best[G.diff] = { coins: G.coins, stars: Math.max(stars, b ? b.stars : 0) };
  else if (stars > b.stars) b.stars = stars;
  persist();
  if (stars) SFX.day(); else SFX.wrong();
  show('scr-result');
  renderResult();
}

function renderResult() {
  $('res-diff').textContent = t(DIFFS[G.diff].key);
  $('res-title').textContent = G.stars ? t('winTitle') : t('loseTitle');
  $('res-stars').innerHTML = [0, 1, 2].map((i) => '<span class="' + (i < G.stars ? 'on' : 'off') + '">★</span>').join('');
  $('res-stars').setAttribute('aria-label', G.stars + '/3');
  $('res-msg').textContent = t('msg' + G.stars);
  $('res-coins').textContent = G.coins;
  $('res-target').textContent = DIFFS[G.diff].target;
  $('res-harvest').textContent = G.harvested;
  $('res-archive').textContent = G.archive.length + '/' + ARCHIVE.length;
  renderSubj('res-subj');
}

/* ---------- Modal ---------- */
function modal(html, onMount) {
  $('modal-body').innerHTML = html;
  $('modal').hidden = false;
  if (onMount) onMount($('modal-body'));
  const f = $('modal-body').querySelector('button:not([disabled])');
  if (f) f.focus();
}
function closeModal() {
  clearInterval(qTimer);
  $('modal').hidden = true;
  $('modal-body').innerHTML = '';
  const dock = $('question-dock');
  if (dock) dock.hidden = true;
}

/* ---------- Mulai ---------- */
function startGame() {
  newGame();
  show('scr-game');
  buildFarm();
  clearInterval(loop);
  loop = setInterval(tick, 500);
  startDay();
}

/* ---------- Event ---------- */
document.querySelector('.lang').addEventListener('click', (e) => {
  const b = e.target.closest('[data-lang]');
  if (b) { SAVE.lang = b.dataset.lang; persist(); applyLang(); }
});
$('btn-sound').addEventListener('click', () => { SAVE.sound = !SAVE.sound; persist(); applyLang(); });
$('diffs').addEventListener('click', (e) => {
  const b = e.target.closest('[data-diff]');
  if (b) { SAVE.diff = b.dataset.diff; persist(); renderTitle(); tone(600, .06); }
});
$('btn-play').addEventListener('click', startGame);
$('btn-home').addEventListener('click', () => { clearInterval(loop); closeModal(); G = null; show('scr-title'); renderTitle(); });
$('farm').addEventListener('click', (e) => { const b = e.target.closest('[data-plot]'); if (b) clickPlot(Number(b.dataset.plot)); });
$('seeds').addEventListener('click', (e) => {
  const b = e.target.closest('[data-seed]');
  if (b && !b.disabled) { G.sel = b.dataset.seed; renderSeeds(); renderPlots(); }
});
$('market').addEventListener('click', (e) => { const b = e.target.closest('[data-sell]'); if (b && !b.disabled) sell(b.dataset.sell, b.dataset.n); });
$('archive').addEventListener('click', (e) => {
  const b = e.target.closest('[data-arch]');
  if (!b || !G) return;
  const i = Number(b.dataset.arch), a = ARCHIVE[i];
  if (!G.archive.includes(i)) { toast(t('archLocked')); return; }
  const wasPaused = G.paused;
  G.paused = true;
  modal('<img class="archive-modal-art" src="assets/archive/' + (i + 1) + '.png" alt="" aria-hidden="true"><div class="era-card"><p class="years">' + ERAS[a.era - 1].name[L()] + '</p><h2 id="modal-h">' + esc(a[L()].t) + '</h2><p>' + esc(a[L()].f) + '</p></div>' +
    '<div class="modal-actions"><button type="button" class="btn btn-main" id="m-ok">' + t('next') + '</button></div>',
    () => $('m-ok').addEventListener('click', () => { closeModal(); G.paused = wasPaused; }));
});
$('res-again').addEventListener('click', startGame);
$('res-menu').addEventListener('click', () => { G = null; show('scr-title'); renderTitle(); });

applyLang();
show('scr-title');