import { StructuredTrack, Question } from '../types';

function makeQ(
  id: string,
  question: string,
  opts: string[],
  correct: 'A' | 'B' | 'C' | 'D',
  difficulty: 'fillestar' | 'mesatar' | 'avancuar',
  hint: string,
  exp: string
): Question {
  return {
    id,
    category: 'kurani',
    question,
    options: { 
      A: opts[0] || 'Opsioni A', 
      B: opts[1] || 'Opsioni B', 
      C: opts[2] || 'Opsioni C', 
      D: opts[3] || 'Opsioni D' 
    },
    correctAnswer: correct,
    difficulty,
    hint,
    explanation: exp
  };
}

// Generate 11 questions for each level using curated templates
function generate11Questions(
  trackPrefix: string,
  phaseNum: number,
  levelNum: number,
  topic: string,
  baseData: { q: string; opts: string[]; ans: 'A' | 'B' | 'C' | 'D'; exp: string }[]
): Question[] {
  const diff = levelNum === 1 ? 'fillestar' : levelNum === 2 ? 'mesatar' : 'avancuar';
  const result: Question[] = [];
  for (let i = 0; i < 11; i++) {
    const item = baseData[i % baseData.length];
    const qId = `${trackPrefix}_p${phaseNum}_l${levelNum}_q${i + 1}`;
    result.push(
      makeQ(
        qId,
        item.q,
        item.opts,
        item.ans,
        diff,
        `Kujto mësimet e temës: ${topic}.`,
        item.exp
      )
    );
  }
  return result;
}

// 1. Historia e Kuranit Fisnik
const Q_HISTORIA_MEKE = [
  { q: "Ku zbritën ajetet e para të Kuranit Fisnik për Profetin Muhamed (s.a.s.)?", opts: ["Në shpellën Hira në malin En-Nur", "Në shpellën Theur", "Pranë Qabes", "Në luginën e Mines"], ans: 'A' as const, exp: "Shpallja nisi në shpellën Hira me pesë ajetet e para të sures El-Alek." },
  { q: "Cili melek ia solli shpalljen e parë Profetit Muhamed (s.a.s.) me fjalën 'Ikre' (Lexo)?", opts: ["Engjëlli Xhibril (a.s.)", "Engjëlli Mikail (a.s.)", "Engjëlli Israfil (a.s.)", "Engjëlli Azrail (a.s.)"], ans: 'A' as const, exp: "Engjëlli Xhibril (a.s.) është i ngarkuar me zbritjen e shpalljes hyjnore te të gjithë profetët." },
  { q: "Sa vite zgjati periudha e zbritjes së Kuranit Fisnik në Mekë?", opts: ["Rreth 13 vite", "Rreth 10 vite", "Rreth 23 vite", "Rreth 5 vite"], ans: 'A' as const, exp: "Në Mekë shpallja vazhdoi për rreth 13 vite përpara Hixhretit në Medinë." },
  { q: "Cila ishte kryetema e ajeteve të zbritura në periudhën mekase?", opts: ["Teuhidi, ringjallja dhe pastrimi i besimit", "Rregullat e trashëgimisë", "Ligjet e tregtisë dhe tatimeve", "Organizimi i ushtrisë"], ans: 'A' as const, exp: "Ajetet mekase përqendroheshin në konsolidimin e njëshmërisë së Allahut (Teuhidit) dhe botës tjetër." },
  { q: "Në cilën natë të bekuar të muajit Ramazan filloi zbritja e Kuranit Fisnik?", opts: ["Në Natën e Kadrit", "Në Natën e Beratit", "Në Natën e Miraxhit", "Në Natën e Regaibit"], ans: 'A' as const, exp: "Allahu thotë: 'Ne e zbritëm atë në Natën e Kadrit'." }
];

const Q_HISTORIA_MEDINE = [
  { q: "Çfarë karakteristikash kanë kryesisht suret e zbritura në Medinë pas Hixhretit?", opts: ["Vendosjen e ligjeve, dispozitave shoqërore dhe marrëdhënieve", "Vetëm ngjarje të popujve të shkuar", "Vetëm betime në natyrë", "Vetëm poezi arabe"], ans: 'A' as const, exp: "Në Medinë u formësuan ligjet e shoqërisë, familjes, adhurimeve dhe shtetit islam." },
  { q: "Kush ishte një nga shkruesit kryesorë të shpalljes së Kuranit në Medinë?", opts: ["Zejd ibn Thabit (r.a.)", "Ebu Xhehli", "Ebu Sufjani para islamit", "Musailime"], ans: 'A' as const, exp: "Zejd ibn Thabit (r.a.) ishte ndër shkruesit më të besuar dhe të përkushtuar të shpalljes." },
  { q: "Sa vite zgjati zbritja e Kuranit Fisnik në Medinë?", opts: ["Rreth 10 vite", "Rreth 13 vite", "Rreth 7 vite", "Rreth 2 vite"], ans: 'A' as const, exp: "Në Medinë shpallja zgjati rreth 10 vite deri në përmbylljen e misionit profetik." }
];

const Q_HISTORIA_PAS = [
  { q: "Në kohën e cilit halif u mblodh për herë të parë i tërë Kurani në një vëllim të vetëm (Mus'haf)?", opts: ["Ebu Bekër es-Siddik (r.a.)", "Umer ibnul Hattab (r.a.)", "Uthman ibn Affan (r.a.)", "Ali ibn Ebi Talib (r.a.)"], ans: 'A' as const, exp: "Pas betejës së Jemames, Ebu Bekri (r.a.) me propozim të Umerit (r.a.) ngarkoi Zejdin (r.a.) për mbledhjen e Mus'hafit." },
  { q: "Cili halif e bëri shumëfishimin dhe shpërndarjen zyrtare të kopjeve të Mus'hafit në qendrat kryesore islame?", opts: ["Uthman ibn Affan (r.a.)", "Ali ibn Ebi Talib (r.a.)", "Umer ibn Abdulazizi", "Muavije (r.a.)"], ans: 'A' as const, exp: "Uthmani (r.a.) unifikoi leximin dhe shpërndau Mus'hafin Imam në të gjitha viset islame." },
  { q: "Kush vendosi pikat dhe zanoret (hareket) në shkrimin e Kuranit për lehtësimin e leximit?", opts: ["Ebul Esved ed-Dueli dhe El-Halil ibn Ahmed", "Imam Buhariu", "Imam Shafiu", "Ibn Batuta"], ans: 'A' as const, exp: "Ebul Esved ed-Dueli vendosi pikat dhe El-Halil ibn Ahmed el-Ferahidi formësoi simbolet e zanoreve." }
];

