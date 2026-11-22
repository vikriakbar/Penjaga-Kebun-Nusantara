'use strict';
/* Bank soal SD kelas 4-6: 500 soal, masing-masing 100 per mata pelajaran. */
const SUBJECTS = {
  sejarah: { color: '#9C2F2F', id: 'Sejarah', en: 'History' },
  mtk: { color: '#2F6FB0', id: 'Matematika', en: 'Mathematics' },
  bindo: { color: '#A84A14', id: 'B. Indonesia', en: 'Indonesian' },
  bing: { color: '#6B3FA0', id: 'B. Inggris', en: 'English' },
  pancasila: { color: '#7A5D00', id: 'Pancasila', en: 'Pancasila' }
};
const SUBJECT_WEIGHT = { sejarah: 10, mtk: 10, bindo: 10, bing: 10, pancasila: 10 };

/* ---------- 5 zaman = 5 hari ---------- */
const ERAS = [
  { years: { id: 'Abad ke-7 sampai ke-15', en: '7th to 15th century' },
    name: { id: 'Kerajaan Nusantara', en: 'Kingdoms of the Archipelago' },
    story: {
      id: 'Kerajaan Sriwijaya menguasai jalur laut dari Sumatra, lalu Majapahit di Jawa Timur menyatukan banyak wilayah Nusantara. Kerajaan-kerajaan ini makmur berkat perdagangan dan pertanian padi.',
      en: 'The Srivijaya kingdom ruled the sea routes from Sumatra, and later Majapahit in East Java united much of the archipelago. These kingdoms prospered through trade and rice farming.'
    },
    effect: { id: 'Kerajaan agraris: padi dan pisang bisa ditanam.', en: 'Agrarian kingdoms: rice and bananas can be planted.' }
  },
  { years: { id: '1511 sampai 1799', en: '1511 to 1799' },
    name: { id: 'Jalur Rempah dan VOC', en: 'The Spice Route and the VOC' },
    story: {
      id: 'Rempah Nusantara seperti pala dan cengkih diburu bangsa Eropa. Portugis merebut Malaka pada 1511, lalu Belanda mendirikan VOC pada 1602 dan memonopoli perdagangan rempah.',
      en: 'Spices such as nutmeg and cloves drew Europeans to the archipelago. Portugal captured Malacca in 1511, then the Dutch founded the VOC in 1602 and monopolised the spice trade.'
    },
    effect: { id: 'Jagung dan cabai yang dibawa bangsa Eropa dari Amerika pada abad ke-16 kini bisa ditanam.', en: 'Corn and chili, brought from the Americas by Europeans in the 16th century, can now be planted.' }
  },
  { years: { id: '1830 sampai 1870', en: '1830 to 1870' },
    name: { id: 'Masa Tanam Paksa', en: 'The Forced Cultivation System' },
    story: {
      id: 'Gubernur Jenderal Johannes van den Bosch menerapkan Tanam Paksa (Cultuurstelsel). Petani wajib menyisihkan seperlima tanahnya untuk tanaman ekspor seperti kopi, tebu, dan nila.',
      en: 'Governor-General Johannes van den Bosch introduced the Cultivation System (Cultuurstelsel). Farmers had to set aside one fifth of their land for export crops such as coffee, sugarcane, and indigo.'
    },
    effect: { id: 'Kopi dan tebu bisa ditanam. Aturan Tanam Paksa: setiap panen kelima diserahkan kepada pemerintah kolonial.', en: 'Coffee and sugarcane unlocked. Forced Cultivation rule: every fifth harvest is handed to the colonial government.' }
  },
  { years: { id: '1901 sampai 1928', en: '1901 to 1928' },
    name: { id: 'Pergerakan Nasional', en: 'The National Awakening' },
    story: {
      id: 'Politik Etis (1901) membawa program edukasi, irigasi, dan emigrasi. Kaum terpelajar mendirikan Budi Utomo pada 1908, dan para pemuda mengikrarkan Sumpah Pemuda pada 1928.',
      en: 'The Ethical Policy (1901) brought education, irrigation, and emigration programmes. Educated Indonesians founded Budi Utomo in 1908, and young people declared the Youth Pledge in 1928.'
    },
    effect: { id: 'Program irigasi: air di tanah bertahan 30% lebih lama.', en: 'Irrigation programme: water stays in the soil 30% longer.' }
  },
  { years: { id: '1945', en: '1945' },
    name: { id: 'Proklamasi Kemerdekaan', en: 'Proclamation of Independence' },
    story: {
      id: 'Soekarno dan Mohammad Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945. Rakyat bersatu mempertahankannya, termasuk dalam Pertempuran Surabaya pada 10 November 1945.',
      en: 'Soekarno and Mohammad Hatta proclaimed Indonesian independence on 17 August 1945. The people united to defend it, including in the Battle of Surabaya on 10 November 1945.'
    },
    effect: { id: 'Semangat kemerdekaan: semua harga jual naik 30%.', en: 'Spirit of independence: all selling prices rise 30%.' }
  }
];

/* ---------- Kartu Arsip Sejarah (2 per zaman) ---------- */
const ARCHIVE = [
  { era: 1, id: { t: 'Sriwijaya', f: 'Kerajaan maritim di Sumatra yang berpusat di sekitar Palembang. Prasasti Kedukan Bukit (682 M) menjadi salah satu bukti tertuanya.' }, en: { t: 'Srivijaya', f: 'A maritime kingdom in Sumatra centred around Palembang. The Kedukan Bukit inscription (682 CE) is one of its oldest records.' } },
  { era: 1, id: { t: 'Majapahit', f: 'Didirikan Raden Wijaya pada 1293. Mahapatih Gajah Mada mengucapkan Sumpah Palapa untuk menyatukan Nusantara.' }, en: { t: 'Majapahit', f: 'Founded by Raden Wijaya in 1293. Chief minister Gajah Mada swore the Palapa Oath to unite the archipelago.' } },
  { era: 2, id: { t: 'Jalur Rempah', f: 'Pala, cengkih, dan lada dari Maluku dan Sumatra diburu bangsa Eropa. Portugis menguasai Malaka pada 1511.' }, en: { t: 'Spice Route', f: 'Nutmeg, cloves, and pepper from Maluku and Sumatra drew Europeans. Portugal took Malacca in 1511.' } },
  { era: 2, id: { t: 'VOC', f: 'Kongsi dagang Belanda yang didirikan pada 1602. Sejak 1619 pusatnya di Batavia. VOC dibubarkan pada akhir 1799.' }, en: { t: 'VOC', f: 'The Dutch East India Company, founded in 1602. From 1619 its base was Batavia. It was dissolved at the end of 1799.' } },
  { era: 3, id: { t: 'Tanam Paksa', f: 'Dicetuskan Gubernur Jenderal Johannes van den Bosch pada 1830. Petani wajib menanam tanaman ekspor seperti kopi, tebu, dan nila.' }, en: { t: 'Forced Cultivation', f: 'Introduced by Governor-General Johannes van den Bosch in 1830. Farmers were forced to grow export crops such as coffee, sugarcane, and indigo.' } },
  { era: 3, id: { t: 'Max Havelaar', f: 'Novel karya Multatuli (Eduard Douwes Dekker) yang terbit pada 1860 dan mengkritik penderitaan rakyat akibat sistem kolonial.' }, en: { t: 'Max Havelaar', f: 'A novel by Multatuli (Eduard Douwes Dekker), published in 1860, criticising the suffering caused by the colonial system.' } },
  { era: 4, id: { t: 'Budi Utomo', f: 'Didirikan pada 20 Mei 1908 oleh pelajar STOVIA. Tanggal ini diperingati sebagai Hari Kebangkitan Nasional.' }, en: { t: 'Budi Utomo', f: 'Founded on 20 May 1908 by STOVIA students. The date is celebrated as National Awakening Day.' } },
  { era: 4, id: { t: 'Sumpah Pemuda', f: 'Diikrarkan pada Kongres Pemuda II, 28 Oktober 1928: satu tanah air, satu bangsa, dan menjunjung bahasa persatuan, bahasa Indonesia.' }, en: { t: 'Youth Pledge', f: 'Declared at the Second Youth Congress on 28 October 1928: one homeland, one nation, and upholding the language of unity, Indonesian.' } },
  { era: 5, id: { t: 'Proklamasi', f: 'Dibacakan Soekarno didampingi Mohammad Hatta pada 17 Agustus 1945 di Jalan Pegangsaan Timur 56, Jakarta.' }, en: { t: 'Proclamation', f: 'Read by Soekarno, accompanied by Mohammad Hatta, on 17 August 1945 at Jalan Pegangsaan Timur 56, Jakarta.' } },
  { era: 5, id: { t: 'Hari Pahlawan', f: 'Pertempuran Surabaya pada 10 November 1945 diperingati setiap tahun sebagai Hari Pahlawan.' }, en: { t: 'Heroes Day', f: 'The Battle of Surabaya on 10 November 1945 is commemorated every year as Heroes Day.' } }
];


