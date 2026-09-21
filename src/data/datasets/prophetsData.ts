import { RawQuestion } from './quranData';

export interface ProphetProfile {
  name: string;
  title: string;
  people: string;
  miracleOrBook: string;
  location: string;
}

export const QURANIC_PROPHETS: ProphetProfile[] = [
  { name: 'Adem (a.s.)', title: 'Babai i Njerëzimit (Ebul Besher)', people: 'Mbarë njerëzimi', miracleOrBook: 'Mësimi i të gjithë emrave të sendeve nga Allahu', location: 'Xheneti dhe zbritja në Tokë' },
  { name: 'Idris (a.s.)', title: 'I ngrituri në vend të lartë', people: 'Babiloni / Egjipt', miracleOrBook: 'Shkrimi me pendë dhe qepja e rrobave', location: 'Mesopotami' },
  { name: 'Nuh (a.s.)', title: 'Shejhu i Profetëve (Ulu-l-Azm)', people: 'Populli kryeneç i Nuhut', miracleOrBook: 'Ndërtimi i Anijes Shpëtuese dhe Mbijetesa e Përmbytjes', location: 'Mali Xhudi / Irak' },
  { name: 'Hud (a.s.)', title: 'Profeti i dërguar tek Adi', people: 'Populli i fuqishëm i Adit me shtylla (Irem)', miracleOrBook: 'Mbrojtja nga era shkatërruese përvëluese', location: 'El-Ahkaf (Gadishulli Jugor Arab)' },
  { name: 'Salih (a.s.)', title: 'Profeti i Devesë Mrekullibërëse', people: 'Populli i Themudit që gdhendte shkëmbinj', miracleOrBook: 'Dalja e Devesë së mrekullueshme nga shkëmbi', location: 'El-Hixhr (Medain Salih)' },
  { name: 'Ibrahim (a.s.)', title: 'Miku i ngushtë i Zotit (Halilullah)', people: 'Populli i Nemrudit dhe Kanan', miracleOrBook: 'Zjarri i ftohur e shpëtues dhe ndërtimi i Qabesë me Ismailin', location: 'Irak, Sham, Hixhaz (Mekë)' },
  { name: 'Lut (a.s.)', title: 'Profeti i durimit moral', people: 'Populli i Sodomës (Sadum)', miracleOrBook: 'Shpëtimi nga përmbysja e qytetit të degjeneruar me gurë balte', location: 'Deti i Vdekur (Lugina e Jordanit)' },
  { name: 'Ismail (a.s.)', title: 'I Flijuesi i Durueshëm (Edh-Dhebih)', people: 'Fisi Xhurhum dhe banorët e Mekës', miracleOrBook: 'Burimi i bekuar i Zemzemit dhe ndërtimi i Qabesë', location: 'Mekë' },
  { name: 'Is’hak (a.s.)', title: 'Djali i gëzuar i Ibrahimit', people: 'Banorët e Kananit (Palestinë)', miracleOrBook: 'Lajmi i gëzuar i lindjes së tij kur nëna Sara ishte e moshuar', location: 'El-Halil (Hebron / Palestinë)' },
  { name: 'Jakub (a.s.)', title: 'Izraeli (Robi i Zotit)', people: 'Fisnikët e Kananit dhe bijtë e tij (12 fiset)', miracleOrBook: 'Kthimi i shikimit nga era e këmishës së Jusufit', location: 'Kanan dhe Egjipt' },
  { name: 'Jusuf (a.s.)', title: 'Es-Siddik (Fisniku me bukuri hyjnore)', people: 'Egjipti i Lashtë', miracleOrBook: 'Interpretimi i përpiktë i ëndrrave dhe ruajtja e nderit', location: 'Egjipt' },
  { name: 'Ejjub (a.s.)', title: 'Shembulli Suprem i Durimit (Sabrit)', people: 'Populli i Hauranit', miracleOrBook: 'Shërimi i plotë nga uji i burimit që gufoi nga toka pas sprovës së rëndë', location: 'Sham / Hauran' },
  { name: 'Shuajb (a.s.)', title: 'Predikuesi i Profetëve (Hatibul Enbija)', people: 'Populli i Medjenit dhe banorët e Pyllit (Ejke)', miracleOrBook: 'Ftesa për drejtësi të rreptë në peshore dhe tregti', location: 'Medjen (pranë Akabasë)' },
  { name: 'Musa (a.s.)', title: 'I Bashkëbiseduari me Zotin (Kelimullah)', people: 'Beni Israilët dhe Faraoni i Egjiptit', miracleOrBook: 'Shkopi që u bë gjarpër, dora e bardhë, ndarja e Detit të Kuq dhe Tevrati', location: 'Egjipt, Mali Tur, Gadishulli i Sinait' },
  { name: 'Harun (a.s.)', title: 'Vëllai elokuent dhe ndihmësi i Musait', people: 'Beni Israilët', miracleOrBook: 'Zgjedhja si profet dhe kryeprift me lutjen e Musait (a.s.)', location: 'Egjipt dhe Sinai' },
  { name: 'Dhul-Kifl (a.s.)', title: 'Njeriu i Besës dhe Premtimit', people: 'Populli i Shamit', miracleOrBook: 'Përmbushja e çdo premtimi dhe agjërimi i vazhdueshëm pa u thyer', location: 'Irak / Sham' },
  { name: 'Davud (a.s.)', title: 'Mbreti me zë të mrekullueshëm', people: 'Beni Israilët në Kuds', miracleOrBook: 'Zeburi, zbutja e hekurit me duar dhe madhërimi i maleve e shpendëve bashkë me të', location: 'Jerusalem (Kuds)' },
  { name: 'Sulejman (a.s.)', title: 'Mbreti Sovran i Dijes', people: 'Mbretëria e madhe e unifikuar', miracleOrBook: 'Kuptimi i gjuhës së shpendëve e kafshëve, nënshtrimi i erës dhe i xhinëve', location: 'Jerusalem (Kuds)' },
  { name: 'Iljas (a.s.)', title: 'Luftëtari i palodhur i Teuhidit', people: 'Populli i Ba’lebekut që adhuronte idhullin Ba’l', miracleOrBook: 'Ndalimi dhe lëshimi i shiut me lutjen e tij', location: 'Ba’lebek (Liban / Sham)' },
  { name: 'El-Jese’ (a.s.)', title: 'Pasuesi besnik i Iljasit', people: 'Banorët e Shamit', miracleOrBook: 'Vazhdimësia e thirrjes hyjnore me virtyt dhe udhëheqje shembullore', location: 'Sham' },
  { name: 'Junus (a.s.)', title: 'Dhun-Nun (Njeriu i Peshkut)', people: 'Populli i madh i Ninevisë (mbi 100 mijë vetë)', miracleOrBook: 'Mbijetesa në barkun e balenës dhe pranimi i Teuhidit nga tërë qyteti', location: 'Ninevi (Mosul / Irak)' },
  { name: 'Zekerijja (a.s.)', title: 'Kujdestari i Merjemes dhe Lutësi i përulur', people: 'Beni Israilët në Tempull', miracleOrBook: 'Dhënia e djalit Jahja në pleqëri të thellë kur gruaja ishte shterpe', location: 'Jerusalem (Kuds)' },
  { name: 'Jahja (a.s.)', title: 'I Pastri dhe Fisniku i Dëlirë (Hasur)', people: 'Beni Israilët', miracleOrBook: 'Dituria dhe urtësia e dhënë që në fëmijëri pa bërë asnjë mëkat', location: 'Palestinë / Damask' },
  { name: 'Isa (a.s.)', title: 'Mesihu, Fjala e Allahut (Ruhullah)', people: 'Beni Israilët', miracleOrBook: 'Lindja pa baba nga Merjemja, të folurit në djep, shërimi i të verbërve, Inxhili', location: 'Nazaret, Betlehem dhe Kuds' }
];