// 2. Hadithi dhe Syneti
const Q_HADITHET = [
  { q: "Me cilin hadith themelor nis përmbledhja e 40 Haditheve të Imam Neveviut?", opts: ["Hadithi 'Veprat vlerësohen sipas qëllimit (nijetit)'", "Hadithi i xhenetit", "Hadithi i abdesit", "Hadithi i tregtisë"], ans: 'A' as const, exp: "Hadithi i parë transmetohet nga Umeri (r.a.): 'Veprat shpërblehen vetëm sipas qëllimit'." },
  { q: "Cili hadith njihet si 'Nëna e Sunetit' sepse përmbledh Islamin, Imanin dhe Ihsanin?", opts: ["Hadithi i engjëllit Xhibril (a.s.)", "Hadithi i shpatës", "Hadithi i agjërimit", "Hadithi i buzëqeshjes"], ans: 'A' as const, exp: "Hadithi i dytë i Neveviut është dialogu i famshëm me Xhibrilin (a.s.)." },
  { q: "Sipas Hadithit të 13-të të Neveviut, kur është i plotë besimi i një besimtari?", opts: ["Kur dëshiron për vëllain e tij atë që dëshiron për vete", "Kur bëhet i pasur", "Kur lexon pa pushim", "Kur udhëton nëpër botë"], ans: 'A' as const, exp: "Profeti (s.a.s.) tha: 'Nuk ka besuar plotësisht asnjëri prej jush derisa të dojë për vëllain e tij atë që do për vete'." },
  { q: "Cili nga këta libra NUK bën pjesë në gjashtë librat themelorë të hadithit (Kutub es-Sitte)?", opts: ["'Muvetta' e Imam Malikut", "'Sahih' i Buhariut", "'Sahih' i Muslimit", "'Sunen' i Ebu Davudit"], ans: 'A' as const, exp: "Kutub es-Sitte përfshijnë Buhariun, Muslimin, Ebu Davudin, Tirmidhiun, Nesaiun dhe Ibn Maxhen; Muvetta është vepër para tyre." },
  { q: "Çfarë kuptimi ka termi 'Hadith Sahih' në shkencat e hadithit?", opts: ["Hadith autentik me zinxhir transmetuesish të besueshëm pa ndërprerje", "Hadith i dobët me gabime", "Hadith i trilluar", "Hadith që nuk ka tekst"], ans: 'A' as const, exp: "Hadithi Sahih plotëson 5 kushte rigoroze të vërtetësisë dhe saktësisë nga transmetuesit e drejtë." }
];

// 3. Fikhu dhe Ibadetet
const Q_FIKHU = [
  { q: "Cili është kushti i parë dhe thelbësor për vlefshmërinë e namazit?", opts: ["Pastërtia nga papastërtitë (Tahareti dhe Abdesi)", "Veshja e rrobave të reja", "Ngrënia para faljes", "Qëndrimi jashtë shtëpisë"], ans: 'A' as const, exp: "Profeti (s.a.s.) ka thënë: 'Çelësi i namazit është pastërtia'." },
  { q: "Cila nga veprat e mëposhtme NUK e prish abdesin sipas konsensusit të dijetarëve?", opts: ["Konsumimi i ujit të pijshëm ose ushqimit hallall", "Gjumi i thellë pa vetëdije", "Dalja e gazrave", "Humbja e vetëdijes"], ans: 'A' as const, exp: "Pirja e ujit ose ngrënia e ushqimit të lejuar nuk e prish abdesin." },
  { q: "Cila nga këto NUK bën pjesë në shtyllat themelore të Islamit?", opts: ["Leximi i librave historikë", "Shehadeti", "Namazi 5 herë në ditë", "Agjërimi i Ramazanit"], ans: 'A' as const, exp: "Pesë shtyllat janë: Shehadeti, Namazi, Zekati, Agjërimi i Ramazanit dhe Haxhi për atë që ka mundësi." },
  { q: "Sa është përqindja e zekatit të detyrueshëm vjetor për pasurinë dhe arin që ka arritur nisabin?", opts: ["2.5% (një e dyzetat)", "5%", "10%", "20%"], ans: 'A' as const, exp: "Zekati i të hollave dhe arit është 2.5% (1/40) mbi pasurinë që ka kaluar një vit hënor mbi nisab." }
];

// 4. Sira (Jeta e Profetit Muhamed (s.a.s.))
const Q_SIRA = [
  { q: "Në cilin vit lindi Profeti Muhamed (s.a.s.) në qytetin e bekuar të Mekës?", opts: ["Në Vitin e Elefantit (rreth vitit 570 pas e.s.)", "Në vitin 600 pas e.s.", "Në vitin 500 pas e.s.", "Në vitin 622 pas e.s."], ans: 'A' as const, exp: "Profeti (s.a.s.) lindi në Mekë në Vitin e Elefantit, ditën e hënë në muajin Rebiul-Evel." },
  { q: "Si quhej marrëveshja e drejtësisë për mbrojtjen e të dobëtve ku mori pjesë Profeti (s.a.s.) në rini?", opts: ["Hilf el-Fudul (Lidhja e të Virtytshmëve)", "Besëlidhja e Akabes", "Marrëveshja e Medinës", "Besëlidhja e Ridvanit"], ans: 'A' as const, exp: "Hilf el-Fudul ishte pakt ku paria mekas u zotua të mbronte çdo të shtypur në qytet." },
  { q: "Kush NUK ka qenë pjesë e drejtpërdrejtë e betimit nën pemë në Besëlidhjen e Ridvanit?", opts: ["Uthman ibn Affani (r.a.) (pasi ishte dërguar si delegat në Mekë)", "Ali ibn Ebi Talib (r.a.)", "Ebu Bekër es-Siddik (r.a.)", "Umer ibnul Hattab (r.a.)"], ans: 'A' as const, exp: "Uthmani (r.a.) ishte dërguar në Mekë për bisedime; Profeti (s.a.s.) vuri dorën e vet në emër të Uthmanit." },
  { q: "Në cilin vit hixhrij u bë Çlirimi madhështor dhe paqësor i Mekës?", opts: ["Në vitin 8 Hixhrij (viti 630)", "Në vitin 2 Hixhrij", "Në vitin 5 Hixhrij", "Në vitin 10 Hixhrij"], ans: 'A' as const, exp: "Në vitin 8 Hixhrij Profeti (s.a.s.) hyri në Mekë me falje e mëshirë të madhe dhe pastroi Qaben nga idhujt." }
];

