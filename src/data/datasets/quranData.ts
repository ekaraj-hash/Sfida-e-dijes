export interface RawQuestion {
  q: string;
  opts: [string, string, string, string]; // [correct, wrong1, wrong2, wrong3]
  h: string;
  exp: string;
  diff: 'fillestar' | 'mesatar' | 'avancuar';
}

export const SURAHS = [
  { n: 1, name: 'El-Fatiha', al: 'Hapësja', ayahs: 7, type: 'Mekase' },
  { n: 2, name: 'El-Bekare', al: 'Lopa', ayahs: 286, type: 'Medinase' },
  { n: 3, name: 'Ali Imran', al: 'Familja e Imranit', ayahs: 200, type: 'Medinase' },
  { n: 4, name: 'En-Nisa', al: 'Gratë', ayahs: 176, type: 'Medinase' },
  { n: 5, name: 'El-Maide', al: 'Tryeza e shtruar', ayahs: 120, type: 'Medinase' },
  { n: 6, name: 'El-En’am', al: 'Bagëtia', ayahs: 165, type: 'Mekase' },
  { n: 7, name: 'El-A’raf', al: 'Lartësitë', ayahs: 206, type: 'Mekase' },
  { n: 8, name: 'El-Enfal', al: 'Pretë e luftës', ayahs: 75, type: 'Medinase' },
  { n: 9, name: 'Et-Teube', al: 'Pendimi', ayahs: 129, type: 'Medinase' },
  { n: 10, name: 'Junus', al: 'Profeti Junus', ayahs: 109, type: 'Mekase' },
  { n: 11, name: 'Hud', al: 'Profeti Hud', ayahs: 123, type: 'Mekase' },
  { n: 12, name: 'Jusuf', al: 'Profeti Jusuf', ayahs: 111, type: 'Mekase' },
  { n: 13, name: 'Er-Ra’d', al: 'Bubullima', ayahs: 43, type: 'Medinase' },
  { n: 14, name: 'Ibrahim', al: 'Profeti Ibrahim', ayahs: 52, type: 'Mekase' },
  { n: 15, name: 'El-Hixhr', al: 'Lugina e shkëmbinjve', ayahs: 99, type: 'Mekase' },
  { n: 16, name: 'En-Nahl', al: 'Bleta', ayahs: 128, type: 'Mekase' },
  { n: 17, name: 'El-Isra', al: 'Udhëtimi i Natës', ayahs: 111, type: 'Mekase' },
  { n: 18, name: 'El-Kehf', al: 'Shpella', ayahs: 110, type: 'Mekase' },
  { n: 19, name: 'Merjem', al: 'Virgjëresha Merjeme', ayahs: 98, type: 'Mekase' },
  { n: 20, name: 'Ta-Ha', al: 'Ta-Ha', ayahs: 135, type: 'Mekase' },
  { n: 21, name: 'El-Enbija', al: 'Profetët', ayahs: 112, type: 'Mekase' },
  { n: 22, name: 'El-Haxh', al: 'Haxhi', ayahs: 78, type: 'Medinase' },
  { n: 23, name: 'El-Mu’minun', al: 'Besimtarët', ayahs: 118, type: 'Mekase' },
  { n: 24, name: 'En-Nur', al: 'Drita', ayahs: 64, type: 'Medinase' },
  { n: 25, name: 'El-Furkan', al: 'Dalluesi i së vërtetës', ayahs: 77, type: 'Mekase' },
  { n: 26, name: 'Esh-Shu’ara', al: 'Poetët', ayahs: 227, type: 'Mekase' },
  { n: 27, name: 'En-Neml', al: 'Milingona', ayahs: 93, type: 'Mekase' },
  { n: 28, name: 'El-Kasas', al: 'Rrëfimet', ayahs: 88, type: 'Mekase' },
  { n: 29, name: 'El-Ankebut', al: 'Merimanga', ayahs: 69, type: 'Mekase' },
  { n: 30, name: 'Er-Rum', al: 'Bizantinët', ayahs: 60, type: 'Mekase' },
  { n: 31, name: 'Lukman', al: 'Njeriu i urtë Lukman', ayahs: 34, type: 'Mekase' },
  { n: 32, name: 'Es-Sexhde', al: 'Sexhdeja', ayahs: 30, type: 'Mekase' },
  { n: 33, name: 'El-Ahzab', al: 'Aleatët', ayahs: 73, type: 'Medinase' },
  { n: 34, name: 'Sebe', al: 'Mbretëria e Shebës', ayahs: 54, type: 'Mekase' },
  { n: 35, name: 'Fatir', al: 'Krijuesi', ayahs: 45, type: 'Mekase' },
  { n: 36, name: 'Ja-Sin', al: 'Ja-Sin', ayahs: 83, type: 'Mekase' },
  { n: 37, name: 'Es-Saffat', al: 'Të radhiturit', ayahs: 182, type: 'Mekase' },
  { n: 38, name: 'Sad', al: 'Shkronja Sad', ayahs: 88, type: 'Mekase' },
  { n: 39, name: 'Ez-Zumer', al: 'Turmat', ayahs: 75, type: 'Mekase' },
  { n: 40, name: 'Gafir', al: 'Falësi i Madh', ayahs: 85, type: 'Mekase' },
  { n: 41, name: 'Fussilet', al: 'Të shkoqiturat', ayahs: 54, type: 'Mekase' },
  { n: 42, name: 'Esh-Shura', al: 'Këshillimi', ayahs: 53, type: 'Mekase' },
  { n: 43, name: 'Ez-Zuhruf', al: 'Zbukurimi i Artë', ayahs: 89, type: 'Mekase' },
  { n: 44, name: 'Ed-Duhan', al: 'Tymi', ayahs: 59, type: 'Mekase' },
  { n: 45, name: 'El-Xhathije', al: 'Të gjunjëzuarit', ayahs: 37, type: 'Mekase' },
  { n: 46, name: 'El-Ahkaf', al: 'Kodrat e rërës', ayahs: 35, type: 'Mekase' },
  { n: 47, name: 'Muhamed', al: 'Profeti Muhamed (s.a.s.)', ayahs: 38, type: 'Medinase' },
  { n: 48, name: 'El-Fet’h', al: 'Fitorja e Madhe', ayahs: 29, type: 'Medinase' },
  { n: 49, name: 'El-Huxhurat', al: 'Dhomat e banimit', ayahs: 18, type: 'Medinase' },
  { n: 50, name: 'Kaf', al: 'Shkronja Kaf', ayahs: 45, type: 'Mekase' },
  { n: 51, name: 'Edh-Dharijat', al: 'Erërat shpërndarëse', ayahs: 60, type: 'Mekase' },
  { n: 52, name: 'Et-Tur', al: 'Mali Tur', ayahs: 49, type: 'Mekase' },
  { n: 53, name: 'En-Nexhm', al: 'Ylli', ayahs: 62, type: 'Mekase' },
  { n: 54, name: 'El-Kamer', al: 'Hëna', ayahs: 55, type: 'Mekase' },
  { n: 55, name: 'Er-Rrahman', al: 'Mëshiruesi', ayahs: 78, type: 'Medinase' },
  { n: 56, name: 'El-Vakia', al: 'Ngjarja e pashmangshme', ayahs: 96, type: 'Mekase' },
  { n: 57, name: 'El-Hadid', al: 'Hekuri', ayahs: 29, type: 'Medinase' },
  { n: 58, name: 'El-Muxhadile', al: 'Gruaja që bisedon', ayahs: 22, type: 'Medinase' },
  { n: 59, name: 'El-Hashr', al: 'Tubimi / Dëbimi', ayahs: 24, type: 'Medinase' },
  { n: 60, name: 'El-Mumtehine', al: 'E sprovuara', ayahs: 13, type: 'Medinase' },
  { n: 61, name: 'Es-Saff', al: 'Rreshti i bashkuar', ayahs: 14, type: 'Medinase' },
  { n: 62, name: 'El-Xhuma', al: 'Dita e Xhuma', ayahs: 11, type: 'Medinase' },
  { n: 63, name: 'El-Munafikun', al: 'Hipokritët', ayahs: 11, type: 'Medinase' },
  { n: 64, name: 'Et-Tegabun', al: 'Humbja e ndërsjellë', ayahs: 18, type: 'Medinase' },
  { n: 65, name: 'Et-Talak', al: 'Divorci', ayahs: 12, type: 'Medinase' },
  { n: 66, name: 'Et-Tahrim', al: 'Ndalimi', ayahs: 12, type: 'Medinase' },
  { n: 67, name: 'El-Mulk', al: 'Sundimi sovran', ayahs: 30, type: 'Mekase' },
  { n: 68, name: 'El-Kalem', al: 'Penda', ayahs: 52, type: 'Mekase' },
  { n: 69, name: 'El-Hakkah', al: 'E Vërteta e madhe', ayahs: 52, type: 'Mekase' },
  { n: 70, name: 'El-Me’arixh', al: 'Shkallët e ngjitjes', ayahs: 44, type: 'Mekase' },
  { n: 71, name: 'Nuh', al: 'Profeti Nuh', ayahs: 28, type: 'Mekase' },
  { n: 72, name: 'El-Xhinn', al: 'Xhinët', ayahs: 28, type: 'Mekase' },
  { n: 73, name: 'El-Muzzemmil', al: 'I mbështjelluri', ayahs: 20, type: 'Mekase' },
  { n: 74, name: 'El-Muddeth-thir', al: 'I mbuluari me petk', ayahs: 56, type: 'Mekase' },
  { n: 75, name: 'El-Kijameh', al: 'Dita e Ringjalljes', ayahs: 40, type: 'Mekase' },
  { n: 76, name: 'El-Insan', al: 'Njeriu', ayahs: 31, type: 'Medinase' },
  { n: 77, name: 'El-Murselat', al: 'Engjëjt e dërguar', ayahs: 50, type: 'Mekase' },
  { n: 78, name: 'En-Nebe', al: 'Lajmi i Madh', ayahs: 40, type: 'Mekase' },
  { n: 79, name: 'En-Nazi’at', al: 'Engjëjt shkulës', ayahs: 46, type: 'Mekase' },
  { n: 80, name: 'Abese', al: 'Ai vrenjti fytyrën', ayahs: 42, type: 'Mekase' },
  { n: 81, name: 'Et-Tekvir', al: 'Errësimi i diellit', ayahs: 29, type: 'Mekase' },
  { n: 82, name: 'El-Infitar', al: 'Çarja e qiellit', ayahs: 19, type: 'Mekase' },
  { n: 83, name: 'El-Mutaffifin', al: 'Mashtruesit në peshore', ayahs: 36, type: 'Mekase' },
  { n: 84, name: 'El-Inshikak', al: 'Plasaritja e qiellit', ayahs: 25, type: 'Mekase' },
  { n: 85, name: 'El-Buruxh', al: 'Yjësitë qiellore', ayahs: 22, type: 'Mekase' },
  { n: 86, name: 'Et-Tarik', al: 'Ylli udhëtar nate', ayahs: 17, type: 'Mekase' },
  { n: 87, name: 'El-A’la', al: 'Më i Larti', ayahs: 19, type: 'Mekase' },
  { n: 88, name: 'El-Gashijeh', al: 'Ngjarja kapluese', ayahs: 26, type: 'Mekase' },
  { n: 89, name: 'El-Fexhr', al: 'Agimi i mëngjesit', ayahs: 30, type: 'Mekase' },
  { n: 90, name: 'El-Beled', al: 'Qyteti i shenjtë', ayahs: 20, type: 'Mekase' },
  { n: 91, name: 'Esh-Shems', al: 'Dielli', ayahs: 15, type: 'Mekase' },
  { n: 92, name: 'El-Lejl', al: 'Nata', ayahs: 21, type: 'Mekase' },
  { n: 93, name: 'Ed-Duha', al: 'Paraditja', ayahs: 11, type: 'Mekase' },
  { n: 94, name: 'El-Inshirah', al: 'Hapja e kraharorit', ayahs: 8, type: 'Mekase' },
  { n: 95, name: 'Et-Tin', al: 'Fiku', ayahs: 8, type: 'Mekase' },
  { n: 96, name: 'El-Alek', al: 'Mpiksja e gjakut', ayahs: 19, type: 'Mekase' },
  { n: 97, name: 'El-Kadr', al: 'Nata e Kadrit', ayahs: 5, type: 'Mekase' },
  { n: 98, name: 'El-Bejjineh', al: 'Fakti i qartë', ayahs: 8, type: 'Medinase' },
  { n: 99, name: 'Ez-Zelzele', al: 'Tërmeti i madh', ayahs: 8, type: 'Medinase' },
  { n: 100, name: 'El-Adijat', al: 'Kuajt vrapues', ayahs: 11, type: 'Mekase' },
  { n: 101, name: 'El-Kari’ah', al: 'Goditja shurdhuese', ayahs: 11, type: 'Mekase' },
  { n: 102, name: 'Et-Tekathur', al: 'Gara për shtim pasurie', ayahs: 8, type: 'Mekase' },
  { n: 103, name: 'El-Asr', al: 'Koha e pasdites', ayahs: 3, type: 'Mekase' },
  { n: 104, name: 'El-Humezeh', al: 'Përgojuesi', ayahs: 9, type: 'Mekase' },
  { n: 105, name: 'El-Fil', al: 'Elefanti', ayahs: 5, type: 'Mekase' },
  { n: 106, name: 'Kurejsh', al: 'Fisi Kurejsh', ayahs: 4, type: 'Mekase' },
  { n: 107, name: 'El-Ma’un', al: 'Ndihma e vogël', ayahs: 7, type: 'Mekase' },
  { n: 108, name: 'El-Kewther', al: 'Lumi Kevther', ayahs: 3, type: 'Mekase' },
  { n: 109, name: 'El-Kafirun', al: 'Pabesimtarët', ayahs: 6, type: 'Mekase' },
  { n: 110, name: 'En-Nasr', al: 'Ndihma dhe fitorja', ayahs: 3, type: 'Medinase' },
  { n: 111, name: 'El-Mesed', al: 'Fijet e përdredhura', ayahs: 5, type: 'Mekase' },
  { n: 112, name: 'El-Ihlas', al: 'Sinqeriteti / Njëshmëria', ayahs: 4, type: 'Mekase' },
  { n: 113, name: 'El-Felek', al: 'Agimi i zbardhur', ayahs: 5, type: 'Mekase' },
  { n: 114, name: 'En-Nas', al: 'Njerëzit', ayahs: 6, type: 'Mekase' }
];

