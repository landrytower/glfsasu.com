/**
 * Seed script — imports static realizations from content.ts into Firestore.
 * Run with: node scripts/seed-realizations.mjs
 *
 * Requires: FIREBASE_API_KEY env var (or reads from firebase.ts config).
 * Uses the Firebase REST API so no admin SDK is needed.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB36BUlrkkHRekkc_EyxNzwpQeSLt4u0Rg",
  authDomain: "lipanda-60aa3.firebaseapp.com",
  projectId: "lipanda-60aa3",
  storageBucket: "lipanda-60aa3.firebasestorage.app",
  messagingSenderId: "344338158024",
  appId: "1:344338158024:web:16f7df85f882453a0270fd",
};

const realizations = [
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
    summary: "Prospection, foration, équipement solaire et adductions communautaires pour six villages du territoire de Luiza.",
    image: "/work/forage-developpement.jpg",
    metrics: [
      { label: "Forages réalisés", value: "06" },
      { label: "Profondeur moyenne", value: "84 m" },
      { label: "Débit moyen", value: "2,4 m³/h" },
      { label: "Bénéficiaires", value: "~12 400" },
      { label: "Puissance PV installée", value: "18 kWc" },
    ],
    order: 0,
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
    summary: "Captage gravitaire, château d'eau 15 m³ et réseau de distribution vers deux quartiers de Tutante.",
    image: "/work/captage-fontaine.jpg",
    metrics: [
      { label: "Capacité", value: "15 m³" },
      { label: "Linéaire réseau", value: "3,4 km" },
      { label: "Bornes fontaines", value: "07" },
    ],
    order: 1,
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
    summary: "Érection d'une tour de stockage en béton armé, desservant l'école primaire et le marché central.",
    image: "/work/chateau-eau.jpg",
    metrics: [
      { label: "Hauteur", value: "14 m" },
      { label: "Capacité", value: "20 m³" },
    ],
    order: 2,
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
    summary: "Prospection géophysique, foration de reconnaissance et équipement d'un forage à motricité humaine.",
    image: "/work/forage-debit.jpg",
    metrics: [
      { label: "Profondeur", value: "72 m" },
      { label: "Débit", value: "1,8 m³/h" },
    ],
    order: 3,
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
    summary: "Forage positif équipé d'une pompe immergée solaire, alimentant le centre de santé et le marché.",
    image: "/work/aep-distribution.jpg",
    metrics: [
      { label: "Profondeur", value: "91 m" },
      { label: "Débit", value: "3,0 m³/h" },
    ],
    order: 4,
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
    summary: "Forage de 88 m avec adduction gravitaire vers deux bornes fontaines et l'école communautaire.",
    image: "/work/aep-enfants.jpg",
    metrics: [
      { label: "Profondeur", value: "88 m" },
      { label: "Débit", value: "2,2 m³/h" },
    ],
    order: 5,
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
    summary: "Forage équipé pompe solaire, réseau de distribution de 1,2 km, 4 bornes fontaines communautaires.",
    image: "/work/aep-ecole.jpg",
    metrics: [
      { label: "Profondeur", value: "76 m" },
      { label: "Bornes fontaines", value: "04" },
    ],
    order: 6,
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
    summary: "Forage positif et château d'eau surélevé pour desservir la cité et deux écoles secondaires.",
    image: "/work/aep-test-debit.jpg",
    metrics: [
      { label: "Profondeur", value: "96 m" },
      { label: "Capacité stockage", value: "12 m³" },
    ],
    order: 7,
  },
];

async function seed() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const col = collection(db, "realizations");

  // Check existing slugs to avoid duplicates
  const existing = await getDocs(col);
  const existingSlugs = new Set(existing.docs.map((d) => d.data().slug));
  console.log(`Found ${existingSlugs.size} existing realization(s) in Firestore.`);

  let added = 0;
  let skipped = 0;

  for (const r of realizations) {
    if (existingSlugs.has(r.slug)) {
      console.log(`  SKIP  ${r.slug} (already exists)`);
      skipped++;
      continue;
    }
    await addDoc(col, r);
    console.log(`  ADD   ${r.slug}`);
    added++;
  }

  console.log(`\nDone. Added: ${added}, Skipped: ${skipped}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
