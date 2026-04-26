export type Service = {
  code: string;
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  longBlurb?: string;
  deliverables?: string[];
  image?: string;
};

export const services: Service[] = [
  {
    code: "ETU",
    slug: "etudes-architecturales",
    title: "Études & conception architecturale",
    kicker: "Conception",
    blurb:
      "Plans, APS / APD, DAO et suivi d'exécution pour écoles, hôpitaux, logements.",
    image: "/work/btp-facade-bleue.jpg",
    deliverables: [
      "Avant-projet sommaire (APS)",
      "Avant-projet détaillé (APD)",
      "Dossier d'appel d'offres (DAO)",
      "Maquettes 3D & rendu photoréaliste",
    ],
  },
  {
    code: "HYD",
    slug: "travaux-hydrauliques",
    title: "Travaux hydrauliques",
    kicker: "Eau potable",
    blurb:
      "Forages, adductions, châteaux d'eau, réseaux AEP, sources aménagées, essais de pompage.",
    image: "/work/aep-captage-source.jpg",
    longBlurb:
      "Notre cœur d'expertise. De la prospection géophysique à la mise en service d'un réseau AEP entier, nous maîtrisons l'ensemble de la chaîne hydraulique, avec une spécialité dans les forages à pompage solaire pour les zones reculées.",
    deliverables: [
      "Forages positifs 60–150 m avec essais de pompage normalisés",
      "Réseaux d'adduction d'eau potable (AEP) multi-villages",
      "Châteaux d'eau 10 – 50 m³ en béton armé",
      "Stations de traitement physico-chimique",
      "Pompes immergées solaires & systèmes hybrides",
      "Maintenance et télémétrie des ouvrages",
    ],
  },
  {
    code: "BTP",
    slug: "btp",
    title: "Bâtiment & travaux publics",
    kicker: "Construction",
    blurb:
      "Construction de bâtiments, routes, ponts, ouvrages d'art, assainissement.",
    image: "/work/btp-complexe-exterieur.jpg",
    deliverables: [
      "Gros œuvre & second œuvre",
      "Routes rurales et pistes carrossables",
      "Ouvrages d'art (ponts, dalots, digues)",
      "Main-d'œuvre qualifiée : ingénieurs, maçons, charpentiers, plombiers, électriciens",
    ],
  },
  {
    code: "SPE",
    slug: "etudes-specialisees",
    title: "Études spécialisées",
    kicker: "Sous-sol & environnement",
    blurb:
      "Géophysique, hydrogéologie, géotechnique, EIES, topographie.",
    image: "/work/forage-installation.jpg",
    deliverables: [
      "Prospection géophysique (résistivité, VES, sismique)",
      "Études hydrogéologiques & bilan de nappe",
      "Reconnaissance géotechnique",
      "Études d'impact environnemental & social (EIES)",
      "Levés topographiques GPS RTK",
    ],
  },
  {
    code: "ENR",
    slug: "energies-renouvelables",
    title: "Énergies renouvelables",
    kicker: "Solaire",
    blurb:
      "Centrales photovoltaïques, kits solaires, pompes solaires, systèmes hybrides.",
    image: "/work/aep-test-debit.jpg",
    deliverables: [
      "Centrales PV 5 kWc – 500 kWc",
      "Kits solaires domestiques & institutionnels",
      "Systèmes hybrides solaire/diesel avec stockage",
      "Ingénierie, achat, construction (EPC)",
    ],
  },
  {
    code: "ROU",
    slug: "routes-ouvrages-art",
    title: "Routes & ouvrages d'art",
    kicker: "Mobilité",
    blurb:
      "Pistes rurales, routes revêtues, ponts, dalots, ouvrages hydrauliques.",
    image: "/work/avant-ruisseau.jpg",
    longBlurb:
      "Du désenclavement des villages reculés aux voiries urbaines bitumées, notre pôle Routes & Ouvrages d'art maîtrise l'intégralité de la chaîne : topographie, terrassement, ouvrages d'assainissement et ouvrages d'art structurants. Nous concevons, construisons et réhabilitons des infrastructures routières qui résistent aux saisons tropicales et aux charges d'exploitation, dans le respect des normes en vigueur en R.D. Congo.",
    deliverables: [
      "Ouverture & réhabilitation de pistes",
      "Revêtement bitumineux",
      "Ponts métalliques & en béton armé",
      "Assainissement pluvial longitudinal",
    ],
  },
  {
    code: "AGR",
    slug: "agro-business",
    title: "Irrigation & agro-business",
    kicker: "Souveraineté alimentaire",
    blurb:
      "Cultures vivrières, élevage, pisciculture, transformation et commercialisation.",
    image: "/work/aep-enfants.jpg",
    deliverables: [
      "Systèmes d'irrigation goutte-à-goutte & aspersion",
      "Élevage : volailles, bovins, porcs, chèvres, lapins",
      "Pisciculture en bassins & étangs",
      "Chaîne de transformation & distribution",
    ],
  },
  {
    code: "IMM",
    slug: "expertise-immobiliere",
    title: "Expertise immobilière & foncière",
    kicker: "Sécurisation",
    blurb:
      "Expertise, contrôle technique, bornage, sécurisation foncière.",
    image: "/work/captage-fontaine.jpg",
    deliverables: [
      "Expertises de valeur vénale",
      "Contrôle technique de construction",
      "Bornage cadastral & mise à jour foncière",
      "Accompagnement en régularisation de titres",
    ],
  },
  {
    code: "TIC",
    slug: "informatique-videosurveillance",
    title: "Informatique, réseaux & vidéosurveillance",
    kicker: "Sécurité & infrastructure",
    blurb:
      "Installations électriques, vidéosurveillance, domotique, réseaux informatiques.",
    image: "/work/aep-distribution.jpg",
    deliverables: [
      "Câblage structuré cat. 6 / fibre",
      "CCTV IP & centre de supervision",
      "Contrôle d'accès & domotique",
      "Serveurs, Wi-Fi, téléphonie IP",
    ],
  },
  {
    code: "FOR",
    slug: "formation-professionnelle",
    title: "Formation professionnelle",
    kicker: "Capital humain",
    blurb:
      "Formations en BTP, agriculture, élevage, pisciculture, énergies, topographie.",
    image: "/work/btp-equipe-chantier.jpg",
    deliverables: [
      "Filière BTP (maçonnerie, coffrage, ferraillage)",
      "Filière agriculture & élevage",
      "Filière pisciculture",
      "Filière énergies renouvelables",
      "Filière topographie & géomatique",
    ],
  },
];