const QUESTIONS = [
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "mohammad hatta",
    "accept": [
      "mohammad hatta"
    ],
    "id": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "en": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "answer_en": "mohammad hatta",
    "accept_en": [
      "mohammad hatta"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Tokoh yang mendampingi Soekarno saat Proklamasi adalah ...",
      "o": [
        "Ki Hajar Dewantara",
        "Cut Nyak Dien",
        "Mohammad Hatta",
        "Jenderal Sudirman"
      ],
      "e": "Mohammad Hatta mendampingi Soekarno saat Proklamasi."
    },
    "en": {
      "q": "Tokoh yang mendampingi Soekarno saat Proklamasi adalah ...",
      "o": [
        "Ki Hajar Dewantara",
        "Cut Nyak Dien",
        "Mohammad Hatta",
        "Jenderal Sudirman"
      ],
      "e": "Mohammad Hatta mendampingi Soekarno saat Proklamasi."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ibu Sud",
        "Ismail Marzuki",
        "W.R. Supratman"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ibu Sud",
        "Ismail Marzuki",
        "W.R. Supratman"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ismail Marzuki",
        "Ibu Sud",
        "W.R. Supratman"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ismail Marzuki",
        "Ibu Sud",
        "W.R. Supratman"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "ki hajar dewantara",
    "accept": [
      "ki hajar dewantara"
    ],
    "id": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "en": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "answer_en": "ki hajar dewantara",
    "accept_en": [
      "ki hajar dewantara"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "R.A. Kartini",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "Cut Nyak Dien"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "R.A. Kartini",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "Cut Nyak Dien"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Martha Christina Tiahahu",
        "Cut Nyak Dien",
        "Dewi Sartika",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Martha Christina Tiahahu",
        "Cut Nyak Dien",
        "Dewi Sartika",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro",
        "Sumpah Pemuda",
        "berdirinya VOC"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro",
        "Sumpah Pemuda",
        "berdirinya VOC"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "C. Simanjuntak",
        "Ismail Marzuki",
        "Ibu Sud"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "C. Simanjuntak",
        "Ismail Marzuki",
        "Ibu Sud"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Perang Diponegoro",
        "Proklamasi Kemerdekaan",
        "berdirinya VOC",
        "Sumpah Pemuda"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Perang Diponegoro",
        "Proklamasi Kemerdekaan",
        "berdirinya VOC",
        "Sumpah Pemuda"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "kemerdekaan Indonesia",
        "perdagangan rempah",
        "pembangunan candi",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "kemerdekaan Indonesia",
        "perdagangan rempah",
        "pembangunan candi",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Sumpah Pemuda",
        "Proklamasi Kemerdekaan",
        "berdirinya VOC",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Sumpah Pemuda",
        "Proklamasi Kemerdekaan",
        "berdirinya VOC",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "cengkih",
    "accept": [
      "cengkih"
    ],
    "id": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "en": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "answer_en": "cengkih",
    "accept_en": [
      "cengkih"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "Ismail Marzuki",
        "Ibu Sud",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "Ismail Marzuki",
        "Ibu Sud",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "ki hajar dewantara",
    "accept": [
      "ki hajar dewantara"
    ],
    "id": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "en": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "answer_en": "ki hajar dewantara",
    "accept_en": [
      "ki hajar dewantara"
    ]
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "17 agustus 1945",
    "accept": [
      "17 agustus 1945"
    ],
    "id": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "en": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "answer_en": "17 agustus 1945",
    "accept_en": [
      "17 agustus 1945"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "VOC didirikan oleh Belanda pada tahun ...",
      "o": [
        "1511",
        "1602",
        "1945",
        "1755"
      ],
      "e": "VOC didirikan pada tahun 1602."
    },
    "en": {
      "q": "VOC didirikan oleh Belanda pada tahun ...",
      "o": [
        "1511",
        "1602",
        "1945",
        "1755"
      ],
      "e": "VOC didirikan pada tahun 1602."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Pattimura memimpin perlawanan terhadap Belanda di ...",
      "o": [
        "Aceh",
        "Jawa Barat",
        "Maluku",
        "Kalimantan"
      ],
      "e": "Pattimura memimpin perlawanan di Maluku pada 1817."
    },
    "en": {
      "q": "Pattimura memimpin perlawanan terhadap Belanda di ...",
      "o": [
        "Aceh",
        "Jawa Barat",
        "Maluku",
        "Kalimantan"
      ],
      "e": "Pattimura memimpin perlawanan di Maluku pada 1817."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "W.R. Supratman",
        "Ibu Sud",
        "Ismail Marzuki"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "W.R. Supratman",
        "Ibu Sud",
        "Ismail Marzuki"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "cengkih",
    "accept": [
      "cengkih"
    ],
    "id": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "en": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "answer_en": "cengkih",
    "accept_en": [
      "cengkih"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "17 agustus 1945",
    "accept": [
      "17 agustus 1945"
    ],
    "id": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "en": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "answer_en": "17 agustus 1945",
    "accept_en": [
      "17 agustus 1945"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Hindu saja",
        "Kristen",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Hindu saja",
        "Kristen",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "mohammad hatta",
    "accept": [
      "mohammad hatta"
    ],
    "id": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "en": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "answer_en": "mohammad hatta",
    "accept_en": [
      "mohammad hatta"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Hindu saja",
        "Kristen",
        "Islam"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Hindu saja",
        "Kristen",
        "Islam"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "Ismail Marzuki",
        "Ibu Sud",
        "W.R. Supratman",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "Ismail Marzuki",
        "Ibu Sud",
        "W.R. Supratman",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "sumpah pemuda",
    "accept": [
      "sumpah pemuda"
    ],
    "id": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "en": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "answer_en": "sumpah pemuda",
    "accept_en": [
      "sumpah pemuda"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pelayaran dunia",
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pelayaran dunia",
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "R.A. Kartini memperjuangkan kesempatan belajar bagi ...",
      "o": [
        "pedagang",
        "perempuan",
        "pelaut",
        "prajurit"
      ],
      "e": "Kartini memperjuangkan pendidikan dan kemajuan perempuan."
    },
    "en": {
      "q": "R.A. Kartini memperjuangkan kesempatan belajar bagi ...",
      "o": [
        "pedagang",
        "perempuan",
        "pelaut",
        "prajurit"
      ],
      "e": "Kartini memperjuangkan pendidikan dan kemajuan perempuan."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Proklamasi Kemerdekaan",
        "Sumpah Pemuda",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Proklamasi Kemerdekaan",
        "Sumpah Pemuda",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Martha Christina Tiahahu",
        "R.A. Kartini",
        "Cut Nyak Dien",
        "Dewi Sartika"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Martha Christina Tiahahu",
        "R.A. Kartini",
        "Cut Nyak Dien",
        "Dewi Sartika"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ibu Sud",
        "Ismail Marzuki",
        "W.R. Supratman"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ibu Sud",
        "Ismail Marzuki",
        "W.R. Supratman"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Kristen",
        "Hindu saja",
        "Buddha",
        "Islam"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Kristen",
        "Hindu saja",
        "Buddha",
        "Islam"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "R.A. Kartini",
        "Dewi Sartika",
        "Cut Nyak Dien",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "R.A. Kartini",
        "Dewi Sartika",
        "Cut Nyak Dien",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Islam",
        "Kristen",
        "Buddha",
        "Hindu saja"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Islam",
        "Kristen",
        "Buddha",
        "Hindu saja"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Sumpah Pemuda",
        "berdirinya VOC",
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Sumpah Pemuda",
        "berdirinya VOC",
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Islam",
        "Buddha",
        "Hindu saja",
        "Kristen"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Islam",
        "Buddha",
        "Hindu saja",
        "Kristen"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Kerajaan Majapahit mencapai masa kejayaan pada masa pemerintahan ...",
      "o": [
        "Hayam Wuruk",
        "Ken Arok",
        "Raden Wijaya",
        "Airlangga"
      ],
      "e": "Majapahit mencapai puncak kejayaan pada masa Hayam Wuruk."
    },
    "en": {
      "q": "Kerajaan Majapahit mencapai masa kejayaan pada masa pemerintahan ...",
      "o": [
        "Hayam Wuruk",
        "Ken Arok",
        "Raden Wijaya",
        "Airlangga"
      ],
      "e": "Majapahit mencapai puncak kejayaan pada masa Hayam Wuruk."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "mohammad hatta",
    "accept": [
      "mohammad hatta"
    ],
    "id": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "en": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "answer_en": "mohammad hatta",
    "accept_en": [
      "mohammad hatta"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Tokoh yang terkenal dengan Sumpah Palapa adalah ...",
      "o": [
        "Gajah Mada",
        "Hayam Wuruk",
        "Mpu Tantular",
        "Raden Wijaya"
      ],
      "e": "Gajah Mada mengucapkan Sumpah Palapa."
    },
    "en": {
      "q": "Tokoh yang terkenal dengan Sumpah Palapa adalah ...",
      "o": [
        "Gajah Mada",
        "Hayam Wuruk",
        "Mpu Tantular",
        "Raden Wijaya"
      ],
      "e": "Gajah Mada mengucapkan Sumpah Palapa."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Salah satu rempah yang terkenal dari Maluku adalah ...",
      "o": [
        "gandum",
        "apel",
        "kapas",
        "cengkih"
      ],
      "e": "Maluku dikenal sebagai penghasil cengkih dan pala."
    },
    "en": {
      "q": "Salah satu rempah yang terkenal dari Maluku adalah ...",
      "o": [
        "gandum",
        "apel",
        "kapas",
        "cengkih"
      ],
      "e": "Maluku dikenal sebagai penghasil cengkih dan pala."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "perdagangan rempah",
        "pelayaran dunia",
        "kemerdekaan Indonesia",
        "pembangunan candi"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "perdagangan rempah",
        "pelayaran dunia",
        "kemerdekaan Indonesia",
        "pembangunan candi"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia",
        "pembangunan candi"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia",
        "pembangunan candi"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Dewi Sartika",
        "Cut Nyak Dien",
        "R.A. Kartini",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Dewi Sartika",
        "Cut Nyak Dien",
        "R.A. Kartini",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "pelayaran dunia",
        "perdagangan rempah",
        "kemerdekaan Indonesia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "pelayaran dunia",
        "perdagangan rempah",
        "kemerdekaan Indonesia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "mohammad hatta",
    "accept": [
      "mohammad hatta"
    ],
    "id": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "en": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "answer_en": "mohammad hatta",
    "accept_en": [
      "mohammad hatta"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "Martha Christina Tiahahu",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "mohammad hatta",
    "accept": [
      "mohammad hatta"
    ],
    "id": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "en": {
      "q": "Siapa pendamping Soekarno saat membacakan Proklamasi?",
      "e": "Mohammad Hatta mendampingi Soekarno."
    },
    "answer_en": "mohammad hatta",
    "accept_en": [
      "mohammad hatta"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Islam",
        "Buddha",
        "Hindu saja",
        "Kristen"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Islam",
        "Buddha",
        "Hindu saja",
        "Kristen"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Proklamasi Kemerdekaan Indonesia dibacakan pada ...",
      "o": [
        "17 Agustus 1945",
        "28 Oktober 1928",
        "1 Juni 1945",
        "10 November 1945"
      ],
      "e": "Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945."
    },
    "en": {
      "q": "Proklamasi Kemerdekaan Indonesia dibacakan pada ...",
      "o": [
        "17 Agustus 1945",
        "28 Oktober 1928",
        "1 Juni 1945",
        "10 November 1945"
      ],
      "e": "Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Ki Hajar Dewantara dikenal sebagai tokoh dalam bidang ...",
      "o": [
        "pelayaran",
        "pertanian",
        "pendidikan",
        "kesehatan"
      ],
      "e": "Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional."
    },
    "en": {
      "q": "Ki Hajar Dewantara dikenal sebagai tokoh dalam bidang ...",
      "o": [
        "pelayaran",
        "pertanian",
        "pendidikan",
        "kesehatan"
      ],
      "e": "Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Hindu saja",
        "Kristen",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Hindu saja",
        "Kristen",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "Ibu Sud",
        "Ismail Marzuki",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "Ibu Sud",
        "Ismail Marzuki",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "Proklamasi Kemerdekaan"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "Proklamasi Kemerdekaan"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "berdirinya VOC",
        "Proklamasi Kemerdekaan"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "berdirinya VOC",
        "Proklamasi Kemerdekaan"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "sumpah pemuda",
    "accept": [
      "sumpah pemuda"
    ],
    "id": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "en": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "answer_en": "sumpah pemuda",
    "accept_en": [
      "sumpah pemuda"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "berdirinya VOC"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "berdirinya VOC"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "Ismail Marzuki",
        "C. Simanjuntak",
        "Ibu Sud"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "Ismail Marzuki",
        "C. Simanjuntak",
        "Ibu Sud"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro",
        "Sumpah Pemuda"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro",
        "Sumpah Pemuda"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "sumpah pemuda",
    "accept": [
      "sumpah pemuda"
    ],
    "id": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "en": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "answer_en": "sumpah pemuda",
    "accept_en": [
      "sumpah pemuda"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "Proklamasi Kemerdekaan"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "berdirinya VOC",
        "Sumpah Pemuda",
        "Perang Diponegoro",
        "Proklamasi Kemerdekaan"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ismail Marzuki",
        "W.R. Supratman",
        "Ibu Sud"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "C. Simanjuntak",
        "Ismail Marzuki",
        "W.R. Supratman",
        "Ibu Sud"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Kerajaan bercorak Buddha yang berkembang sebagai kerajaan maritim di Sumatra adalah ...",
      "o": [
        "Majapahit",
        "Sriwijaya",
        "Kutai",
        "Tarumanegara"
      ],
      "e": "Sriwijaya berkembang sebagai kerajaan maritim dan pusat pembelajaran Buddha."
    },
    "en": {
      "q": "Kerajaan bercorak Buddha yang berkembang sebagai kerajaan maritim di Sumatra adalah ...",
      "o": [
        "Majapahit",
        "Sriwijaya",
        "Kutai",
        "Tarumanegara"
      ],
      "e": "Sriwijaya berkembang sebagai kerajaan maritim dan pusat pembelajaran Buddha."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Sumpah Pemuda diikrarkan pada tanggal ...",
      "o": [
        "17 Agustus 1945",
        "20 Mei 1908",
        "10 November 1945",
        "28 Oktober 1928"
      ],
      "e": "Sumpah Pemuda diikrarkan pada 28 Oktober 1928."
    },
    "en": {
      "q": "Sumpah Pemuda diikrarkan pada tanggal ...",
      "o": [
        "17 Agustus 1945",
        "20 Mei 1908",
        "10 November 1945",
        "28 Oktober 1928"
      ],
      "e": "Sumpah Pemuda diikrarkan pada 28 Oktober 1928."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "R.A. Kartini",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "Dewi Sartika",
        "R.A. Kartini",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro",
        "Sumpah Pemuda",
        "berdirinya VOC"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "Perang Diponegoro",
        "Sumpah Pemuda",
        "berdirinya VOC"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Sistem Tanam Paksa mulai diterapkan pada masa kolonial pada tahun ...",
      "o": [
        "1602",
        "1830",
        "1945",
        "1908"
      ],
      "e": "Cultuurstelsel mulai diterapkan pada tahun 1830."
    },
    "en": {
      "q": "Sistem Tanam Paksa mulai diterapkan pada masa kolonial pada tahun ...",
      "o": [
        "1602",
        "1830",
        "1945",
        "1908"
      ],
      "e": "Cultuurstelsel mulai diterapkan pada tahun 1830."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Kristen",
        "Hindu saja",
        "Islam"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Kristen",
        "Hindu saja",
        "Islam"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "kemerdekaan Indonesia",
        "perdagangan rempah",
        "pelayaran dunia",
        "pembangunan candi"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "kemerdekaan Indonesia",
        "perdagangan rempah",
        "pelayaran dunia",
        "pembangunan candi"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "sumpah pemuda",
    "accept": [
      "sumpah pemuda"
    ],
    "id": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "en": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "answer_en": "sumpah pemuda",
    "accept_en": [
      "sumpah pemuda"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "17 agustus 1945",
    "accept": [
      "17 agustus 1945"
    ],
    "id": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "en": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "answer_en": "17 agustus 1945",
    "accept_en": [
      "17 agustus 1945"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "C. Simanjuntak",
        "Ibu Sud",
        "Ismail Marzuki"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "W.R. Supratman",
        "C. Simanjuntak",
        "Ibu Sud",
        "Ismail Marzuki"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "17 agustus 1945",
    "accept": [
      "17 agustus 1945"
    ],
    "id": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "en": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "answer_en": "17 agustus 1945",
    "accept_en": [
      "17 agustus 1945"
    ]
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Martha Christina Tiahahu",
        "Cut Nyak Dien",
        "Dewi Sartika",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Martha Christina Tiahahu",
        "Cut Nyak Dien",
        "Dewi Sartika",
        "R.A. Kartini"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Kristen",
        "Hindu saja",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Kristen",
        "Hindu saja",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 1,
    "id": {
      "q": "Pangeran Diponegoro memimpin perang di wilayah ...",
      "o": [
        "Papua",
        "Jawa",
        "Bali",
        "Sulawesi"
      ],
      "e": "Perang Diponegoro berlangsung di Jawa pada 1825–1830."
    },
    "en": {
      "q": "Pangeran Diponegoro memimpin perang di wilayah ...",
      "o": [
        "Papua",
        "Jawa",
        "Bali",
        "Sulawesi"
      ],
      "e": "Perang Diponegoro berlangsung di Jawa pada 1825–1830."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "R.A. Kartini",
        "Martha Christina Tiahahu",
        "Dewi Sartika"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "Cut Nyak Dien",
        "R.A. Kartini",
        "Martha Christina Tiahahu",
        "Dewi Sartika"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "pembangunan candi",
        "perdagangan rempah",
        "kemerdekaan Indonesia",
        "pelayaran dunia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "ki hajar dewantara",
    "accept": [
      "ki hajar dewantara"
    ],
    "id": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "en": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "answer_en": "ki hajar dewantara",
    "accept_en": [
      "ki hajar dewantara"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "berdirinya VOC",
        "Sumpah Pemuda",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    },
    "en": {
      "q": "Peristiwa Rengasdengklok terjadi menjelang ...",
      "o": [
        "Proklamasi Kemerdekaan",
        "berdirinya VOC",
        "Sumpah Pemuda",
        "Perang Diponegoro"
      ],
      "e": "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "17 agustus 1945",
    "accept": [
      "17 agustus 1945"
    ],
    "id": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "en": {
      "q": "Tuliskan tanggal Proklamasi Kemerdekaan Indonesia.",
      "e": "Indonesia merdeka pada 17 Agustus 1945."
    },
    "answer_en": "17 agustus 1945",
    "accept_en": [
      "17 agustus 1945"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "sumpah pemuda",
    "accept": [
      "sumpah pemuda"
    ],
    "id": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "en": {
      "q": "Apa nama ikrar pemuda pada 28 Oktober 1928?",
      "e": "Ikrar itu dikenal sebagai Sumpah Pemuda."
    },
    "answer_en": "sumpah pemuda",
    "accept_en": [
      "sumpah pemuda"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "perdagangan rempah",
        "pelayaran dunia",
        "pembangunan candi",
        "kemerdekaan Indonesia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    },
    "en": {
      "q": "BPUPKI dibentuk untuk mempersiapkan ...",
      "o": [
        "perdagangan rempah",
        "pelayaran dunia",
        "pembangunan candi",
        "kemerdekaan Indonesia"
      ],
      "e": "BPUPKI membahas persiapan kemerdekaan dan dasar negara."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Kristen",
        "Islam",
        "Hindu saja"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Kristen",
        "Islam",
        "Hindu saja"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "cengkih",
    "accept": [
      "cengkih"
    ],
    "id": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "en": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "answer_en": "cengkih",
    "accept_en": [
      "cengkih"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "Ibu Sud",
        "Ismail Marzuki",
        "W.R. Supratman",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    },
    "en": {
      "q": "Lagu “Indonesia Raya” diciptakan oleh ...",
      "o": [
        "Ibu Sud",
        "Ismail Marzuki",
        "W.R. Supratman",
        "C. Simanjuntak"
      ],
      "e": "W.R. Supratman menciptakan lagu Indonesia Raya."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 3,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Kristen",
        "Hindu saja",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Kristen",
        "Hindu saja",
        "Islam",
        "Buddha"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Hari Pahlawan diperingati setiap tanggal ...",
      "o": [
        "10 November",
        "20 Mei",
        "28 Oktober",
        "1 Juni"
      ],
      "e": "Tanggal 10 November mengenang perjuangan di Surabaya."
    },
    "en": {
      "q": "Hari Pahlawan diperingati setiap tanggal ...",
      "o": [
        "10 November",
        "20 Mei",
        "28 Oktober",
        "1 Juni"
      ],
      "e": "Tanggal 10 November mengenang perjuangan di Surabaya."
    }
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "ki hajar dewantara",
    "accept": [
      "ki hajar dewantara"
    ],
    "id": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "en": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "answer_en": "ki hajar dewantara",
    "accept_en": [
      "ki hajar dewantara"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "cengkih",
    "accept": [
      "cengkih"
    ],
    "id": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "en": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "answer_en": "cengkih",
    "accept_en": [
      "cengkih"
    ]
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "cengkih",
    "accept": [
      "cengkih"
    ],
    "id": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "en": {
      "q": "Sebutkan satu rempah dari Maluku.",
      "e": "Cengkih dan pala merupakan rempah dari Maluku."
    },
    "answer_en": "cengkih",
    "accept_en": [
      "cengkih"
    ]
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Tokoh dan peristiwa",
    "type": "essay",
    "answer": "ki hajar dewantara",
    "accept": [
      "ki hajar dewantara"
    ],
    "id": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "en": {
      "q": "Siapa yang dikenal sebagai Bapak Pendidikan Nasional?",
      "e": "Ki Hajar Dewantara berjasa besar dalam pendidikan."
    },
    "answer_en": "ki hajar dewantara",
    "accept_en": [
      "ki hajar dewantara"
    ]
  },
  {
    "s": "sejarah",
    "grade": 6,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "R.A. Kartini",
        "Dewi Sartika",
        "Cut Nyak Dien",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    },
    "en": {
      "q": "Pahlawan dari Aceh yang dikenal gigih melawan Belanda adalah ...",
      "o": [
        "R.A. Kartini",
        "Dewi Sartika",
        "Cut Nyak Dien",
        "Martha Christina Tiahahu"
      ],
      "e": "Cut Nyak Dien merupakan pahlawan nasional dari Aceh."
    }
  },
  {
    "s": "sejarah",
    "grade": 5,
    "topic": "Sejarah Indonesia",
    "a": 0,
    "id": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Islam",
        "Hindu saja",
        "Kristen"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    },
    "en": {
      "q": "Candi Borobudur merupakan peninggalan bercorak ...",
      "o": [
        "Buddha",
        "Islam",
        "Hindu saja",
        "Kristen"
      ],
      "e": "Borobudur merupakan candi Buddha di Jawa Tengah."
    }
  },
  {
    "s": "sejarah",
    "grade": 4,
    "topic": "Sejarah Indonesia",
    "a": 2,
    "id": {
      "q": "Organisasi Budi Utomo berdiri pada tahun ...",
      "o": [
        "1602",
        "1945",
        "1908",
        "1928"
      ],
      "e": "Budi Utomo berdiri pada 20 Mei 1908."
    },
    "en": {
      "q": "Organisasi Budi Utomo berdiri pada tahun ...",
      "o": [
        "1602",
        "1945",
        "1908",
        "1928"
      ],
      "e": "Budi Utomo berdiri pada 20 Mei 1908."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 0,
    "id": {
      "q": "Luas persegi panjang berukuran 10 cm × 4 cm adalah ... cm²",
      "o": [
        "40",
        "37",
        "44",
        "48"
      ],
      "e": "Luas = panjang × lebar = 10 × 4 = 40 cm²."
    },
    "en": {
      "q": "Luas persegi panjang berukuran 10 cm × 4 cm adalah ... cm²",
      "o": [
        "40",
        "37",
        "44",
        "48"
      ],
      "e": "Luas = panjang × lebar = 10 × 4 = 40 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 1,
    "id": {
      "q": "9 liter = ... mililiter",
      "o": [
        "90",
        "9000",
        "90000",
        "900"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    },
    "en": {
      "q": "9 liter = ... mililiter",
      "o": [
        "90",
        "9000",
        "90000",
        "900"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 3,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 5 bagian sama besar dan 3 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "2/5",
        "3/6",
        "5/3",
        "3/5"
      ],
      "e": "Bagian yang dimakan adalah 3 dari 5 bagian, yaitu 3/5."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 5 bagian sama besar dan 3 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "2/5",
        "3/6",
        "5/3",
        "3/5"
      ],
      "e": "Bagian yang dimakan adalah 3 dari 5 bagian, yaitu 3/5."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 3,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 5 bagian sama besar dan 2 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "3/5",
        "5/2",
        "2/6",
        "2/5"
      ],
      "e": "Bagian yang dimakan adalah 2 dari 5 bagian, yaitu 2/5."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 5 bagian sama besar dan 2 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "3/5",
        "5/2",
        "2/6",
        "2/5"
      ],
      "e": "Bagian yang dimakan adalah 2 dari 5 bagian, yaitu 2/5."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 2,
    "id": {
      "q": "Luas persegi dengan sisi 3 cm adalah ... cm²",
      "o": [
        "17",
        "6",
        "9",
        "13"
      ],
      "e": "Luas persegi = sisi × sisi = 3 × 3 = 9 cm²."
    },
    "en": {
      "q": "Luas persegi dengan sisi 3 cm adalah ... cm²",
      "o": [
        "17",
        "6",
        "9",
        "13"
      ],
      "e": "Luas persegi = sisi × sisi = 3 × 3 = 9 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "73 − 6 = ...",
      "o": [
        "69",
        "72",
        "67",
        "64"
      ],
      "e": "73 dikurangi 6 sama dengan 67."
    },
    "en": {
      "q": "73 − 6 = ... What is the answer?",
      "o": [
        "69",
        "72",
        "67",
        "64"
      ],
      "e": "73 dikurangi 6 sama dengan 67."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 0,
    "id": {
      "q": "4 liter = ... mililiter",
      "o": [
        "4000",
        "40000",
        "400",
        "40"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    },
    "en": {
      "q": "4 liter = ... mililiter",
      "o": [
        "4000",
        "40000",
        "400",
        "40"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Pecahan 4/6 dibaca ...",
      "o": [
        "6 per 4",
        "4 tambah 6",
        "4 per 6",
        "4 kali 6"
      ],
      "e": "4/6 dibaca 4 per 6."
    },
    "en": {
      "q": "Pecahan 4/6 dibaca ...",
      "o": [
        "6 per 4",
        "4 tambah 6",
        "4 per 6",
        "4 kali 6"
      ],
      "e": "4/6 dibaca 4 per 6."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 1,
    "id": {
      "q": "Persegi panjang memiliki panjang 25 cm dan lebar 9 cm. Kelilingnya adalah ... cm",
      "o": [
        "65",
        "68",
        "72",
        "76"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (25+9) = 68 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 25 cm dan lebar 9 cm. Kelilingnya adalah ... cm",
      "o": [
        "65",
        "68",
        "72",
        "76"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (25+9) = 68 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "12 + 5 = ...",
      "o": [
        "14",
        "19",
        "22",
        "17"
      ],
      "e": "12 ditambah 5 sama dengan 17."
    },
    "en": {
      "q": "12 + 5 = ... What is the answer?",
      "o": [
        "14",
        "19",
        "22",
        "17"
      ],
      "e": "12 ditambah 5 sama dengan 17."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Pecahan 3/6 dibaca ...",
      "o": [
        "6 per 3",
        "3 kali 6",
        "3 per 6",
        "3 tambah 6"
      ],
      "e": "3/6 dibaca 3 per 6."
    },
    "en": {
      "q": "Pecahan 3/6 dibaca ...",
      "o": [
        "6 per 3",
        "3 kali 6",
        "3 per 6",
        "3 tambah 6"
      ],
      "e": "3/6 dibaca 3 per 6."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "4 × 3 = ...",
      "o": [
        "9",
        "14",
        "17",
        "12"
      ],
      "e": "4 kelompok yang masing-masing berisi 3 berjumlah 12."
    },
    "en": {
      "q": "4 × 3 = ... What is the answer?",
      "o": [
        "9",
        "14",
        "17",
        "12"
      ],
      "e": "4 kelompok yang masing-masing berisi 3 berjumlah 12."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 7 bagian sama besar dan 4 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "3/7",
        "4/7",
        "7/4",
        "4/8"
      ],
      "e": "Bagian yang dimakan adalah 4 dari 7 bagian, yaitu 4/7."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 7 bagian sama besar dan 4 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "3/7",
        "4/7",
        "7/4",
        "4/8"
      ],
      "e": "Bagian yang dimakan adalah 4 dari 7 bagian, yaitu 4/7."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 1,
    "id": {
      "q": "50 : 5 = ...",
      "o": [
        "15",
        "10",
        "7",
        "12"
      ],
      "e": "50 dibagi 5 sama dengan 10."
    },
    "en": {
      "q": "50 : 5 = ... What is the answer?",
      "o": [
        "15",
        "10",
        "7",
        "12"
      ],
      "e": "50 dibagi 5 sama dengan 10."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Pecahan 3/7 dibaca ...",
      "o": [
        "7 per 3",
        "3 tambah 7",
        "3 per 7",
        "3 kali 7"
      ],
      "e": "3/7 dibaca 3 per 7."
    },
    "en": {
      "q": "Pecahan 3/7 dibaca ...",
      "o": [
        "7 per 3",
        "3 tambah 7",
        "3 per 7",
        "3 kali 7"
      ],
      "e": "3/7 dibaca 3 per 7."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 3,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 6 bagian sama besar dan 5 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "1/6",
        "6/5",
        "5/7",
        "5/6"
      ],
      "e": "Bagian yang dimakan adalah 5 dari 6 bagian, yaitu 5/6."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 6 bagian sama besar dan 5 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "1/6",
        "6/5",
        "5/7",
        "5/6"
      ],
      "e": "Bagian yang dimakan adalah 5 dari 6 bagian, yaitu 5/6."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Pecahan 6/7 dibaca ...",
      "o": [
        "6 tambah 7",
        "6 per 7",
        "6 kali 7",
        "7 per 6"
      ],
      "e": "6/7 dibaca 6 per 7."
    },
    "en": {
      "q": "Pecahan 6/7 dibaca ...",
      "o": [
        "6 tambah 7",
        "6 per 7",
        "6 kali 7",
        "7 per 6"
      ],
      "e": "6/7 dibaca 6 per 7."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "2 liter = ... mililiter",
      "o": [
        "20",
        "20000",
        "200",
        "2000"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    },
    "en": {
      "q": "2 liter = ... mililiter",
      "o": [
        "20",
        "20000",
        "200",
        "2000"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "42 : 7 = ...",
      "o": [
        "11",
        "3",
        "8",
        "6"
      ],
      "e": "42 dibagi 7 sama dengan 6."
    },
    "en": {
      "q": "42 : 7 = ... What is the answer?",
      "o": [
        "11",
        "3",
        "8",
        "6"
      ],
      "e": "42 dibagi 7 sama dengan 6."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 8 bagian sama besar dan 4 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "8/4",
        "4/9",
        "4/8",
        "4/8"
      ],
      "e": "Bagian yang dimakan adalah 4 dari 8 bagian, yaitu 4/8."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 8 bagian sama besar dan 4 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "8/4",
        "4/9",
        "4/8",
        "4/8"
      ],
      "e": "Bagian yang dimakan adalah 4 dari 8 bagian, yaitu 4/8."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Luas persegi dengan sisi 4 cm adalah ... cm²",
      "o": [
        "20",
        "24",
        "13",
        "16"
      ],
      "e": "Luas persegi = sisi × sisi = 4 × 4 = 16 cm²."
    },
    "en": {
      "q": "Luas persegi dengan sisi 4 cm adalah ... cm²",
      "o": [
        "20",
        "24",
        "13",
        "16"
      ],
      "e": "Luas persegi = sisi × sisi = 4 × 4 = 16 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 2,
    "id": {
      "q": "Luas persegi dengan sisi 11 cm adalah ... cm²",
      "o": [
        "129",
        "125",
        "121",
        "118"
      ],
      "e": "Luas persegi = sisi × sisi = 11 × 11 = 121 cm²."
    },
    "en": {
      "q": "Luas persegi dengan sisi 11 cm adalah ... cm²",
      "o": [
        "129",
        "125",
        "121",
        "118"
      ],
      "e": "Luas persegi = sisi × sisi = 11 × 11 = 121 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 0,
    "id": {
      "q": "32 menit = ... detik",
      "o": [
        "1920",
        "92",
        "3200",
        "960"
      ],
      "e": "Satu menit sama dengan 60 detik."
    },
    "en": {
      "q": "32 menit = ... detik",
      "o": [
        "1920",
        "92",
        "3200",
        "960"
      ],
      "e": "Satu menit sama dengan 60 detik."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 3,
    "id": {
      "q": "Pecahan 5/8 dibaca ...",
      "o": [
        "8 per 5",
        "5 kali 8",
        "5 tambah 8",
        "5 per 8"
      ],
      "e": "5/8 dibaca 5 per 8."
    },
    "en": {
      "q": "Pecahan 5/8 dibaca ...",
      "o": [
        "8 per 5",
        "5 kali 8",
        "5 tambah 8",
        "5 per 8"
      ],
      "e": "5/8 dibaca 5 per 8."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 0,
    "id": {
      "q": "8 × 7 = ...",
      "o": [
        "56",
        "58",
        "61",
        "53"
      ],
      "e": "8 kelompok yang masing-masing berisi 7 berjumlah 56."
    },
    "en": {
      "q": "8 × 7 = ... What is the answer?",
      "o": [
        "56",
        "58",
        "61",
        "53"
      ],
      "e": "8 kelompok yang masing-masing berisi 7 berjumlah 56."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 1,
    "id": {
      "q": "Rata-rata dari 21, 31, dan 41 adalah ...",
      "o": [
        "35",
        "31",
        "28",
        "39"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 93 : 3 = 31."
    },
    "en": {
      "q": "Rata-rata dari 21, 31, dan 41 adalah ...",
      "o": [
        "35",
        "31",
        "28",
        "39"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 93 : 3 = 31."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 1,
    "id": {
      "q": "5 hari = ... jam",
      "o": [
        "60",
        "120",
        "300",
        "29"
      ],
      "e": "Satu hari sama dengan 24 jam."
    },
    "en": {
      "q": "5 hari = ... jam",
      "o": [
        "60",
        "120",
        "300",
        "29"
      ],
      "e": "Satu hari sama dengan 24 jam."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "25 − 6 = ...",
      "o": [
        "24",
        "16",
        "19",
        "21"
      ],
      "e": "25 dikurangi 6 sama dengan 19."
    },
    "en": {
      "q": "25 − 6 = ... What is the answer?",
      "o": [
        "24",
        "16",
        "19",
        "21"
      ],
      "e": "25 dikurangi 6 sama dengan 19."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 0,
    "id": {
      "q": "Pecahan 8/5 dibaca ...",
      "o": [
        "8 per 5",
        "8 tambah 5",
        "8 kali 5",
        "5 per 8"
      ],
      "e": "8/5 dibaca 8 per 5."
    },
    "en": {
      "q": "Pecahan 8/5 dibaca ...",
      "o": [
        "8 per 5",
        "8 tambah 5",
        "8 kali 5",
        "5 per 8"
      ],
      "e": "8/5 dibaca 8 per 5."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 1,
    "id": {
      "q": "Rata-rata dari 25, 35, dan 45 adalah ...",
      "o": [
        "43",
        "35",
        "32",
        "39"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 105 : 3 = 35."
    },
    "en": {
      "q": "Rata-rata dari 25, 35, dan 45 adalah ...",
      "o": [
        "43",
        "35",
        "32",
        "39"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 105 : 3 = 35."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "60 + 5 = ...",
      "o": [
        "67",
        "70",
        "62",
        "65"
      ],
      "e": "60 ditambah 5 sama dengan 65."
    },
    "en": {
      "q": "60 + 5 = ... What is the answer?",
      "o": [
        "67",
        "70",
        "62",
        "65"
      ],
      "e": "60 ditambah 5 sama dengan 65."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "47 menit = ... detik",
      "o": [
        "107",
        "1410",
        "4700",
        "2820"
      ],
      "e": "Satu menit sama dengan 60 detik."
    },
    "en": {
      "q": "47 menit = ... detik",
      "o": [
        "107",
        "1410",
        "4700",
        "2820"
      ],
      "e": "Satu menit sama dengan 60 detik."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 0,
    "id": {
      "q": "85 − 10 = ...",
      "o": [
        "75",
        "80",
        "72",
        "77"
      ],
      "e": "85 dikurangi 10 sama dengan 75."
    },
    "en": {
      "q": "85 − 10 = ... What is the answer?",
      "o": [
        "75",
        "80",
        "72",
        "77"
      ],
      "e": "85 dikurangi 10 sama dengan 75."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "8 × 4 = ...",
      "o": [
        "29",
        "34",
        "32",
        "37"
      ],
      "e": "8 kelompok yang masing-masing berisi 4 berjumlah 32."
    },
    "en": {
      "q": "8 × 4 = ... What is the answer?",
      "o": [
        "29",
        "34",
        "32",
        "37"
      ],
      "e": "8 kelompok yang masing-masing berisi 4 berjumlah 32."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 8 bagian sama besar dan 7 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "8/7",
        "7/8",
        "1/8",
        "7/9"
      ],
      "e": "Bagian yang dimakan adalah 7 dari 8 bagian, yaitu 7/8."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 8 bagian sama besar dan 7 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "8/7",
        "7/8",
        "1/8",
        "7/9"
      ],
      "e": "Bagian yang dimakan adalah 7 dari 8 bagian, yaitu 7/8."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 2,
    "id": {
      "q": "3 kilogram = ... gram",
      "o": [
        "30000",
        "30",
        "3000",
        "300"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    },
    "en": {
      "q": "3 kilogram = ... gram",
      "o": [
        "30000",
        "30",
        "3000",
        "300"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 2,
    "id": {
      "q": "8 kilogram = ... gram",
      "o": [
        "800",
        "80",
        "8000",
        "80000"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    },
    "en": {
      "q": "8 kilogram = ... gram",
      "o": [
        "800",
        "80",
        "8000",
        "80000"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "2 meter = ... sentimeter",
      "o": [
        "102",
        "20",
        "2000",
        "200"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    },
    "en": {
      "q": "2 meter = ... sentimeter",
      "o": [
        "102",
        "20",
        "2000",
        "200"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Luas persegi dengan sisi 6 cm adalah ... cm²",
      "o": [
        "33",
        "44",
        "40",
        "36"
      ],
      "e": "Luas persegi = sisi × sisi = 6 × 6 = 36 cm²."
    },
    "en": {
      "q": "Luas persegi dengan sisi 6 cm adalah ... cm²",
      "o": [
        "33",
        "44",
        "40",
        "36"
      ],
      "e": "Luas persegi = sisi × sisi = 6 × 6 = 36 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "2 kilogram = ... gram",
      "o": [
        "200",
        "20000",
        "20",
        "2000"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    },
    "en": {
      "q": "2 kilogram = ... gram",
      "o": [
        "200",
        "20000",
        "20",
        "2000"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 0,
    "id": {
      "q": "72 + 9 = ...",
      "o": [
        "81",
        "78",
        "86",
        "83"
      ],
      "e": "72 ditambah 9 sama dengan 81."
    },
    "en": {
      "q": "72 + 9 = ... What is the answer?",
      "o": [
        "81",
        "78",
        "86",
        "83"
      ],
      "e": "72 ditambah 9 sama dengan 81."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "48 + 9 = ...",
      "o": [
        "62",
        "59",
        "57",
        "54"
      ],
      "e": "48 ditambah 9 sama dengan 57."
    },
    "en": {
      "q": "48 + 9 = ... What is the answer?",
      "o": [
        "62",
        "59",
        "57",
        "54"
      ],
      "e": "48 ditambah 9 sama dengan 57."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 1,
    "id": {
      "q": "Persegi panjang memiliki panjang 9 cm dan lebar 7 cm. Kelilingnya adalah ... cm",
      "o": [
        "29",
        "32",
        "40",
        "36"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (9+7) = 32 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 9 cm dan lebar 7 cm. Kelilingnya adalah ... cm",
      "o": [
        "29",
        "32",
        "40",
        "36"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (9+7) = 32 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 5 bagian sama besar dan 6 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "5/6",
        "6/5",
        "6/6",
        "-1/5"
      ],
      "e": "Bagian yang dimakan adalah 6 dari 5 bagian, yaitu 6/5."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 5 bagian sama besar dan 6 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "5/6",
        "6/5",
        "6/6",
        "-1/5"
      ],
      "e": "Bagian yang dimakan adalah 6 dari 5 bagian, yaitu 6/5."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 7 bagian sama besar dan 5 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "2/7",
        "7/5",
        "5/7",
        "5/8"
      ],
      "e": "Bagian yang dimakan adalah 5 dari 7 bagian, yaitu 5/7."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 7 bagian sama besar dan 5 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "2/7",
        "7/5",
        "5/7",
        "5/8"
      ],
      "e": "Bagian yang dimakan adalah 5 dari 7 bagian, yaitu 5/7."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 2,
    "id": {
      "q": "42 menit = ... detik",
      "o": [
        "1260",
        "102",
        "2520",
        "4200"
      ],
      "e": "Satu menit sama dengan 60 detik."
    },
    "en": {
      "q": "42 menit = ... detik",
      "o": [
        "1260",
        "102",
        "2520",
        "4200"
      ],
      "e": "Satu menit sama dengan 60 detik."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "22 meter = ... sentimeter",
      "o": [
        "22000",
        "220",
        "122",
        "2200"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    },
    "en": {
      "q": "22 meter = ... sentimeter",
      "o": [
        "22000",
        "220",
        "122",
        "2200"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 0,
    "id": {
      "q": "Pecahan 7/6 dibaca ...",
      "o": [
        "7 per 6",
        "7 kali 6",
        "6 per 7",
        "7 tambah 6"
      ],
      "e": "7/6 dibaca 7 per 6."
    },
    "en": {
      "q": "Pecahan 7/6 dibaca ...",
      "o": [
        "7 per 6",
        "7 kali 6",
        "6 per 7",
        "7 tambah 6"
      ],
      "e": "7/6 dibaca 7 per 6."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 0,
    "id": {
      "q": "Pecahan 6/8 dibaca ...",
      "o": [
        "6 per 8",
        "8 per 6",
        "6 kali 8",
        "6 tambah 8"
      ],
      "e": "6/8 dibaca 6 per 8."
    },
    "en": {
      "q": "Pecahan 6/8 dibaca ...",
      "o": [
        "6 per 8",
        "8 per 6",
        "6 kali 8",
        "6 tambah 8"
      ],
      "e": "6/8 dibaca 6 per 8."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 1,
    "id": {
      "q": "84 + 5 = ...",
      "o": [
        "86",
        "89",
        "91",
        "94"
      ],
      "e": "84 ditambah 5 sama dengan 89."
    },
    "en": {
      "q": "84 + 5 = ... What is the answer?",
      "o": [
        "86",
        "89",
        "91",
        "94"
      ],
      "e": "84 ditambah 5 sama dengan 89."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Persegi panjang memiliki panjang 29 cm dan lebar 6 cm. Kelilingnya adalah ... cm",
      "o": [
        "67",
        "74",
        "78",
        "70"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (29+6) = 70 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 29 cm dan lebar 6 cm. Kelilingnya adalah ... cm",
      "o": [
        "67",
        "74",
        "78",
        "70"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (29+6) = 70 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 2,
    "id": {
      "q": "4 kilogram = ... gram",
      "o": [
        "400",
        "40000",
        "4000",
        "40"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    },
    "en": {
      "q": "4 kilogram = ... gram",
      "o": [
        "400",
        "40000",
        "4000",
        "40"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 2,
    "id": {
      "q": "17 meter = ... sentimeter",
      "o": [
        "17000",
        "170",
        "1700",
        "117"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    },
    "en": {
      "q": "17 meter = ... sentimeter",
      "o": [
        "17000",
        "170",
        "1700",
        "117"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "37 − 10 = ...",
      "o": [
        "29",
        "32",
        "24",
        "27"
      ],
      "e": "37 dikurangi 10 sama dengan 27."
    },
    "en": {
      "q": "37 − 10 = ... What is the answer?",
      "o": [
        "29",
        "32",
        "24",
        "27"
      ],
      "e": "37 dikurangi 10 sama dengan 27."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 1,
    "id": {
      "q": "6 hari = ... jam",
      "o": [
        "30",
        "144",
        "360",
        "72"
      ],
      "e": "Satu hari sama dengan 24 jam."
    },
    "en": {
      "q": "6 hari = ... jam",
      "o": [
        "30",
        "144",
        "360",
        "72"
      ],
      "e": "Satu hari sama dengan 24 jam."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 0,
    "id": {
      "q": "7 meter = ... sentimeter",
      "o": [
        "700",
        "107",
        "70",
        "7000"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    },
    "en": {
      "q": "7 meter = ... sentimeter",
      "o": [
        "700",
        "107",
        "70",
        "7000"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 0,
    "id": {
      "q": "Rata-rata dari 13, 23, dan 33 adalah ...",
      "o": [
        "23",
        "20",
        "27",
        "31"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 69 : 3 = 23."
    },
    "en": {
      "q": "Rata-rata dari 13, 23, dan 33 adalah ...",
      "o": [
        "23",
        "20",
        "27",
        "31"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 69 : 3 = 23."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "24 + 9 = ...",
      "o": [
        "35",
        "30",
        "38",
        "33"
      ],
      "e": "24 ditambah 9 sama dengan 33."
    },
    "en": {
      "q": "24 + 9 = ... What is the answer?",
      "o": [
        "35",
        "30",
        "38",
        "33"
      ],
      "e": "24 ditambah 9 sama dengan 33."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 0,
    "id": {
      "q": "Rata-rata dari 29, 39, dan 49 adalah ...",
      "o": [
        "39",
        "47",
        "36",
        "43"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 117 : 3 = 39."
    },
    "en": {
      "q": "Rata-rata dari 29, 39, dan 49 adalah ...",
      "o": [
        "39",
        "47",
        "36",
        "43"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 117 : 3 = 39."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 0,
    "id": {
      "q": "5 liter = ... mililiter",
      "o": [
        "5000",
        "50",
        "50000",
        "500"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    },
    "en": {
      "q": "5 liter = ... mililiter",
      "o": [
        "5000",
        "50",
        "50000",
        "500"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "63 : 7 = ...",
      "o": [
        "6",
        "14",
        "9",
        "11"
      ],
      "e": "63 dibagi 7 sama dengan 9."
    },
    "en": {
      "q": "63 : 7 = ... What is the answer?",
      "o": [
        "6",
        "14",
        "9",
        "11"
      ],
      "e": "63 dibagi 7 sama dengan 9."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "35 : 5 = ...",
      "o": [
        "9",
        "4",
        "7",
        "12"
      ],
      "e": "35 dibagi 5 sama dengan 7."
    },
    "en": {
      "q": "35 : 5 = ... What is the answer?",
      "o": [
        "9",
        "4",
        "7",
        "12"
      ],
      "e": "35 dibagi 5 sama dengan 7."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "4 × 5 = ...",
      "o": [
        "22",
        "25",
        "17",
        "20"
      ],
      "e": "4 kelompok yang masing-masing berisi 5 berjumlah 20."
    },
    "en": {
      "q": "4 × 5 = ... What is the answer?",
      "o": [
        "22",
        "25",
        "17",
        "20"
      ],
      "e": "4 kelompok yang masing-masing berisi 5 berjumlah 20."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 2,
    "id": {
      "q": "Luas persegi panjang berukuran 6 cm × 3 cm adalah ... cm²",
      "o": [
        "22",
        "26",
        "18",
        "15"
      ],
      "e": "Luas = panjang × lebar = 6 × 3 = 18 cm²."
    },
    "en": {
      "q": "Luas persegi panjang berukuran 6 cm × 3 cm adalah ... cm²",
      "o": [
        "22",
        "26",
        "18",
        "15"
      ],
      "e": "Luas = panjang × lebar = 6 × 3 = 18 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 2,
    "id": {
      "q": "Luas persegi dengan sisi 7 cm adalah ... cm²",
      "o": [
        "57",
        "46",
        "49",
        "53"
      ],
      "e": "Luas persegi = sisi × sisi = 7 × 7 = 49 cm²."
    },
    "en": {
      "q": "Luas persegi dengan sisi 7 cm adalah ... cm²",
      "o": [
        "57",
        "46",
        "49",
        "53"
      ],
      "e": "Luas persegi = sisi × sisi = 7 × 7 = 49 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 3,
    "id": {
      "q": "Pecahan 2/8 dibaca ...",
      "o": [
        "2 tambah 8",
        "8 per 2",
        "2 kali 8",
        "2 per 8"
      ],
      "e": "2/8 dibaca 2 per 8."
    },
    "en": {
      "q": "Pecahan 2/8 dibaca ...",
      "o": [
        "2 tambah 8",
        "8 per 2",
        "2 kali 8",
        "2 per 8"
      ],
      "e": "2/8 dibaca 2 per 8."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Persegi panjang memiliki panjang 17 cm dan lebar 8 cm. Kelilingnya adalah ... cm",
      "o": [
        "54",
        "58",
        "47",
        "50"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (17+8) = 50 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 17 cm dan lebar 8 cm. Kelilingnya adalah ... cm",
      "o": [
        "54",
        "58",
        "47",
        "50"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (17+8) = 50 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 1,
    "id": {
      "q": "8 hari = ... jam",
      "o": [
        "32",
        "192",
        "480",
        "96"
      ],
      "e": "Satu hari sama dengan 24 jam."
    },
    "en": {
      "q": "8 hari = ... jam",
      "o": [
        "32",
        "192",
        "480",
        "96"
      ],
      "e": "Satu hari sama dengan 24 jam."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Pecahan 8/4 dibaca ...",
      "o": [
        "8 kali 4",
        "8 per 4",
        "8 tambah 4",
        "4 per 8"
      ],
      "e": "8/4 dibaca 8 per 4."
    },
    "en": {
      "q": "Pecahan 8/4 dibaca ...",
      "o": [
        "8 kali 4",
        "8 per 4",
        "8 tambah 4",
        "4 per 8"
      ],
      "e": "8/4 dibaca 8 per 4."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "33 : 3 = ...",
      "o": [
        "13",
        "16",
        "11",
        "8"
      ],
      "e": "33 dibagi 3 sama dengan 11."
    },
    "en": {
      "q": "33 : 3 = ... What is the answer?",
      "o": [
        "13",
        "16",
        "11",
        "8"
      ],
      "e": "33 dibagi 3 sama dengan 11."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 3,
    "id": {
      "q": "Pecahan 5/4 dibaca ...",
      "o": [
        "4 per 5",
        "5 kali 4",
        "5 tambah 4",
        "5 per 4"
      ],
      "e": "5/4 dibaca 5 per 4."
    },
    "en": {
      "q": "Pecahan 5/4 dibaca ...",
      "o": [
        "4 per 5",
        "5 kali 4",
        "5 tambah 4",
        "5 per 4"
      ],
      "e": "5/4 dibaca 5 per 4."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 7 bagian sama besar dan 8 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "7/8",
        "8/7",
        "-1/7",
        "8/8"
      ],
      "e": "Bagian yang dimakan adalah 8 dari 7 bagian, yaitu 8/7."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 7 bagian sama besar dan 8 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "7/8",
        "8/7",
        "-1/7",
        "8/8"
      ],
      "e": "Bagian yang dimakan adalah 8 dari 7 bagian, yaitu 8/7."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Persegi panjang memiliki panjang 5 cm dan lebar 3 cm. Kelilingnya adalah ... cm",
      "o": [
        "13",
        "24",
        "20",
        "16"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (5+3) = 16 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 5 cm dan lebar 3 cm. Kelilingnya adalah ... cm",
      "o": [
        "13",
        "24",
        "20",
        "16"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (5+3) = 16 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "12 meter = ... sentimeter",
      "o": [
        "120",
        "12000",
        "112",
        "1200"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    },
    "en": {
      "q": "12 meter = ... sentimeter",
      "o": [
        "120",
        "12000",
        "112",
        "1200"
      ],
      "e": "Satu meter sama dengan 100 sentimeter."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 0,
    "id": {
      "q": "36 + 5 = ...",
      "o": [
        "41",
        "38",
        "43",
        "46"
      ],
      "e": "36 ditambah 5 sama dengan 41."
    },
    "en": {
      "q": "36 + 5 = ... What is the answer?",
      "o": [
        "41",
        "38",
        "43",
        "46"
      ],
      "e": "36 ditambah 5 sama dengan 41."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 0,
    "id": {
      "q": "7 kilogram = ... gram",
      "o": [
        "7000",
        "700",
        "70",
        "70000"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    },
    "en": {
      "q": "7 kilogram = ... gram",
      "o": [
        "7000",
        "700",
        "70",
        "70000"
      ],
      "e": "Satu kilogram sama dengan 1.000 gram."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 1,
    "id": {
      "q": "Luas persegi panjang berukuran 10 cm × 7 cm adalah ... cm²",
      "o": [
        "67",
        "70",
        "78",
        "74"
      ],
      "e": "Luas = panjang × lebar = 10 × 7 = 70 cm²."
    },
    "en": {
      "q": "Luas persegi panjang berukuran 10 cm × 7 cm adalah ... cm²",
      "o": [
        "67",
        "70",
        "78",
        "74"
      ],
      "e": "Luas = panjang × lebar = 10 × 7 = 70 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 4 bagian sama besar dan 3 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "1/4",
        "4/3",
        "3/4",
        "3/5"
      ],
      "e": "Bagian yang dimakan adalah 3 dari 4 bagian, yaitu 3/4."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 4 bagian sama besar dan 3 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "1/4",
        "4/3",
        "3/4",
        "3/5"
      ],
      "e": "Bagian yang dimakan adalah 3 dari 4 bagian, yaitu 3/4."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Pecahan 4/5 dibaca ...",
      "o": [
        "4 kali 5",
        "5 per 4",
        "4 per 5",
        "4 tambah 5"
      ],
      "e": "4/5 dibaca 4 per 5."
    },
    "en": {
      "q": "Pecahan 4/5 dibaca ...",
      "o": [
        "4 kali 5",
        "5 per 4",
        "4 per 5",
        "4 tambah 5"
      ],
      "e": "4/5 dibaca 4 per 5."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 2,
    "id": {
      "q": "Rata-rata dari 33, 43, dan 53 adalah ...",
      "o": [
        "51",
        "47",
        "43",
        "40"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 129 : 3 = 43."
    },
    "en": {
      "q": "Rata-rata dari 33, 43, dan 53 adalah ...",
      "o": [
        "51",
        "47",
        "43",
        "40"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 129 : 3 = 43."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 3,
    "id": {
      "q": "37 menit = ... detik",
      "o": [
        "1110",
        "3700",
        "97",
        "2220"
      ],
      "e": "Satu menit sama dengan 60 detik."
    },
    "en": {
      "q": "37 menit = ... detik",
      "o": [
        "1110",
        "3700",
        "97",
        "2220"
      ],
      "e": "Satu menit sama dengan 60 detik."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 1,
    "id": {
      "q": "2 hari = ... jam",
      "o": [
        "26",
        "48",
        "24",
        "120"
      ],
      "e": "Satu hari sama dengan 24 jam."
    },
    "en": {
      "q": "2 hari = ... jam",
      "o": [
        "26",
        "48",
        "24",
        "120"
      ],
      "e": "Satu hari sama dengan 24 jam."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 2,
    "id": {
      "q": "52 menit = ... detik",
      "o": [
        "5200",
        "112",
        "3120",
        "1560"
      ],
      "e": "Satu menit sama dengan 60 detik."
    },
    "en": {
      "q": "52 menit = ... detik",
      "o": [
        "5200",
        "112",
        "3120",
        "1560"
      ],
      "e": "Satu menit sama dengan 60 detik."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 1,
    "id": {
      "q": "3 hari = ... jam",
      "o": [
        "27",
        "72",
        "180",
        "36"
      ],
      "e": "Satu hari sama dengan 24 jam."
    },
    "en": {
      "q": "3 hari = ... jam",
      "o": [
        "27",
        "72",
        "180",
        "36"
      ],
      "e": "Satu hari sama dengan 24 jam."
    }
  },
  {
    "s": "mtk",
    "grade": 5,
    "topic": "Pengukuran",
    "a": 0,
    "id": {
      "q": "7 liter = ... mililiter",
      "o": [
        "7000",
        "700",
        "70000",
        "70"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    },
    "en": {
      "q": "7 liter = ... mililiter",
      "o": [
        "7000",
        "700",
        "70000",
        "70"
      ],
      "e": "Satu liter sama dengan 1.000 mililiter."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 1,
    "id": {
      "q": "Luas persegi dengan sisi 8 cm adalah ... cm²",
      "o": [
        "61",
        "64",
        "72",
        "68"
      ],
      "e": "Luas persegi = sisi × sisi = 8 × 8 = 64 cm²."
    },
    "en": {
      "q": "Luas persegi dengan sisi 8 cm adalah ... cm²",
      "o": [
        "61",
        "64",
        "72",
        "68"
      ],
      "e": "Luas persegi = sisi × sisi = 8 × 8 = 64 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Persegi panjang memiliki panjang 21 cm dan lebar 5 cm. Kelilingnya adalah ... cm",
      "o": [
        "60",
        "49",
        "56",
        "52"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (21+5) = 52 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 21 cm dan lebar 5 cm. Kelilingnya adalah ... cm",
      "o": [
        "60",
        "49",
        "56",
        "52"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (21+5) = 52 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 2,
    "id": {
      "q": "49 − 6 = ...",
      "o": [
        "40",
        "48",
        "43",
        "45"
      ],
      "e": "49 dikurangi 6 sama dengan 43."
    },
    "en": {
      "q": "49 − 6 = ... What is the answer?",
      "o": [
        "40",
        "48",
        "43",
        "45"
      ],
      "e": "49 dikurangi 6 sama dengan 43."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 2,
    "id": {
      "q": "Persegi panjang memiliki panjang 13 cm dan lebar 4 cm. Kelilingnya adalah ... cm",
      "o": [
        "31",
        "42",
        "34",
        "38"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (13+4) = 34 cm."
    },
    "en": {
      "q": "Persegi panjang memiliki panjang 13 cm dan lebar 4 cm. Kelilingnya adalah ... cm",
      "o": [
        "31",
        "42",
        "34",
        "38"
      ],
      "e": "Keliling = 2 × (panjang + lebar) = 2 × (13+4) = 34 cm."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 0,
    "id": {
      "q": "15 : 3 = ...",
      "o": [
        "5",
        "7",
        "2",
        "10"
      ],
      "e": "15 dibagi 3 sama dengan 5."
    },
    "en": {
      "q": "15 : 3 = ... What is the answer?",
      "o": [
        "5",
        "7",
        "2",
        "10"
      ],
      "e": "15 dibagi 3 sama dengan 5."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Luas persegi panjang berukuran 6 cm × 5 cm adalah ... cm²",
      "o": [
        "34",
        "27",
        "38",
        "30"
      ],
      "e": "Luas = panjang × lebar = 6 × 5 = 30 cm²."
    },
    "en": {
      "q": "Luas persegi panjang berukuran 6 cm × 5 cm adalah ... cm²",
      "o": [
        "34",
        "27",
        "38",
        "30"
      ],
      "e": "Luas = panjang × lebar = 6 × 5 = 30 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "8 × 5 = ...",
      "o": [
        "42",
        "45",
        "37",
        "40"
      ],
      "e": "8 kelompok yang masing-masing berisi 5 berjumlah 40."
    },
    "en": {
      "q": "8 × 5 = ... What is the answer?",
      "o": [
        "42",
        "45",
        "37",
        "40"
      ],
      "e": "8 kelompok yang masing-masing berisi 5 berjumlah 40."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 2,
    "id": {
      "q": "Pecahan 2/4 dibaca ...",
      "o": [
        "4 per 2",
        "2 tambah 4",
        "2 per 4",
        "2 kali 4"
      ],
      "e": "2/4 dibaca 2 per 4."
    },
    "en": {
      "q": "Pecahan 2/4 dibaca ...",
      "o": [
        "4 per 2",
        "2 tambah 4",
        "2 per 4",
        "2 kali 4"
      ],
      "e": "2/4 dibaca 2 per 4."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 0,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 6 bagian sama besar dan 2 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "2/6",
        "6/2",
        "2/7",
        "4/6"
      ],
      "e": "Bagian yang dimakan adalah 2 dari 6 bagian, yaitu 2/6."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 6 bagian sama besar dan 2 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "2/6",
        "6/2",
        "2/7",
        "4/6"
      ],
      "e": "Bagian yang dimakan adalah 2 dari 6 bagian, yaitu 2/6."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 3,
    "id": {
      "q": "Luas persegi panjang berukuran 10 cm × 5 cm adalah ... cm²",
      "o": [
        "54",
        "58",
        "47",
        "50"
      ],
      "e": "Luas = panjang × lebar = 10 × 5 = 50 cm²."
    },
    "en": {
      "q": "Luas persegi panjang berukuran 10 cm × 5 cm adalah ... cm²",
      "o": [
        "54",
        "58",
        "47",
        "50"
      ],
      "e": "Luas = panjang × lebar = 10 × 5 = 50 cm²."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "61 − 10 = ...",
      "o": [
        "48",
        "56",
        "53",
        "51"
      ],
      "e": "61 dikurangi 10 sama dengan 51."
    },
    "en": {
      "q": "61 − 10 = ... What is the answer?",
      "o": [
        "48",
        "56",
        "53",
        "51"
      ],
      "e": "61 dikurangi 10 sama dengan 51."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Pecahan",
    "a": 1,
    "id": {
      "q": "Jika sebuah kue dibagi menjadi 4 bagian sama besar dan 7 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "7/5",
        "7/4",
        "-3/4",
        "4/7"
      ],
      "e": "Bagian yang dimakan adalah 7 dari 4 bagian, yaitu 7/4."
    },
    "en": {
      "q": "Jika sebuah kue dibagi menjadi 4 bagian sama besar dan 7 bagian dimakan, pecahan yang dimakan adalah ...",
      "o": [
        "7/5",
        "7/4",
        "-3/4",
        "4/7"
      ],
      "e": "Bagian yang dimakan adalah 7 dari 4 bagian, yaitu 7/4."
    }
  },
  {
    "s": "mtk",
    "grade": 4,
    "topic": "Operasi hitung",
    "a": 3,
    "id": {
      "q": "4 × 6 = ...",
      "o": [
        "29",
        "21",
        "26",
        "24"
      ],
      "e": "4 kelompok yang masing-masing berisi 6 berjumlah 24."
    },
    "en": {
      "q": "4 × 6 = ... What is the answer?",
      "o": [
        "29",
        "21",
        "26",
        "24"
      ],
      "e": "4 kelompok yang masing-masing berisi 6 berjumlah 24."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 0,
    "id": {
      "q": "Rata-rata dari 17, 27, dan 37 adalah ...",
      "o": [
        "27",
        "35",
        "31",
        "24"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 81 : 3 = 27."
    },
    "en": {
      "q": "Rata-rata dari 17, 27, dan 37 adalah ...",
      "o": [
        "27",
        "35",
        "31",
        "24"
      ],
      "e": "Rata-rata = jumlah data dibagi banyak data = 81 : 3 = 27."
    }
  },
  {
    "s": "mtk",
    "grade": 6,
    "topic": "Geometri dan data",
    "a": 0,
    "id": {
      "q": "Luas persegi panjang berukuran 6 cm × 6 cm adalah ... cm²",
      "o": [
        "36",
        "33",
        "44",
        "40"
      ],
      "e": "Luas = panjang × lebar = 6 × 6 = 36 cm²."
    },
    "en": {
      "q": "Luas persegi panjang berukuran 6 cm × 6 cm adalah ... cm²",
      "o": [
        "36",
        "33",
        "44",
        "40"
      ],
      "e": "Luas = panjang × lebar = 6 × 6 = 36 cm²."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "latar",
        "alur",
        "tokoh"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "latar",
        "alur",
        "tokoh"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "latar",
        "amanat",
        "alur"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "latar",
        "amanat",
        "alur"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "alur",
        "tokoh",
        "latar"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "alur",
        "tokoh",
        "latar"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "latar",
        "tokoh",
        "amanat",
        "alur"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "latar",
        "tokoh",
        "amanat",
        "alur"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "latar",
        "alur",
        "tokoh"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "latar",
        "alur",
        "tokoh"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "judul",
        "tema",
        "latar",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "judul",
        "tema",
        "latar",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "pada",
        "di",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "pada",
        "di",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "latar",
        "judul",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "latar",
        "judul",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "alur",
        "judul",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "alur",
        "judul",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "warna sampul",
        "isi bacaan",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "warna sampul",
        "isi bacaan",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "titik",
    "accept": [
      "titik"
    ],
    "id": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "en": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "answer_en": "titik",
    "accept_en": [
      "titik"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "rendah",
    "accept": [
      "rendah"
    ],
    "id": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "en": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "answer_en": "rendah",
    "accept_en": [
      "rendah"
    ]
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "warna sampul",
        "jumlah halaman",
        "nama penerbit",
        "isi bacaan"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "warna sampul",
        "jumlah halaman",
        "nama penerbit",
        "isi bacaan"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "latar",
        "tokoh",
        "rima"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "latar",
        "tokoh",
        "rima"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "empat",
    "accept": [
      "empat"
    ],
    "id": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "en": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "answer_en": "empat",
    "accept_en": [
      "empat"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "isi bacaan",
        "nama penerbit",
        "warna sampul",
        "jumlah halaman"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "isi bacaan",
        "nama penerbit",
        "warna sampul",
        "jumlah halaman"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "latar",
        "tokoh",
        "alur",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "latar",
        "tokoh",
        "alur",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Kata yang memiliki arti sama disebut ...",
      "o": [
        "antonim",
        "homonim",
        "sinonim",
        "akronim"
      ],
      "e": "Sinonim adalah persamaan kata."
    },
    "en": {
      "q": "Kata yang memiliki arti sama disebut ...",
      "o": [
        "antonim",
        "homonim",
        "sinonim",
        "akronim"
      ],
      "e": "Sinonim adalah persamaan kata."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "tokoh",
        "latar",
        "rima"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "tokoh",
        "latar",
        "rima"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "baik",
    "accept": [
      "baik"
    ],
    "id": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "en": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "answer_en": "baik",
    "accept_en": [
      "baik"
    ]
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Teks yang berisi langkah-langkah melakukan sesuatu disebut ...",
      "o": [
        "teks berita",
        "teks petunjuk",
        "teks puisi",
        "teks dongeng"
      ],
      "e": "Teks petunjuk menjelaskan urutan langkah."
    },
    "en": {
      "q": "Teks yang berisi langkah-langkah melakukan sesuatu disebut ...",
      "o": [
        "teks berita",
        "teks petunjuk",
        "teks puisi",
        "teks dongeng"
      ],
      "e": "Teks petunjuk menjelaskan urutan langkah."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "rendah",
    "accept": [
      "rendah"
    ],
    "id": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "en": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "answer_en": "rendah",
    "accept_en": [
      "rendah"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "inti paragraf",
    "accept": [
      "inti paragraf"
    ],
    "id": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "en": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "answer_en": "inti paragraf",
    "accept_en": [
      "inti paragraf"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "dari",
        "ke",
        "di",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "dari",
        "ke",
        "di",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "baik",
    "accept": [
      "baik"
    ],
    "id": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "en": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "answer_en": "baik",
    "accept_en": [
      "baik"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "pada",
        "di",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "pada",
        "di",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "pada",
        "dari",
        "ke"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "pada",
        "dari",
        "ke"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "ke",
        "dari",
        "di",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "ke",
        "dari",
        "di",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "tokoh",
        "latar",
        "rima"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "tokoh",
        "latar",
        "rima"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Tokoh yang memiliki peran paling penting dalam cerita disebut ...",
      "o": [
        "tokoh utama",
        "penulis",
        "tokoh tambahan",
        "pembaca"
      ],
      "e": "Tokoh utama menjadi pusat cerita."
    },
    "en": {
      "q": "Tokoh yang memiliki peran paling penting dalam cerita disebut ...",
      "o": [
        "tokoh utama",
        "penulis",
        "tokoh tambahan",
        "pembaca"
      ],
      "e": "Tokoh utama menjadi pusat cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Gagasan utama dalam sebuah paragraf disebut ...",
      "o": [
        "judul buku",
        "tanda baca",
        "ide pokok",
        "kalimat penjelas"
      ],
      "e": "Ide pokok berisi inti pembahasan paragraf."
    },
    "en": {
      "q": "Gagasan utama dalam sebuah paragraf disebut ...",
      "o": [
        "judul buku",
        "tanda baca",
        "ide pokok",
        "kalimat penjelas"
      ],
      "e": "Ide pokok berisi inti pembahasan paragraf."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "titik",
    "accept": [
      "titik"
    ],
    "id": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "en": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "answer_en": "titik",
    "accept_en": [
      "titik"
    ]
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Tanda baca yang digunakan pada akhir kalimat tanya adalah ...",
      "o": [
        "tanda tanya (?)",
        "koma (,)",
        "titik (.)",
        "titik dua (:)"
      ],
      "e": "Kalimat tanya diakhiri tanda tanya."
    },
    "en": {
      "q": "Tanda baca yang digunakan pada akhir kalimat tanya adalah ...",
      "o": [
        "tanda tanya (?)",
        "koma (,)",
        "titik (.)",
        "titik dua (:)"
      ],
      "e": "Kalimat tanya diakhiri tanda tanya."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "rendah",
    "accept": [
      "rendah"
    ],
    "id": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "en": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "answer_en": "rendah",
    "accept_en": [
      "rendah"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "judul",
        "latar",
        "tema",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "judul",
        "latar",
        "tema",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "latar",
        "rima",
        "amanat",
        "tokoh"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "latar",
        "rima",
        "amanat",
        "tokoh"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "tema",
        "judul",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "tema",
        "judul",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "warna sampul",
        "isi bacaan",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "warna sampul",
        "isi bacaan",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "alur",
        "latar",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "alur",
        "latar",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "ke",
        "dari",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "ke",
        "dari",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "tema",
        "judul",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "tema",
        "judul",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "empat",
    "accept": [
      "empat"
    ],
    "id": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "en": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "answer_en": "empat",
    "accept_en": [
      "empat"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "latar",
        "tokoh",
        "alur",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "latar",
        "tokoh",
        "alur",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "titik",
    "accept": [
      "titik"
    ],
    "id": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "en": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "answer_en": "titik",
    "accept_en": [
      "titik"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Dua baris pertama pada pantun disebut ...",
      "o": [
        "sampiran",
        "judul",
        "isi",
        "amanat"
      ],
      "e": "Baris pertama dan kedua merupakan sampiran."
    },
    "en": {
      "q": "Dua baris pertama pada pantun disebut ...",
      "o": [
        "sampiran",
        "judul",
        "isi",
        "amanat"
      ],
      "e": "Baris pertama dan kedua merupakan sampiran."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Ringkasan dibuat dengan mengambil ... bacaan.",
      "o": [
        "hiasan kata",
        "inti informasi",
        "dialog saja",
        "semua kalimat"
      ],
      "e": "Ringkasan memuat pokok informasi secara singkat."
    },
    "en": {
      "q": "Ringkasan dibuat dengan mengambil ... bacaan.",
      "o": [
        "hiasan kata",
        "inti informasi",
        "dialog saja",
        "semua kalimat"
      ],
      "e": "Ringkasan memuat pokok informasi secara singkat."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "rendah",
    "accept": [
      "rendah"
    ],
    "id": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "en": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "answer_en": "rendah",
    "accept_en": [
      "rendah"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "judul",
        "latar",
        "tema",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "judul",
        "latar",
        "tema",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Kalimat yang berisi ajakan biasanya menggunakan kata ...",
      "o": [
        "karena",
        "mari",
        "tetapi",
        "meskipun"
      ],
      "e": "Kata mari dapat digunakan untuk mengajak."
    },
    "en": {
      "q": "Kalimat yang berisi ajakan biasanya menggunakan kata ...",
      "o": [
        "karena",
        "mari",
        "tetapi",
        "meskipun"
      ],
      "e": "Kata mari dapat digunakan untuk mengajak."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "pada",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "pada",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "dari",
        "pada",
        "ke"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "dari",
        "pada",
        "ke"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "nama penerbit",
        "isi bacaan",
        "warna sampul"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "nama penerbit",
        "isi bacaan",
        "warna sampul"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "warna sampul",
        "nama penerbit",
        "isi bacaan"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "warna sampul",
        "nama penerbit",
        "isi bacaan"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Kata yang memiliki arti berlawanan disebut ...",
      "o": [
        "kata baku",
        "antonim",
        "sinonim",
        "kata serapan"
      ],
      "e": "Antonim adalah lawan kata."
    },
    "en": {
      "q": "Kata yang memiliki arti berlawanan disebut ...",
      "o": [
        "kata baku",
        "antonim",
        "sinonim",
        "kata serapan"
      ],
      "e": "Antonim adalah lawan kata."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "judul",
        "tema",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "judul",
        "tema",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "inti paragraf",
    "accept": [
      "inti paragraf"
    ],
    "id": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "en": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "answer_en": "inti paragraf",
    "accept_en": [
      "inti paragraf"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "nama penerbit",
        "warna sampul",
        "isi bacaan"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "nama penerbit",
        "warna sampul",
        "isi bacaan"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "tokoh",
        "amanat",
        "rima",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "tokoh",
        "amanat",
        "rima",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "isi bacaan",
        "warna sampul",
        "nama penerbit",
        "jumlah halaman"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "isi bacaan",
        "warna sampul",
        "nama penerbit",
        "jumlah halaman"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "rima",
        "tokoh",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "rima",
        "tokoh",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "judul",
        "alur",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "judul",
        "alur",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "empat",
    "accept": [
      "empat"
    ],
    "id": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "en": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "answer_en": "empat",
    "accept_en": [
      "empat"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "isi bacaan",
        "warna sampul",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "jumlah halaman",
        "isi bacaan",
        "warna sampul",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "latar",
        "tokoh",
        "rima",
        "amanat"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "latar",
        "tokoh",
        "rima",
        "amanat"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Laporan hasil pengamatan harus ditulis berdasarkan ...",
      "o": [
        "dugaan saja",
        "khayalan",
        "fakta yang diamati",
        "cerita teman"
      ],
      "e": "Laporan pengamatan harus sesuai fakta."
    },
    "en": {
      "q": "Laporan hasil pengamatan harus ditulis berdasarkan ...",
      "o": [
        "dugaan saja",
        "khayalan",
        "fakta yang diamati",
        "cerita teman"
      ],
      "e": "Laporan pengamatan harus sesuai fakta."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "judul",
        "tema",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "alur",
        "judul",
        "tema",
        "latar"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "baik",
    "accept": [
      "baik"
    ],
    "id": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "en": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "answer_en": "baik",
    "accept_en": [
      "baik"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "baik",
    "accept": [
      "baik"
    ],
    "id": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "en": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "answer_en": "baik",
    "accept_en": [
      "baik"
    ]
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "empat",
    "accept": [
      "empat"
    ],
    "id": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "en": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "answer_en": "empat",
    "accept_en": [
      "empat"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "latar",
        "tema",
        "judul",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "latar",
        "tema",
        "judul",
        "alur"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Kalimat efektif adalah kalimat yang ...",
      "o": [
        "selalu memakai kata asing",
        "jelas dan tidak bertele-tele",
        "tidak memiliki subjek",
        "sangat panjang"
      ],
      "e": "Kalimat efektif menyampaikan pesan secara jelas."
    },
    "en": {
      "q": "Kalimat efektif adalah kalimat yang ...",
      "o": [
        "selalu memakai kata asing",
        "jelas dan tidak bertele-tele",
        "tidak memiliki subjek",
        "sangat panjang"
      ],
      "e": "Kalimat efektif menyampaikan pesan secara jelas."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Kata baku terdapat pada pilihan ...",
      "o": [
        "apotik",
        "ijin",
        "praktek",
        "praktik"
      ],
      "e": "Bentuk baku menurut kaidah adalah praktik."
    },
    "en": {
      "q": "Kata baku terdapat pada pilihan ...",
      "o": [
        "apotik",
        "ijin",
        "praktek",
        "praktik"
      ],
      "e": "Bentuk baku menurut kaidah adalah praktik."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Pantun biasanya terdiri atas ... baris dalam satu bait.",
      "o": [
        "tiga",
        "empat",
        "dua",
        "lima"
      ],
      "e": "Pantun umumnya memiliki empat baris."
    },
    "en": {
      "q": "Pantun biasanya terdiri atas ... baris dalam satu bait.",
      "o": [
        "tiga",
        "empat",
        "dua",
        "lima"
      ],
      "e": "Pantun umumnya memiliki empat baris."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "alur",
        "tokoh",
        "amanat",
        "latar"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "alur",
        "tokoh",
        "amanat",
        "latar"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "dari",
        "pada",
        "di",
        "ke"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "dari",
        "pada",
        "di",
        "ke"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "rima",
        "tokoh",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "rima",
        "tokoh",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "rima",
        "tokoh",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "amanat",
        "rima",
        "tokoh",
        "latar"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "inti paragraf",
    "accept": [
      "inti paragraf"
    ],
    "id": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "en": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "answer_en": "inti paragraf",
    "accept_en": [
      "inti paragraf"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "ke",
        "di",
        "dari",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "ke",
        "di",
        "dari",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "amanat",
        "latar",
        "alur"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "amanat",
        "latar",
        "alur"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "baik",
    "accept": [
      "baik"
    ],
    "id": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "en": {
      "q": "Sebutkan satu contoh kata sifat.",
      "e": "Kata sifat menjelaskan sifat atau keadaan."
    },
    "answer_en": "baik",
    "accept_en": [
      "baik"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "isi bacaan",
        "jumlah halaman",
        "warna sampul",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "isi bacaan",
        "jumlah halaman",
        "warna sampul",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "latar",
        "alur",
        "judul"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    },
    "en": {
      "q": "Urutan peristiwa dalam cerita disebut ...",
      "o": [
        "tema",
        "latar",
        "alur",
        "judul"
      ],
      "e": "Alur adalah rangkaian peristiwa."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "inti paragraf",
    "accept": [
      "inti paragraf"
    ],
    "id": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "en": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "answer_en": "inti paragraf",
    "accept_en": [
      "inti paragraf"
    ]
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "warna sampul",
        "nama penerbit",
        "isi bacaan",
        "jumlah halaman"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "warna sampul",
        "nama penerbit",
        "isi bacaan",
        "jumlah halaman"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "rima",
        "amanat",
        "latar",
        "tokoh"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "rima",
        "amanat",
        "latar",
        "tokoh"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "ke",
        "dari",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "ke",
        "dari",
        "pada"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "latar",
        "rima",
        "amanat",
        "tokoh"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "latar",
        "rima",
        "amanat",
        "tokoh"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "rendah",
    "accept": [
      "rendah"
    ],
    "id": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "en": {
      "q": "Tuliskan lawan kata “tinggi”.",
      "e": "Rendah merupakan lawan kata tinggi."
    },
    "answer_en": "rendah",
    "accept_en": [
      "rendah"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 1,
    "id": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "tokoh",
        "latar",
        "rima",
        "amanat"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    },
    "en": {
      "q": "Tempat dan waktu terjadinya cerita disebut ...",
      "o": [
        "tokoh",
        "latar",
        "rima",
        "amanat"
      ],
      "e": "Latar menunjukkan tempat, waktu, atau suasana."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "alur",
        "latar",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "tokoh",
        "alur",
        "latar",
        "amanat"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "titik",
    "accept": [
      "titik"
    ],
    "id": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "en": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "answer_en": "titik",
    "accept_en": [
      "titik"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "empat",
    "accept": [
      "empat"
    ],
    "id": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "en": {
      "q": "Sebutkan jumlah baris dalam satu bait pantun.",
      "e": "Satu bait pantun terdiri atas empat baris."
    },
    "answer_en": "empat",
    "accept_en": [
      "empat"
    ]
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Kalimat yang digunakan untuk meminta informasi disebut ...",
      "o": [
        "kalimat seru",
        "kalimat berita",
        "kalimat perintah",
        "kalimat tanya"
      ],
      "e": "Kalimat tanya digunakan untuk menanyakan sesuatu."
    },
    "en": {
      "q": "Kalimat yang digunakan untuk meminta informasi disebut ...",
      "o": [
        "kalimat seru",
        "kalimat berita",
        "kalimat perintah",
        "kalimat tanya"
      ],
      "e": "Kalimat tanya digunakan untuk menanyakan sesuatu."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "inti paragraf",
    "accept": [
      "inti paragraf"
    ],
    "id": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "en": {
      "q": "Apa yang dimaksud ide pokok?",
      "e": "Ide pokok adalah inti pembahasan paragraf."
    },
    "answer_en": "inti paragraf",
    "accept_en": [
      "inti paragraf"
    ]
  },
  {
    "s": "bindo",
    "grade": 4,
    "topic": "Membaca dan kebahasaan",
    "a": 3,
    "id": {
      "q": "Orang yang memberikan informasi dalam wawancara disebut ...",
      "o": [
        "pembaca",
        "pewawancara",
        "penonton",
        "narasumber"
      ],
      "e": "Narasumber menjawab pertanyaan wawancara."
    },
    "en": {
      "q": "Orang yang memberikan informasi dalam wawancara disebut ...",
      "o": [
        "pembaca",
        "pewawancara",
        "penonton",
        "narasumber"
      ],
      "e": "Narasumber menjawab pertanyaan wawancara."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 0,
    "id": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "latar",
        "alur",
        "tokoh"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    },
    "en": {
      "q": "Dalam cerita, pesan yang ingin disampaikan penulis disebut ...",
      "o": [
        "amanat",
        "latar",
        "alur",
        "tokoh"
      ],
      "e": "Amanat adalah pesan dalam cerita."
    }
  },
  {
    "s": "bindo",
    "grade": 6,
    "topic": "Menulis dan memahami teks",
    "type": "essay",
    "answer": "titik",
    "accept": [
      "titik"
    ],
    "id": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "en": {
      "q": "Apa nama tanda baca pada akhir kalimat berita?",
      "e": "Kalimat berita biasanya diakhiri tanda titik."
    },
    "answer_en": "titik",
    "accept_en": [
      "titik"
    ]
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "pada",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    },
    "en": {
      "q": "Kata depan yang tepat pada kalimat “Ayah pergi ... kantor” adalah ...",
      "o": [
        "di",
        "pada",
        "ke",
        "dari"
      ],
      "e": "Kata ke menunjukkan arah tujuan."
    }
  },
  {
    "s": "bindo",
    "grade": 5,
    "topic": "Membaca dan kebahasaan",
    "a": 2,
    "id": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "warna sampul",
        "jumlah halaman",
        "isi bacaan",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    },
    "en": {
      "q": "Judul yang baik harus sesuai dengan ...",
      "o": [
        "warna sampul",
        "jumlah halaman",
        "isi bacaan",
        "nama penerbit"
      ],
      "e": "Judul menggambarkan isi bacaan."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “book”?",
      "o": [
        "kupu-kupu",
        "buku",
        "gunung",
        "berawan"
      ],
      "e": "Kata “book” berarti “buku”."
    },
    "en": {
      "q": "What does the English word “book” mean?",
      "o": [
        "kupu-kupu",
        "buku",
        "gunung",
        "berawan"
      ],
      "e": "“book” means “buku”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "books",
    "accept": [
      "books"
    ],
    "id": {
      "q": "Tuliskan bentuk jamak dari “book”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the plural form of “book”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "books",
    "accept_en": [
      "books"
    ]
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “beautiful”?",
      "o": [
        "ramah",
        "indah",
        "kebun",
        "sepeda"
      ],
      "e": "Kata “beautiful” berarti “indah”."
    },
    "en": {
      "q": "What does the English word “beautiful” mean?",
      "o": [
        "ramah",
        "indah",
        "kebun",
        "sepeda"
      ],
      "e": "“beautiful” means “indah”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "terima kasih",
    "accept": [
      "terima kasih"
    ],
    "id": {
      "q": "Apa arti “thank you”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What does “thank you” mean?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "thank you",
    "accept_en": [
      "thank you"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “breakfast”?",
      "o": [
        "indah",
        "sarapan",
        "pagi",
        "saudara laki-laki"
      ],
      "e": "Kata “breakfast” berarti “sarapan”."
    },
    "en": {
      "q": "What does the English word “breakfast” mean?",
      "o": [
        "indah",
        "sarapan",
        "pagi",
        "saudara laki-laki"
      ],
      "e": "“breakfast” means “sarapan”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: She ___ a student.",
      "o": [
        "is",
        "am",
        "be",
        "are"
      ],
      "e": "Jawaban yang tepat adalah “is”. Kalimat lengkap: She is a student.."
    },
    "en": {
      "q": "Choose the correct word: She ___ a student.",
      "o": [
        "is",
        "am",
        "be",
        "are"
      ],
      "e": "The correct word is “is”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: She ___ a student.",
      "o": [
        "am",
        "is",
        "are",
        "be"
      ],
      "e": "Jawaban yang tepat adalah “is”. Kalimat lengkap: She is a student.."
    },
    "en": {
      "q": "Choose the correct word: She ___ a student.",
      "o": [
        "am",
        "is",
        "are",
        "be"
      ],
      "e": "The correct word is “is”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 3,
    "id": {
      "q": "Pilih kata yang tepat: They ___ football every Sunday.",
      "o": [
        "playing",
        "plays",
        "played",
        "play"
      ],
      "e": "Jawaban yang tepat adalah “play”. Kalimat lengkap: They play football every Sunday.."
    },
    "en": {
      "q": "Choose the correct word: They ___ football every Sunday.",
      "o": [
        "playing",
        "plays",
        "played",
        "play"
      ],
      "e": "The correct word is “play”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “apple”?",
      "o": [
        "sepeda",
        "pensil",
        "apel",
        "kebun"
      ],
      "e": "Kata “apple” berarti “apel”."
    },
    "en": {
      "q": "What does the English word “apple” mean?",
      "o": [
        "sepeda",
        "pensil",
        "apel",
        "kebun"
      ],
      "e": "“apple” means “apel”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The opposite of “big” is ...",
      "o": [
        "small",
        "wide",
        "long",
        "tall"
      ],
      "e": "Kata yang benar adalah “small”."
    },
    "en": {
      "q": "The opposite of “big” is ...",
      "o": [
        "small",
        "wide",
        "long",
        "tall"
      ],
      "e": "The correct answer is “small”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “carefully”?",
      "o": [
        "pensil",
        "dengan hati-hati",
        "kebun",
        "jendela"
      ],
      "e": "Kata “carefully” berarti “dengan hati-hati”."
    },
    "en": {
      "q": "What does the English word “carefully” mean?",
      "o": [
        "pensil",
        "dengan hati-hati",
        "kebun",
        "jendela"
      ],
      "e": "“carefully” means “dengan hati-hati”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 3,
    "id": {
      "q": "Pilih kata yang tepat: We ___ happy today.",
      "o": [
        "be",
        "am",
        "is",
        "are"
      ],
      "e": "Jawaban yang tepat adalah “are”. Kalimat lengkap: We are happy today.."
    },
    "en": {
      "q": "Choose the correct word: We ___ happy today.",
      "o": [
        "be",
        "am",
        "is",
        "are"
      ],
      "e": "The correct word is “are”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “window”?",
      "o": [
        "bersih",
        "jendela",
        "dokter",
        "pasar"
      ],
      "e": "Kata “window” berarti “jendela”."
    },
    "en": {
      "q": "What does the English word “window” mean?",
      "o": [
        "bersih",
        "jendela",
        "dokter",
        "pasar"
      ],
      "e": "“window” means “jendela”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "good morning",
    "accept": [
      "good morning"
    ],
    "id": {
      "q": "Tuliskan bahasa Inggris dari “selamat pagi”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the English phrase for “selamat pagi”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "good morning",
    "accept_en": [
      "good morning"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 2,
    "id": {
      "q": "Pilih kata yang tepat: I ___ two pencils.",
      "o": [
        "had",
        "has",
        "have",
        "having"
      ],
      "e": "Jawaban yang tepat adalah “have”. Kalimat lengkap: I have two pencils.."
    },
    "en": {
      "q": "Choose the correct word: I ___ two pencils.",
      "o": [
        "had",
        "has",
        "have",
        "having"
      ],
      "e": "The correct word is “have”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 3,
    "id": {
      "q": "Apa arti kata bahasa Inggris “garden”?",
      "o": [
        "dokter",
        "buku",
        "dengan cepat",
        "kebun"
      ],
      "e": "Kata “garden” berarti “kebun”."
    },
    "en": {
      "q": "What does the English word “garden” mean?",
      "o": [
        "dokter",
        "buku",
        "dengan cepat",
        "kebun"
      ],
      "e": "“garden” means “kebun”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “hungry”?",
      "o": [
        "dengan hati-hati",
        "lapar",
        "apel",
        "indah"
      ],
      "e": "Kata “hungry” berarti “lapar”."
    },
    "en": {
      "q": "What does the English word “hungry” mean?",
      "o": [
        "dengan hati-hati",
        "lapar",
        "apel",
        "indah"
      ],
      "e": "“hungry” means “lapar”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The cat is ___ the table.",
      "o": [
        "under",
        "between",
        "because",
        "during"
      ],
      "e": "Kata yang benar adalah “under”."
    },
    "en": {
      "q": "The cat is ___ the table.",
      "o": [
        "under",
        "between",
        "because",
        "during"
      ],
      "e": "The correct answer is “under”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "terima kasih",
    "accept": [
      "terima kasih"
    ],
    "id": {
      "q": "Apa arti “thank you”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What does “thank you” mean?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "thank you",
    "accept_en": [
      "thank you"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 3,
    "id": {
      "q": "Apa arti kata bahasa Inggris “cloudy”?",
      "o": [
        "guru",
        "perpustakaan",
        "sarapan",
        "berawan"
      ],
      "e": "Kata “cloudy” berarti “berawan”."
    },
    "en": {
      "q": "What does the English word “cloudy” mean?",
      "o": [
        "guru",
        "perpustakaan",
        "sarapan",
        "berawan"
      ],
      "e": "“cloudy” means “berawan”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 1,
    "id": {
      "q": "The opposite of “big” is ...",
      "o": [
        "tall",
        "small",
        "long",
        "wide"
      ],
      "e": "Kata yang benar adalah “small”."
    },
    "en": {
      "q": "The opposite of “big” is ...",
      "o": [
        "tall",
        "small",
        "long",
        "wide"
      ],
      "e": "The correct answer is “small”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "good morning",
    "accept": [
      "good morning"
    ],
    "id": {
      "q": "Tuliskan bahasa Inggris dari “selamat pagi”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the English phrase for “selamat pagi”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "good morning",
    "accept_en": [
      "good morning"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 3,
    "id": {
      "q": "Pilih kata yang tepat: They ___ football every Sunday.",
      "o": [
        "played",
        "plays",
        "playing",
        "play"
      ],
      "e": "Jawaban yang tepat adalah “play”. Kalimat lengkap: They play football every Sunday.."
    },
    "en": {
      "q": "Choose the correct word: They ___ football every Sunday.",
      "o": [
        "played",
        "plays",
        "playing",
        "play"
      ],
      "e": "The correct word is “play”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 1,
    "id": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "it",
        "she",
        "he",
        "they"
      ],
      "e": "Kata yang benar adalah “she”."
    },
    "en": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "it",
        "she",
        "he",
        "they"
      ],
      "e": "The correct answer is “she”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 2,
    "id": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visiting",
        "visits",
        "visited",
        "visit"
      ],
      "e": "Kata yang benar adalah “visited”."
    },
    "en": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visiting",
        "visits",
        "visited",
        "visit"
      ],
      "e": "The correct answer is “visited”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: They ___ football every Sunday.",
      "o": [
        "plays",
        "play",
        "playing",
        "played"
      ],
      "e": "Jawaban yang tepat adalah “play”. Kalimat lengkap: They play football every Sunday.."
    },
    "en": {
      "q": "Choose the correct word: They ___ football every Sunday.",
      "o": [
        "plays",
        "play",
        "playing",
        "played"
      ],
      "e": "The correct word is “play”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 2,
    "id": {
      "q": "Pilih kata yang tepat: She ___ a student.",
      "o": [
        "are",
        "be",
        "is",
        "am"
      ],
      "e": "Jawaban yang tepat adalah “is”. Kalimat lengkap: She is a student.."
    },
    "en": {
      "q": "Choose the correct word: She ___ a student.",
      "o": [
        "are",
        "be",
        "is",
        "am"
      ],
      "e": "The correct word is “is”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "is",
    "accept": [
      "is"
    ],
    "id": {
      "q": "Lengkapi: My name ___ Rani.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Complete: My name ___ Rani.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "is",
    "accept_en": [
      "is"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: She ___ a student.",
      "o": [
        "is",
        "am",
        "are",
        "be"
      ],
      "e": "Jawaban yang tepat adalah “is”. Kalimat lengkap: She is a student.."
    },
    "en": {
      "q": "Choose the correct word: She ___ a student.",
      "o": [
        "is",
        "am",
        "are",
        "be"
      ],
      "e": "The correct word is “is”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 3,
    "id": {
      "q": "The cat is ___ the table.",
      "o": [
        "during",
        "because",
        "between",
        "under"
      ],
      "e": "Kata yang benar adalah “under”."
    },
    "en": {
      "q": "The cat is ___ the table.",
      "o": [
        "during",
        "because",
        "between",
        "under"
      ],
      "e": "The correct answer is “under”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “library”?",
      "o": [
        "dengan hati-hati",
        "perpustakaan",
        "saudara laki-laki",
        "apel"
      ],
      "e": "Kata “library” berarti “perpustakaan”."
    },
    "en": {
      "q": "What does the English word “library” mean?",
      "o": [
        "dengan hati-hati",
        "perpustakaan",
        "saudara laki-laki",
        "apel"
      ],
      "e": "“library” means “perpustakaan”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 1,
    "id": {
      "q": "The opposite of “big” is ...",
      "o": [
        "wide",
        "small",
        "long",
        "tall"
      ],
      "e": "Kata yang benar adalah “small”."
    },
    "en": {
      "q": "The opposite of “big” is ...",
      "o": [
        "wide",
        "small",
        "long",
        "tall"
      ],
      "e": "The correct answer is “small”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 3,
    "id": {
      "q": "The plural of “child” is ...",
      "o": [
        "childes",
        "childrens",
        "childs",
        "children"
      ],
      "e": "Kata yang benar adalah “children”."
    },
    "en": {
      "q": "The plural of “child” is ...",
      "o": [
        "childes",
        "childrens",
        "childs",
        "children"
      ],
      "e": "The correct answer is “children”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: She ___ a student.",
      "o": [
        "am",
        "is",
        "are",
        "be"
      ],
      "e": "Jawaban yang tepat adalah “is”. Kalimat lengkap: She is a student.."
    },
    "en": {
      "q": "Choose the correct word: She ___ a student.",
      "o": [
        "am",
        "is",
        "are",
        "be"
      ],
      "e": "The correct word is “is”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “brother”?",
      "o": [
        "ramah",
        "jendela",
        "saudara laki-laki",
        "pensil"
      ],
      "e": "Kata “brother” berarti “saudara laki-laki”."
    },
    "en": {
      "q": "What does the English word “brother” mean?",
      "o": [
        "ramah",
        "jendela",
        "saudara laki-laki",
        "pensil"
      ],
      "e": "“brother” means “saudara laki-laki”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visited",
        "visits",
        "visiting",
        "visit"
      ],
      "e": "Kata yang benar adalah “visited”."
    },
    "en": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visited",
        "visits",
        "visiting",
        "visit"
      ],
      "e": "The correct answer is “visited”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: They ___ football every Sunday.",
      "o": [
        "played",
        "play",
        "plays",
        "playing"
      ],
      "e": "Jawaban yang tepat adalah “play”. Kalimat lengkap: They play football every Sunday.."
    },
    "en": {
      "q": "Choose the correct word: They ___ football every Sunday.",
      "o": [
        "played",
        "play",
        "plays",
        "playing"
      ],
      "e": "The correct word is “play”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The cat is ___ the table.",
      "o": [
        "under",
        "during",
        "between",
        "because"
      ],
      "e": "Kata yang benar adalah “under”."
    },
    "en": {
      "q": "The cat is ___ the table.",
      "o": [
        "under",
        "during",
        "between",
        "because"
      ],
      "e": "The correct answer is “under”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visited",
        "visit",
        "visits",
        "visiting"
      ],
      "e": "Kata yang benar adalah “visited”."
    },
    "en": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visited",
        "visit",
        "visits",
        "visiting"
      ],
      "e": "The correct answer is “visited”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 3,
    "id": {
      "q": "The plural of “child” is ...",
      "o": [
        "childs",
        "childes",
        "childrens",
        "children"
      ],
      "e": "Kata yang benar adalah “children”."
    },
    "en": {
      "q": "The plural of “child” is ...",
      "o": [
        "childs",
        "childes",
        "childrens",
        "children"
      ],
      "e": "The correct answer is “children”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "she",
        "he",
        "they",
        "it"
      ],
      "e": "Kata yang benar adalah “she”."
    },
    "en": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "she",
        "he",
        "they",
        "it"
      ],
      "e": "The correct answer is “she”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "is",
    "accept": [
      "is"
    ],
    "id": {
      "q": "Lengkapi: My name ___ Rani.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Complete: My name ___ Rani.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "is",
    "accept_en": [
      "is"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "books",
    "accept": [
      "books"
    ],
    "id": {
      "q": "Tuliskan bentuk jamak dari “book”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the plural form of “book”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "books",
    "accept_en": [
      "books"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 2,
    "id": {
      "q": "The opposite of “big” is ...",
      "o": [
        "long",
        "tall",
        "small",
        "wide"
      ],
      "e": "Kata yang benar adalah “small”."
    },
    "en": {
      "q": "The opposite of “big” is ...",
      "o": [
        "long",
        "tall",
        "small",
        "wide"
      ],
      "e": "The correct answer is “small”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "books",
    "accept": [
      "books"
    ],
    "id": {
      "q": "Tuliskan bentuk jamak dari “book”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the plural form of “book”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "books",
    "accept_en": [
      "books"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 3,
    "id": {
      "q": "Pilih kata yang tepat: He ___ to school by bus.",
      "o": [
        "go",
        "gone",
        "going",
        "goes"
      ],
      "e": "Jawaban yang tepat adalah “goes”. Kalimat lengkap: He goes to school by bus.."
    },
    "en": {
      "q": "Choose the correct word: He ___ to school by bus.",
      "o": [
        "go",
        "gone",
        "going",
        "goes"
      ],
      "e": "The correct word is “goes”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 3,
    "id": {
      "q": "Apa arti kata bahasa Inggris “pencil”?",
      "o": [
        "buku",
        "bersih",
        "dokter",
        "pensil"
      ],
      "e": "Kata “pencil” berarti “pensil”."
    },
    "en": {
      "q": "What does the English word “pencil” mean?",
      "o": [
        "buku",
        "bersih",
        "dokter",
        "pensil"
      ],
      "e": "“pencil” means “pensil”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 3,
    "id": {
      "q": "The plural of “child” is ...",
      "o": [
        "childrens",
        "childs",
        "childes",
        "children"
      ],
      "e": "Kata yang benar adalah “children”."
    },
    "en": {
      "q": "The plural of “child” is ...",
      "o": [
        "childrens",
        "childs",
        "childes",
        "children"
      ],
      "e": "The correct answer is “children”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 0,
    "id": {
      "q": "Apa arti kata bahasa Inggris “doctor”?",
      "o": [
        "dokter",
        "berawan",
        "kupu-kupu",
        "sungai"
      ],
      "e": "Kata “doctor” berarti “dokter”."
    },
    "en": {
      "q": "What does the English word “doctor” mean?",
      "o": [
        "dokter",
        "berawan",
        "kupu-kupu",
        "sungai"
      ],
      "e": "“doctor” means “dokter”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "water",
    "accept": [
      "water"
    ],
    "id": {
      "q": "Apa bahasa Inggris dari “air”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What is the English word for “air”?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "water",
    "accept_en": [
      "water"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 1,
    "id": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "he",
        "she",
        "they",
        "it"
      ],
      "e": "Kata yang benar adalah “she”."
    },
    "en": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "he",
        "she",
        "they",
        "it"
      ],
      "e": "The correct answer is “she”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 3,
    "id": {
      "q": "Pilih kata yang tepat: He ___ to school by bus.",
      "o": [
        "going",
        "go",
        "gone",
        "goes"
      ],
      "e": "Jawaban yang tepat adalah “goes”. Kalimat lengkap: He goes to school by bus.."
    },
    "en": {
      "q": "Choose the correct word: He ___ to school by bus.",
      "o": [
        "going",
        "go",
        "gone",
        "goes"
      ],
      "e": "The correct word is “goes”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: I ___ two pencils.",
      "o": [
        "had",
        "have",
        "has",
        "having"
      ],
      "e": "Jawaban yang tepat adalah “have”. Kalimat lengkap: I have two pencils.."
    },
    "en": {
      "q": "Choose the correct word: I ___ two pencils.",
      "o": [
        "had",
        "have",
        "has",
        "having"
      ],
      "e": "The correct word is “have”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 3,
    "id": {
      "q": "The cat is ___ the table.",
      "o": [
        "during",
        "between",
        "because",
        "under"
      ],
      "e": "Kata yang benar adalah “under”."
    },
    "en": {
      "q": "The cat is ___ the table.",
      "o": [
        "during",
        "between",
        "because",
        "under"
      ],
      "e": "The correct answer is “under”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: We ___ happy today.",
      "o": [
        "are",
        "is",
        "be",
        "am"
      ],
      "e": "Jawaban yang tepat adalah “are”. Kalimat lengkap: We are happy today.."
    },
    "en": {
      "q": "Choose the correct word: We ___ happy today.",
      "o": [
        "are",
        "is",
        "be",
        "am"
      ],
      "e": "The correct word is “are”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: We ___ happy today.",
      "o": [
        "are",
        "am",
        "is",
        "be"
      ],
      "e": "Jawaban yang tepat adalah “are”. Kalimat lengkap: We are happy today.."
    },
    "en": {
      "q": "Choose the correct word: We ___ happy today.",
      "o": [
        "are",
        "am",
        "is",
        "be"
      ],
      "e": "The correct word is “are”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: I ___ two pencils.",
      "o": [
        "have",
        "had",
        "having",
        "has"
      ],
      "e": "Jawaban yang tepat adalah “have”. Kalimat lengkap: I have two pencils.."
    },
    "en": {
      "q": "Choose the correct word: I ___ two pencils.",
      "o": [
        "have",
        "had",
        "having",
        "has"
      ],
      "e": "The correct word is “have”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “quickly”?",
      "o": [
        "menulis",
        "berawan",
        "dengan cepat",
        "gunung"
      ],
      "e": "Kata “quickly” berarti “dengan cepat”."
    },
    "en": {
      "q": "What does the English word “quickly” mean?",
      "o": [
        "menulis",
        "berawan",
        "dengan cepat",
        "gunung"
      ],
      "e": "“quickly” means “dengan cepat”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "terima kasih",
    "accept": [
      "terima kasih"
    ],
    "id": {
      "q": "Apa arti “thank you”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What does “thank you” mean?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "thank you",
    "accept_en": [
      "thank you"
    ]
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "good morning",
    "accept": [
      "good morning"
    ],
    "id": {
      "q": "Tuliskan bahasa Inggris dari “selamat pagi”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the English phrase for “selamat pagi”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "good morning",
    "accept_en": [
      "good morning"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "terima kasih",
    "accept": [
      "terima kasih"
    ],
    "id": {
      "q": "Apa arti “thank you”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What does “thank you” mean?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "thank you",
    "accept_en": [
      "thank you"
    ]
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 3,
    "id": {
      "q": "Apa arti kata bahasa Inggris “river”?",
      "o": [
        "lapar",
        "sarapan",
        "berenang",
        "sungai"
      ],
      "e": "Kata “river” berarti “sungai”."
    },
    "en": {
      "q": "What does the English word “river” mean?",
      "o": [
        "lapar",
        "sarapan",
        "berenang",
        "sungai"
      ],
      "e": "“river” means “sungai”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “butterfly”?",
      "o": [
        "berenang",
        "guru",
        "kupu-kupu",
        "sarapan"
      ],
      "e": "Kata “butterfly” berarti “kupu-kupu”."
    },
    "en": {
      "q": "What does the English word “butterfly” mean?",
      "o": [
        "berenang",
        "guru",
        "kupu-kupu",
        "sarapan"
      ],
      "e": "“butterfly” means “kupu-kupu”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “swim”?",
      "o": [
        "apel",
        "pagi",
        "berenang",
        "indah"
      ],
      "e": "Kata “swim” berarti “berenang”."
    },
    "en": {
      "q": "What does the English word “swim” mean?",
      "o": [
        "apel",
        "pagi",
        "berenang",
        "indah"
      ],
      "e": "“swim” means “berenang”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: He ___ to school by bus.",
      "o": [
        "goes",
        "going",
        "go",
        "gone"
      ],
      "e": "Jawaban yang tepat adalah “goes”. Kalimat lengkap: He goes to school by bus.."
    },
    "en": {
      "q": "Choose the correct word: He ___ to school by bus.",
      "o": [
        "goes",
        "going",
        "go",
        "gone"
      ],
      "e": "The correct word is “goes”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “write”?",
      "o": [
        "lapar",
        "perpustakaan",
        "menulis",
        "berenang"
      ],
      "e": "Kata “write” berarti “menulis”."
    },
    "en": {
      "q": "What does the English word “write” mean?",
      "o": [
        "lapar",
        "perpustakaan",
        "menulis",
        "berenang"
      ],
      "e": "“write” means “menulis”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 3,
    "id": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "he",
        "they",
        "it",
        "she"
      ],
      "e": "Kata yang benar adalah “she”."
    },
    "en": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "he",
        "they",
        "it",
        "she"
      ],
      "e": "The correct answer is “she”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: He ___ to school by bus.",
      "o": [
        "goes",
        "gone",
        "go",
        "going"
      ],
      "e": "Jawaban yang tepat adalah “goes”. Kalimat lengkap: He goes to school by bus.."
    },
    "en": {
      "q": "Choose the correct word: He ___ to school by bus.",
      "o": [
        "goes",
        "gone",
        "go",
        "going"
      ],
      "e": "The correct word is “goes”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 2,
    "id": {
      "q": "Pilih kata yang tepat: I ___ two pencils.",
      "o": [
        "had",
        "having",
        "have",
        "has"
      ],
      "e": "Jawaban yang tepat adalah “have”. Kalimat lengkap: I have two pencils.."
    },
    "en": {
      "q": "Choose the correct word: I ___ two pencils.",
      "o": [
        "had",
        "having",
        "have",
        "has"
      ],
      "e": "The correct word is “have”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “friendly”?",
      "o": [
        "dengan cepat",
        "bersih",
        "ramah",
        "pasar"
      ],
      "e": "Kata “friendly” berarti “ramah”."
    },
    "en": {
      "q": "What does the English word “friendly” mean?",
      "o": [
        "dengan cepat",
        "bersih",
        "ramah",
        "pasar"
      ],
      "e": "“friendly” means “ramah”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "is",
    "accept": [
      "is"
    ],
    "id": {
      "q": "Lengkapi: My name ___ Rani.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Complete: My name ___ Rani.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "is",
    "accept_en": [
      "is"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 2,
    "id": {
      "q": "The cat is ___ the table.",
      "o": [
        "because",
        "during",
        "under",
        "between"
      ],
      "e": "Kata yang benar adalah “under”."
    },
    "en": {
      "q": "The cat is ___ the table.",
      "o": [
        "because",
        "during",
        "under",
        "between"
      ],
      "e": "The correct answer is “under”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “teacher”?",
      "o": [
        "pagi",
        "guru",
        "dengan hati-hati",
        "saudara laki-laki"
      ],
      "e": "Kata “teacher” berarti “guru”."
    },
    "en": {
      "q": "What does the English word “teacher” mean?",
      "o": [
        "pagi",
        "guru",
        "dengan hati-hati",
        "saudara laki-laki"
      ],
      "e": "“teacher” means “guru”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: They ___ football every Sunday.",
      "o": [
        "played",
        "play",
        "plays",
        "playing"
      ],
      "e": "Jawaban yang tepat adalah “play”. Kalimat lengkap: They play football every Sunday.."
    },
    "en": {
      "q": "Choose the correct word: They ___ football every Sunday.",
      "o": [
        "played",
        "play",
        "plays",
        "playing"
      ],
      "e": "The correct word is “play”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The plural of “child” is ...",
      "o": [
        "children",
        "childs",
        "childes",
        "childrens"
      ],
      "e": "Kata yang benar adalah “children”."
    },
    "en": {
      "q": "The plural of “child” is ...",
      "o": [
        "children",
        "childs",
        "childes",
        "childrens"
      ],
      "e": "The correct answer is “children”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 2,
    "id": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visiting",
        "visits",
        "visited",
        "visit"
      ],
      "e": "Kata yang benar adalah “visited”."
    },
    "en": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visiting",
        "visits",
        "visited",
        "visit"
      ],
      "e": "The correct answer is “visited”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 0,
    "id": {
      "q": "Apa arti kata bahasa Inggris “market”?",
      "o": [
        "pasar",
        "sungai",
        "menulis",
        "gunung"
      ],
      "e": "Kata “market” berarti “pasar”."
    },
    "en": {
      "q": "What does the English word “market” mean?",
      "o": [
        "pasar",
        "sungai",
        "menulis",
        "gunung"
      ],
      "e": "“market” means “pasar”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 1,
    "id": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "it",
        "she",
        "he",
        "they"
      ],
      "e": "Kata yang benar adalah “she”."
    },
    "en": {
      "q": "The correct pronoun for “Siti” is ...",
      "o": [
        "it",
        "she",
        "he",
        "they"
      ],
      "e": "The correct answer is “she”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "good morning",
    "accept": [
      "good morning"
    ],
    "id": {
      "q": "Tuliskan bahasa Inggris dari “selamat pagi”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the English phrase for “selamat pagi”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "good morning",
    "accept_en": [
      "good morning"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "good morning",
    "accept": [
      "good morning"
    ],
    "id": {
      "q": "Tuliskan bahasa Inggris dari “selamat pagi”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the English phrase for “selamat pagi”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "good morning",
    "accept_en": [
      "good morning"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: He ___ to school by bus.",
      "o": [
        "goes",
        "go",
        "going",
        "gone"
      ],
      "e": "Jawaban yang tepat adalah “goes”. Kalimat lengkap: He goes to school by bus.."
    },
    "en": {
      "q": "Choose the correct word: He ___ to school by bus.",
      "o": [
        "goes",
        "go",
        "going",
        "gone"
      ],
      "e": "The correct word is “goes”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The opposite of “big” is ...",
      "o": [
        "small",
        "long",
        "wide",
        "tall"
      ],
      "e": "Kata yang benar adalah “small”."
    },
    "en": {
      "q": "The opposite of “big” is ...",
      "o": [
        "small",
        "long",
        "wide",
        "tall"
      ],
      "e": "The correct answer is “small”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "water",
    "accept": [
      "water"
    ],
    "id": {
      "q": "Apa bahasa Inggris dari “air”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What is the English word for “air”?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "water",
    "accept_en": [
      "water"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "water",
    "accept": [
      "water"
    ],
    "id": {
      "q": "Apa bahasa Inggris dari “air”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What is the English word for “air”?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "water",
    "accept_en": [
      "water"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "terima kasih",
    "accept": [
      "terima kasih"
    ],
    "id": {
      "q": "Apa arti “thank you”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What does “thank you” mean?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "thank you",
    "accept_en": [
      "thank you"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 1,
    "id": {
      "q": "Apa arti kata bahasa Inggris “clean”?",
      "o": [
        "kupu-kupu",
        "bersih",
        "menulis",
        "sungai"
      ],
      "e": "Kata “clean” berarti “bersih”."
    },
    "en": {
      "q": "What does the English word “clean” mean?",
      "o": [
        "kupu-kupu",
        "bersih",
        "menulis",
        "sungai"
      ],
      "e": "“clean” means “bersih”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 0,
    "id": {
      "q": "The plural of “child” is ...",
      "o": [
        "children",
        "childrens",
        "childes",
        "childs"
      ],
      "e": "Kata yang benar adalah “children”."
    },
    "en": {
      "q": "The plural of “child” is ...",
      "o": [
        "children",
        "childrens",
        "childes",
        "childs"
      ],
      "e": "The correct answer is “children”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "water",
    "accept": [
      "water"
    ],
    "id": {
      "q": "Apa bahasa Inggris dari “air”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What is the English word for “air”?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "water",
    "accept_en": [
      "water"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "books",
    "accept": [
      "books"
    ],
    "id": {
      "q": "Tuliskan bentuk jamak dari “book”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the plural form of “book”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "books",
    "accept_en": [
      "books"
    ]
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 1,
    "id": {
      "q": "Pilih kata yang tepat: We ___ happy today.",
      "o": [
        "be",
        "are",
        "is",
        "am"
      ],
      "e": "Jawaban yang tepat adalah “are”. Kalimat lengkap: We are happy today.."
    },
    "en": {
      "q": "Choose the correct word: We ___ happy today.",
      "o": [
        "be",
        "are",
        "is",
        "am"
      ],
      "e": "The correct word is “are”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 2,
    "id": {
      "q": "Pilih kata yang tepat: We ___ happy today.",
      "o": [
        "am",
        "be",
        "are",
        "is"
      ],
      "e": "Jawaban yang tepat adalah “are”. Kalimat lengkap: We are happy today.."
    },
    "en": {
      "q": "Choose the correct word: We ___ happy today.",
      "o": [
        "am",
        "be",
        "are",
        "is"
      ],
      "e": "The correct word is “are”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 3,
    "id": {
      "q": "Apa arti kata bahasa Inggris “bicycle”?",
      "o": [
        "pasar",
        "dengan cepat",
        "buku",
        "sepeda"
      ],
      "e": "Kata “bicycle” berarti “sepeda”."
    },
    "en": {
      "q": "What does the English word “bicycle” mean?",
      "o": [
        "pasar",
        "dengan cepat",
        "buku",
        "sepeda"
      ],
      "e": "“bicycle” means “sepeda”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "books",
    "accept": [
      "books"
    ],
    "id": {
      "q": "Tuliskan bentuk jamak dari “book”.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Write the plural form of “book”.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "books",
    "accept_en": [
      "books"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Kosakata dan kalimat",
    "a": 1,
    "id": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visit",
        "visited",
        "visits",
        "visiting"
      ],
      "e": "Kata yang benar adalah “visited”."
    },
    "en": {
      "q": "Yesterday, I ___ my grandmother.",
      "o": [
        "visit",
        "visited",
        "visits",
        "visiting"
      ],
      "e": "The correct answer is “visited”."
    }
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “morning”?",
      "o": [
        "jendela",
        "sepeda",
        "pagi",
        "ramah"
      ],
      "e": "Kata “morning” berarti “pagi”."
    },
    "en": {
      "q": "What does the English word “morning” mean?",
      "o": [
        "jendela",
        "sepeda",
        "pagi",
        "ramah"
      ],
      "e": "“morning” means “pagi”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Tata bahasa",
    "a": 0,
    "id": {
      "q": "Pilih kata yang tepat: I ___ two pencils.",
      "o": [
        "have",
        "has",
        "had",
        "having"
      ],
      "e": "Jawaban yang tepat adalah “have”. Kalimat lengkap: I have two pencils.."
    },
    "en": {
      "q": "Choose the correct word: I ___ two pencils.",
      "o": [
        "have",
        "has",
        "had",
        "having"
      ],
      "e": "The correct word is “have”."
    }
  },
  {
    "s": "bing",
    "grade": 5,
    "topic": "Kosakata",
    "a": 2,
    "id": {
      "q": "Apa arti kata bahasa Inggris “mountain”?",
      "o": [
        "lapar",
        "perpustakaan",
        "gunung",
        "guru"
      ],
      "e": "Kata “mountain” berarti “gunung”."
    },
    "en": {
      "q": "What does the English word “mountain” mean?",
      "o": [
        "lapar",
        "perpustakaan",
        "gunung",
        "guru"
      ],
      "e": "“mountain” means “gunung”."
    }
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "is",
    "accept": [
      "is"
    ],
    "id": {
      "q": "Lengkapi: My name ___ Rani.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Complete: My name ___ Rani.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "is",
    "accept_en": [
      "is"
    ]
  },
  {
    "s": "bing",
    "grade": 4,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "water",
    "accept": [
      "water"
    ],
    "id": {
      "q": "Apa bahasa Inggris dari “air”?",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "What is the English word for “air”?",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "water",
    "accept_en": [
      "water"
    ]
  },
  {
    "s": "bing",
    "grade": 6,
    "topic": "Ungkapan dan kosakata",
    "type": "essay",
    "answer": "is",
    "accept": [
      "is"
    ],
    "id": {
      "q": "Lengkapi: My name ___ Rani.",
      "e": "Jawaban singkat yang tepat menunjukkan pemahaman kosakata dasar."
    },
    "en": {
      "q": "Complete: My name ___ Rani.",
      "e": "A correct short answer shows understanding of basic vocabulary."
    },
    "answer_en": "is",
    "accept_en": [
      "is"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bhinneka tunggal ika",
    "accept": [
      "bhinneka tunggal ika"
    ],
    "id": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "en": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "answer_en": "bhinneka tunggal ika",
    "accept_en": [
      "bhinneka tunggal ika"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bekerja bersama",
    "accept": [
      "bekerja bersama"
    ],
    "id": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "en": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "answer_en": "bekerja bersama",
    "accept_en": [
      "bekerja bersama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "persatuan indonesia",
    "accept": [
      "persatuan indonesia"
    ],
    "id": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "en": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "answer_en": "persatuan indonesia",
    "accept_en": [
      "persatuan indonesia"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "sombong",
        "curang",
        "malas",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "sombong",
        "curang",
        "malas",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "mengejek",
        "memaksa",
        "berteriak"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "mengejek",
        "memaksa",
        "berteriak"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Contoh kewajiban siswa di sekolah adalah ...",
      "o": [
        "memilih semua pelajaran",
        "meminjam buku kapan saja",
        "mendapat nilai",
        "menaati tata tertib"
      ],
      "e": "Siswa wajib menaati aturan sekolah."
    },
    "en": {
      "q": "Contoh kewajiban siswa di sekolah adalah ...",
      "o": [
        "memilih semua pelajaran",
        "meminjam buku kapan saja",
        "mendapat nilai",
        "menaati tata tertib"
      ],
      "e": "Siswa wajib menaati aturan sekolah."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "diskriminasi",
        "egois",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "diskriminasi",
        "egois",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "egois",
        "permusuhan",
        "diskriminasi",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "egois",
        "permusuhan",
        "diskriminasi",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Menggunakan produk lokal dapat menunjukkan rasa ...",
      "o": [
        "iri hati",
        "malas belajar",
        "cinta tanah air",
        "tidak peduli"
      ],
      "e": "Menghargai produk lokal dapat menjadi bentuk cinta tanah air."
    },
    "en": {
      "q": "Menggunakan produk lokal dapat menunjukkan rasa ...",
      "o": [
        "iri hati",
        "malas belajar",
        "cinta tanah air",
        "tidak peduli"
      ],
      "e": "Menghargai produk lokal dapat menjadi bentuk cinta tanah air."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "menghormati perbedaan agama",
    "accept": [
      "menghormati perbedaan agama"
    ],
    "id": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "en": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "answer_en": "menghormati perbedaan agama",
    "accept_en": [
      "menghormati perbedaan agama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "diskriminasi",
        "egois",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "diskriminasi",
        "egois",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "satu",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "satu",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati",
        "melarang teman bermain"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati",
        "melarang teman bermain"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "musyawarah",
    "accept": [
      "musyawarah"
    ],
    "id": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "en": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "answer_en": "musyawarah",
    "accept_en": [
      "musyawarah"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bekerja bersama",
    "accept": [
      "bekerja bersama"
    ],
    "id": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "en": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "answer_en": "bekerja bersama",
    "accept_en": [
      "bekerja bersama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "curang",
        "sombong",
        "malas",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "curang",
        "sombong",
        "malas",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bekerja bersama",
    "accept": [
      "bekerja bersama"
    ],
    "id": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "en": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "answer_en": "bekerja bersama",
    "accept_en": [
      "bekerja bersama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "egois",
        "permusuhan",
        "menghargai keberagaman",
        "diskriminasi"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "egois",
        "permusuhan",
        "menghargai keberagaman",
        "diskriminasi"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "memaksa",
        "mengejek",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "memaksa",
        "mengejek",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Lambang sila ketiga Pancasila adalah ...",
      "o": [
        "rantai",
        "bintang",
        "pohon beringin",
        "kepala banteng"
      ],
      "e": "Pohon beringin melambangkan Persatuan Indonesia."
    },
    "en": {
      "q": "Lambang sila ketiga Pancasila adalah ...",
      "o": [
        "rantai",
        "bintang",
        "pohon beringin",
        "kepala banteng"
      ],
      "e": "Pohon beringin melambangkan Persatuan Indonesia."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "curang",
        "tanggung jawab",
        "sombong",
        "malas"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "curang",
        "tanggung jawab",
        "sombong",
        "malas"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "malas",
        "curang",
        "sombong",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "malas",
        "curang",
        "sombong",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "permusuhan",
        "menghargai keberagaman",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "permusuhan",
        "menghargai keberagaman",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "persatuan indonesia",
    "accept": [
      "persatuan indonesia"
    ],
    "id": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "en": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "answer_en": "persatuan indonesia",
    "accept_en": [
      "persatuan indonesia"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "mengejek",
        "memaksa",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "mengejek",
        "memaksa",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "mengikuti aturan yang disepakati",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "mengikuti aturan yang disepakati",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "melarang teman bermain",
        "selalu ingin menang",
        "mengubah aturan sendiri",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "melarang teman bermain",
        "selalu ingin menang",
        "mengubah aturan sendiri",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "sombong",
        "tanggung jawab",
        "malas",
        "curang"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "sombong",
        "tanggung jawab",
        "malas",
        "curang"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "mengikuti aturan yang disepakati",
        "selalu ingin menang",
        "melarang teman bermain"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "mengikuti aturan yang disepakati",
        "selalu ingin menang",
        "melarang teman bermain"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "menghargai keberagaman",
        "diskriminasi",
        "permusuhan",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "menghargai keberagaman",
        "diskriminasi",
        "permusuhan",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "menghormati perbedaan agama",
    "accept": [
      "menghormati perbedaan agama"
    ],
    "id": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "en": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "answer_en": "menghormati perbedaan agama",
    "accept_en": [
      "menghormati perbedaan agama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "persatuan indonesia",
    "accept": [
      "persatuan indonesia"
    ],
    "id": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "en": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "answer_en": "persatuan indonesia",
    "accept_en": [
      "persatuan indonesia"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "satu",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "satu",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "berdiskusi dengan tenang",
        "memaksa",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "berdiskusi dengan tenang",
        "memaksa",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "mengejek",
        "berteriak",
        "berdiskusi dengan tenang",
        "memaksa"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "mengejek",
        "berteriak",
        "berdiskusi dengan tenang",
        "memaksa"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "memaksa",
        "berdiskusi dengan tenang",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "memaksa",
        "berdiskusi dengan tenang",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "berteriak",
        "memaksa",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "berteriak",
        "memaksa",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bhinneka tunggal ika",
    "accept": [
      "bhinneka tunggal ika"
    ],
    "id": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "en": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "answer_en": "bhinneka tunggal ika",
    "accept_en": [
      "bhinneka tunggal ika"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "persatuan indonesia",
    "accept": [
      "persatuan indonesia"
    ],
    "id": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "en": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "answer_en": "persatuan indonesia",
    "accept_en": [
      "persatuan indonesia"
    ]
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "menghormati perbedaan agama",
    "accept": [
      "menghormati perbedaan agama"
    ],
    "id": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "en": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "answer_en": "menghormati perbedaan agama",
    "accept_en": [
      "menghormati perbedaan agama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "mengejek",
        "memaksa",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berteriak",
        "mengejek",
        "memaksa",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "satu",
        "lima",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "satu",
        "lima",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "malas",
        "curang",
        "sombong",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "malas",
        "curang",
        "sombong",
        "tanggung jawab"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "musyawarah",
    "accept": [
      "musyawarah"
    ],
    "id": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "en": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "answer_en": "musyawarah",
    "accept_en": [
      "musyawarah"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Membersihkan kelas bersama-sama merupakan contoh ...",
      "o": [
        "perpecahan",
        "gotong royong",
        "persaingan",
        "sikap egois"
      ],
      "e": "Gotong royong adalah bekerja bersama untuk kepentingan bersama."
    },
    "en": {
      "q": "Membersihkan kelas bersama-sama merupakan contoh ...",
      "o": [
        "perpecahan",
        "gotong royong",
        "persaingan",
        "sikap egois"
      ],
      "e": "Gotong royong adalah bekerja bersama untuk kepentingan bersama."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "egois",
        "diskriminasi",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "egois",
        "diskriminasi",
        "menghargai keberagaman"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "selalu ingin menang",
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "selalu ingin menang",
        "mengubah aturan sendiri",
        "melarang teman bermain",
        "mengikuti aturan yang disepakati"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "sombong",
        "curang"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "malas",
        "sombong",
        "curang"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "tiga",
        "dua",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "tiga",
        "dua",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Salah satu hak anak di rumah adalah ...",
      "o": [
        "mendapat kasih sayang",
        "merusak barang",
        "mengganggu saudara",
        "mengabaikan tugas"
      ],
      "e": "Anak berhak mendapat perlindungan dan kasih sayang."
    },
    "en": {
      "q": "Salah satu hak anak di rumah adalah ...",
      "o": [
        "mendapat kasih sayang",
        "merusak barang",
        "mengganggu saudara",
        "mengabaikan tugas"
      ],
      "e": "Anak berhak mendapat perlindungan dan kasih sayang."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "persatuan indonesia",
    "accept": [
      "persatuan indonesia"
    ],
    "id": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "en": {
      "q": "Sebutkan bunyi sila ketiga Pancasila.",
      "e": "Sila ketiga berbunyi Persatuan Indonesia."
    },
    "answer_en": "persatuan indonesia",
    "accept_en": [
      "persatuan indonesia"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Jika menemukan barang milik teman, sebaiknya ...",
      "o": [
        "mengembalikannya",
        "menyimpan diam-diam",
        "menjualnya",
        "membuangnya"
      ],
      "e": "Mengembalikan barang menunjukkan kejujuran."
    },
    "en": {
      "q": "Jika menemukan barang milik teman, sebaiknya ...",
      "o": [
        "mengembalikannya",
        "menyimpan diam-diam",
        "menjualnya",
        "membuangnya"
      ],
      "e": "Mengembalikan barang menunjukkan kejujuran."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "malas",
        "tanggung jawab",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "malas",
        "tanggung jawab",
        "curang",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Lambang sila kedua Pancasila adalah ...",
      "o": [
        "rantai",
        "pohon beringin",
        "padi dan kapas",
        "bintang"
      ],
      "e": "Rantai melambangkan Kemanusiaan yang Adil dan Beradab."
    },
    "en": {
      "q": "Lambang sila kedua Pancasila adalah ...",
      "o": [
        "rantai",
        "pohon beringin",
        "padi dan kapas",
        "bintang"
      ],
      "e": "Rantai melambangkan Kemanusiaan yang Adil dan Beradab."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Menghormati teman yang berbeda agama merupakan sikap ...",
      "o": [
        "toleransi",
        "mengejek",
        "tidak peduli",
        "memaksakan kehendak"
      ],
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "en": {
      "q": "Menghormati teman yang berbeda agama merupakan sikap ...",
      "o": [
        "toleransi",
        "mengejek",
        "tidak peduli",
        "memaksakan kehendak"
      ],
      "e": "Toleransi berarti menghargai perbedaan."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bhinneka tunggal ika",
    "accept": [
      "bhinneka tunggal ika"
    ],
    "id": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "en": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "answer_en": "bhinneka tunggal ika",
    "accept_en": [
      "bhinneka tunggal ika"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Lambang sila pertama Pancasila adalah ...",
      "o": [
        "kepala banteng",
        "bintang",
        "rantai",
        "pohon beringin"
      ],
      "e": "Bintang melambangkan sila Ketuhanan Yang Maha Esa."
    },
    "en": {
      "q": "Lambang sila pertama Pancasila adalah ...",
      "o": [
        "kepala banteng",
        "bintang",
        "rantai",
        "pohon beringin"
      ],
      "e": "Bintang melambangkan sila Ketuhanan Yang Maha Esa."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "menghormati perbedaan agama",
    "accept": [
      "menghormati perbedaan agama"
    ],
    "id": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "en": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "answer_en": "menghormati perbedaan agama",
    "accept_en": [
      "menghormati perbedaan agama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "menghargai keberagaman",
        "permusuhan",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "menghargai keberagaman",
        "permusuhan",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "tiga",
        "satu",
        "dua",
        "lima"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "tiga",
        "satu",
        "dua",
        "lima"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "satu",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "satu",
        "tiga",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "musyawarah",
    "accept": [
      "musyawarah"
    ],
    "id": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "en": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "answer_en": "musyawarah",
    "accept_en": [
      "musyawarah"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Lambang sila kelima Pancasila adalah ...",
      "o": [
        "bintang",
        "padi dan kapas",
        "kepala banteng",
        "pohon beringin"
      ],
      "e": "Padi dan kapas melambangkan keadilan sosial."
    },
    "en": {
      "q": "Lambang sila kelima Pancasila adalah ...",
      "o": [
        "bintang",
        "padi dan kapas",
        "kepala banteng",
        "pohon beringin"
      ],
      "e": "Padi dan kapas melambangkan keadilan sosial."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "egois",
        "menghargai keberagaman",
        "permusuhan"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "egois",
        "menghargai keberagaman",
        "permusuhan"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bhinneka tunggal ika",
    "accept": [
      "bhinneka tunggal ika"
    ],
    "id": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "en": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "answer_en": "bhinneka tunggal ika",
    "accept_en": [
      "bhinneka tunggal ika"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "menghargai keberagaman",
        "permusuhan",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "menghargai keberagaman",
        "permusuhan",
        "egois"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Aturan dibuat agar kehidupan bersama menjadi ...",
      "o": [
        "tidak adil",
        "kacau",
        "sulit",
        "tertib dan aman"
      ],
      "e": "Aturan membantu menjaga ketertiban dan keamanan."
    },
    "en": {
      "q": "Aturan dibuat agar kehidupan bersama menjadi ...",
      "o": [
        "tidak adil",
        "kacau",
        "sulit",
        "tertib dan aman"
      ],
      "e": "Aturan membantu menjaga ketertiban dan keamanan."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "tiga",
        "dua",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "tiga",
        "dua",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bekerja bersama",
    "accept": [
      "bekerja bersama"
    ],
    "id": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "en": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "answer_en": "bekerja bersama",
    "accept_en": [
      "bekerja bersama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "musyawarah",
    "accept": [
      "musyawarah"
    ],
    "id": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "en": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "answer_en": "musyawarah",
    "accept_en": [
      "musyawarah"
    ]
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bekerja bersama",
    "accept": [
      "bekerja bersama"
    ],
    "id": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "en": {
      "q": "Apa arti gotong royong?",
      "e": "Gotong royong adalah bekerja bersama untuk tujuan baik."
    },
    "answer_en": "bekerja bersama",
    "accept_en": [
      "bekerja bersama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "menghormati perbedaan agama",
    "accept": [
      "menghormati perbedaan agama"
    ],
    "id": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "en": {
      "q": "Sebutkan satu contoh sikap toleransi.",
      "e": "Toleransi berarti menghargai perbedaan."
    },
    "answer_en": "menghormati perbedaan agama",
    "accept_en": [
      "menghormati perbedaan agama"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "mengejek",
        "memaksa",
        "berteriak",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "mengejek",
        "memaksa",
        "berteriak",
        "berdiskusi dengan tenang"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "satu",
        "tiga"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "satu",
        "tiga"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "menghargai keberagaman",
        "egois",
        "diskriminasi"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "permusuhan",
        "menghargai keberagaman",
        "egois",
        "diskriminasi"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "memaksa",
        "berteriak",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "memaksa",
        "berteriak",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "tiga",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "tiga",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Keputusan bersama sebaiknya diambil melalui ...",
      "o": [
        "paksaan",
        "musyawarah",
        "pertengkaran",
        "ancaman"
      ],
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "en": {
      "q": "Keputusan bersama sebaiknya diambil melalui ...",
      "o": [
        "paksaan",
        "musyawarah",
        "pertengkaran",
        "ancaman"
      ],
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "melarang teman bermain",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "melarang teman bermain",
        "selalu ingin menang",
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Lambang sila keempat Pancasila adalah ...",
      "o": [
        "bintang",
        "padi dan kapas",
        "rantai",
        "kepala banteng"
      ],
      "e": "Kepala banteng melambangkan musyawarah."
    },
    "en": {
      "q": "Lambang sila keempat Pancasila adalah ...",
      "o": [
        "bintang",
        "padi dan kapas",
        "rantai",
        "kepala banteng"
      ],
      "e": "Kepala banteng melambangkan musyawarah."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "berteriak",
        "memaksa",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "berdiskusi dengan tenang",
        "berteriak",
        "memaksa",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "musyawarah",
    "accept": [
      "musyawarah"
    ],
    "id": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "en": {
      "q": "Apa yang dilakukan untuk mengambil keputusan bersama?",
      "e": "Musyawarah dilakukan untuk mencapai kesepakatan."
    },
    "answer_en": "musyawarah",
    "accept_en": [
      "musyawarah"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "selalu ingin menang",
        "melarang teman bermain",
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "selalu ingin menang",
        "melarang teman bermain",
        "mengikuti aturan yang disepakati",
        "mengubah aturan sendiri"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Saat teman menyampaikan pendapat, kita sebaiknya ...",
      "o": [
        "mendengarkan dengan hormat",
        "menertawakan",
        "meninggalkan ruangan",
        "memotong pembicaraan"
      ],
      "e": "Menghargai pendapat merupakan sikap demokratis."
    },
    "en": {
      "q": "Saat teman menyampaikan pendapat, kita sebaiknya ...",
      "o": [
        "mendengarkan dengan hormat",
        "menertawakan",
        "meninggalkan ruangan",
        "memotong pembicaraan"
      ],
      "e": "Menghargai pendapat merupakan sikap demokratis."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "tiga",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "tiga",
        "satu"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "mengikuti aturan yang disepakati",
        "melarang teman bermain",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    },
    "en": {
      "q": "Contoh sikap adil saat bermain adalah ...",
      "o": [
        "mengubah aturan sendiri",
        "mengikuti aturan yang disepakati",
        "melarang teman bermain",
        "selalu ingin menang"
      ],
      "e": "Bersikap adil berarti memperlakukan semua pemain dengan setara."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 3,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "satu",
        "tiga"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "dua",
        "lima",
        "satu",
        "tiga"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "egois",
        "menghargai keberagaman",
        "permusuhan"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    },
    "en": {
      "q": "Tidak membeda-bedakan teman berdasarkan suku merupakan sikap ...",
      "o": [
        "diskriminasi",
        "egois",
        "menghargai keberagaman",
        "permusuhan"
      ],
      "e": "Setiap orang harus dihargai tanpa membedakan suku."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 2,
    "id": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "memaksa",
        "berteriak",
        "berdiskusi dengan tenang",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    },
    "en": {
      "q": "Ketika berbeda pendapat, kita sebaiknya ...",
      "o": [
        "memaksa",
        "berteriak",
        "berdiskusi dengan tenang",
        "mengejek"
      ],
      "e": "Perbedaan pendapat diselesaikan dengan dialog dan saling menghormati."
    }
  },
  {
    "s": "pancasila",
    "grade": 6,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 1,
    "id": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "tiga",
        "satu",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    },
    "en": {
      "q": "Sila Pancasila yang mengajarkan persatuan bangsa adalah sila ke ...",
      "o": [
        "lima",
        "tiga",
        "satu",
        "dua"
      ],
      "e": "Persatuan Indonesia merupakan sila ketiga."
    }
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Penerapan nilai Pancasila",
    "type": "essay",
    "answer": "bhinneka tunggal ika",
    "accept": [
      "bhinneka tunggal ika"
    ],
    "id": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "en": {
      "q": "Apa semboyan persatuan bangsa Indonesia?",
      "e": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu."
    },
    "answer_en": "bhinneka tunggal ika",
    "accept_en": [
      "bhinneka tunggal ika"
    ]
  },
  {
    "s": "pancasila",
    "grade": 5,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Semboyan Bhinneka Tunggal Ika berarti ...",
      "o": [
        "berbeda-beda tetapi tetap satu",
        "hanya satu budaya",
        "semua harus sama",
        "berbeda berarti bermusuhan"
      ],
      "e": "Semboyan ini mengajarkan persatuan dalam keberagaman."
    },
    "en": {
      "q": "Semboyan Bhinneka Tunggal Ika berarti ...",
      "o": [
        "berbeda-beda tetapi tetap satu",
        "hanya satu budaya",
        "semua harus sama",
        "berbeda berarti bermusuhan"
      ],
      "e": "Semboyan ini mengajarkan persatuan dalam keberagaman."
    }
  },
  {
    "s": "pancasila",
    "grade": 4,
    "topic": "Nilai Pancasila dan kewargaan",
    "a": 0,
    "id": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "curang",
        "malas",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    },
    "en": {
      "q": "Membagi tugas piket secara adil menunjukkan sikap ...",
      "o": [
        "tanggung jawab",
        "curang",
        "malas",
        "sombong"
      ],
      "e": "Setiap siswa menjalankan tugasnya dengan tanggung jawab."
    }
  }
];
