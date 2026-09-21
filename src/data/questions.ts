import { Category, LevelInfo, Medal, Question, CategoryId, Friend } from '../types';
import { generateQuestionsForCategory } from './questionBank';

export const CATEGORIES: Category[] = [
  {
    id: 'kurani',
    name: "KUR'ANI FISNIK",
    shortName: "Kur'ani",
    description: "Suret, ajetet, profetët e përmendur, ngjarjet kuranore, zbritja dhe mrekullitë e librit të shenjtë.",
    icon: 'BookOpen',
    totalQuestions: 2000,
    color: '#059669',
    gradient: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'profeti',
    name: 'PROFETI MUHAMED (s.a.s.)',
    shortName: 'Profeti (s.a.s.)',
    description: 'Jeta, lindja, Mekja, Hixhreti, Medina, familja, sahabët, betejat dhe Haxhi i Lamtumirës.',
    icon: 'HeartHandshake',
    totalQuestions: 2000,
    color: '#0284c7',
    gradient: 'from-sky-600 to-indigo-800'
  },
  {
    id: 'fikhu',
    name: 'FIKHU',
    shortName: 'Fikhu',
    description: 'Pastërtia, abdesti, gusli, namazi, agjërimi, zekati, haxhi, hallalli dhe harami.',
    icon: 'Scale',
    totalQuestions: 2000,
    color: '#d97706',
    gradient: 'from-amber-600 to-orange-800'
  },
  {
    id: 'hadithi',
    name: 'HADITHI',
    shortName: 'Hadithi',
    description: 'Hadithet e njohura, shkencat e hadithit, koleksionet madhore, sahabët transmetues dhe morali islam.',
    icon: 'ScrollText',
    totalQuestions: 2000,
    color: '#7c3aed',
    gradient: 'from-violet-600 to-purple-800'
  },
  {
    id: 'historia',
    name: 'HISTORIA ISLAME',
    shortName: 'Historia',
    description: 'Katër halifët e drejtë, sahabët, dinastitë, qytetërimi islam, shkencëtarët dhe betejat historike.',
    icon: 'Landmark',
    totalQuestions: 2000,
    color: '#dc2626',
    gradient: 'from-rose-600 to-red-900'
  },
  {
    id: 'akaidi',
    name: 'AKAIDI',
    shortName: 'Akaidi',
    description: 'Bazat e imanit, Teuhidi, emrat dhe cilësitë e Allahut, melekët, librat, eshatologjia dhe shkollat teologjike.',
    icon: 'ShieldCheck',
    totalQuestions: 2000,
    color: '#0d9488',
    gradient: 'from-teal-600 to-cyan-900'
  },
  {
    id: 'profetet',
    name: 'JETA E PROFETËVE',
    shortName: 'Profetët',
    description: 'Nga Ademi (a.s.), Nuhu, Ibrahimi, Musai, Davudi, Isai deri te 25 profetët e nderuar kuranorë.',
    icon: 'Users',
    totalQuestions: 2000,
    color: '#ea580c',
    gradient: 'from-amber-600 to-orange-900'
  }
];

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    name: 'Fillestari',
    minPoints: 0,
    maxPoints: 500,
    medalName: 'Medalja e Bronzit',
    medalIcon: '🥉',
    description: 'Hapat e parë në udhëtimin e dijes islame.',
    badgeColor: 'bg-amber-700/80 text-amber-200 border-amber-600'
  },
  {
    level: 2,
    name: 'Nxënësi',
    minPoints: 500,
    maxPoints: 1500,
    medalName: 'Medalja e Argjendtë',
    medalIcon: '🥈',
    description: 'Njohuri bazë të thelluara dhe përkushtim i vazhdueshëm.',
    badgeColor: 'bg-slate-500/80 text-slate-100 border-slate-400'
  },
  {
    level: 3,
    name: 'Studiuesi',
    minPoints: 1500,
    maxPoints: 3000,
    medalName: 'Medalja e Artë',
    medalIcon: '🥇',
    description: 'Përvetësim i lartë i koncepteve kuranore dhe historike.',
    badgeColor: 'bg-yellow-500/80 text-yellow-900 border-yellow-300'
  },
  {
    level: 4,
    name: 'Eksperti',
    minPoints: 3000,
    maxPoints: 6000,
    medalName: 'Medalja e Ekspertit',
    medalIcon: '🏅',
    description: 'Njohës i dalluar i fikhut, hadithit dhe burimeve islame.',
    badgeColor: 'bg-emerald-600/80 text-emerald-100 border-emerald-400'
  },
  {
    level: 5,
    name: 'Mjeshtri i Dijes',
    minPoints: 6000,
    maxPoints: 999999,
    medalName: 'Medalja e Mjeshtrit',
    medalIcon: '🏆',
    description: 'Niveli më i lartë i dijes dhe kompetencës në kuiz.',
    badgeColor: 'bg-indigo-600/80 text-indigo-100 border-indigo-400'
  }
];

export const INITIAL_MEDALS: Medal[] = [
  {
    id: 'level_1',
    name: 'Medalja e Bronzit',
    icon: '🥉',
    levelName: 'Niveli 1: Fillestari',
    requirement: 'Arri 0 - 500 pikë',
    type: 'level',
    unlocked: true,
    dateEarned: 'E zhbllokuar'
  },
  {
    id: 'level_2',
    name: 'Medalja e Argjendtë',
    icon: '🥈',
    levelName: 'Niveli 2: Nxënësi',
    requirement: 'Arri mbi 500 pikë',
    type: 'level',
    unlocked: false
  },
  {
    id: 'level_3',
    name: 'Medalja e Artë',
    icon: '🥇',
    levelName: 'Niveli 3: Studiuesi',
    requirement: 'Arri mbi 1,500 pikë',
    type: 'level',
    unlocked: false
  },
  {
    id: 'level_4',
    name: 'Medalja e Ekspertit',
    icon: '🏅',
    levelName: 'Niveli 4: Eksperti',
    requirement: 'Arri mbi 3,000 pikë',
    type: 'level',
    unlocked: false
  },
  {
    id: 'level_5',
    name: 'Medalja e Mjeshtrit',
    icon: '🏆',
    levelName: 'Niveli 5: Mjeshtri i Dijes',
    requirement: 'Arri mbi 6,000 pikë',
    type: 'level',
    unlocked: false
  },
  // Online Medals
  {
    id: 'online_duelisti',
    name: 'Duelisti',
    icon: '🥉',
    levelName: 'Sfida Online',
    requirement: 'Fito sfidën e parë online',
    type: 'online',
    unlocked: false
  },
  {
    id: 'online_konkurrenti',
    name: 'Konkurrenti',
    icon: '🥈',
    levelName: 'Sfida Online',
    requirement: 'Fito 5 sfida online',
    type: 'online',
    unlocked: false
  },
  {
    id: 'online_kampioni',
    name: 'Kampioni',
    icon: '🥇',
    levelName: 'Sfida Online',
    requirement: 'Fito 10 sfida online',
    type: 'online',
    unlocked: false
  },
  {
    id: 'online_mjeshtri',
    name: 'Mjeshtri i Sfidës',
    icon: '🏆',
    levelName: 'Sfida Online',
    requirement: 'Fito 25 sfida online',
    type: 'online',
    unlocked: false
  },
  {
    id: 'online_rrufeja',
    name: 'Rrufeja',
    icon: '⚡',
    levelName: 'Shpejtësi',
    requirement: 'Përgjigju saktë në më pak se 2 sekonda 3 herë',
    type: 'online',
    unlocked: false
  },
  {
    id: 'online_pamposhtur',
    name: 'I Pamposhtur',
    icon: '🔥',
    levelName: 'Fitore Rresht',
    requirement: 'Fito 5 sfida online radhazi',
    type: 'online',
    unlocked: false
  },
  {
    id: 'streak_5',
    name: 'Flaka e Dijes',
    icon: '✨',
    levelName: 'Vazhdimësi',
    requirement: 'Arri 5 përgjigje të sakta rresht',
    type: 'streak',
    unlocked: false
  },
  {
    id: 'streak_10',
    name: 'Drita e Urtësisë',
    icon: '🌟',
    levelName: 'Seri e Pathyer',
    requirement: 'Arri 10 përgjigje të sakta rresht',
    type: 'streak',
    unlocked: false
  },
  {
    id: 'speed_champion',
    name: 'Rrufeja e Shpejtësisë',
    icon: '⚡',
    levelName: 'Sfida e Shpejtë',
    requirement: 'Përfundo me sukses Sfidën e Shpejtë (60s)',
    type: 'special',
    unlocked: false
  },
  {
    id: 'speed_expert',
    name: 'Mjeshtër i Kohës',
    icon: '⏱️',
    levelName: 'Sfida e Shpejtë',
    requirement: 'Përgjigju saktë të paktën 15 pyetjeve në 60 sekonda',
    type: 'special',
    unlocked: false
  },
  {
    id: 'daily_badge',
    name: 'Ylli Ditor',
    icon: '⭐',
    levelName: 'Sfida Ditore',
    requirement: 'Përfundo me sukses sfidën ditore me 5 pyetje unike',
    type: 'special',
    unlocked: false
  },
  {
    id: 'daily_master',
    name: 'Besnik i Diturisë',
    icon: '📅',
    levelName: 'Përkushtim Ditor',
    requirement: 'Plotëso sfidat ditore të dijes islame',
    type: 'special',
    unlocked: false
  },
  {
    id: 'cat_quran',
    name: 'Hafiz i Dijes',
    icon: '📖',
    levelName: "Kurani Fisnik",
    requirement: "Përgjigju saktë pyetjeve të Kuranit Fisnik",
    type: 'category',
    unlocked: false
  },
  {
    id: 'cat_prophet',
    name: 'Dashuri për Pejgamberin (s.a.s.)',
    icon: '🕌',
    levelName: 'Profeti Muhamed (s.a.s.)',
    requirement: 'Shkëlqe në pyetjet mbi jetën e të Dërguarit (s.a.s.)',
    type: 'category',
    unlocked: false
  },
  {
    id: 'cat_fiqh',
    name: 'Fakih i Urtë',
    icon: '⚖️',
    levelName: 'Fikhu',
    requirement: 'Zotëro rregullat e adhurimit dhe pastërtisë',
    type: 'category',
    unlocked: false
  },
  {
    id: 'cat_hadith',
    name: 'Kujtesë Hadithi',
    icon: '📜',
    levelName: 'Hadithi',
    requirement: 'Njih sunetin dhe thëniet profetike',
    type: 'category',
    unlocked: false
  },
  {
    id: 'cat_history',
    name: 'Kronist i Historisë',
    icon: '🏛️',
    levelName: 'Historia Islame',
    requirement: 'Përvetëso ngjarjet dhe halifët e historisë islame',
    type: 'category',
    unlocked: false
  },
  {
    id: 'cat_akaid',
    name: 'Mbrojtës i Akides',
    icon: '🛡️',
    levelName: 'Akaidi',
    requirement: 'Zotëro parimet e besimit dhe Teuhidit',
    type: 'category',
    unlocked: false
  },
  {
    id: 'cat_prophets',
    name: 'Njohës i Profetëve',
    icon: '👑',
    levelName: 'Jeta e Profetëve',
    requirement: 'Përvetëso historitë dhe mrekullitë e profetëve',
    type: 'category',
    unlocked: false
  }
];