// 5. AKAIDI (Teuhidi, Engjëjt, Librat, Dita e Gjykimit, Esh'ari & Maturidi)
const Q_AKAIDI = [
  { q: "Çfarë kuptimi ka 'Teuhidi' si themeli suprem i besimit islam?", opts: ["Njëshmëria absolute e Allahut në qenien, cilësitë dhe adhurimin e Tij", "Besimi në disa fuqi hyjnore", "Kryerja e punëve me nxitim", "Mësimi i gjuhëve të huaja"], ans: 'A' as const, exp: "Teuhidi do të thotë të besosh dhe të dëshmosh se Allahu është i Vetëm, pa shok, pa rival dhe pa ngjashmëri me krijesat." },
  { q: "Cili mëkat konsiderohet mëkati më i rëndë dhe i pafalshëm nëse njeriu vdes pa u penduar?", opts: ["Shirku (shoqërimi i ortakëve Allahut në adhurim)", "Marrja e parave hua", "Mospagimi i qirasë me vonesë", "Gjumë pas namazit"], ans: 'A' as const, exp: "Kurani thotë: 'Allahu nuk e fal t'i shoqërohet Atij shok në adhurim, e përveç kësaj i fal kujt të dojë'." },
  { q: "Kush janë dy prijësit kryesorë të shkollave teologjike ortodokse sunite (Ehl-i Sunet)?", opts: ["Imam Ebu Hasen el-Esh'ari dhe Imam Ebu Mensur el-Maturidi", "Imam Gazali dhe Ibn Rushdi", "Vasil ibn Ata dhe Amr ibn Ubejd", "Xhehm ibn Safvan dhe Ebu Ali"], ans: 'A' as const, exp: "Esh'arizmi dhe Maturidizmi përfaqësojnë konsensusin dërrmues historik teologjik të Ehl-i Sunetit vel-Xhema'a." },
  { q: "Cili nga këta engjëj të nderuar NUK ka për detyrë mbikëqyrjen e pyetjeve në varr?", opts: ["Engjëlli Mikail (a.s.)", "Munkiri", "Nekiri", "Asnjëri prej tyre"], ans: 'A' as const, exp: "Engjëlli Mikail (a.s.) është i ngarkuar me shiun dhe bimësinë, kurse në varr pyesin Munkiri dhe Nekiri." },
  { q: "Çfarë nënkupton besimi në 'Kader' (Caktimin hyjnor)?", opts: ["Allahu di çdo gjë me diturinë e Tij të amshuar dhe çdo gjë ndodh me vullnetin e Tij", "Njeriu nuk ka liri veprimi fare", "Nuk ka llogari në botën tjetër", "Çdo gjë është rastësi e verbër"], ans: 'A' as const, exp: "Besimi në Kader do të thotë se dituria, vullneti dhe krijimi i Allahut përfshin çdo gjë, duke ruajtur përgjegjësinë e njeriut." }
];

// 6. JETA E PROFETËVE
const Q_PROFETET = [
  { q: "Kush ishte profeti dhe njeriu i parë i krijuar nga Allahu i Madhëruar?", opts: ["Profeti Adem (a.s.)", "Profeti Nuh (a.s.)", "Profeti Idris (a.s.)", "Profeti Ibrahim (a.s.)"], ans: 'A' as const, exp: "Allahu e krijoi Ademin (a.s.) si babain e njerëzimit dhe profetin e parë mbi tokë." },
  { q: "Cilët dy profetë të bekuar e ngritën dhe rindërtuan themelet e Qabes së Nderuar në Mekë?", opts: ["Profeti Ibrahim (a.s.) dhe djali i tij Profeti Ismail (a.s.)", "Profeti Musa (a.s.) dhe Haruni (a.s.)", "Profeti Davud (a.s.) dhe Sulejmani (a.s.)", "Profeti Adem (a.s.) dhe Shiti (a.s.)"], ans: 'A' as const, exp: "Kurani thotë: 'Dhe kur Ibrahimi dhe Ismaili ngritën themelet e Shtëpisë, duke u lutur: Zoti ynë, pranoje prej nesh!'." },
  { q: "Cila mrekulli e madhe i ndodhi profetit Ibrahim (a.s.) kur u hodh në zjarr nga tirani Nemrud?", opts: ["Zjarri me urdhër të Allahut u bë i ftohtë dhe shpëtues për të", "Ra shi i menjëhershëm që fiku shkëndijat", "Erdhi një stuhi bore", "Një zog e fluturoi në qiell"], ans: 'A' as const, exp: "Allahu i tha zjarrit: 'O zjarr, bëhu i ftohtë dhe shpëtim për Ibrahimin!'." },
  { q: "Në cilin lumë e vendosi nëna e profetit Musa (a.s.) foshnjën me arkëz për ta shpëtuar nga Faraoni?", opts: ["Në lumin Nil të Egjiptit", "Në lumin Eufrat", "Në lumin Tigër", "Në lumin Jordan"], ans: 'A' as const, exp: "Me frymëzim hyjnor, nëna e Musait (a.s.) e vendosi në Nil dhe uji e çoi drejt në pallatin e Faraonit ku e mori Asija." },
  { q: "Cila ishte lutja e famshme e profetit Junus (a.s.) brenda thellësisë së barkut të peshkut?", opts: ["'La ilahe il-la Ente, Subhaneke inni kuntu minedh-dhalimin'", "'Hasbunallahu ve ni'mel vekil'", "'Rabbigfir li ve li validejje'", "'Rabbena atina fid-dunja haseneten'"], ans: 'A' as const, exp: "Me këtë dëshmi të sinqertë të Teuhidit dhe pendimit, Allahu e shpëtoi Junusin (a.s.) nga errësirat." }
];

