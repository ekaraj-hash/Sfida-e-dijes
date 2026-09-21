import { Question } from '../types';

/**
 * Pyetje me formulim negativ (psh. "Cili NUK...", "Cila nga këto NUK është...")
 * sipas kërkesës së përdoruesit për të thelluar vëmendjen dhe arsyetimin.
 */
export const NEGATIVE_QUESTIONS: Question[] = [
  {
    id: 'neg_1',
    category: 'historia',
    question: "Cili nga sahabët e nderuar NUK mori pjesë drejtpërdrejt në Besëlidhjen e Ridvanit (Bej'atur-Ridvan) në Hudejbije, për shkak se ishte dërguar si emisar në Mekë?",
    options: {
      A: "Uthman ibn Affan (r.a.)",
      B: "Umer ibnul Hattab (r.a.)",
      C: "Ali ibn Ebi Talib (r.a.)",
      D: "Ebu Bekër es-Siddik (r.a.)"
    },
    correctAnswer: 'A',
    difficulty: 'mesatar',
    hint: "Profeti (s.a.s.) vuri njërën dorë mbi tjetrën dhe bëri besëlidhje në emër të këtij sahabiu.",
    explanation: "Uthmani (r.a.) ishte dërguar nga Profeti (s.a.s.) si emisar te kurejshët në Mekë; kur u përhap lajmi i rremë për vrasjen e tij, u bë Besëlidhja e Ridvanit."
  },
  {
    id: 'neg_2',
    category: 'fikhu',
    question: "Cila nga veprimet e mëposhtme NUK bën pjesë në katër farzet themelore të abdesit?",
    options: {
      A: "Larja e fytyrës",
      B: "Larja e duarve deri në bërryla",
      C: "Larja e gojës me ujë (madmadah)",
      D: "Larja e këmbëve deri te nyjet"
    },
    correctAnswer: 'C',
    difficulty: 'mesatar',
    hint: "Ky veprim është sunet i fortë i Profetit (s.a.s.), por jo nga farzet e përmendura në ajetin e sures El-Maide.",
    explanation: "Katër farzet e abdesit sipas ajetit 6 të sures El-Maide janë: larja e fytyrës, larja e krahëve deri në bërryla, mes-hi i kokës dhe larja e këmbëve deri në nyje. Larja e gojës është sunet."
  },
  {
    id: 'neg_3',
    category: 'profetet',
    question: "Cili nga profetët e mëposhtëm NUK bën pjesë në pesë të Dërguarit e vendosur e të duruar (Ulu-l-Azm)?",
    options: {
      A: "Profeti Nuh (a.s.)",
      B: "Profeti Davud (a.s.)",
      C: "Profeti Ibrahim (a.s.)",
      D: "Profeti Isa (a.s.)"
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: "Pesë profetët Ulu-l-Azm janë Nuhi, Ibrahimi, Musai, Isai dhe Muhamedi (s.a.s.).",
    explanation: "Profetët Ulu-l-Azm me durim dhe vendosmëri të posaçme janë: Nuh (a.s.), Ibrahim (a.s.), Musa (a.s.), Isa (a.s.) dhe Muhamed (s.a.s.)."
  },
  {
    id: 'neg_4',
    category: 'fikhu',
    question: "Cila nga situatat e mëposhtme NUK e prish agjërimin e ditës së Ramazanit?",
    options: {
      A: "Pirja e ujit me paramendim dhe me vetëdije",
      B: "Ngrënia e ushqimit nga harresa duke menduar se nuk je agjërueshëm",
      C: "Të vjellët e qëllimshëm me vetëdije të plotë",
      D: "Marrja e lëndëve ushqyese intravenoze me qëllim ngopjeje"
    },
    correctAnswer: 'B',
    difficulty: 'fillestar',
    hint: "Profeti (s.a.s.) ka thënë: 'Kush harron dhe ha apo pi, le ta vazhdojë agjërimin, sepse Allahu e ushqeu dhe i dha të pijë'.",
    explanation: "Ngrënia apo pirja nga harresa e plotë nuk e prish agjërimin; besimtari sapo të kujtohet ndalon menjëherë dhe vazhdon ditën normalisht."
  },
  {
    id: 'neg_5',
    category: 'akaidi',
    question: "Cila nga këto NUK bën pjesë në gjashtë shtyllat e Imanit (besimit), por është shtyllë e Islamit?",
    options: {
      A: "Besimi në Engjëjt e Allahut",
      B: "Besimi në Librat e Shpallur",
      C: "Kryerja e Haxhit në Mekë",
      D: "Besimi në Kader (caktimin e Zotit)"
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: "Hadithi i famshëm i Xhibrilit bën dallimin e qartë midis Imanit (besimit të brendshëm) dhe Islamit (veprave të jashtme).",
    explanation: "Kryerja e Haxhit është një nga 5 shtyllat praktike të Islamit, ndërsa 6 kushtet e Imanit janë besimi në: Allahun, Engjëjt, Librat, Profetët, Ditën e Gjykimit dhe Kaderin."
  },
  {
    id: 'neg_6',
    category: 'kurani',
    question: "Cila nga suret e mëposhtme të Kuranit Fisnik NUK fillon me formulën 'Bismil-lahirr-Rrahmanirr-Rrahim' në krye të saj?",
    options: {
      A: "Surja El-Bekare",
      B: "Surja Et-Teube",
      C: "Surja Al-Imran",
      D: "Surja En-Nisa"
    },
    correctAnswer: 'B',
    difficulty: 'mesatar',
    hint: "Kjo sure njihet edhe me emrin El-Bera'eh (Heqja e mbrojtjes ndaj tradhtarëve të besëlidhjes).",
    explanation: "Surja Et-Teube është surja e vetme në Kuran që nuk fillon me Bismil-lah, pasi zbret si shpallje e ashpër kundër idhujtarëve që thyen besëlidhjen."
  },
  {
    id: 'neg_7',
    category: 'historia',
    question: "Cili nga personalitetet e mëposhtme NUK bën pjesë në Katër Halifët e Drejtë (Hulafa er-Rashidun)?",
    options: {
      A: "Ebu Bekër es-Siddik (r.a.)",
      B: "Umer ibnul Hattab (r.a.)",
      C: "Muavije ibn Ebi Sufjan (r.a.)",
      D: "Ali ibn Ebi Talib (r.a.)"
    },
    correctAnswer: 'C',
    difficulty: 'fillestar',
    hint: "Katër Halifët e Drejtë e udhëhoqën shtetin islam menjëherë pas ndërrimit jetë të Profetit (s.a.s.).",
    explanation: "Katër Halifët e Drejtë (er-Rashidun) janë: Ebu Bekri (r.a.), Umeri (r.a.), Uthmani (r.a.) dhe Aliu (r.a.)."
  },
  {
    id: 'neg_8',
    category: 'profetet',
    question: "Cili nga të mëposhtmit NUK përmendet me emër si profet në tekstin e Kuranit Fisnik?",
    options: {
      A: "Profeti Idris (a.s.)",
      B: "Profeti Iljas (a.s.)",
      C: "Profeti Shith (a.s.)",
      D: "Profeti Dhulkifl (a.s.)"
    },
    correctAnswer: 'C',
    difficulty: 'avancuar',
    hint: "Ky profet përmendet në transmetimet e historisë islame dhe hadithe, por jo shprehimisht me emër në Kuran.",
    explanation: "Në Kuran përmenden me emër 25 pejgamberë. Shithi (a.s.) njihet në traditën islame, por emri i tij nuk përmendet tekstualisht në Kuran."
  }
];