const CURATED_QUESTIONS: Question[] = [
  // ===================== KUR'ANI FISNIK =====================
  {
    id: 'q_kurani_1',
    category: 'kurani',
    question: 'Cila është surja e parë e renditur në mus’haf në Kur’anin Fisnik?',
    options: {
      A: 'Surja El-Bekare',
      B: 'Surja El-Fatiha',
      C: 'Surja El-Ihlas',
      D: 'Surja En-Nas'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Quhet ndryshe edhe "Hapësja e Librit" dhe "Ummul Kitab".',
    explanation: 'Surja El-Fatiha është surja e parë sipas radhitjes në Kur’anin Fisnik dhe përbëhet nga 7 ajete të bekuara.'
  },
  {
    id: 'q_kurani_2',
    category: 'kurani',
    question: 'Sa sure ka gjithsej në Kur’anin Fisnik?',
    options: {
      A: '110 sure',
      B: '114 sure',
      C: '124 sure',
      D: '120 sure'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Numri është midis 110 dhe 115.',
    explanation: 'Kur’ani Fisnik përmban gjithsej 114 sure, duke filluar me suren El-Fatiha dhe duke përfunduar me suren En-Nas.'
  },
  {
    id: 'q_kurani_3',
    category: 'kurani',
    question: 'Cila është surja më e gjatë në Kur’anin Fisnik?',
    options: {
      A: 'Surja Ali Imran',
      B: 'Surja En-Nisa',
      C: 'Surja El-Bekare',
      D: 'Surja El-Maide'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Emri i saj do të thotë "Lopa" dhe përmban 286 ajete.',
    explanation: 'Surja El-Bekare është surja më e gjatë e Kur’anit Fisnik, e cila ka gjithsej 286 ajete dhe përmban Ajetin Kursi.'
  },
  {
    id: 'q_kurani_4',
    category: 'kurani',
    question: 'Në cilën natë të bekuar filloi zbritja e Kur’anit Fisnik?',
    options: {
      A: 'Nata e Beratit',
      B: 'Nata e Kadrit',
      C: 'Nata e Miraxhit',
      D: 'Nata e Regaipit'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Kjo natë është më e vlefshme se 1,000 muaj.',
    explanation: 'Kur’ani Fisnik filloi të zbresë në Natën e Kadrit (Lejletul Kadr) gjatë muajit të bekuar të Ramazanit.'
  },
  {
    id: 'q_kurani_5',
    category: 'kurani',
    question: 'Cili ajet konsiderohet ajeti më madhështor në Kur’an?',
    options: {
      A: 'Ajeti i Dinit (i Borxhit)',
      B: 'Ajeti Kursi (El-Bekare, 255)',
      C: 'Ajeti i parë i sures El-Fatiha',
      D: 'Ajeti i fundit i sures Et-Teube'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Gjendet në suren El-Bekare dhe fillon me "Allahu la ilahe il-la huvel-Hajjul-Kajjum".',
    explanation: 'Ajeti Kursi (Bekare: 255) është cilësuar nga Profeti (s.a.s.) si ajeti më i madh dhe më i virtytshëm në mbarë Kur’anin.'
  },
  {
    id: 'q_kurani_6',
    category: 'kurani',
    question: 'Cila sure njihet si "Zemra e Kur’anit"?',
    options: {
      A: 'Surja Rrahman',
      B: 'Surja Ja-Sin',
      C: 'Surja El-Mulk',
      D: 'Surja El-Kehf'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Fillon me dy shkronja të veçuara: Ya dhe Sin.',
    explanation: 'Profeti Muhamed (s.a.s.) ka thënë: "Çdo gjë ka një zemër, dhe zemra e Kur’anit është surja Ja-Sin".'
  },
  {
    id: 'q_kurani_7',
    category: 'kurani',
    question: 'Cili profet përmendet më së shpeshti me emër në Kur’anin Fisnik?',
    options: {
      A: 'Ibrahimi (a.s.)',
      B: 'Musai (a.s.)',
      C: 'Isai (a.s.)',
      D: 'Nuhu (a.s.)'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Atij iu dha Tevrati dhe foli me Allahun në malin Tur.',
    explanation: 'Musai (a.s.) përmendet me emër më shumë se çdo profet tjetër në Kur’an, saktësisht 136 herë.'
  },
  {
    id: 'q_kurani_8',
    category: 'kurani',
    question: 'Cila sure në Kur’anin Fisnik nuk fillon me "Bismil-lahirr-rrahmanirr-rrahim"?',
    options: {
      A: 'Surja El-Enfal',
      B: 'Surja Et-Teube',
      C: 'Surja Junus',
      D: 'Surja En-Nahl'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Quhet edhe surja El-Beraeh dhe është surja e nëntë.',
    explanation: 'Surja Et-Teube është e vetmja sure në Kur’an që nuk fillon me Besmele, për shkak të zbritjes me mesazh të ashpër ndaj idhujtarëve.'
  },
  {
    id: 'q_kurani_9',
    category: 'kurani',
    question: 'Cila sure e Kur’anit përmban dy herë "Bismil-lahirr-rrahmanirr-rrahim"?',
    options: {
      A: 'Surja En-Neml',
      B: 'Surja El-Kasas',
      C: 'Surja Es-Sebe',
      D: 'Surja Fatir'
    },
    correctAnswer: 'A',
    difficulty: 'avancuar',
    hint: 'Kjo sure trajton historinë e Sulejmanit (a.s.) dhe letrën dërguar mbretëreshës së Shebës.',
    explanation: 'Surja En-Neml e ka Besmelen në fillim dhe një tjetër në ajetin 30 në letrën e profetit Sulejman (a.s.) drejtuar Belkises.'
  },
  {
    id: 'q_kurani_10',
    category: 'kurani',
    question: 'Sa xhuza (pjesë) ka Kur’ani Fisnik?',
    options: {
      A: '20 xhuza',
      B: '30 xhuza',
      C: '40 xhuza',
      D: '60 xhuza'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Përkon zakonisht me numrin e ditëve të një muaji hënor.',
    explanation: 'Kur’ani Fisnik është i ndarë në 30 xhuza të barabartë për të lehtësuar leximin dhe mësimin e tij përgjatë një muaji.'
  },
  {
    id: 'q_kurani_11',
    category: 'kurani',
    question: 'Cila sure e Kur’anit vlen sa një e treta e Kur’anit sipas hadithit të saktë?',
    options: {
      A: 'Surja El-Felek',
      B: 'Surja El-Kewther',
      C: 'Surja El-Ihlas',
      D: 'Surja En-Nasr'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Kjo sure afirmon pastër njëshmërinë absolute (Teuvhidin) e Allahut.',
    explanation: 'Profeti (s.a.s.) sqaroi se surja El-Ihlas barazohet me një të tretën e Kur’anit, sepse përmbledh thelbin e Teuhidit.'
  },

  // ===================== PROFETI MUHAMED (s.a.s.) =====================
  {
    id: 'q_profeti_1',
    category: 'profeti',
    question: 'Në cilin qytet lindi Profeti Muhamed (s.a.s.)?',
    options: {
      A: 'Në Medinë',
      B: 'Në Mekë',
      C: 'Në Taif',
      D: 'Në Kuds (Jerusalem)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Qyteti ku ndodhet Qabeja e shenjtë.',
    explanation: 'Profeti Muhamed (s.a.s.) lindi në qytetin e bekuar të Mekës në Vitin e Elefantit (rreth vitit 570 pas e.s.).'
  },
  {
    id: 'q_profeti_2',
    category: 'profeti',
    question: 'Si quhej nëna e nderuar e Profetit Muhamed (s.a.s.)?',
    options: {
      A: 'Halime',
      B: 'Hatixhe',
      C: 'Emine',
      D: 'Fatime'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Bija e Uehbit nga fisi Benu Zuhra.',
    explanation: 'Nëna e Profetit Muhamed (s.a.s.) ishte Emine bint Uehb, e cila ndërroi jetë kur ai ishte rreth gjashtë vjeç.'
  },
  {
    id: 'q_profeti_3',
    category: 'profeti',
    question: 'Në cilën shpellë i zbriti për herë të parë shpallja Profetit Muhamed (s.a.s.)?',
    options: {
      A: 'Në shpellën Theur',
      B: 'Në shpellën Hira',
      C: 'Në shpellën Uhud',
      D: 'Në shpellën Sevr'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Ndodhet në malin Xhebel en-Nur pranë Mekës.',
    explanation: 'Shpallja e parë kuranore (ajetet e para të sures El-Alek) zbriti në shpellën Hira përmes engjëllit Xhibril (a.s.)'
  },
  {
    id: 'q_profeti_4',
    category: 'profeti',
    question: 'Cila ishte bashkëshortja e parë e Profetit Muhamed (s.a.s.) dhe personi i parë që besoi?',
    options: {
      A: 'Aishe bint Ebi Bekr (r.a.)',
      B: 'Hafsa bint Umer (r.a.)',
      C: 'Hatixhe bint Huvejlid (r.a.)',
      D: 'Zejneb bint Xhahsh (r.a.)'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Ajo e mbështeti dhe e ngushëlloi menjëherë pas shpalljes së parë.',
    explanation: 'Hatixheja (r.a.) ishte bashkëshortja e parë e Profetit (s.a.s.) dhe personi i parë në histori që pranoi islamin pa asnjë hezitim.'
  },
  {
    id: 'q_profeti_5',
    category: 'profeti',
    question: 'Në cilin vit ndodhi Hixhreti (shpërngulja) e Profetit (s.a.s.) nga Meka në Medinë?',
    options: {
      A: 'Në vitin 610 pas e.s.',
      B: 'Në vitin 622 pas e.s.',
      C: 'Në vitin 630 pas e.s.',
      D: 'Në vitin 632 pas e.s.'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Kjo ngjarje shënon fillimin e kalendarit hixhri mysliman.',
    explanation: 'Hixhreti ndodhi në vitin 622 pas e.s., duke shënuar themelimin e shoqërisë së parë islame në Medinë dhe fillimin e erës hixhrie.'
  },
  {
    id: 'q_profeti_6',
    category: 'profeti',
    question: 'Si quhej deveja e Profetit Muhamed (s.a.s.) gjatë Hixhretit?',
    options: {
      A: 'El-Kasva',
      B: 'El-Burak',
      C: 'Ed-Dulful',
      D: 'Es-Sakb'
    },
    correctAnswer: 'A',
    difficulty: 'mesatar',
    hint: 'Ajo u ul në vendin ku më pas u ndërtua Xhamia e Profetit në Medinë.',
    explanation: 'Deveja e Profetit (s.a.s.) quhej El-Kasva. Ajo ndaloi me urdhrin e Allahut në vendin ku u ngrit Mesxhid en-Nebevi.'
  },
  {
    id: 'q_profeti_7',
    category: 'profeti',
    question: 'Cila ishte beteja e parë e madhe vendimtare në historinë islame?',
    options: {
      A: 'Beteja e Uhudit',
      B: 'Beteja e Hendekut',
      C: 'Beteja e Bedrit',
      D: 'Beteja e Hunejnit'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'U zhvillua në muajin e Ramazanit në vitin e dytë hixhri.',
    explanation: 'Beteja e Bedrit (viti 2 hixhri) ishte përballja e parë e madhe ku myslimanët korrën një fitore historike me ndihmën e Allahut.'
  },
  {
    id: 'q_profeti_8',
    category: 'profeti',
    question: 'Në cilën moshë ndërroi jetë Profeti Muhamed (s.a.s.)?',
    options: {
      A: 'Në moshën 58 vjeç',
      B: 'Në moshën 60 vjeç',
      C: 'Në moshën 63 vjeç',
      D: 'Në moshën 65 vjeç'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Gjithashtu edhe Ebu Bekri (r.a.) dhe Umeri (r.a.) ndërruan jetë në këtë moshë.',
    explanation: 'Profeti Muhamed (s.a.s.) ndërroi jetë në Medinën e ndriçuar në moshën 63 vjeçare, më 12 Rebiul Evvel të vitit 11 hixhri.'
  },
  {
    id: 'q_profeti_9',
    category: 'profeti',
    question: 'Si quhej gjyshi i Profetit (s.a.s.) që u kujdes për të pas vdekjes së nënës së tij?',
    options: {
      A: 'Ebu Talibi',
      B: 'Abdulmutalibi',
      C: 'Abas ibn Abdulmutalib',
      D: 'Hamza'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Ai ishte kreu i shquar i fisit Kurejsh që rihapi burimin e Zemzemit.',
    explanation: 'Abdulmutalibi e mori nën kujdes nipin e tij Muhamedin (s.a.s.) me shumë dashuri deri sa ndërroi jetë kur Muhamedi ishte 8 vjeç.'
  },
  {
    id: 'q_profeti_10',
    category: 'profeti',
    question: 'Cili prej fëmijëve të Profetit (s.a.s.) jetoi pas vdekjes së tij?',
    options: {
      A: 'Kasimi',
      B: 'Ibrahimi',
      C: 'Rukaja',
      D: 'Fatimja (r.a.)'
    },
    correctAnswer: 'D',
    difficulty: 'mesatar',
    hint: 'Ajo ishte bashkëshortja e Ali ibn Ebi Talibit (r.a.) dhe nëna e Hasanit dhe Husejnit.',
    explanation: 'Të gjithë fëmijët e Profetit (s.a.s.) ndërruan jetë gjatë jetës së tij, përveç Fatimes (r.a.), e cila ndërroi jetë rreth 6 muaj pas tij.'
  },

  // ===================== FIKHU =====================
  {
    id: 'q_fikhu_1',
    category: 'fikhu',
    question: 'Sa rekate farz ka namazi i sabahut?',
    options: {
      A: '1 rekat',
      B: '2 rekate',
      C: '3 rekate',
      D: '4 rekate'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Është namazi më i shkurtër me rekate farz në ditë.',
    explanation: 'Namazi farz i sabahut përbëhet saktësisht nga 2 rekate, para të cilave falen edhe 2 rekate sunet të theksuar.'
  },
  {
    id: 'q_fikhu_2',
    category: 'fikhu',
    question: 'Sa janë shtyllat (kushtet) kryesore të Islamit?',
    options: {
      A: '3 shtylla',
      B: '5 shtylla',
      C: '6 shtylla',
      D: '7 shtylla'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Dëshmia, namazi, zekati, agjërimi dhe haxhi.',
    explanation: 'Islami është ndërtuar mbi pesë shtylla: Shehadeti, falja e namazit, dhënia e zekatit, agjërimi i Ramazanit dhe Haxhi.'
  },
  {
    id: 'q_fikhu_3',
    category: 'fikhu',
    question: 'Cila është përqindja e zakonshme që jepet si Zekat për pasurinë monetare që plotëson nisabin?',
    options: {
      A: '1%',
      B: '2.5% (një e dyzetat)',
      C: '5%',
      D: '10%'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Një e dyzeta e pasurisë (2.5%).',
    explanation: 'Zekati i pasurisë monetare, arit dhe argjendit është 2.5% pasi pasuria të ketë plotësuar nisabin dhe të ketë kaluar një vit hënor.'
  },
  {
    id: 'q_fikhu_4',
    category: 'fikhu',
    question: 'Çfarë quhet pastrimi me dhe ose pluhur të pastër kur mungon uji për abdest?',
    options: {
      A: 'Gusël',
      B: 'Tejemum',
      C: 'Istigfar',
      D: 'Mest'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Bëhet duke prekur me duar tokën e pastër dhe fshirë fytyrën e krahët.',
    explanation: 'Tejemumi është zëvendësuesi fetar i abdestit ose guslit me dhe të pastër kur nuk gjendet ujë ose nuk mund të përdoret për arsye shëndetësore.'
  },
  {
    id: 'q_fikhu_5',
    category: 'fikhu',
    question: 'Sa herë në ditë është i obligueshëm falja e namazit farz për çdo mysliman?',
    options: {
      A: '3 herë',
      B: '5 herë',
      C: '7 herë',
      D: '2 herë'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Sabahu, dreka, ikindia, akshami dhe jacia.',
    explanation: 'Pesë namazet ditore (Sabahu, Dreka, Ikindia, Akshami dhe Jacia) janë obligim i palëkundur (farz ajn) për çdo besimtar.'
  },
  {
    id: 'q_fikhu_6',
    category: 'fikhu',
    question: 'Në cilin muaj të kalendarit hënor islam agjërohet i gjithë muaji?',
    options: {
      A: 'Rexhep',
      B: 'Shaban',
      C: 'Ramazan',
      D: 'Dhul-Hixhe'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Muaji i zbritjes së Kur’anit dhe mëshirës hyjnore.',
    explanation: 'Agjërimi i muajit të Ramazanit është shtylla e katërt e Islamit dhe është i detyrueshëm për çdo mysliman të rritur e të aftë.'
  },
  {
    id: 'q_fikhu_7',
    category: 'fikhu',
    question: 'Cili është drejtimi i kibles për myslimanët gjatë namazit?',
    options: {
      A: 'Drejt Kudsit (Jerusalem)',
      B: 'Drejt Qabesë në Mekë',
      C: 'Drejt lindjes së diellit',
      D: 'Drejt veriut magnetik'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Shtëpia e Shenjtë në Mesxhidil Haram në Mekë.',
    explanation: 'Kibla e të gjithë myslimanëve kudo në botë është Qabeja e nderuar e ndodhur në qytetin e shenjtë të Mekës.'
  },
  {
    id: 'q_fikhu_8',
    category: 'fikhu',
    question: 'Çfarë quhet dita e parë e Haxhit më 8 Dhul-Hixhe?',
    options: {
      A: 'Dita e Arefatit',
      B: 'Dita e Tervijes',
      C: 'Dita e Kurbanit',
      D: 'Dita e Teshrikut'
    },
    correctAnswer: 'B',
    difficulty: 'avancuar',
    hint: 'Besimtarët nisen drejt Mines për të kaluar natën atje.',
    explanation: 'Dita e 8-të e Dhul-Hixhes njihet si Dita e Tervijes, ku haxhilerët vendosen në Mina duke u përgatitur për qëndrimin në Arefat.'
  },
  {
    id: 'q_fikhu_9',
    category: 'fikhu',
    question: 'Ngrënia ose pirja nga harresa a e prish agjërimin?',
    options: {
      A: 'Po, menjëherë e prish dhe duhet kompensuar',
      B: 'Jo, nuk e prish agjërimin nëse ka qenë plotësisht nga harresa',
      C: 'E prish vetëm nëse pihet ujë, por jo po u ngrë bukë',
      D: 'E prish vetëm në agjërim vullnetar'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Profeti (s.a.s.) ka thënë: "Ai që harron dhe ha apo pi, le ta vazhdojë agjërimin...".',
    explanation: 'Sipas hadithit të saktë, ai që ha apo pi nga harresa duhet ta vazhdojë agjërimin sepse "e ka ushqyer dhe i ka dhënë ujë Allahu".'
  },
  {
    id: 'q_fikhu_10',
    category: 'fikhu',
    question: 'Sa rekate farz ka namazi i xhumasë që falet me xhemat?',
    options: {
      A: '4 rekate',
      B: '2 rekate',
      C: '3 rekate',
      D: '1 rekat'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Zëvendëson 4 rekatet e drekës dhe paraprihet nga dy hutbe.',
    explanation: 'Namazi i xhumasë falet me xhemat në vend të drekës të ditës së premte dhe përbëhet nga 2 rekate farz pas hutbes.'
  },

  // ===================== HADITHI =====================
  {
    id: 'q_hadithi_1',
    category: 'hadithi',
    question: 'Sipas hadithit të njohur të transmetuar nga Umer ibnul Hattabi (r.a.), mbi çfarë vlerësohen veprat?',
    options: {
      A: 'Veprat vlerësohen sipas pasurisë',
      B: 'Veprat vlerësohen sipas qëllimeve (nijetit)',
      C: 'Veprat vlerësohen sipas numrit të tyre',
      D: 'Veprat vlerësohen sipas fjalëve'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: '"Innemel a’malu bin-nijat..."',
    explanation: 'Hadithi i parë në Sahihun e Buhariut thekson: "Me të vërtetë veprat vlerësohen sipas qëllimeve (nijeteve) dhe çdo njeriu i takon ajo që ka për synim".'
  },
  {
    id: 'q_hadithi_2',
    category: 'hadithi',
    question: 'Cili sahabi ka transmetuar numrin më të madh të haditheve nga Profeti Muhamed (s.a.s.)?',
    options: {
      A: 'Ali ibn Ebi Talib (r.a.)',
      B: 'Ebu Hurejre (r.a.)',
      C: 'Enes ibn Malik (r.a.)',
      D: 'Abdullah ibn Umer (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Nofka e tij do të thotë "babai i maces".',
    explanation: 'Ebu Hurejre (r.a.) është sahabiu me më së shumti hadithe të transmetuara (mbi 5,300 hadithe) falë shoqërimit të vazhdueshëm me Profetin (s.a.s.).'
  },
  {
    id: 'q_hadithi_3',
    category: 'hadithi',
    question: 'Cilat janë dy librat më të saktë të hadithit në botën islame (Sahihan)?',
    options: {
      A: 'Sunen Ebi Davud dhe Sunen Tirmidhi',
      B: 'Sahih el-Buhari dhe Sahih Muslim',
      C: 'Muvetta e Malikut dhe Musnedi i Ahmedit',
      D: 'Sunen Ibn Maxheh dhe Sunen Nesai'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Autorët e tyre janë Imam El-Buhari dhe Imam Muslimi.',
    explanation: 'Sahih El-Buhari dhe Sahih Muslim konsiderohen nga dijetarët librat më autentikë pas Kur’anit Fisnik.'
  },
  {
    id: 'q_hadithi_4',
    category: 'hadithi',
    question: 'Çfarë do të thotë hadith "Kudsi"?',
    options: {
      A: 'Hadith i thënë vetëm në qytetin e Kuds-it',
      B: 'Hadith ku Profeti (s.a.s.) transmeton fjalët e Allahut, por me formulim profetik',
      C: 'Hadith që flet vetëm për xhenetin',
      D: 'Hadith i dobët'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Kuptimi vjen direkt nga Allahu, ndërsa fjalët nga i Dërguari (s.a.s.).',
    explanation: 'Hadithi Kudsi është ai hadith ku Profeti (s.a.s.) transmeton drejtpërdrejt nga Zoti i tij, por nuk është ajet i Kur’anit.'
  },
  {
    id: 'q_hadithi_5',
    category: 'hadithi',
    question: 'Plotëso hadithin: "Mysliman i vërtetë është ai nga gjuha dhe dora e të cilit..."',
    options: {
      A: '...njerëzit pasurohen',
      B: '...myslimanët e tjerë janë të sigurt',
      C: '...njerëzit dëgjojnë vetëm të vërtetën',
      D: '...armiku ka frikë'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Flet për sigurinë, mbrojtjen dhe mungesën e dëmit ndaj të tjerëve.',
    explanation: 'Profeti (s.a.s.) tha: "Mysliman është ai prej gjuhës dhe dorës së të cilit myslimanët (njerëzit) janë të sigurt".'
  },
  {
    id: 'q_hadithi_6',
    category: 'hadithi',
    question: 'Si quhet personi që shërbeu Profetin (s.a.s.) për 10 vite dhe transmetoi qindra hadithe?',
    options: {
      A: 'Zejd ibn Harithe (r.a.)',
      B: 'Enes ibn Malik (r.a.)',
      C: 'Bilal ibn Rebah (r.a.)',
      D: 'Ebu Dher el-Gifari (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'E ëma e solli te Profeti (s.a.s.) kur ai ishte ende fëmijë në Medinë.',
    explanation: 'Enes ibn Malik (r.a.) i shërbeu Profetit (s.a.s.) për 10 vite në Medinë dhe dëshmoi butësinë e pakrahasueshme të karakterit profetik.'
  },
  {
    id: 'q_hadithi_7',
    category: 'hadithi',
    question: 'Sipas hadithit, cila buzëqeshje konsiderohet lëmoshë (sadaka)?',
    options: {
      A: 'Buzëqeshja në pasqyrë',
      B: 'Buzëqeshja në fytyrën e vëllait tënd besimtar',
      C: 'Buzëqeshja gjatë tregtisë',
      D: 'Buzëqeshja para pasurisë'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: '"Tebessumuke fi vexhi ehike..."',
    explanation: 'Profeti Muhamed (s.a.s.) ka thënë: "Buzëqeshja jote në fytyrën e vëllait tënd është lëmoshë (sadaka)".'
  },
  {
    id: 'q_hadithi_8',
    category: 'hadithi',
    question: 'Kush ishte gruaja e Profetit (s.a.s.) e cila transmetoi mbi dy mijë hadithe dhe ishte mësuese e sahabëve?',
    options: {
      A: 'Sevda bint Zem’a (r.a.)',
      B: 'Aishe bint Ebi Bekr (r.a.)',
      C: 'Safije bint Hujej (r.a.)',
      D: 'Xhuvejrije bint Harith (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Bija e Ebu Bekrit (r.a.), e njohur për zgjuarsi dhe memorie të shkëlqyer.',
    explanation: 'Aisheja (r.a.) ishte një nga dijetaret më të mëdha të islamit, duke transmetuar 2,210 hadithe dhe duke shpjeguar dispozitat më të thella fetare.'
  },

  // ===================== HISTORIA ISLAME =====================
  {
    id: 'q_historia_1',
    category: 'historia',
    question: 'Kush ishte halifi i parë i drejtë (El-Hulafa er-Rashidun) pas vdekjes së Profetit (s.a.s.)?',
    options: {
      A: 'Umer ibnul Hattab (r.a.)',
      B: 'Ebu Bekr es-Siddik (r.a.)',
      C: 'Uthman ibn Affan (r.a.)',
      D: 'Ali ibn Ebi Talib (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Shoku më i ngushtë i Profetit (s.a.s.) gjatë Hixhretit në shpellë.',
    explanation: 'Ebu Bekr es-Siddik (r.a.) u zgjodh halifi i parë i myslimanëve dhe udhëhoqi me vendosmëri e drejtësi të lartë.'
  },
  {
    id: 'q_historia_2',
    category: 'historia',
    question: 'Cili halif njihej me nofkën "El-Faruk" (ai që ndan të vërtetën nga e pavërteta)?',
    options: {
      A: 'Umer ibnul Hattab (r.a.)',
      B: 'Ebu Bekri (r.a.)',
      C: 'Uthmani (r.a.)',
      D: 'Aliu (r.a.)'
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: 'Halifi i dytë, simboli botëror i drejtësisë.',
    explanation: 'Umer ibnul Hattab (r.a.) u quajt "El-Faruk" nga vetë Profeti (s.a.s.) sepse me pranimin e tij të islamit u fuqizua e vërteta.'
  },
  {
    id: 'q_historia_3',
    category: 'historia',
    question: 'Gjatë kalifatit të cilit halif u bashkua dhe u standardizua përfundimisht Kur’ani në një mus’haf të vetëm?',
    options: {
      A: 'Ebu Bekrit (r.a.)',
      B: 'Umerit (r.a.)',
      C: 'Uthman ibn Affanit (r.a.)',
      D: 'Aliut (r.a.)'
    },
    correctAnswer: 'C',
    difficulty: 'mesatar',
    hint: 'Halifi i tretë, i njohur me titullin Dhun-Nurejn.',
    explanation: 'Uthman ibn Affan (r.a.) bëri shumëfishimin dhe shpërndarjen e kopjeve zyrtare të Kur’anit në qendrat kryesore të shtetit islam.'
  },
  {
    id: 'q_historia_4',
    category: 'historia',
    question: 'Cili sahabi i shquar u quajt nga Profeti (s.a.s.) me titullin "Shpata e zhveshur e Allahut" (Sejfullah)?',
    options: {
      A: 'Sad ibn Ebi Vakkas (r.a.)',
      B: 'Halid ibn el-Velid (r.a.)',
      C: 'Ebu Ubejde el-Xherrah (r.a.)',
      D: 'Hamza ibn Abdulmutalib (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Gjeneral ushtarak gjenial që nuk humbi asnjë betejë në jetën e tij.',
    explanation: 'Halid ibn el-Velid (r.a.) u pagëzua si "Sejfullah" për shkak të heroizmit dhe udhëheqjes gjeniale në mbrojtje të besimit.'
  },
  {
    id: 'q_historia_5',
    category: 'historia',
    question: 'Kush ishte personi i parë që thirri ezanin në historinë e Islamit (Myezini i parë)?',
    options: {
      A: 'Selman el-Farisi (r.a.)',
      B: 'Bilal ibn Rebah (r.a.)',
      C: 'Suhejb er-Rumi (r.a.)',
      D: 'Ammar ibn Jasir (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Zëri i tij i ëmbël dhe i fuqishëm jehonte mbi çatitë e Medinës.',
    explanation: 'Bilal ibn Rebah (r.a.), i shquar për durimin e tij ndaj mundimeve në Mekë, u zgjodh nga Profeti (s.a.s.) si myezini i parë i islamit.'
  },
  {
    id: 'q_historia_6',
    category: 'historia',
    question: 'Cili qytet u bë kryeqyteti i shtetit islam gjatë kalifatit të Ali ibn Ebi Talibit (r.a.)?',
    options: {
      A: 'Damasku',
      B: 'Kufeja',
      C: 'Basra',
      D: 'Kajro'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Qytet i rëndësishëm në Irakun e sotëm.',
    explanation: 'Ali ibn Ebi Talibi (r.a.) e zhvendosi qendrën e administratës së kalifatit nga Medina në qytetin e Kufes në Irak.'
  },
  {
    id: 'q_historia_7',
    category: 'historia',
    question: 'Kush ishte komandanti mysliman që çliroi Kuds-in (Jerusalemin) në vitin 1187 pas betejës së Hattinit?',
    options: {
      A: 'Harun er-Reshid',
      B: 'Salahudin Ejubi',
      C: 'Tarik ibn Zijad',
      D: 'Muhamed el-Fatih'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'I njohur në histori për fisnikërinë dhe mëshirën ndaj robërve dhe të mundurve.',
    explanation: 'Sulltan Salahudin Ejubi çliroi Kuds-in në vitin 1187, duke u treguar shembull i lartë i mëshirës, tolerancës dhe drejtësisë.'
  },
  {
    id: 'q_historia_8',
    category: 'historia',
    question: 'Në cilin vit u çlirua Meka pa luftë dhe gjakderdhje nga Profeti Muhamed (s.a.s.)?',
    options: {
      A: 'Në vitin 6 hixhri',
      B: 'Në vitin 8 hixhri (630 pas e.s.)',
      C: 'Në vitin 10 hixhri',
      D: 'Në vitin 2 hixhri'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Në muajin e Ramazanit të vitit të tetë pas shpërnguljes.',
    explanation: 'Meka u çlirua në vitin 8 hixhri, ku Profeti (s.a.s.) fali të gjithë banorët e saj duke thënë: "Shkoni, ju jeni të lirë!".'
  },
  {
    id: 'q_historia_9',
    category: 'historia',
    question: 'Cili dijetar i madh islam njihet si "Babai i Algjebrës"?',
    options: {
      A: 'Ibn Sina (Avicenna)',
      B: 'Muhamed ibn Musa El-Huarizmi',
      C: 'Ibn Ruzhdi (Averroes)',
      D: 'El-Biruni'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Vetë fjala "algjebër" dhe "algoritëm" rrjedhin nga libri dhe emri i tij.',
    explanation: 'El-Huarizmi (shekulli IX) themeloi disiplinën e Algjebrës me librin e tij historik "El-Kitab el-Muhtasar fi hisab el-xhebr vel-mukabele".'
  },
  {
    id: 'q_historia_10',
    category: 'historia',
    question: 'Kush ishte njeriu i parë mashkull i rritur dhe i lirë që pranoi islamin?',
    options: {
      A: 'Omeri (r.a.)',
      B: 'Ebu Bekri (r.a.)',
      C: 'Uthmani (r.a.)',
      D: 'Sad ibn Ebi Vakkas (r.a.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Miku më besnik i Profetit (s.a.s.).',
    explanation: 'Ebu Bekr es-Siddik (r.a.) ishte burri i parë i lirë që pranoi menjëherë islamin dhe ftoi shumë sahabë të tjerë të nderuar.'
  },

  // ===================== AKAIDI =====================
  {
    id: 'q_akaidi_1',
    category: 'akaidi',
    question: 'Sa janë shtyllat (kushtet) kryesore të Imanit (Besimit) në Islam sipas Hadithit të Xhibrilit?',
    options: {
      A: '5 shtylla',
      B: '6 shtylla',
      C: '4 shtylla',
      D: '7 shtylla'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Besimi në Allahun, melekët, librat, profetët, Ditën e Gjykimit dhe Kaderin.',
    explanation: 'Imani përbëhet nga 6 kushte themelore të përcaktuara nga Profeti (s.a.s.) në përgjigjen dhënë engjëllit Xhibril.'
  },
  {
    id: 'q_akaidi_2',
    category: 'akaidi',
    question: 'Çfarë nënkupton koncepti themelor "Teuhid er-Rububijje"?',
    options: {
      A: 'Veçimi i Allahut në adhurim dhe lutje',
      B: 'Besimi se Allahu është Krijuesi, Furnizuesi dhe Sunduesi i vetëm i gjithësisë',
      C: 'Besimi në shkollën teologjike maturidite',
      D: 'Njohja e gjuhës së engjëjve'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Lidhet me veprat madhore të Zotit ndaj krijesave: krijimi, furnizimi, ngjallja dhe vdekja.',
    explanation: 'Teuhid er-Rububijje është pranimi i padiskutueshëm se vetëm Allahu krijon nga asgjëja, zotëron dhe drejton çdo krijesë.'
  },
  {
    id: 'q_akaidi_3',
    category: 'akaidi',
    question: 'Cili Emër i Bukur i Allahut (Esmaul Husna) do të thotë "I Vetmi, tek i cili të gjitha krijesat mbështeten, ndërsa Ai nuk ka nevojë për askënd"?',
    options: {
      A: 'El-Kuddus',
      B: 'Es-Samed',
      C: 'El-Alim',
      D: 'El-Muheymin'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Gjendet në ajetin e dytë të sures El-Ihlas.',
    explanation: 'Es-Samed do të thotë Absoluti, i Vetë-mjaftueshmi tek i cili strehohet dhe varet e gjithë ekzistenca.'
  },
  {
    id: 'q_akaidi_4',
    category: 'akaidi',
    question: 'Cili engjëll është i ngarkuar me sjelljen e shpalljes (vahjit) hyjnore tek të gjithë profetët?',
    options: {
      A: 'Mikaili (a.s.)',
      B: 'Israfili (a.s.)',
      C: 'Xhibrili (a.s.)',
      D: 'Azraili (a.s.)'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'Njihet edhe si Ruhu-l-Kudus (Shpirti i Shenjtë) dhe Ruhu-l-Emin (Shpirti Besnik).',
    explanation: 'Engjëlli Xhibril (a.s.) është i dërguari besnik i qiellit që zbriti shpalljet hyjnore tek të dërguarit e Allahut.'
  },
  {
    id: 'q_akaidi_5',
    category: 'akaidi',
    question: 'Cilit profet të nderuar iu shpall libri i shenjtë "Zebur"?',
    options: {
      A: 'Profetit Musa (a.s.)',
      B: 'Profetit Davud (a.s.)',
      C: 'Profetit Isa (a.s.)',
      D: 'Profetit Ibrahim (a.s.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Profeti dhe mbreti që mposhti Xhalutin dhe këndonte lavde Zotit me zë të mrekullueshëm.',
    explanation: 'Allahu thotë në Kur’an: "Dhe Ne i dhamë Davudit Zeburin".'
  },
  {
    id: 'q_akaidi_6',
    category: 'akaidi',
    question: 'Cila cilësi është e domosdoshme (vaxhib) për të gjithë profetët dhe nënkupton "Mbrojtjen nga mëkatet e mëdha dhe devijimi"?',
    options: {
      A: 'Sidk (Vërtetësia)',
      B: 'Fetane (Zgjuarsia)',
      C: 'Ismet (Pagabueshmëria morale)',
      D: 'Teblig (Transmetimi)'
    },
    correctAnswer: 'C',
    difficulty: 'mesatar',
    hint: 'Cilësia që siguron paprekshmërinë morale dhe shpirtërore të mesazhit hyjnor.',
    explanation: 'Ismet është virtyti hyjnor që i ruan të dërguarit nga mëkatet dhe sjelljet që cenojnë besueshmërinë profetike.'
  },
  {
    id: 'q_akaidi_7',
    category: 'akaidi',
    question: 'Si quhet ura e ngushtë dhe e mprehtë e shtrirë mbi Xhehenem mbi të cilën do të kalojnë njerëzit në Ditën e Gjykimit?',
    options: {
      A: 'Ura e Siratit',
      B: 'Fusha e Mahsherit',
      C: 'Pushteti i Havdit',
      D: 'Shkalla e Mizanit'
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: 'Besimtarët do ta kalojnë sipas shkallës së dritës dhe veprave të tyre të mira.',
    explanation: 'Sirati është ura e provës përfundimtare në ahiret mbi humnerën e zjarrit, që të çon drejt portave të Xhenetit.'
  },
  {
    id: 'q_akaidi_8',
    category: 'akaidi',
    question: 'Cilat janë katër shkallët (meratib) thelbësore të besimit në Kader sipas Ehl-i Sunetit?',
    options: {
      A: 'Ilmi (Dituria), Kitabeja (Shkrimi), Meshi’eti (Vullneti) dhe Halku (Krijimi)',
      B: 'Lindja, Fëmijëria, Pleqëria dhe Vdekja',
      C: 'Nijeti, Pendimi, Agjërimi dhe Haxhi',
      D: 'Teuhidi, Resulllëku, Melekët dhe Librat'
    },
    correctAnswer: 'A',
    difficulty: 'mesatar',
    hint: 'Allahu e di çdo gjë që do të ndodhë, e ka shkruar në Lehvi Mahfudh, e dëshiron dhe e krijon.',
    explanation: 'Kaderi përmbledh: Diturinë e pakufishme të Allahut, shkrimin e tij të paracaktuar, vullnetin e Tij të gjithëfuqishëm dhe krijimin e çdo veprimi.'
  },
  {
    id: 'q_akaidi_9',
    category: 'akaidi',
    question: 'Kush janë dy themeluesit e shkollave ortodokse të akides sunite që mbrojtën besimin me argumente logjike dhe tekstuale?',
    options: {
      A: 'Imam Buhariu dhe Imam Myslimi',
      B: 'Ebu Hasen el-Esh’ari dhe Ebu Mensur el-Maturidi',
      C: 'Ibn Ruzhdi dhe Ibn Arabiu',
      D: 'Vasil ibn Ata dhe Amr ibn Ubejd'
    },
    correctAnswer: 'B',
    difficulty: 'avancuar',
    hint: 'Përfaqësojnë dy shkollat klasike teologjike të Ehl-i Sunetit (Esh’arite dhe Maturidite).',
    explanation: 'Imam El-Esh’ari dhe Imam El-Maturidi sistematizuan dhe mbrojtën akiden sunite kundër sekteve devijuese.'
  },
  {
    id: 'q_akaidi_10',
    category: 'akaidi',
    question: 'Çfarë nënkupton koncepti i "Fitras" në teologjinë islame?',
    options: {
      A: 'Lëmosha që jepet në fund të Ramazanit',
      B: 'Natyrshmëria e lindur e pastër e njeriut me prirje për të njohur dhe adhuruar Krijuesin',
      C: 'Dënimi i varrit për idhujtarët',
      D: 'Një lloj agjërimi vullnetar'
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: 'Profeti (s.a.s.) tha: "Çdo fëmijë lind në natyrshmëri të pastër (fitra)...".',
    explanation: 'Fitra është gjendja origjinale, e paprishur dhe e pastër shpirtërore me të cilën Allahu e krijoi njeriun për ta njohur Teuhidin.'
  },

  // ===================== JETA E PROFETËVE =====================
  {
    id: 'q_profetet_1',
    category: 'profetet',
    question: 'Kush është profeti dhe njeriu i parë i krijuar nga Allahu i Madhëruar?',
    options: {
      A: 'Profeti Idris (a.s.)',
      B: 'Profeti Nuh (a.s.)',
      C: 'Profeti Adem (a.s.)',
      D: 'Profeti Ibrahim (a.s.)'
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: 'I njohur si Ebul Besher (Babai i Njerëzimit).',
    explanation: 'Ademi (a.s.) është njeriu i parë dhe profeti i parë i krijuar nga dheu, të cilit iu përulën melekët me urdhër hyjnor.'
  },
  {
    id: 'q_profetet_2',
    category: 'profetet',
    question: 'Sa vite e ftoi profeti Nuh (a.s.) me durim të pashoq popullin e tij në rrugën e Teuhidit para Përmbytjes?',
    options: {
      A: '100 vite',
      B: '950 vite',
      C: '500 vite',
      D: '300 vite'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Përmendet në suren El-Ankebut: "qëndroi ndër ta njëmijë pa pesëdhjetë vjet".',
    explanation: 'Nuhi (a.s.) thirri popullin e tij pa u lodhur për 950 vite para se të urdhërohej të ndërtonte Anijen e madhe shpëtuese.'
  },
  {
    id: 'q_profetet_3',
    category: 'profetet',
    question: 'Çfarë mrekullie ndodhi kur tirani Nemrud e hodhi profetin Ibrahim (a.s.) në zjarrin e flakëruar?',
    options: {
      A: 'Zjarri u shua nga një rrufe e fortë',
      B: 'Zjarri me urdhër të Allahut u bë i ftohtë dhe shpëtues ("Bëhu i ftohtë dhe paqe për Ibrahimin")',
      C: 'Ibrahimi u fsheh pas një shkëmbi',
      D: 'Zjarri u kthye në re tymi'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Sureja El-Enbija ajeti 69: "Kulna ja naru kuni berden ve selamen ala Ibrahim".',
    explanation: 'Allahu i hoqi zjarrit fuqinë djegëse dhe Ibrahimi (a.s.) doli nga flakët plotësisht i paprekur.'
  },
  {
    id: 'q_profetet_4',
    category: 'profetet',
    question: 'Cili bir i profetit Ibrahim (a.s.) tregoi gatishmëri dhe bindje sublime kur i ati u sprovua me urdhrin e kurbanit?',
    options: {
      A: 'Profeti Ismail (a.s.)',
      B: 'Profeti Is’hak (a.s.)',
      C: 'Profeti Jakub (a.s.)',
      D: 'Profeti Jusuf (a.s.)'
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: 'Ai tha: "O babai im, bëj atë që je urdhëruar; do të më gjesh, me dëshirën e Allahut, nga durimtarët!".',
    explanation: 'Ismaili (a.s.) u dorëzua me besim të plotë para urdhrit të Zotit, pas së cilës Allahu dërgoi një dash nga qielli për kurban.'
  },
  {
    id: 'q_profetet_5',
    category: 'profetet',
    question: 'Cili profet u hodh në pus nga vëllezërit e tij nga zilia, duroi burgun me virtyt dhe u bë ministër i thesarit në Egjipt?',
    options: {
      A: 'Profeti Davud (a.s.)',
      B: 'Profeti Jusuf (a.s.)',
      C: 'Profeti Harun (a.s.)',
      D: 'Profeti Junus (a.s.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Kur’ani e quan historinë e tij "Ahsenul Kasas" (Tregimi më i bukur).',
    explanation: 'Jusufi (a.s.) kaloi nga pusi dhe skllavëria te pozita më e lartë ekonomike në Egjipt duke falur vëllezërit e tij me madhështi.'
  },
  {
    id: 'q_profetet_6',
    category: 'profetet',
    question: 'Në cilin vend i foli Allahu drejtpërdrejt profetit Musa (a.s.) duke e pajisur me mrekullinë e shkopit dhe të dorës së bardhë?',
    options: {
      A: 'Në luginën e bekuar Tuva te Mali Tur',
      B: 'Në shpellën Hira',
      C: 'Në lumin Jordan',
      D: 'Në fushën e Arafatit'
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: 'Për këtë arsye profeti Musa (a.s.) u quajt "Kalimullah" (Ai me të cilin foli Allahu).',
    explanation: 'Pranë Malit Tur në luginën Tuva, Musait (a.s.) iu shpall profetësia dhe iu dhanë mrekullitë madhore kundër Faraonit.'
  },
  {
    id: 'q_profetet_7',
    category: 'profetet',
    question: 'Cilit profet dhe mbret të urtë iu nënshtruan erërat, ushtritë e xhinëve dhe njihte gjuhën e shpendëve e milingonës?',
    options: {
      A: 'Profetit Sulejman (a.s.)',
      B: 'Profetit Davud (a.s.)',
      C: 'Profetit Ejjub (a.s.)',
      D: 'Profetit Zekerija (a.s.)'
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: 'Biri i profetit Davud (a.s.) që sundoi me drejtësi të pashembullt.',
    explanation: 'Sulejmanit (a.s.) iu dhurua një mbretëri e mrekullueshme që askush tjetër nuk e pati para ose pas tij.'
  },
  {
    id: 'q_profetet_8',
    category: 'profetet',
    question: 'Cila ishte lutja e njohur që profeti Junus (a.s.) bëri në errësirën e thellë të barkut të peshkut të madh?',
    options: {
      A: '"La ilahe il-la Ente, Subhaneke inni kuntu minedh-dhalimin"',
      B: '"Rabbena atina fid-dunja haseneten"',
      C: '"Rabbigfir li ve li validejje"',
      D: '"Hasbijallahu la ilahe il-la Huve"'
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: 'Përmban dëshminë e Teuhidit, pastrimin e Zotit nga çdo e metë dhe pranimin e gabimit njerëzor.',
    explanation: 'Kjo lutje profetike në errësirë shpëtoi Junusin (a.s.) nga peshku dhe është balsam shpirtëror për çdo sprovë.'
  },
  {
    id: 'q_profetet_9',
    category: 'profetet',
    question: 'Kush ishte profeti që lindi mrekullisht pa baba nga virgjëresha Merjeme dhe foli në djep për të mbrojtur nderin e nënës së tij?',
    options: {
      A: 'Profeti Jahja (a.s.)',
      B: 'Profeti Isa (a.s.)',
      C: 'Profeti Zekerija (a.s.)',
      D: 'Profeti Iljas (a.s.)'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Quhet Mesih dhe Fjala e Allahut (Kelimetullah) e dhënë Merjemes.',
    explanation: 'Isai (a.s.) lindi me urdhrin e drejtpërdrejtë "Kun" (Bëhu!) të Allahut, shëroi të sëmurët dhe u ngrit i gjallë në qiell.'
  },
  {
    id: 'q_profetet_10',
    category: 'profetet',
    question: 'Sa profetë përmenden shprehimisht me emër në ajetet e Kur’anit Fisnik?',
    options: {
      A: '12 profetë',
      B: '25 profetë',
      C: '33 profetë',
      D: '99 profetë'
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: 'Fillon me Ademin (a.s.) dhe mbyllet me vulën e profetëve, Muhamedin (s.a.s.).',
    explanation: 'Në Kur’anin Fisnik përmenden me emrat e tyre ekzaktësisht 25 profetë e të dërguar të nderuar.'
  }
];

// Krijimi i bazës madhore të pyetjeve: çdo pyetje është 100% unike pa përsëritje
export const QUESTIONS_DATABASE: Question[] = (() => {
  const categories: CategoryId[] = ['kurani', 'profeti', 'fikhu', 'hadithi', 'historia', 'akaidi', 'profetet'];
  const fullList: Question[] = [];
  const seenIds = new Set<string>();
  const seenTexts = new Set<string>();

  for (const cat of categories) {
    const curatedForCat = CURATED_QUESTIONS.filter((q) => q.category === cat);
    const generated = generateQuestionsForCategory(cat);
    const combined = [...curatedForCat, ...generated];

    for (const q of combined) {
      const norm = q.question.trim().toLowerCase();
      if (!seenIds.has(q.id) && !seenTexts.has(norm)) {
        seenIds.add(q.id);
        seenTexts.add(norm);
        fullList.push(q);
      }
    }
  }

  return fullList;
})();

export const MOCK_ONLINE_PLAYERS = [
  { id: 'p_1', name: 'Arben', avatar: '👳', isOnline: true, points: 780, rank: 2, levelName: 'Nxënësi', winStreak: 3 },
  { id: 'p_2', name: 'Besnik', avatar: '⭐', isOnline: true, points: 650, rank: 3, levelName: 'Fillestari', winStreak: 1 },
  { id: 'p_3', name: 'Sara', avatar: '🧕', isOnline: true, points: 920, rank: 1, levelName: 'Studiuesi', winStreak: 5 },
  { id: 'p_4', name: 'Fatmir', avatar: '🌟', isOnline: true, points: 540, rank: 4, levelName: 'Nxënësi', winStreak: 2 },
  { id: 'p_5', name: 'Drita', avatar: '🌸', isOnline: true, points: 830, rank: 2, levelName: 'Nxënësi', winStreak: 4 },
  { id: 'p_6', name: 'Ilir', avatar: '🌙', isOnline: true, points: 610, rank: 5, levelName: 'Fillestari', winStreak: 0 },
  { id: 'p_7', name: 'Elton', avatar: '🕌', isOnline: false, points: 850, rank: 2, levelName: 'Studiuesi', winStreak: 3 },
  { id: 'p_8', name: 'Valbona', avatar: '🧕', isOnline: false, points: 710, rank: 4, levelName: 'Nxënësi', winStreak: 1 }
];

export const LEADERBOARD_INITIAL_DATA = [
  { rank: 1, name: 'Sara K.', avatar: '🧕', points: 3450, level: 'Studiuesi', wins: 28, winRate: 85 },
  { rank: 2, name: 'Elton B.', avatar: '🕌', points: 2890, level: 'Studiuesi', wins: 24, winRate: 80 },
  { rank: 3, name: 'Arben M.', avatar: '👳', points: 2420, level: 'Nxënësi', wins: 19, winRate: 76 },
  { rank: 4, name: 'Drita H.', avatar: '🌸', points: 2180, level: 'Nxënësi', wins: 16, winRate: 72 },
  { rank: 5, name: 'Besnik T.', avatar: '⭐', points: 1940, level: 'Nxënësi', wins: 14, winRate: 68 },
  { rank: 6, name: 'Fatmir S.', avatar: '🌟', points: 1620, level: 'Nxënësi', wins: 11, winRate: 64 },
  { rank: 7, name: 'Ilir Z.', avatar: '🌙', points: 1250, level: 'Fillestari', wins: 8, winRate: 61 },
  { rank: 8, name: 'Valbona P.', avatar: '🧕', points: 980, level: 'Fillestari', wins: 5, winRate: 55 }
];

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'fr_1',
    name: 'Arben M.',
    avatar: '👳',
    userCode: 'ARB-77',
    isOnline: true,
    points: 2420,
    levelName: 'Nxënësi',
    winStreak: 3,
    winPercentage: 76,
    statusMessage: 'Gati për sfidë në Kur’an & Hadith!'
  },
  {
    id: 'fr_2',
    name: 'Sara K.',
    avatar: '🧕',
    userCode: 'SAR-12',
    isOnline: true,
    points: 3450,
    levelName: 'Studiuesi',
    winStreak: 5,
    winPercentage: 85,
    statusMessage: 'Kërkimi i dijes është adhurim.'
  },
  {
    id: 'fr_3',
    name: 'Besnik T.',
    avatar: '⭐',
    userCode: 'BES-44',
    isOnline: true,
    points: 1940,
    levelName: 'Nxënësi',
    winStreak: 1,
    winPercentage: 68,
    statusMessage: 'Luaj dhe mëso çdo ditë!'
  },
  {
    id: 'fr_4',
    name: 'Elton B.',
    avatar: '🕌',
    userCode: 'ELT-99',
    isOnline: false,
    points: 2890,
    levelName: 'Studiuesi',
    winStreak: 4,
    winPercentage: 80,
    statusMessage: 'Më kontakto për duele të mbrëmjes.'
  },
  {
    id: 'fr_5',
    name: 'Drita H.',
    avatar: '🌸',
    userCode: 'DRI-55',
    isOnline: true,
    points: 2180,
    levelName: 'Nxënësi',
    winStreak: 2,
    winPercentage: 72,
    statusMessage: 'Sfidoje veten!'
  },
  {
    id: 'fr_6',
    name: 'Fatmir S.',
    avatar: '🌟',
    userCode: 'FAT-33',
    isOnline: true,
    points: 1620,
    levelName: 'Nxënësi',
    winStreak: 0,
    winPercentage: 64,
    statusMessage: 'Përparim i vazhdueshëm.'
  },
  {
    id: 'fr_7',
    name: 'Ilir Z.',
    avatar: '🌙',
    userCode: 'ILI-88',
    isOnline: false,
    points: 1250,
    levelName: 'Fillestari',
    winStreak: 1,
    winPercentage: 61,
    statusMessage: 'Dija është dritë.'
  },
  {
    id: 'fr_8',
    name: 'Valbona P.',
    avatar: '🧕',
    userCode: 'VAL-66',
    isOnline: false,
    points: 980,
    levelName: 'Fillestari',
    winStreak: 0,
    winPercentage: 55,
    statusMessage: 'Përshëndetje të gjithëve!'
  }
];