// 7. Personalitete Islame në Shqipëri
const Q_PERSONALITETET = [
  { q: "Kush ishte Kryetari i parë i Pleqësisë në Kuvendin e Vlorës (1912) dhe Kryetari i parë i KMSH-së më 1923?", opts: ["Haxhi Vehbi Dibra (Agolli)", "Hafiz Ali Korça", "Sherif Ahmeti", "Qazim Hoxha"], ans: 'A' as const, exp: "H. Vehbi Dibra ishte figurë madhore e kombit, nënshkrues i Pavarësisë dhe teolog i shquar." },
  { q: "Cili dijetar e patriot nga Korça shkroi veprën 'Bolshevizmi a shkatrrimi i njerzimit' dhe përktheu 'Gjylistanin'?", opts: ["Hafiz Ali Korça", "Ibrahim Dalliu", "Ismet Dibra", "Vexhi Buharaja"], ans: 'A' as const, exp: "Hafiz Ali Korça ishte mësimdhënës, poet, përkthyes dhe luftëtar i patrembur i lirisë dhe fesë." },
  { q: "Cili hoxhë e patriot i njohur mbrojti me vendosmëri të drejtat kombëtare dhe shkollën shqipe në trevat tona?", opts: ["Qazim Hoxha", "Sherif Ahmeti", "Imam Vehbi Ismail", "Hafiz Sabri Koçi"], ans: 'A' as const, exp: "Qazim Hoxha ishte klerik atdhetar me ndikim të madh në edukimin dhe qëndresën kombëtare." },
  { q: "Cili myfti dhe dijetar nga Shkodra njihej për mbrojtjen e besimit dhe oratorinë e lartë fetare e kombëtare?", opts: ["Hafiz Ali Kraja", "Vexhi Buharaja", "Haxhi Ibrahim Kaduku", "Ibrahim Dalliu"], ans: 'A' as const, exp: "Hafiz Ali Kraja ishte personalitet i shquar, autor veprash filozofike-fetare dhe mbrojtës i identitetit kombëtar." },
  { q: "Cili profesor i shquar drejtoi Medresenë e Tiranës dhe dha kontribut thelbësor në mësimdhënien e akaidit dhe logjikës?", opts: ["Ismet Dibra", "Sherif Ahmeti", "Hafiz Ali Korça", "Qazim Hoxha"], ans: 'A' as const, exp: "Ismet Dibra ishte drejtues dhe pedagog i dalluar në Medresenë e Nderuar të Tiranës." },
  { q: "Kush vuajti 20 vite e 6 muaj në burgjet komuniste dhe më 1990 udhëhoqi ringritjen e institucioneve islame?", opts: ["Hafiz Sabri Koçi", "Haxhi Ibrahim Kaduku", "H. Vehbi Dibra", "Imam Vehbi Ismail"], ans: 'A' as const, exp: "Hafiz Sabri Koçi ishte simboli i durimit, ringjalljes fetare dhe dialogut ndërfetar në Shqipëri." },
  { q: "Cili orientalist, poet dhe përkthyes i madh nga Berati përktheu kryeveprat orientale dhe mbishkrimet osmane në Shqipëri?", opts: ["Vexhi Buharaja", "Hafiz Ali Kraja", "Qazim Hoxha", "Sherif Ahmeti"], ans: 'A' as const, exp: "Vexhi Buharaja ishte dijetar erudit dhe orientalist i pashoq që dokumentoi mbishkrimet historike në mbarë vendin." },
  { q: "Cili dijetar i devotshëm nga Shkodra njihej për mësimdhënien, përshpirtshmërinë e lartë dhe edukimin e rinisë?", opts: ["Haxhi Ibrahim Kaduku", "Vexhi Buharaja", "Ismet Dibra", "Hafiz Sabri Koçi"], ans: 'A' as const, exp: "Haxhi Ibrahim Kaduku ishte alim i nderuar dhe shembull i virtytit dhe dijes islame në Shkodër." },
  { q: "Cili alim i shquar nga Kosova bëri një nga përkthimet më të njohura e të vlerësuara të Kuranit Fisnik në gjuhën shqipe?", opts: ["H. Sherif Ahmeti", "Hafiz Ali Korça", "Imam Vehbi Ismail", "Qazim Hoxha"], ans: 'A' as const, exp: "Haxhi Sherif Ahmeti ishte myfti, drejtues i medresesë 'Alaudin' dhe përkthyes i Kuranit me komentim." },
  { q: "Cili dijetar themeloi dhe drejtoi për dekada Qendrën Islame Shqiptare në Detroit (SHBA) dhe botoi dhjetëra libra shqip?", opts: ["Imam Vehbi Ismail", "Hafiz Ali Kraja", "Ismet Dibra", "Haxhi Ibrahim Kaduku"], ans: 'A' as const, exp: "Imam Vehbi Ismail ishte pionier i diasporës shqiptare në Amerikë, publicist dhe botues i madh i librave islamë." },
  { q: "Cili patriot dhe dijetar tiranas shkroi 'Ajka e Kuptimit të Kuranit Qerim' dhe 'E Parashkruemja'?", opts: ["Hafiz Ibrahim Dalliu", "H. Vehbi Dibra", "Vexhi Buharaja", "Hafiz Ali Korça"], ans: 'A' as const, exp: "Hafiz Ibrahim Dalliu ishte publicist, mësues i shkollës shqipe dhe autor i komenteve të para të Kuranit në shqip." }
];