export type Realization = {
  slug: string;
  title: string;
  kicker: string;
  location: string;
  province: string;
  year: string;
  service: string;
  code: string;
  coords: string;
  summary: string;
  image: string;
  metrics?: { label: string; value: string }[];
};

export const realizations: Realization[] = [
  {
    slug: "luiza-6-forages-solaires",
    title: "6 forages d'eau potable à pompage solaire",
    kicker: "Programme communautaire",
    location: "Luiza",
    province: "Kasaï Central",
    year: "2023-2024",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2023-06",
    coords: "07°11′ S · 22°25′ E",
    summary:
      "Prospection, foration, équipement solaire et adductions communautaires pour six villages du territoire de Luiza.",
    image: "/work/chateau-eau-luiza.jpg",
    metrics: [
      { label: "Forages réalisés", value: "06" },
      { label: "Profondeur moyenne", value: "84 m" },
      { label: "Débit moyen", value: "2,4 m³/h" },
      { label: "Bénéficiaires", value: "~12 400" },
      { label: "Puissance PV installée", value: "18 kWc" },
    ],
  },
  {
    slug: "source-tutante",
    title: "Aménagement de la Source Tutante",
    kicker: "Captage & distribution",
    location: "Tutante",
    province: "Kasaï Central",
    year: "2024",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2024-11",
    coords: "06°58′ S · 22°18′ E",
    summary:
      "Captage gravitaire, château d'eau 15 m³ et réseau de distribution vers deux quartiers de Tutante.",
    image: "/work/aep-captage-source.jpg",
    metrics: [
      { label: "Capacité", value: "15 m³" },
      { label: "Linéaire réseau", value: "3,4 km" },
      { label: "Bornes fontaines", value: "07" },
    ],
  },
  {
    slug: "tour-tutante",
    title: "Tour d'eau & château communautaire, Tutante",
    kicker: "Génie civil hydraulique",
    location: "Tutante",
    province: "Kasaï Central",
    year: "2024",
    service: "Bâtiment & travaux publics",
    code: "GLF-BTP-2024-07",
    coords: "06°58′ S · 22°18′ E",
    summary:
      "Érection d'une tour de stockage en béton armé, desservant l'école primaire et le marché central.",
    image: "/work/chateau-eau-reception.jpg",
    metrics: [
      { label: "Hauteur", value: "14 m" },
      { label: "Capacité", value: "20 m³" },
    ],
  },
  {
    slug: "forage-kasonga",
    title: "Forage positif, Kasonga",
    kicker: "Forage communautaire",
    location: "Kasonga",
    province: "Kasaï Central",
    year: "2023",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2023-02",
    coords: "06°44′ S · 22°51′ E",
    summary:
      "Prospection géophysique, foration de reconnaissance et équipement d'un forage à motricité humaine.",
    image: "/work/forage-eruption.jpg",
    metrics: [
      { label: "Profondeur", value: "72 m" },
      { label: "Débit", value: "1,8 m³/h" },
    ],
  },
  {
    slug: "forage-kamayi",
    title: "Forage Kamayi",
    kicker: "Forage communautaire",
    location: "Kamayi",
    province: "Kasaï Central",
    year: "2023",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2023-03",
    coords: "06°39′ S · 22°33′ E",
    summary:
      "Forage positif équipé d'une pompe immergée solaire, alimentant le centre de santé et le marché.",
    image: "/work/forage-en-cours.jpg",
    metrics: [
      { label: "Profondeur", value: "91 m" },
      { label: "Débit", value: "3,0 m³/h" },
    ],
  },
  {
    slug: "forage-mukungu",
    title: "Forage Mukungu",
    kicker: "Forage communautaire",
    location: "Mukungu",
    province: "Kasaï Central",
    year: "2024",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2024-01",
    coords: "07°03′ S · 22°12′ E",
    summary:
      "Forage de 88 m avec adduction gravitaire vers deux bornes fontaines et l'école communautaire.",
    image: "/work/aep-village-enfants.jpg",
    metrics: [
      { label: "Profondeur", value: "88 m" },
      { label: "Débit", value: "2,2 m³/h" },
    ],
  },
  {
    slug: "forage-bambaie",
    title: "Forage Bambaie",
    kicker: "Forage communautaire",
    location: "Bambaie",
    province: "Kasaï Central",
    year: "2024",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2024-04",
    coords: "07°17′ S · 22°38′ E",
    summary:
      "Forage équipé pompe solaire, réseau de distribution de 1,2 km, 4 bornes fontaines communautaires.",
    image: "/work/aep-ecole-2.jpg",
    metrics: [
      { label: "Profondeur", value: "76 m" },
      { label: "Bornes fontaines", value: "04" },
    ],
  },
  {
    slug: "forage-kanda-kanda",
    title: "Forage Kanda Kanda",
    kicker: "Forage communautaire",
    location: "Kanda Kanda",
    province: "Kasaï Central",
    year: "2024",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2024-08",
    coords: "06°55′ S · 23°45′ E",
    summary:
      "Forage positif et château d'eau surélevé pour desservir la cité et deux écoles secondaires.",
    image: "/work/forage-en-cours-2.jpg",
    metrics: [
      { label: "Profondeur", value: "96 m" },
      { label: "Capacité stockage", value: "12 m³" },
    ],
  },
  {
    slug: "archidiocese-kinshasa",
    title: "Infrastructures de l'Archidiocèse de Kinshasa",
    kicker: "Projet institutionnel",
    location: "Kinshasa",
    province: "Kinshasa",
    year: "2024-2025",
    service: "Bâtiment & travaux publics",
    code: "GLF-BTP-2024-12",
    coords: "04°19′ S · 15°19′ E",
    summary:
      "Réalisation d'infrastructures architecturales pour l'Archidiocèse de Kinshasa : façade ornementale bleue, espaces de recueil extérieurs et aménagements liturgiques, en partenariat direct avec l'autorité diocésaine.",
    image: "/work/btp-facade-bleue.jpg",
    metrics: [
      { label: "Surface construite", value: "480 m²" },
      { label: "Durée chantier", value: "8 mois" },
      { label: "Ouvriers mobilisés", value: "34" },
    ],
  },
  {
    slug: "chateau-eau-luiza",
    title: "Château d'eau communautaire, Luiza",
    kicker: "Génie civil hydraulique",
    location: "Luiza",
    province: "Kasaï Central",
    year: "2024",
    service: "Travaux hydrauliques",
    code: "GLF-HYD-2024-09",
    coords: "07°11′ S · 22°25′ E",
    summary:
      "Construction et mise en service d'un château d'eau surélevé en acier galvanisé, desservant le centre hospitalier et plusieurs quartiers du territoire de Luiza.",
    image: "/work/chateau-eau-luiza.jpg",
    metrics: [
      { label: "Capacité", value: "25 m³" },
      { label: "Hauteur", value: "12 m" },
      { label: "Bénéficiaires", value: "~3 200" },
    ],
  },
];

