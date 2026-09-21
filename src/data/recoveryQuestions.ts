import { Question } from '../types';

/**
 * Pyetje të thjeshta dhe themelore për rikuperimin e jetëve (+1 jetë për çdo 3 pyetje të sakta).
 * Përdorin gjithmonë shkronjat 'ë', 'ç' dhe salavatet standarde në kllapa: (s.a.s.), (a.s.), (r.a.).
 */
export const RECOVERY_QUESTIONS: Question[] = [
  {
    id: 'rec_1',
    category: 'kurani',
    question: "Cili është Libri i Shenjtë i shpallur për të gjithë myslimanët?",
    options: {
      A: "Kurani Fisnik",
      B: "Teurati",
      C: "Zeburi",
      D: "Inxhili"
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: "Është fjala e fundit e pandryshuar e Allahut.",
    explanation: "Kurani Fisnik është Libri i Shenjtë i shpallur Profetit Muhamed (s.a.s.) nëpërmjet engjëllit Xhibril (a.s.)."
  },
  {
    id: 'rec_2',
    category: 'fikhu',
    question: "Sa namaze ditore farz janë të obliguara për çdo mysliman gjatë ditës e natës?",
    options: {
      A: "3 namaze",
      B: "5 namaze",
      C: "7 namaze",
      D: "10 namaze"
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: "Sabahu, Dreka, Ikindia, Akshami dhe Jacia.",
    explanation: "Pesë namazet ditore përbëjnë shtyllën e dytë të fesë islame dhe janë obligim i përditshëm."
  },
  {
    id: 'rec_3',
    category: 'profeti',
    question: "Kush është i Dërguari i fundit i Allahut për mbarë njerëzimin?",
    options: {
      A: "Profeti Ibrahim (a.s.)",
      B: "Profeti Musa (a.s.)",
      C: "Profeti Muhamed (s.a.s.)",
      D: "Profeti Isa (a.s.)"
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: "I dërguari me të cilin u vulos profetësia.",
    explanation: "Profeti Muhamed (s.a.s.) është vula e të gjithë pejgamberëve (Hatamun-Nebijjin)."
  },
  {
    id: 'rec_4',
    category: 'fikhu',
    question: "Në cilin muaj të bekuar agjërojnë myslimanët çdo vit?",
    options: {
      A: "Në muajin Rexhep",
      B: "Në muajin Sha'ban",
      C: "Në muajin Ramazan",
      D: "Në muajin Muharrem"
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: "Muaji në të cilin nisi zbritja e Kuranit.",
    explanation: "Agjërimi i muajit të Ramazanit është shtylla e katërt e Islamit dhe sjell devotshmëri e mëshirë."
  },
  {
    id: 'rec_5',
    category: 'akaidi',
    question: "Cili është kuptimi i dëshmisë 'La ilahe il-lallah'?",
    options: {
      A: "Nuk ka zot tjetër me të drejtë përveç Allahut",
      B: "Zoti është vetëm krijues pa ligje",
      C: "Gjithçka në univers është e përjetshme",
      D: "Adhurohen vetëm engjëjt e nderuar"
    },
    correctAnswer: 'A',
    difficulty: 'fillestar',
    hint: "Thelbi i Teuhidit dhe i tërë besimit islam.",
    explanation: "'La ilahe il-lallah' pohon se vetëm Allahu meriton të adhurohet me sinqeritet dhe mohon çdo idhull."
  },
  {
    id: 'rec_6',
    category: 'profetet',
    question: "Cili ishte njeriu dhe profeti i parë i krijuar nga Allahu?",
    options: {
      A: "Profeti Nuh (a.s.)",
      B: "Profeti Adem (a.s.)",
      C: "Profeti Ibrahim (a.s.)",
      D: "Profeti Idris (a.s.)"
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: "Babai i gjithë njerëzimit.",
    explanation: "Allahu e krijoi Profetin Adem (a.s.) nga dheu dhe i dha frymë nga shpirti i Tij, duke e bërë babanë e njerëzimit."
  }
];