// 8. Komuniteti Mysliman i Shqipërisë (KMSH)
const Q_KMSH = [
  { q: "Në cilin vit u mbajt Kongresi i Parë Mysliman ku u themelua Komuniteti Mysliman i Shqipërisë (KMSH)?", opts: ["Në mars 1923 në Tiranë", "Në vitin 1912 në Vlorë", "Në vitin 1920 në Lushnjë", "Në vitin 1939 në Shkodër"], ans: 'A' as const, exp: "Kongresi i Parë Mysliman u mblodh më 24 shkurt - 12 mars 1923 në Tiranë me Kryetar Haxhi Vehbi Dibrën." },
  { q: "Cilat kongrese themelore u mbajtën në vitet e para për organizimin dhe statutin e KMSH-së?", opts: ["Kongreset e viteve 1923, 1925 dhe 1929", "Vetëm kongresi i vitit 1912", "Kongreset e viteve 1944 dhe 1967", "Kongreset e viteve 1990 dhe 2000"], ans: 'A' as const, exp: "Kongreset e viteve 1923, 1925 dhe 1929 konsoliduan statutin, pavarësinë administrative dhe arsimin fetar kombëtar." },
  { q: "Cili kryetar e drejtoi KMSH-në nga themelimi më 1923 deri në Kongresin e vitit 1929?", opts: ["Haxhi Vehbi Dibra", "Behxhet Shapati", "Sherif Langi", "Hafiz Sabri Koçi"], ans: 'A' as const, exp: "Haxhi Vehbi Dibra (Agolli) ishte Myftiu i Parë i Përgjithshëm dhe kryetari i parë i nderuar i KMSH-së (1923-1929)." },
  { q: "Kush ishin kryetarët e KMSH-së në periudhën 1929 deri në mbylljen e institucioneve më 1967?", opts: ["Behxhet Shapati, Sherif Langi, Hafiz Musa Gjylbegi dhe Esat Myftia", "Vetëm Ismail Qemali", "Fan Noli dhe Faik Konica", "Sami Frashëri dhe Hasan Tahsini"], ans: 'A' as const, exp: "KMSH u drejtua nga Behxhet Shapati (1929-1942), Sherif Langi (1942-1945), Hafiz Musa Gjylbegi (1945-1946) dhe Esat Myftia (1946-1967)." },
  { q: "Në cilin vit regjimi komunist ndaloi me ligj fenë dhe mbylli të gjitha xhamitë në Shqipëri?", opts: ["Në vitin 1967", "Në vitin 1944", "Në vitin 1978", "Në vitin 1985"], ans: 'A' as const, exp: "Në vitin 1967 Shqipëria u shpall 'shtet ateist' me kushtetutë, duke mbyllur dhe shkatërruar mbi 2169 objekte kulti." },
  { q: "Në cilën xhami historike monumentale dhe në cilën datë u mbajt falja e parë publike që shënoi rihapjen e fesë më 1990?", opts: ["Më 16 Nëntor 1990 në Xhaminë e Plumbit në Shkodër", "Më 28 Nëntor 1990 në Xhaminë e Et'hem Beut", "Më 1 Janar 1991 në Korçë", "Më 1 Maj 1990 në Durrës"], ans: 'A' as const, exp: "Më 16 Nëntor 1990, Hafiz Sabri Koçi priu faljen historike të xhumasë në Xhaminë e Plumbit në Shkodër para dhjetëra mijëra besimtarëve." },
  { q: "Cila xhami e famshme historike në Sheshin Skënderbej në Tiranë u shpëtua nga prishja e vitit 1967 si monument kulture?", opts: ["Xhamia e Et'hem Beut (ndërtuar 1793-1821)", "Xhamia e Madhe e Durrësit", "Xhamia e Tabakëve", "Xhamia e Kuqe në Berat"], ans: 'A' as const, exp: "Xhamia e Et'hem Beut në qendër të Tiranës është margaritari arkitekturor dhe historik i kryeqytetit." }
];

// 9. Kultura dhe Qytetërimi Islam
const Q_KULTURA = [
  { q: "Cili qytet i famshëm në Andaluzi (Spanjë) ishte qendër e ndritur botërore e shkencës, bibliotekave dhe filozofisë islame në Evropë?", opts: ["Kordoba (Kurtuba)", "Parisi", "Londra", "Roma"], ans: 'A' as const, exp: "Kordoba islame kishte qindra biblioteka, rrugë të ndriçuara dhe universitete ku studionin dijetarë nga mbarë bota." },
  { q: "Kush njihet si 'Babai i Algjebrës' me veprën e tij madhore 'Kitab el-Xhebr vel-Mukabele'?", opts: ["Muhamed ibn Musa el-Huarizmi", "Ibn Sina (Avicena)", "El-Biruni", "Ibn Rushdi"], ans: 'A' as const, exp: "El-Huarizmi shpiku konceptet bazë të algjebrës dhe prezantoi shifrat indo-arabe e zeron në botë." },
  { q: "Cili shkencëtar dhe mjek i shquar islam shkroi kryeveprën mjekësore 'El-Kanon fi et-Tibb' (Kanuni i Mjekësisë)?", opts: ["Ibn Sina (Avicena)", "Ibn Halduni", "El-Kindi", "El-Farabi"], ans: 'A' as const, exp: "Ibn Sina ishte kolos i mjekësisë dhe vepra e tij u përdor si tekst bazë në universitetet evropiane për shekuj me radhë." },
  { q: "Cili dijetar i madh themeloi sociologjinë dhe filozofinë e historisë me veprën e tij monumentale 'Mukadime'?", opts: ["Ibn Halduni", "El-Ghazali", "Ibn Batuta", "Ibn Hazmi"], ans: 'A' as const, exp: "Ibn Halduni analizoi ligjet e ngritjes dhe rënies së qytetërimeve në veprën e tij gjeniale Mukadime." }
];