export type Metric = { value: number; suffix?: string; prefix?: string; label: string; sub?: string };

export const metrics: Metric[] = [
  { value: 6, label: "Forages solaires à Luiza", sub: "Kasaï Central, 2023–2024" },
  { value: 12400, suffix: "+", label: "Bénéficiaires desservis", sub: "Eau potable permanente" },
  { value: 10, label: "Disciplines d'ingénierie", sub: "Du sol à la toiture" },
  { value: 14, label: "Années d'expérience cumulée", sub: "Équipe fondatrice" },
];

export const directions = [
  { code: "D1", title: "Direction Administrative & Finance", sub: "Administration · Juridique · Finance · DRH" },
  { code: "D2", title: "Direction Technique", sub: "Étude & conception · BTP / Génie civil · Travaux hydrauliques · Électricité & réseaux · Énergies renouvelables · Études spécialisées" },
  { code: "D3", title: "Direction Commerciale", sub: "Marketing · Prospection · Relation client" },
  { code: "D4", title: "Direction Formation Professionnelle", sub: "BTP & GC · Agri / Élevage · Pisciculture · Énergie renouvelable · Renforcement de capacité" },
  { code: "D5", title: "Direction Agro-business", sub: "Production agricole · Élevage · Pisciculture · Transformation · Commercialisation · Distribution" },
  { code: "D6", title: "Direction Logistique & Transport", sub: "Approvisionnement · Stock · Transport & moyen roulant · Logistique de chantier" },
];

export const locales = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" as const },
];

export const company = {
  name: "Groupe Lipanda FAMILY SASU",
  tagline: "Du génie intarissable",
  founder: "Ing. Jean Toussaint Mindela",
  address: {
    line1: "Nº 36 B, Avenue Africain",
    line2: "Quartier 12, Commune de Ndjili",
    city: "Kinshasa",
    country: "République Démocratique du Congo",
  },
  phone: "+243 819 385 924",
  phoneHref: "tel:+243819385924",
  whatsapp: "+243 850 060 507",
  whatsappHref: "https://wa.me/243850060507",
  email: "infoslipanda@gmail.com",
  domain: "groupelipandafamilly.com",
  coords: "04°19′ S · 15°19′ E",
  rccm: "24-B-01247",
  idNat: "01-J6100-N56232T",
  tax: "A2527588Q",
};