export const QURAN_THEMATIC_QUESTIONS: RawQuestion[] = [
  {
    q: 'Cili ajet në Kur’anin Fisnik njihet si ajeti më madhështor (Ajeti Kursi)?',
    opts: ['Ajeti 255 i sures El-Bekare', 'Ajeti 35 i sures En-Nur', 'Ajeti 282 i sures El-Bekare', 'Ajeti 53 i sures Ez-Zumer'],
    h: 'Gjendet në suren El-Bekare dhe trajton Sovranitetin absolut të Allahut.',
    exp: 'Profeti (s.a.s.) konfirmoi se Ajeti Kursi (Bekare 255) është ajeti më madhështor në mbarë Kur’anin.',
    diff: 'fillestar'
  },
  {
    q: 'Cili është ajeti më i gjatë në tërë Kur’anin Fisnik?',
    opts: ['Ajeti i Borxhit (El-Bekare 282)', 'Ajeti Kursi (El-Bekare 255)', 'Ajeti i Mbulesës (En-Nur 31)', 'Ajeti i Dritës (En-Nur 35)'],
    h: 'Zë një faqe të plotë në Mus’haf dhe rregullon shkrimin e transaksioneve me afat.',
    exp: 'Ajeti 282 i sures El-Bekare është ajeti më i gjatë dhe quhet Ajeti i Borxhit (Ajetud-Dejn).',
    diff: 'mesatar'
  },
  {
    q: 'Cila sure në Kur’anin Fisnik nuk fillon me "Bismil-lahir-Rrahmanir-Rrahim"?',
    opts: ['Surja Et-Teube (El-Bera’e)', 'Surja El-Enfal', 'Surja El-Bekare', 'Surja El-Maide'],
    h: 'Është surja e 9-të në radhitje.',
    exp: 'Surja Et-Teube zbret pa Bismilah sepse shpall heqjen e mbrojtjes për ata që thyen marrëveshjen.',
    diff: 'fillestar'
  },
  {
    q: 'Cila sure e Kur’anit Fisnik përmban dy herë formulën "Bismil-lahir-Rrahmanir-Rrahim"?',
    opts: ['Surja En-Neml', 'Surja En-Nahl', 'Surja El-Kasas', 'Surja Sebe'],
    h: 'Një herë në fillim dhe një herë brenda letrës së Sulejmanit (a.s.) drejtuar mbretëreshës së Shebës.',
    exp: 'Surja En-Neml ka Bismilah në krye dhe në ajetin 30 në letrën e profetit Sulejman (a.s.).',
    diff: 'mesatar'
  },
  {
    q: 'Cili sahabi i nderuar është i vetmi që përmendet shprehimisht me emrin e tij në Kur’anin Fisnik?',
    opts: ['Zejd ibn Harithe (r.a.)', 'Ebu Bekr es-Siddik (r.a.)', 'Ali ibn Ebi Talib (r.a.)', 'Omer ibn el-Hattab (r.a.)'],
    h: 'Përmendet në suren El-Ahzab ajeti 37.',
    exp: 'Zejd ibn Harithe (r.a.) është i vetmi sahabi i përmendur me emër në tekstin kuranor.',
    diff: 'mesatar'
  },
  {
    q: 'Cila grua e nderuar është e vetmja që përmendet shprehimisht me emrin e saj në Kur’an?',
    opts: ['Merjemja (nëna e profetit Isa (a.s.))', 'Asijeja (gruaja e Faraonit)', 'Hatixhja (r.a.)', 'Sara (gruaja e Ibrahimit (a.s.))'],
    h: 'Një sure e tërë mban emrin e saj (surja 19).',
    exp: 'Merjemja përmendet me emër 34 herë në Kur’an dhe një sure mban emrin e saj.',
    diff: 'fillestar'
  },
  {
    q: 'Sa herë përmendet shprehimisht emri "Muhamed" në Kur’anin Fisnik?',
    opts: ['4 herë', '1 herë', '12 herë', '25 herë'],
    h: 'Plus 1 herë me emrin Ahmed në gojën e Isait (a.s.)',
    exp: 'Emri Muhamed përmendet 4 herë (Ali Imran 144, Ahzab 40, Muhamed 2, Fet’h 29) dhe Ahmed 1 herë (Saff 6).',
    diff: 'avancuar'
  },
  {
    q: 'Cili profet përmendet më së shumti me emër në Kur’anin Fisnik?',
    opts: ['Profeti Musa (a.s.) (136 herë)', 'Profeti Ibrahim (a.s.)', 'Profeti Isa (a.s.)', 'Profeti Nuh (a.s.)'],
    h: 'Emri i tij përmendet më shumë se 130 herë në sure të ndryshme.',
    exp: 'Musai (a.s.) përmendet 136 herë në Kur’an me detaje të gjera nga jeta e tij.',
    diff: 'fillestar'
  },
  {
    q: 'Cila sure e Kur’anit Fisnik njihet si e barabartë me një të tretën (1/3) e Kur’anit në vlerë shpirtërore?',
    opts: ['Surja El-Ihlas', 'Surja El-Fatiha', 'Surja Ja-Sin', 'Surja El-Mulk'],
    h: 'Pohon Njëshmërinë e kulluar të Allahut (Kull huvallahu ehad).',
    exp: 'Profeti (s.a.s.) tha se leximi i sures El-Ihlas peshon sa një e treta e Kur’anit për nga mesazhi i Teuhidit.',
    diff: 'fillestar'
  },
  {
    q: 'Cila sure njihet si mbrojtëse nga dënimi i varrit sipas haditheve të sakta profetike?',
    opts: ['Surja El-Mulk (Tebareke)', 'Surja El-Vakia', 'Surja El-Haxh', 'Surja Es-Sexhde'],
    h: 'Ka 30 ajete dhe rekomandohet leximi i saj çdo natë para gjumit.',
    exp: 'Surja El-Mulk ndërmjetëson për lexuesin e saj të rregullt dhe e mbron nga sprova e varrit.',
    diff: 'fillestar'
  },
  {
    q: 'Cila sure përmban ajetin që rekomandohet të lexohet çdo ditë të premte (ditë e Xhuma)?',
    opts: ['Surja El-Kehf', 'Surja El-Xhuma', 'Surja El-Bekare', 'Surja Ja-Sin'],
    h: 'Profeti (s.a.s.) tha se ajo ndriçon me dritë nga njëra e premte tek tjetra.',
    exp: 'Leximi i sures El-Kehf ditën e xhuma është sunet i fortë profetik.',
    diff: 'fillestar'
  },
  {
    q: 'Cilat janë dy suret mbrojtëse të njohura si "El-Mu’awwidhatani"?',
    opts: ['Surja El-Felek dhe Surja En-Nas', 'Surja El-Fatiha dhe Surja El-Bekare', 'Surja El-Ihlas dhe Surja El-Kevther', 'Surja Ja-Sin dhe Surja Er-Rahman'],
    h: 'Dy suret e fundit të Mus’hafit që kërkojnë mbrojtjen e Zotit nga çdo e keqe.',
    exp: 'El-Felek dhe En-Nas janë dy suret kryesore për rukje dhe mbrojtje shpirtërore.',
    diff: 'fillestar'
  },
  {
    q: 'Cila është surja më e shkurtër në tërë Kur’anin Fisnik?',
    opts: ['Surja El-Kewther (3 ajete)', 'Surja El-Asr (3 ajete)', 'Surja En-Nasr (3 ajete)', 'Surja El-Ihlas (4 ajete)'],
    h: 'Ka vetëm 10 fjalë dhe 42 shkronja.',
    exp: 'Surja El-Kewther është surja më e shkurtër e Kur’anit me vetëm 3 ajete të ngjeshura.',
    diff: 'fillestar'
  },
  {
    q: 'Cili qytet përmendet në Kur’an me emrin antik "Bekkete"?',
    opts: ['Meka e Nderuar', 'Medina e Ndritshme', 'Kudsi (Jerusalemi)', 'Taifi'],
    h: 'Përmendet në suren Ali Imran ajeti 96 në lidhje me tempullin e parë të adhurimit.',
    exp: 'Allahu thotë: "Shtëpia e parë e ngritur për njerëzit është ajo në Bekë (Mekë)...".',
    diff: 'mesatar'
  },
  {
    q: 'Sa xhuze (pjesë të barabarta) ka Kur’ani Fisnik gjithsej?',
    opts: ['30 xhuze', '20 xhuze', '40 xhuze', '60 xhuze'],
    h: 'Çdo xhuz përbëhet nga 2 hizbe.',
    exp: 'Kur’ani ndahet në 30 xhuze për lehtësim të këndimit dhe mësimit përmendësh.',
    diff: 'fillestar'
  },
  {
    q: 'Sa hizbe përmban gjithsej Kur’ani Fisnik?',
    opts: ['60 hizbe', '30 hizbe', '114 hizbe', '120 hizbe'],
    h: 'Çdo xhuz përmban saktësisht 2 hizbe.',
    exp: 'Duke qenë 30 xhuze dhe çdo xhuz me 2 hizbe, Kur’ani ka gjithsej 60 hizbe.',
    diff: 'mesatar'
  },
  {
    q: 'Cila kafshë e vogël u frymëzua nga Allahu dhe ka një sure të plotë me emrin e saj (surja 16)?',
    opts: ['Bleta (En-Nahl)', 'Milingona (En-Neml)', 'Merimanga (El-Ankebut)', 'Miza'],
    h: 'Prodhon mjaltë në të cilin ka shërim për njerëzit.',
    exp: 'Surja En-Nahl (Bleta) përshkruan mrekullinë e bletës dhe mjaltit shërues.',
    diff: 'fillestar'
  },
  {
    q: 'Cili tregim në Kur’an quhet nga vetë Allahu si "Ahsenul-Kasas" (Rrëfimi më i bukur)?',
    opts: ['Historia e profetit Jusuf (a.s.)', 'Historia e profetit Musa (a.s.)', 'Historia e banorëve të Shpellës', 'Historia e pronarëve të kopshtit'],
    h: 'Një sure e tërë me 111 ajete i kushtohet këtij tregimi.',
    exp: 'Allahu e quan suren Jusuf "Ahsenul-Kasas" për mësimet e thella të durimit dhe nderit.',
    diff: 'fillestar'
  },
  {
    q: 'Cila sure njihet si "Nusja e Kur’anit" (Arusul-Kur’an)?',
    opts: ['Surja Er-Rrahman', 'Surja Ja-Sin', 'Surja El-Vakia', 'Surja El-Mulk'],
    h: 'Përsërit 31 herë ajetin: "E cilën të mirë të Zotit tuaj e përgënjeshtroni?".',
    exp: 'Surja Er-Rrahman dallohet për bukurinë stilistike dhe përshkrimin e mrekullive hyjnore.',
    diff: 'mesatar'
  },
  {
    q: 'Sa herë përsëritet ajeti "Fe bi ej-ji ala’i Rabbikuma tukedh-dhiban" në suren Er-Rrahman?',
    opts: ['31 herë', '21 herë', '40 herë', '15 herë'],
    h: 'U drejtohet njerëzve dhe xhinëve për mirësitë e pafundme të Zotit.',
    exp: 'Ky ajet ritmik përsëritet saktësisht 31 herë në suren Er-Rrahman.',
    diff: 'avancuar'
  },
  {
    q: 'Cila sure fillon me betimin "Për kohën! Me të vërtetë njeriu është në humbje të sigurt"?',
    opts: ['Surja El-Asr', 'Surja Ed-Duha', 'Surja El-Fexhr', 'Surja El-Lejl'],
    h: 'Imam Shafi’u ka thënë: "Sikur të zbriste vetëm kjo sure, do t’i mjaftonte njerëzimit".',
    exp: 'Surja El-Asr përmbledh 4 parimet e shpëtimit: besimin, veprat e mira, këshillën për të vërtetën dhe durimin.',
    diff: 'fillestar'
  },
  {
    q: 'Cili ushqim i bekuar përmendet në suren Et-Tin bashkë me ullirin?',
    opts: ['Fiku (Et-Tin)', 'Hurma', 'Shega', 'Rrushi'],
    h: 'Allahu betohet: "Për fikun dhe ullirin...".',
    exp: 'Surja Et-Tin fillon me betimin për fikun dhe ullirin, duke theksuar krijimin e njeriut në formën më të përsosur.',
    diff: 'fillestar'
  },
  {
    q: 'Në cilën shpellë zbritën ajetet e para të Kur’anit Fisnik?',
    opts: ['Në shpellën Hira', 'Në shpellën Theur', 'Në shpellën e Kehfit', 'Në shpellën e Uhudit'],
    h: 'Gjendet në Malin En-Nur afër Mekës.',
    exp: 'Në shpellën Hira zbritën pesë ajetet e para të sures El-Alek: "Ikra bi-ismi Rabbikel-ledhi halak".',
    diff: 'fillestar'
  },
  {
    q: 'Cili ishte urdhri i parë që zbriti në Kur’anin Fisnik?',
    opts: ['Lexo! (Ikra)', 'Ngrihu dhe paralajmëro!', 'Falu!', 'Agjëro!'],
    h: 'Fjala e parë e ajetit të parë të shpalljes në Hira.',
    exp: 'Urdhri i parë hyjnor ishte "Ikra!" (Lexo!) duke vënë diturinë në themel të besimit.',
    diff: 'fillestar'
  },
  {
    q: 'Cila sure e Kur’anit u quajt nga Profeti (s.a.s.) "Ummul Kuran" (Nëna e Kur’anit)?',
    opts: ['Surja El-Fatiha', 'Surja El-Bekare', 'Surja Ja-Sin', 'Surja El-Ihlas'],
    h: 'Lexohet në çdo rekat të çdo namazi.',
    exp: 'El-Fatiha quhet Ummul Kuran sepse përmbledh të gjitha kuptimet madhore të Kuranit.',
    diff: 'fillestar'
  }
];