export const STRUCTURED_TRACKS: StructuredTrack[] = [
  // 1. Historia e Kuranit Fisnik
  {
    id: 'historia_kuranit',
    title: "Historia e Kuranit Fisnik",
    subtitle: "Kronologjia e zbritjes, shkrimit dhe ruajtjes",
    description: "Periudha e Mekës, Medinës, Tubimi nga Ebu Bekri (r.a.) dhe Uthmani (r.a.).",
    icon: 'BookOpen',
    color: '#059669',
    badge: 'Kronologjike',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Periudha e Mekës",
        description: "Shpallja e parë në Hira, ajetet mekase, Teuhidi dhe qëndresa e besimtarëve.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('hist_kuran', 1, 1, 'Meka Fillestare', Q_HISTORIA_MEKE) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('hist_kuran', 1, 2, 'Meka Mesatare', Q_HISTORIA_MEKE) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('hist_kuran', 1, 3, 'Meka e Thelluar', Q_HISTORIA_MEKE) }
        ]
      },
      {
        phase: 2,
        title: "Periudha e Medinës",
        description: "Shpallja e dispozitave, ligjeve shoqërore, shkruesit e Vahjit dhe ndërtimi i shoqërisë.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('hist_kuran', 2, 1, 'Medina Fillestare', Q_HISTORIA_MEDINE) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('hist_kuran', 2, 2, 'Medina Mesatare', Q_HISTORIA_MEDINE) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('hist_kuran', 2, 3, 'Medina e Thelluar', Q_HISTORIA_MEDINE) }
        ]
      },
      {
        phase: 3,
        title: "Tubimi nga Ebu Bekri (r.a.) e Uthmani (r.a.)",
        description: "Mbledhja në Mus'haf nga Ebu Bekri (r.a.), unifikimi nga Uthmani (r.a.) dhe pikat e zanoret.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('hist_kuran', 3, 1, 'Tubimi Fillestar', Q_HISTORIA_PAS) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('hist_kuran', 3, 2, 'Tubimi Mesatar', Q_HISTORIA_PAS) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('hist_kuran', 3, 3, 'Tubimi i Avancuar', Q_HISTORIA_PAS) }
        ]
      }
    ]
  },

  // 2. Hadithi dhe Syneti
  {
    id: 'hadithi_syneti',
    title: "Hadithi dhe Syneti",
    subtitle: "Porositë profetike, librat dhe shkencat e hadithit",
    description: "40 Hadithet e Imam Neveviut, Kutub es-Sitte, hadithet Sahih, Hasen dhe rregullat e Sunetit.",
    icon: 'ScrollText',
    color: '#d97706',
    badge: 'Hadith',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Hadithet e Neveviut (Nijeti & Shtyllat)",
        description: "Nijeti, dialogu me Xhibrilin (a.s.), shtyllat e Islamit dhe ruajtja nga risitë.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('had_syn', 1, 1, 'Neveviu Fillestar', Q_HADITHET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('had_syn', 1, 2, 'Neveviu Mesatar', Q_HADITHET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('had_syn', 1, 3, 'Neveviu Avancuar', Q_HADITHET) }
        ]
      },
      {
        phase: 2,
        title: "Librat e Hadithit dhe Dijetarët",
        description: "Kutub es-Sitte (Buhariu, Muslimi, Ebu Davudi, Tirmidhiu, Nesaiu, Ibn Maxhe).",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('had_syn', 2, 1, 'Librat Fillestar', Q_HADITHET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('had_syn', 2, 2, 'Librat Mesatar', Q_HADITHET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('had_syn', 2, 3, 'Librat Avancuar', Q_HADITHET) }
        ]
      },
      {
        phase: 3,
        title: "Terminologjia dhe Klasifikimi i Haditheve",
        description: "Hadithi Sahih, Hasen, Dhaif, Mutevatir dhe zinxhiri i transmetimit (Isnad).",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('had_syn', 3, 1, 'Termat Fillestar', Q_HADITHET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('had_syn', 3, 2, 'Termat Mesatar', Q_HADITHET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('had_syn', 3, 3, 'Termat Avancuar', Q_HADITHET) }
        ]
      }
    ]
  },

  // 3. Fikhu dhe Ibadetet
  {
    id: 'fikhu_ibadetet',
    title: "Fikhu dhe Ibadetet",
    subtitle: "Rregullat praktike të adhurimit dhe pastërtisë",
    description: "Pastërtia e abdesi, 5 kohët e namazit, rregullat e agjërimit, llogaritja e zekatit dhe Haxhi.",
    icon: 'Layers',
    color: '#0284c7',
    badge: 'Fikh',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Pastërtia dhe Abdesi (Tahareti)",
        description: "Rregullat e pastrimit, farzet e abdesit, gusli dhe veprat që nuk e prishin abdesin.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('fikh_ibad', 1, 1, 'Tahareti Fillestar', Q_FIKHU) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('fikh_ibad', 1, 2, 'Tahareti Mesatar', Q_FIKHU) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('fikh_ibad', 1, 3, 'Tahareti Avancuar', Q_FIKHU) }
        ]
      },
      {
        phase: 2,
        title: "Namazi dhe Rregullat e Faljes",
        description: "Kushtet, shtyllat e namazit, namazi me xhemat, xhumaja dhe namazet e bajrameve.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('fikh_ibad', 2, 1, 'Namazi Fillestar', Q_FIKHU) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('fikh_ibad', 2, 2, 'Namazi Mesatar', Q_FIKHU) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('fikh_ibad', 2, 3, 'Namazi Avancuar', Q_FIKHU) }
        ]
      },
      {
        phase: 3,
        title: "Agjërimi, Zekati dhe Haxhi",
        description: "Rregullat e muajit Ramazan, nisabi i zekatit dhe ritet e Haxhit në Qabe.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('fikh_ibad', 3, 1, 'Zekati & Haxhi Fillestar', Q_FIKHU) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('fikh_ibad', 3, 2, 'Zekati & Haxhi Mesatar', Q_FIKHU) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('fikh_ibad', 3, 3, 'Zekati & Haxhi Avancuar', Q_FIKHU) }
        ]
      }
    ]
  },

  // 4. Sira (Jeta e Profetit Muhamed (s.a.s.))
  {
    id: 'sira_kronologjike',
    title: "Sira (Jeta e Profetit Muhamed (s.a.s.))",
    subtitle: "Rruga e bekuar jetësore nga lindja deri në ndërrim jete",
    description: "Lindja dhe rinia, shpallja në Mekë, qëndresa, Hixhreti, shteti i Medinës dhe Çlirimi i Mekës.",
    icon: 'HeartHandshake',
    color: '#7c3aed',
    badge: 'Sira',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Lindja, Fëmijëria dhe Rinia",
        description: "Viti i Elefantit, mëndesha Halime, Hilf el-Fudul dhe martesa me Hatixhen (r.a.).",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('sira_krono', 1, 1, 'Rinia 1', Q_SIRA) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('sira_krono', 1, 2, 'Rinia 2', Q_SIRA) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('sira_krono', 1, 3, 'Rinia 3', Q_SIRA) }
        ]
      },
      {
        phase: 2,
        title: "Periudha e Mekës dhe Thirrja",
        description: "Shpallja në Hira, thirrja e fshehtë e publike, bojkoti dhe Israja e Miraxhi.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('sira_krono', 2, 1, 'Thirrja 1', Q_SIRA) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('sira_krono', 2, 2, 'Thirrja 2', Q_SIRA) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('sira_krono', 2, 3, 'Thirrja 3', Q_SIRA) }
        ]
      },
      {
        phase: 3,
        title: "Hixhreti, Shteti i Medinës dhe Çlirimi",
        description: "Ndërtimi i xhamisë, vëllazërimi, Ridvani, Çlirimi i Mekës dhe Haxhi i Lamtumirës.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('sira_krono', 3, 1, 'Medina 1', Q_SIRA) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('sira_krono', 3, 2, 'Medina 2', Q_SIRA) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('sira_krono', 3, 3, 'Medina 3', Q_SIRA) }
        ]
      }
    ]
  },

  // 5. AKAIDI
  {
    id: 'akaidi',
    title: "AKAIDI",
    subtitle: "Bazat e besimit islam, Teuhidi dhe teologjia",
    description: "Teuhidi, emrat dhe cilësitë e Allahut, engjëjt, librat, profetët, Dita e Gjykimit, Kaderi dhe shkollat Esh'ari e Maturidi.",
    icon: 'Compass',
    color: '#0284c7',
    badge: 'Besimi',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Teuhidi dhe Cilësitë e Allahut",
        description: "Njëshmëria e Allahut në qenie, cilësi dhe adhurim, pastrimi nga shirku dhe koncepti i Zotit.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('akd_tr', 1, 1, 'Teuhidi Fillestar', Q_AKAIDI) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('akd_tr', 1, 2, 'Teuhidi Mesatar', Q_AKAIDI) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('akd_tr', 1, 3, 'Teuhidi Avancuar', Q_AKAIDI) }
        ]
      },
      {
        phase: 2,
        title: "Engjëjt, Librat dhe Profetët",
        description: "Besimi në engjëjt, librat e shpallur hyjnorë dhe profetët e dërguar të Zotit.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('akd_tr', 2, 1, 'Engjëjt & Librat Fillestar', Q_AKAIDI) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('akd_tr', 2, 2, 'Engjëjt & Librat Mesatar', Q_AKAIDI) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('akd_tr', 2, 3, 'Engjëjt & Librat Avancuar', Q_AKAIDI) }
        ]
      },
      {
        phase: 3,
        title: "Dita e Gjykimit, Kaderi dhe Shkollat Teologjike",
        description: "Ringjallja, peshorja, sirati, caktimi hyjnor dhe tradita teologjike Esh'arite e Maturidite.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('akd_tr', 3, 1, 'Kaderi & Shkollat Fillestar', Q_AKAIDI) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('akd_tr', 3, 2, 'Kaderi & Shkollat Mesatar', Q_AKAIDI) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('akd_tr', 3, 3, 'Kaderi & Shkollat Avancuar', Q_AKAIDI) }
        ]
      }
    ]
  },

  // 6. JETA E PROFETËVE
  {
    id: 'jeta_profeteve',
    title: "JETA E PROFETËVE",
    subtitle: "Historitë e të dërguarve të Zotit në Kuran",
    description: "Ademi (a.s.), Nuhu (a.s.), Ibrahimi (a.s.), Ismaili (a.s.), Jusufi (a.s.), Musai (a.s.), Davudi (a.s.), Sulejmani (a.s.), Junusi (a.s.), Zekerija (a.s.) dhe Isai (a.s.).",
    icon: 'Sparkles',
    color: '#10b981',
    badge: 'Profetët',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Nga Ademi (a.s.) te Ibrahimi (a.s.) dhe Ismaili (a.s.)",
        description: "Krijimi i Ademit (a.s.), anija e Nuhut (a.s.), sprovat e Ibrahimit (a.s.) dhe ndërtimi i Qabes.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('pr_hist', 1, 1, 'Ademi te Ibrahimi 1', Q_PROFETET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('pr_hist', 1, 2, 'Ademi te Ibrahimi 2', Q_PROFETET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('pr_hist', 1, 3, 'Ademi te Ibrahimi 3', Q_PROFETET) }
        ]
      },
      {
        phase: 2,
        title: "Jusufi (a.s.) dhe Musai (a.s.) në Egjipt",
        description: "Ëndrra dhe udhëheqja e Jusufit (a.s.), shkopi dhe ndarja e detit me Musain (a.s.).",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('pr_hist', 2, 1, 'Jusufi & Musai 1', Q_PROFETET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('pr_hist', 2, 2, 'Jusufi & Musai 2', Q_PROFETET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('pr_hist', 2, 3, 'Jusufi & Musai 3', Q_PROFETET) }
        ]
      },
      {
        phase: 3,
        title: "Davudi (a.s.), Sulejmani (a.s.), Junusi (a.s.) dhe Isai (a.s.)",
        description: "Drejtësia, mbretëria e urtë, lutja në barkun e peshkut dhe mrekullitë e Isait (a.s.).",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('pr_hist', 3, 1, 'Davudi te Isai 1', Q_PROFETET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('pr_hist', 3, 2, 'Davudi te Isai 2', Q_PROFETET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('pr_hist', 3, 3, 'Davudi te Isai 3', Q_PROFETET) }
        ]
      }
    ]
  },

  // 7. Personalitete Islame
  {
    id: 'personalitetet_shqiptare',
    title: "Personalitete Islame",
    subtitle: "Atdhetarët, dijetarët dhe mbrojtësit e dritës islame",
    description: "H. Vehbi Dibra, Hafiz Ali Korça, Qazim Hoxha, Hafiz Ali Kraja, Ismet Dibra, Hafiz Sabri Koçi, Vexhi Buharaja, H. Ibrahim Kaduku, Sherif Ahmeti, Imam Vehbi Ismail, Ibrahim Dalliu.",
    icon: 'Users',
    color: '#e11d48',
    badge: 'Dijetarë',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "H. Vehbi Dibra, Hafiz Ali Korça, Qazim Hoxha, Hafiz Ali Kraja",
        description: "Prijësit e Pavarësisë, autorët e veprave madhore, mendimtarët e shquar dhe mbrojtësit e kombit.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('pers_hist', 1, 1, 'Prijësit Historikë 1', Q_PERSONALITETET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('pers_hist', 1, 2, 'Prijësit Historikë 2', Q_PERSONALITETET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('pers_hist', 1, 3, 'Prijësit Historikë 3', Q_PERSONALITETET) }
        ]
      },
      {
        phase: 2,
        title: "Ismet Dibra, Hafiz Sabri Koçi, Vexhi Buharaja, H. Ibrahim Kaduku",
        description: "Pedagogët e Medresesë, simboli i durimit në burgje, orientalisti i madh dhe dijetari i devotshëm.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('pers_hist', 2, 1, 'Dijetarët & Qëndresa 1', Q_PERSONALITETET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('pers_hist', 2, 2, 'Dijetarët & Qëndresa 2', Q_PERSONALITETET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('pers_hist', 2, 3, 'Dijetarët & Qëndresa 3', Q_PERSONALITETET) }
        ]
      },
      {
        phase: 3,
        title: "H. Sherif Ahmeti, Imam Vehbi Ismail, Hafiz Ibrahim Dalliu",
        description: "Përkthyesi i Kuranit në Kosovë, udhëheqësi i diasporës në SHBA dhe komentuesi i shquar nga Tirana.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('pers_hist', 3, 1, 'Përkthyesit & Udhëheqësit 1', Q_PERSONALITETET) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('pers_hist', 3, 2, 'Përkthyesit & Udhëheqësit 2', Q_PERSONALITETET) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('pers_hist', 3, 3, 'Përkthyesit & Udhëheqësit 3', Q_PERSONALITETET) }
        ]
      }
    ]
  },

  // 8. Komuniteti Mysliman i Shqipërisë (KMSH)
  {
    id: 'kmsh_shqiperi',
    title: "Komuniteti Mysliman i Shqipërisë (KMSH)",
    subtitle: "Kongreset, kryetarët deri më 1995, xhamitë dhe rihapja",
    description: "Kongreset 1923, 1925, 1929, kryetarët e KMSH deri në 1995, mbyllja e fesë 1967, xhamitë historike dhe rihapja 1990.",
    icon: 'Landmark',
    color: '#0d9488',
    badge: 'Kombëtare',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Kongreset (1923, 1925, 1929) dhe Kryetarët deri më 1995",
        description: "Kongreset historike, H. Vehbi Dibra, Behxhet Shapati, Sherif Langi, Musa Gjylbegi, Esat Myftia.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('kmsh_hist', 1, 1, 'Kongreset & Kryetarët 1', Q_KMSH) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('kmsh_hist', 1, 2, 'Kongreset & Kryetarët 2', Q_KMSH) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('kmsh_hist', 1, 3, 'Kongreset & Kryetarët 3', Q_KMSH) }
        ]
      },
      {
        phase: 2,
        title: "Xhamitë Historike dhe Mbyllja e Fesë (1967)",
        description: "Xhamitë monumentale (Et'hem Beu, Plumbit, Mbret) dhe periudha e ndalimit të fesë më 1967.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('kmsh_hist', 2, 1, 'Xhamitë & Mbyllja 1', Q_KMSH) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('kmsh_hist', 2, 2, 'Xhamitë & Mbyllja 2', Q_KMSH) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('kmsh_hist', 2, 3, 'Xhamitë & Mbyllja 3', Q_KMSH) }
        ]
      },
      {
        phase: 3,
        title: "Rihapja e Fesë më 1990 dhe Ringritja me Hafiz Sabri Koçin",
        description: "Falja e parë te Xhamia e Plumbit më 16 Nëntor 1990 dhe ringritja e institucioneve.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('kmsh_hist', 3, 1, 'Rihapja 1990 1', Q_KMSH) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('kmsh_hist', 3, 2, 'Rihapja 1990 2', Q_KMSH) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('kmsh_hist', 3, 3, 'Rihapja 1990 3', Q_KMSH) }
        ]
      }
    ]
  },

  // 9. Kultura dhe Qytetërimi Islam
  {
    id: 'kultura_qyteterimi',
    title: "Kultura dhe Qytetërimi Islam",
    subtitle: "Shkenca, arkitektura, mendimi dhe trashëgimia botërore",
    description: "Kordoba, shkencëtarët el-Huarizmi e Ibn Sina, Mukadime e Ibn Haldunit dhe toleranca qytetëruese.",
    icon: 'Award',
    color: '#f59e0b',
    badge: 'Qytetërim',
    totalQuestions: 99,
    phases: [
      {
        phase: 1,
        title: "Shkenca dhe Dijetarët Universalë",
        description: "El-Huarizmi (Algjebra), Ibn Sina (Mjekësia), El-Biruni dhe zhvillimi i shkencës.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('kult_qyt', 1, 1, 'Shkenca 1', Q_KULTURA) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('kult_qyt', 1, 2, 'Shkenca 2', Q_KULTURA) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('kult_qyt', 1, 3, 'Shkenca 3', Q_KULTURA) }
        ]
      },
      {
        phase: 2,
        title: "Arkitektura dhe Qendrat e Mëdha Qytetëruese",
        description: "Kordoba, Bagdadi, Damasku, Stambolli dhe bukuria e xhamive monumentale.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('kult_qyt', 2, 1, 'Arkitektura 1', Q_KULTURA) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('kult_qyt', 2, 2, 'Arkitektura 2', Q_KULTURA) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('kult_qyt', 2, 3, 'Arkitektura 3', Q_KULTURA) }
        ]
      },
      {
        phase: 3,
        title: "Filozofia, Shoqëria dhe Toleranca Historike",
        description: "Mukadime e Ibn Haldunit, bashkëjetesa ndërfetare dhe vlerat e përjetshme të qytetërimit.",
        totalQuestions: 33,
        levels: [
          { level: 1, title: "Niveli 1 - Fillestar", difficulty: 'fillestar', questionCount: 11, questions: generate11Questions('kult_qyt', 3, 1, 'Shoqëria 1', Q_KULTURA) },
          { level: 2, title: "Niveli 2 - Mesatar", difficulty: 'mesatar', questionCount: 11, questions: generate11Questions('kult_qyt', 3, 2, 'Shoqëria 2', Q_KULTURA) },
          { level: 3, title: "Niveli 3 - I Avancuar", difficulty: 'avancuar', questionCount: 11, questions: generate11Questions('kult_qyt', 3, 3, 'Shoqëria 3', Q_KULTURA) }
        ]
      }
    ]
  }
];