export const PROPHETS_STORIES_DEEP: RawQuestion[] = [
  {
    q: 'Kush ishte njeriu dhe profeti i parë i krijuar nga Allahu i Lartësuar nga balta?',
    opts: ['Profeti Adem (a.s.)', 'Profeti Nuh (a.s.)', 'Profeti Idris (a.s.)', 'Profeti Ibrahim (a.s.)'],
    h: 'Allahu urdhëroi engjëjt t’i bënin sexhde nderimi atij.',
    exp: 'Ademi (a.s.) është babai i njerëzimit dhe i dërguari i parë i Zotit në tokë.',
    diff: 'fillestar'
  },
  {
    q: 'Pse refuzoi Iblisi të përkulej me sexhde para Ademit (a.s.) kur u urdhërua nga Zoti?',
    opts: ['Nga arroganca dhe mendjemadhësia, duke pretenduar se zjarri është më fisnik se balta', 'Sepse nuk e dëgjoi urdhrin', 'Sepse kishte frikë nga Ademi', 'Sepse donte të flinte'],
    h: 'Ai tha: "Unë jam më i mirë se ai: mua më krijove nga zjarri kurse atë nga balta".',
    exp: 'Mendjemadhësia dhe zilia e Iblisit ndaj pozitës së lartë të Ademit u bë shkaku i mallkimit të tij të përjetshëm.',
    diff: 'fillestar'
  },
  {
    q: 'Sa vite e ftoi me durim heroik profeti Nuh (a.s.) popullin e tij në Teuhid para se të binte Përmbytja?',
    opts: ['950 vite', '100 vite', '500 vite', '120 vite'],
    h: 'Përmendet qartë në suren El-Ankebut: "Dhe qëndroi ndër ta njëmijë pa pesëdhjetë vjet".',
    exp: 'Nuhi (a.s.) predikoi për 950 vite ditë e natë, por shumica dërrmuese refuzuan me kryeneçësi.',
    diff: 'fillestar'
  },
  {
    q: 'Mbi cilin mal u ankorua anija e profetit Nuh (a.s.) pasi përfundoi përmbytja e madhe botërore?',
    opts: ['Mali Xhudi', 'Mali Tur', 'Mali Hira', 'Mali Uhud'],
    h: 'Sureja Hud ajeti 44: "Dhe ajo u ndal në malin Xhudi".',
    exp: 'Anija e Nuhut (a.s.) u ndal në majën e malit Xhudi kur ujërat u tërhoqën me urdhrin e Allahut.',
    diff: 'fillestar'
  },
  {
    q: 'Çfarë mrekullie ndodhi kur mbreti tiran Nemrud e hodhi profetin Ibrahim (a.s.) në zjarrin e flakëruar?',
    opts: ['Zjarri u bë i ftohtë dhe shpëtues me urdhrin e Allahut ("Bëhu i ftohtë dhe paqe për Ibrahimin")', 'Ra shi i menjëhershëm që e shoi', 'Engjëjt e fluturuan në një vend tjetër', 'Zjarri u kthye në akull'],
    h: 'Sureja El-Enbija ajeti 69: "Kulna ja naru kuni berden ve selamen ala Ibrahim".',
    exp: 'Allahu ia hoqi zjarrit vetinë përvëluese duke e shpëtuar Ibrahimin (a.s.) krejtësisht të paprekur.',
    diff: 'fillestar'
  },
  {
    q: 'Kush ishte djali i bindur që pranoi të flijohej me durim të plotë kur profeti Ibrahim pa ëndrrën urdhëruese?',
    opts: ['Profeti Ismail (a.s.)', 'Profeti Is’hak (a.s.)', 'Profeti Jakub (a.s.)', 'Profeti Jusuf (a.s.)'],
    h: 'Djali i madh i lindur nga zonja Haxhere në Mekë.',
    exp: 'Ismaili (a.s.) tha: "O babai im, bëj atë që je urdhëruar; do të më gjesh në mesin e durimtarëve".',
    diff: 'fillestar'
  },
  {
    q: 'Çfarë ndodhi kur profeti Musa (a.s.) goditi Detin e Kuq me shkopin e tij me urdhrin e Allahut?',
    opts: ['Deti u nda në dymbëdhjetë shtigje të thata, ku secila anë ngrihej si mal i madh uji', 'Deti ngriu në akull', 'U shfaq një urë e artë', 'Uji u kthye në dhe të zakonshëm'],
    h: 'Përmendet në suren Esh-Shu’ara: "Dhe u nda uji, e secila pjesë u bë si një mal i madh".',
    exp: 'Deti u nda duke mundësuar kalimin e shpëtimit për Beni Israilët dhe fundosjen e Faraonit me ushtrinë e tij.',
    diff: 'fillestar'
  },
  {
    q: 'Çfarë lutej vazhdimisht profeti Junus (a.s.) brenda tre errësirave në barkun e peshkut gjigant?',
    opts: ['"La ilahe il-la Ente, Subhaneke, inni kuntu minedh-dhalimin" (S’ka zot pos Teje, i Lartësuar je Ti, vërtet unë gabova)', 'Rabbi igfir li ve li validejje', 'Hasbunallahu ve ni’mel vekil', 'Rabbena atina fid-dunja haseneh'],
    h: 'Lutja e famshme e Dhun-Nunit që largon çdo pikëllim e ngushticë.',
    exp: 'Kjo dua e sinqertë u bë shkaku që Allahu e nxori Junusin (a.s.) shëndoshë e mirë në breg.',
    diff: 'fillestar'
  },
  {
    q: 'Cila ishte sprova legjendare e profetit Ejjub (a.s.) që u bë simbol i përjetshëm i durimit (sabrit)?',
    opts: ['Humbja e pasurisë, fëmijëve dhe prekja nga sëmundje e rëndë trupore për shumë vite pa u ankuar kurrë', 'Burgosja për 50 vite', 'Humbja e shikimit që në fëmijëri', 'Mërgimi në një shkretëtirë pa ujë'],
    h: 'Ai vetëm lutej: "O Zot, mua më goditi e keqja, e Ti je më Mëshiruesi i mëshiruesve".',
    exp: 'Ejjubi (a.s.) duroi me dinjitet të pashembullt derisa Allahu ia ktheu shëndetin, pasurinë dhe familjen dyfish.',
    diff: 'fillestar'
  },
  {
    q: 'Cili profet kishte aftësinë hyjnore të fliste me kafshët, të komandonte erën dhe të sundonte xhinët?',
    opts: ['Profeti Sulejman (a.s.)', 'Profeti Davud (a.s.)', 'Profeti Musa (a.s.)', 'Profeti Isa (a.s.)'],
    h: 'Djali i profetit Davud (a.s.) dhe mbreti më i fuqishëm e i urtë i historisë.',
    exp: 'Sulejmani (a.s.) gëzoi një mbretëri të pashembullt të dhuruar nga Zoti ku çdo element i natyrës i bindej.',
    diff: 'fillestar'
  },
  {
    q: 'Cili profet foli mrekullisht që në djep si foshnjë disaditëshe për të mbrojtur nderin e nënës së tij të virgjër Merjemes?',
    opts: ['Profeti Isa (a.s.)', 'Profeti Jahja (a.s.)', 'Profeti Ismail (a.s.)', 'Profeti Jusuf (a.s.)'],
    h: 'Ai tha: "Unë jam rob i Allahut; Ai më ka dhënë Librin dhe më ka bërë profet...".',
    exp: 'Isai (a.s.) dëshmoi me fjalë të kulluara që në foshnjëri për pafajësinë e Merjemes dhe misionin e tij hyjnor.',
    diff: 'fillestar'
  }
];
