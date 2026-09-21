import { CategoryId, Question } from '../types';
import { SURAHS, QURAN_THEMATIC_QUESTIONS, RawQuestion } from './datasets/quranData';
import { PROPHET_MUHAMMAD_QUESTIONS } from './datasets/prophetMuhammadData';
import { FIQH_QUESTIONS } from './datasets/fiqhData';
import { HADITH_QUESTIONS } from './datasets/hadithData';
import { HISTORY_QUESTIONS } from './datasets/historyData';
import { ESMAUL_HUSNA, AQEEDAH_CORE_QUESTIONS } from './datasets/aqeedahData';
import { QURANIC_PROPHETS, PROPHETS_STORIES_DEEP } from './datasets/prophetsData';

interface QuestionTemplate {
  q: string;
  options: [string, string, string, string]; // index 0 is always the correct answer
  hint: string;
  explanation: string;
  difficulty: 'fillestar' | 'mesatar' | 'avancuar';
}

function createQuestion(
  id: string,
  category: CategoryId,
  template: QuestionTemplate
): Question {
  const correctText = template.options[0];
  const shuffled = [...template.options];
  
  // Deterministic shuffle based on id to prevent hydration issues
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.abs((hash + i * 31) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const keys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const optionsObj = {
    A: shuffled[0],
    B: shuffled[1],
    C: shuffled[2],
    D: shuffled[3]
  };

  const correctKey = keys.find((k) => optionsObj[k] === correctText) || 'A';

  return {
    id,
    category,
    question: template.q,
    options: optionsObj,
    correctAnswer: correctKey,
    difficulty: template.difficulty,
    hint: template.hint,
    explanation: template.explanation
  };
}

function fromRawQuestion(id: string, category: CategoryId, raw: RawQuestion): Question {
  return createQuestion(id, category, {
    q: raw.q,
    options: raw.opts,
    hint: raw.h,
    explanation: raw.exp,
    difficulty: raw.diff
  });
}

/**
 * Generates an extensive library of 100% UNIQUE questions for a category.
 * Absolutely no repeating question texts or artificial prefixes.
 */
export function generateQuestionsForCategory(category: CategoryId, targetCount = 2000): Question[] {
  const list: Question[] = [];

  if (category === 'kurani') {
    // 1. Surah number questions (114)
    SURAHS.forEach((s) => {
      const wrong1 = ((s.n + 3) % 114) + 1;
      const wrong2 = ((s.n + 17) % 114) + 1;
      const wrong3 = ((s.n + 29) % 114) + 1;
      list.push(createQuestion(`kur_num_${s.n}`, 'kurani', {
        q: `Cili është numri rendor i sures ${s.name} në Kur’anin Fisnik?`,
        options: [
          `Surja e ${s.n}-të`,
          `Surja e ${wrong1}-të`,
          `Surja e ${wrong2}-të`,
          `Surja e ${wrong3}-të`
        ],
        hint: `Surja ${s.name} ka ${s.ayahs} ajete dhe është surë ${s.type}.`,
        explanation: `Surja ${s.name} është surja me numër rendor ${s.n} në Mus’hafin e Kur’anit Fisnik.`,
        difficulty: s.n <= 30 ? 'fillestar' : s.n <= 70 ? 'mesatar' : 'avancuar'
      }));
    });

    // 2. Surah by number (114)
    SURAHS.forEach((s) => {
      const others = SURAHS.filter((x) => x.n !== s.n);
      list.push(createQuestion(`kur_by_${s.n}`, 'kurani', {
        q: `Cila sure renditet si surja e ${s.n}-të në Kur’an?`,
        options: [
          `Surja ${s.name}`,
          `Surja ${others[(s.n + 5) % others.length].name}`,
          `Surja ${others[(s.n + 19) % others.length].name}`,
          `Surja ${others[(s.n + 43) % others.length].name}`
        ],
        hint: `Kjo sure përmban ${s.ayahs} ajete.`,
        explanation: `Surja e ${s.n}-të në Kur’anin Fisnik është surja ${s.name}.`,
        difficulty: s.n <= 25 ? 'fillestar' : s.n <= 75 ? 'mesatar' : 'avancuar'
      }));
    });

    // 3. Ayah count questions (114)
    SURAHS.forEach((s) => {
      list.push(createQuestion(`kur_ay_${s.n}`, 'kurani', {
        q: `Sa ajete ka surja ${s.name} në Kur’anin Fisnik?`,
        options: [
          `${s.ayahs} ajete`,
          `${s.ayahs + 6} ajete`,
          `${Math.max(3, s.ayahs - 5)} ajete`,
          `${s.ayahs + 14} ajete`
        ],
        hint: `Kjo sure është me prejardhje ${s.type}.`,
        explanation: `Surja ${s.name} përbëhet nga saktësisht ${s.ayahs} ajete të bekuara.`,
        difficulty: s.ayahs < 20 ? 'fillestar' : s.ayahs < 80 ? 'mesatar' : 'avancuar'
      }));
    });

    // 4. Mekki vs Medini (114)
    SURAHS.forEach((s) => {
      list.push(createQuestion(`kur_tp_${s.n}`, 'kurani', {
        q: `A është surja ${s.name} surë Mekase apo Medinase?`,
        options: [
          `Surë ${s.type}`,
          s.type === 'Mekase' ? 'Surë Medinase' : 'Surë Mekase',
          'Surë e zbritur në Sham',
          'Surë e zbritur në Taif'
        ],
        hint: `Surja ${s.name} ka numër rendor ${s.n} me ${s.ayahs} ajete.`,
        explanation: `Sipas dijetarëve të tefsirit, surja ${s.name} klasifikohet si surë ${s.type}.`,
        difficulty: s.n <= 30 ? 'fillestar' : 'mesatar'
      }));
    });

    // 5. Meaning in Albanian (114)
    SURAHS.forEach((s) => {
      const others = SURAHS.filter((x) => x.n !== s.n);
      list.push(createQuestion(`kur_tr_${s.n}`, 'kurani', {
        q: `Çfarë do të thotë në gjuhën shqipe emri i sures "${s.name}"?`,
        options: [
          s.al,
          others[(s.n + 3) % others.length].al,
          others[(s.n + 11) % others.length].al,
          others[(s.n + 27) % others.length].al
        ],
        hint: `Surja e ${s.n}-të në Kur’an.`,
        explanation: `Emri arab "${s.name}" përkthehet në shqip si "${s.al}".`,
        difficulty: s.n <= 25 ? 'fillestar' : 'mesatar'
      }));
    });

    // 6. Next Surah in Mus'haf (113)
    for (let i = 0; i < SURAHS.length - 1; i++) {
      const current = SURAHS[i];
      const next = SURAHS[i + 1];
      const others = SURAHS.filter((x) => x.n !== next.n && x.n !== current.n);
      list.push(createQuestion(`kur_nxt_${current.n}`, 'kurani', {
        q: `Cila sure vjen menjëherë pas sures ${current.name} në radhitjen e Mus’hafit?`,
        options: [
          `Surja ${next.name}`,
          `Surja ${others[(current.n + 4) % others.length].name}`,
          `Surja ${others[(current.n + 16) % others.length].name}`,
          `Surja ${others[(current.n + 32) % others.length].name}`
        ],
        hint: `Surja pasuese është surja e ${next.n}-të.`,
        explanation: `Menjëherë pas sures ${current.name} (nr. ${current.n}) vjen surja ${next.name} (nr. ${next.n}).`,
        difficulty: current.n <= 30 ? 'fillestar' : 'mesatar'
      }));
    }

    // 7. Previous Surah in Mus'haf (113)
    for (let i = 1; i < SURAHS.length; i++) {
      const current = SURAHS[i];
      const prev = SURAHS[i - 1];
      const others = SURAHS.filter((x) => x.n !== prev.n && x.n !== current.n);
      list.push(createQuestion(`kur_prv_${current.n}`, 'kurani', {
        q: `Cila sure gjendet menjëherë para sures ${current.name} në radhitjen e Mus’hafit?`,
        options: [
          `Surja ${prev.name}`,
          `Surja ${others[(current.n + 7) % others.length].name}`,
          `Surja ${others[(current.n + 21) % others.length].name}`,
          `Surja ${others[(current.n + 35) % others.length].name}`
        ],
        hint: `Surja para saj ka numër rendor ${prev.n}.`,
        explanation: `Para sures ${current.name} (nr. ${current.n}) renditet surja ${prev.name} (nr. ${prev.n}).`,
        difficulty: current.n <= 30 ? 'fillestar' : 'mesatar'
      }));
    }

    // 8. Thematic Quran questions
    QURAN_THEMATIC_QUESTIONS.forEach((q, idx) => {
      list.push(fromRawQuestion(`kur_thm_${idx + 1}`, 'kurani', q));
    });

  } else if (category === 'akaidi') {
    // 1. Esmaul Husna: What does this name mean? (99)
    ESMAUL_HUSNA.forEach((item) => {
      const others = ESMAUL_HUSNA.filter((x) => x.n !== item.n);
      list.push(createQuestion(`akd_esma_m_${item.n}`, 'akaidi', {
        q: `Çfarë do të thotë Emri i Shenjtë i Allahut "${item.ar}" (${item.al})?`,
        options: [
          item.meaning,
          others[(item.n + 7) % others.length].meaning,
          others[(item.n + 23) % others.length].meaning,
          others[(item.n + 45) % others.length].meaning
        ],
        hint: `Përmban kuptimin e bukur: ${item.al}.`,
        explanation: `Emri i Bukur "${item.ar}" do të thotë: ${item.meaning}.`,
        difficulty: item.n <= 20 ? 'fillestar' : item.n <= 60 ? 'mesatar' : 'avancuar'
      }));
    });

    // 2. Esmaul Husna: Reverse name identification (99)
    ESMAUL_HUSNA.forEach((item) => {
      const others = ESMAUL_HUSNA.filter((x) => x.n !== item.n);
      list.push(createQuestion(`akd_esma_rev_${item.n}`, 'akaidi', {
        q: `Cili nga 99 Emrat e Bukur të Allahut nënkupton: "${item.meaning}"?`,
        options: [
          `${item.ar} (${item.al})`,
          `${others[(item.n + 3) % others.length].ar} (${others[(item.n + 3) % others.length].al})`,
          `${others[(item.n + 15) % others.length].ar} (${others[(item.n + 15) % others.length].al})`,
          `${others[(item.n + 39) % others.length].ar} (${others[(item.n + 39) % others.length].al})`
        ],
        hint: `Emri njihet në shqip si: ${item.al}.`,
        explanation: `Emri i bekuar është ${item.ar} (${item.al}), që do të thotë: ${item.meaning}.`,
        difficulty: item.n <= 25 ? 'fillestar' : 'mesatar'
      }));
    });

    // 3. Core Aqeedah & Pillars of Iman
    AQEEDAH_CORE_QUESTIONS.forEach((q, idx) => {
      list.push(fromRawQuestion(`akd_core_${idx + 1}`, 'akaidi', q));
    });

  } else if (category === 'profetet') {
    // 1. People / Nation of the Prophet (24)
    QURANIC_PROPHETS.forEach((p, idx) => {
      const others = QURANIC_PROPHETS.filter((_, i) => i !== idx);
      list.push(createQuestion(`prf_ppl_${idx + 1}`, 'profetet', {
        q: `Te cili popull ose vend u dërgua ${p.name}?`,
        options: [
          p.people,
          others[(idx + 2) % others.length].people,
          others[(idx + 6) % others.length].people,
          others[(idx + 11) % others.length].people
        ],
        hint: `Veproi kryesisht në rajonin: ${p.location}.`,
        explanation: `${p.name} u dërgua posaçërisht tek: ${p.people}.`,
        difficulty: idx <= 8 ? 'fillestar' : 'mesatar'
      }));
    });

    // 2. Miracle / Sign of the Prophet (24)
    QURANIC_PROPHETS.forEach((p, idx) => {
      const others = QURANIC_PROPHETS.filter((_, i) => i !== idx);
      list.push(createQuestion(`prf_mrc_${idx + 1}`, 'profetet', {
        q: `Cila ishte mrekullia dalluese ose shenja hyjnore e ${p.name}?`,
        options: [
          p.miracleOrBook,
          others[(idx + 3) % others.length].miracleOrBook,
          others[(idx + 7) % others.length].miracleOrBook,
          others[(idx + 13) % others.length].miracleOrBook
        ],
        hint: `Njihet me titullin e nderuar: ${p.title}.`,
        explanation: `Mrekullia dhe shenja dalluese e ${p.name} ishte: ${p.miracleOrBook}.`,
        difficulty: idx <= 8 ? 'fillestar' : 'mesatar'
      }));
    });

    // 3. Title / Virtue of the Prophet (24)
    QURANIC_PROPHETS.forEach((p, idx) => {
      const others = QURANIC_PROPHETS.filter((_, i) => i !== idx);
      list.push(createQuestion(`prf_ttl_${idx + 1}`, 'profetet', {
        q: `Me cilin titull ose virtyt të nderuar njihet ${p.name} në traditën kuranore?`,
        options: [
          p.title,
          others[(idx + 4) % others.length].title,
          others[(idx + 8) % others.length].title,
          others[(idx + 15) % others.length].title
        ],
        hint: `Përmendet shpesh në librat e historisë së profetëve.`,
        explanation: `${p.name} nderohet me titullin: ${p.title}.`,
        difficulty: 'mesatar'
      }));
    });

    // 4. Deep Quranic Prophet Stories
    PROPHETS_STORIES_DEEP.forEach((q, idx) => {
      list.push(fromRawQuestion(`prf_stp_${idx + 1}`, 'profetet', q));
    });

  } else if (category === 'profeti') {
    PROPHET_MUHAMMAD_QUESTIONS.forEach((q, idx) => {
      list.push(fromRawQuestion(`prophet_m_${idx + 1}`, 'profeti', q));
    });

  } else if (category === 'fikhu') {
    FIQH_QUESTIONS.forEach((q, idx) => {
      list.push(fromRawQuestion(`fiqh_q_${idx + 1}`, 'fikhu', q));
    });

  } else if (category === 'hadithi') {
    HADITH_QUESTIONS.forEach((q, idx) => {
      list.push(fromRawQuestion(`hadith_q_${idx + 1}`, 'hadithi', q));
    });

  } else if (category === 'historia') {
    HISTORY_QUESTIONS.forEach((q, idx) => {
      list.push(fromRawQuestion(`hist_q_${idx + 1}`, 'historia', q));
    });
  }

  // Deduplicate list strictly by ID and question text to ensure 100% uniqueness
  const uniqueList: Question[] = [];
  const seenIds = new Set<string>();
  const seenTexts = new Set<string>();

  for (const q of list) {
    const norm = q.question.trim().toLowerCase();
    if (!seenIds.has(q.id) && !seenTexts.has(norm)) {
      seenIds.add(q.id);
      seenTexts.add(norm);
      uniqueList.push(q);
    }
  }

  return uniqueList.slice(0, targetCount);
}

export type OnlineCategoryId = CategoryId | 'e_pergjithshme';

/**
 * Returns exactly 33 questions for Live 1 vs 1 duel mode.
 * - Progressive difficulty: strictly ordered from easiest to hardest:
 *   Questions 1-11: Fillestar (thjeshtë)
 *   Questions 12-22: Mesatar (mesatare)
 *   Questions 23-33: Avancuar (vështirë)
 * - If category is 'e_pergjithshme', questions are evenly mixed across:
 *   Kur'ani, Profeti Muhamed (s.a.s.), Fikhu, Hadithi, Historia, Akaidi, Profetët.
 * - Strictly 100% unique questions with zero duplicates.
 */
export function getLive1v1Questions(
  category: OnlineCategoryId = 'e_pergjithshme',
  seedOffset: number = Math.floor(Math.random() * 1000)
): Question[] {
  const ALL_CATEGORIES: CategoryId[] = [
    'kurani',
    'profeti',
    'fikhu',
    'hadithi',
    'historia',
    'akaidi',
    'profetet'
  ];

  let easyPool: Question[] = [];
  let mediumPool: Question[] = [];
  let hardPool: Question[] = [];

  if (category === 'e_pergjithshme') {
    for (const cat of ALL_CATEGORIES) {
      const qList = generateQuestionsForCategory(cat);
      easyPool.push(...qList.filter((q) => q.difficulty === 'fillestar'));
      mediumPool.push(...qList.filter((q) => q.difficulty === 'mesatar'));
      hardPool.push(...qList.filter((q) => q.difficulty === 'avancuar'));
    }
  } else {
    const qList = generateQuestionsForCategory(category);
    easyPool = qList.filter((q) => q.difficulty === 'fillestar');
    mediumPool = qList.filter((q) => q.difficulty === 'mesatar');
    hardPool = qList.filter((q) => q.difficulty === 'avancuar');
  }

  const selected: Question[] = [];
  const seenIds = new Set<string>();
  const seenTexts = new Set<string>();

  const addFromPool = (pool: Question[], targetCount: number, offset: number) => {
    if (pool.length === 0 || targetCount <= 0) return;
    let added = 0;
    for (let i = 0; i < pool.length * 2 && added < targetCount; i++) {
      const idx = (offset + i) % pool.length;
      const q = pool[idx];
      const norm = q.question.trim().toLowerCase();
      if (!seenIds.has(q.id) && !seenTexts.has(norm)) {
        seenIds.add(q.id);
        seenTexts.add(norm);
        selected.push(q);
        added++;
      }
    }
  };

  // Phase 1: 11 easy questions (fillestar)
  addFromPool(easyPool, 11, seedOffset);
  // Phase 2: 11 medium questions (mesatar)
  addFromPool(mediumPool, 11, seedOffset + 17);
  // Phase 3: 11 hard questions (avancuar)
  addFromPool(hardPool, 11, seedOffset + 37);

  // If still need items to reach 33, top up from available pools
  if (selected.length < 33) {
    if (category === 'e_pergjithshme') {
      for (const cat of ALL_CATEGORIES) {
        addFromPool(generateQuestionsForCategory(cat), 33 - selected.length, seedOffset + 50);
        if (selected.length >= 33) break;
      }
    } else {
      addFromPool(generateQuestionsForCategory(category), 33 - selected.length, seedOffset + 50);
    }
  }

  // Guarantee difficulty progression: fillestar first, then mesatar, then avancuar
  const diffOrder: Record<string, number> = {
    fillestar: 1,
    mesatar: 2,
    avancuar: 3
  };

  selected.sort((a, b) => (diffOrder[a.difficulty] || 2) - (diffOrder[b.difficulty] || 2));

  return selected.slice(0, 33);
}

export function getLive1v1FullCategoryTrack(category: OnlineCategoryId = 'e_pergjithshme') {
  return {
    category,
    totalQuestions: 33 as const,
    questions: getLive1v1Questions(category)
  };
}

/**
 * Returns exactly 10 questions for a given Classic level (1 to 1200).
 * - Questions go progressively from easiest to most difficult:
 *   Questions 1-3: Fillestar (easy)
 *   Questions 4-7: Mesatar (medium)
 *   Questions 8-10: Avancuar (advanced)
 * - Category rotates across the 7 categories. Every 10th level is a milestone synthesis.
 * - ABSOLUTELY ZERO DUPLICATE QUESTIONS inside the same level!
 * - Consecutive levels do not repeat questions!
 */
export function getClassicLevelQuestions(
  levelNum: number,
  allQuestionsDb?: Question[]
): Question[] {
  const lvl = Math.max(1, Math.min(1200, Math.round(levelNum)));

  const ALL_CATEGORIES: CategoryId[] = [
    'kurani',
    'profeti',
    'fikhu',
    'hadithi',
    'historia',
    'akaidi',
    'profetet'
  ];

  const isMilestone = lvl % 10 === 0;
  const activeCategory: CategoryId = ALL_CATEGORIES[(lvl - 1) % ALL_CATEGORIES.length];

  // Get master pool for this level
  let pool: Question[];
  if (isMilestone) {
    // Exclude previous and next level's categories to eliminate any consecutive overlap
    const prevCat = ALL_CATEGORIES[(lvl - 2 + ALL_CATEGORIES.length) % ALL_CATEGORIES.length];
    const nextCat = ALL_CATEGORIES[lvl % ALL_CATEGORIES.length];
    const milestoneCategories = ALL_CATEGORIES.filter((c) => c !== prevCat && c !== nextCat);

    if (allQuestionsDb && allQuestionsDb.length > 0) {
      pool = allQuestionsDb.filter((q) => milestoneCategories.includes(q.category));
      if (pool.length === 0) pool = allQuestionsDb;
    } else {
      pool = [];
      for (const cat of milestoneCategories) {
        pool.push(...generateQuestionsForCategory(cat));
      }
    }
  } else {
    if (allQuestionsDb && allQuestionsDb.length > 0) {
      pool = allQuestionsDb.filter((q) => q.category === activeCategory);
      if (pool.length === 0) pool = allQuestionsDb;
    } else {
      pool = generateQuestionsForCategory(activeCategory);
    }
  }

  // Deduplicate candidate pool
  const cleanPool: Question[] = [];
  const poolIds = new Set<string>();
  const poolTexts = new Set<string>();
  for (const q of pool) {
    const norm = q.question.trim().toLowerCase();
    if (!poolIds.has(q.id) && !poolTexts.has(norm)) {
      poolIds.add(q.id);
      poolTexts.add(norm);
      cleanPool.push(q);
    }
  }

  const easyPool = cleanPool.filter((q) => q.difficulty === 'fillestar');
  const medPool = cleanPool.filter((q) => q.difficulty === 'mesatar');
  const hardPool = cleanPool.filter((q) => q.difficulty === 'avancuar');

  const selectedQuestions: Question[] = [];
  const usedIds = new Set<string>();
  const usedTexts = new Set<string>();

  const pickUnique = (sourcePool: Question[], count: number, offset: number) => {
    if (sourcePool.length === 0 || count <= 0) return;
    let added = 0;
    for (let i = 0; i < sourcePool.length && added < count; i++) {
      const idx = (offset + i) % sourcePool.length;
      const q = sourcePool[idx];
      const norm = q.question.trim().toLowerCase();
      if (!usedIds.has(q.id) && !usedTexts.has(norm)) {
        usedIds.add(q.id);
        usedTexts.add(norm);
        selectedQuestions.push(q);
        added++;
      }
    }
  };

  // Base level offset so each level consumes a distinct non-overlapping segment of the pool
  const cycle = Math.floor((lvl - 1) / ALL_CATEGORIES.length);
  const easyOffset = cycle * 3;
  const medOffset = cycle * 4;
  const hardOffset = cycle * 3;

  // 1. Pick 3 easy questions (Fillestar)
  pickUnique(easyPool.length > 0 ? easyPool : cleanPool, 3, easyOffset);

  // 2. Pick 4 medium questions (Mesatar)
  pickUnique(medPool.length > 0 ? medPool : cleanPool, 4, medOffset);

  // 3. Pick 3 hard questions (Avancuar)
  pickUnique(hardPool.length > 0 ? hardPool : cleanPool, 3, hardOffset);

  // 4. Fallback if any pool didn't have enough items
  if (selectedQuestions.length < 10) {
    pickUnique(cleanPool, 10 - selectedQuestions.length, (lvl * 17) % cleanPool.length);
  }

  // Strict assurance: exactly 10 questions, sorted by difficulty: fillestar -> mesatar -> avancuar
  const diffOrder: Record<string, number> = { fillestar: 1, mesatar: 2, avancuar: 3 };
  selectedQuestions.sort((a, b) => (diffOrder[a.difficulty] || 2) - (diffOrder[b.difficulty] || 2));

  return selectedQuestions.slice(0, 10);
}
