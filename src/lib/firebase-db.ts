import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getClientDb, getClientStorage } from "@/lib/firebase";

/* ------------------------------------------------------------------ */
/*  Quote / Devis submissions                                         */
/* ------------------------------------------------------------------ */

export interface QuoteSubmission {
  code: string;
  service: string;
  subService: string;
  location: string;
  description: string;
  urgency: string;
  timeline: string;
  budget: string;
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  phone: string;
  fileUrl?: string;
  fileName?: string;
  status: "new" | "in-review" | "quoted" | "accepted" | "declined";
  createdAt: unknown;
}

function generateQuoteCode() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 100)).padStart(2, "0");
  return `GLF-DV-${y}-${m}${d}-${rand}`;
}

export async function submitQuote(
  data: Omit<QuoteSubmission, "code" | "status" | "createdAt" | "fileUrl" | "fileName">,
  file?: File | null,
) {
  const code = generateQuoteCode();
  let fileUrl: string | undefined;
  let fileName: string | undefined;

  if (file) {
    const storageRef = ref(getClientStorage(), `quote-attachments/${code}/${file.name}`);
    await uploadBytes(storageRef, file);
    fileUrl = await getDownloadURL(storageRef);
    fileName = file.name;
  }

  const docRef = await addDoc(collection(getClientDb(), "quotes"), {
    ...data,
    code,
    fileUrl: fileUrl ?? null,
    fileName: fileName ?? null,
    status: "new",
    createdAt: serverTimestamp(),
  });

  return { id: docRef.id, code };
}

export async function getQuotes() {
  const q = query(collection(getClientDb(), "quotes"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuoteSubmission & { id: string }));
}

export async function updateQuoteStatus(id: string, status: QuoteSubmission["status"]) {
  await updateDoc(doc(getClientDb(), "quotes", id), { status });
}

export async function updateQuoteNote(id: string, adminNote: string) {
  await updateDoc(doc(getClientDb(), "quotes", id), { adminNote });
}

/* ------------------------------------------------------------------ */
/*  Contact form submissions                                          */
/* ------------------------------------------------------------------ */

export interface ContactSubmission {
  name: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: unknown;
}

export async function submitContact(
  data: Omit<ContactSubmission, "read" | "createdAt">,
) {
  const docRef = await addDoc(collection(getClientDb(), "contacts"), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getContacts() {
  const q = query(collection(getClientDb(), "contacts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactSubmission & { id: string }));
}

export async function markContactRead(id: string) {
  await updateDoc(doc(getClientDb(), "contacts", id), { read: true });
}

/* ------------------------------------------------------------------ */
/*  Realizations (admin CRUD)                                         */
/* ------------------------------------------------------------------ */

export interface RealizationDoc {
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
  metrics: { label: string; value: string }[];
  order: number;
}

export async function getRealizations() {
  const q = query(collection(getClientDb(), "realizations"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as RealizationDoc & { id: string }));
}

export async function upsertRealization(id: string | null, data: RealizationDoc) {
  if (id) {
    await updateDoc(doc(getClientDb(), "realizations", id), data as DocumentData);
    return id;
  }
  const docRef = await addDoc(collection(getClientDb(), "realizations"), data);
  return docRef.id;
}

export async function deleteRealization(id: string) {
  await deleteDoc(doc(getClientDb(), "realizations", id));
}

/* ------------------------------------------------------------------ */
/*  Site settings (editable content overrides)                        */
/* ------------------------------------------------------------------ */

export async function getSetting(key: string) {
  const snap = await getDoc(doc(getClientDb(), "settings", key));
  return snap.exists() ? snap.data() : null;
}

export async function setSetting(key: string, data: Record<string, unknown>) {
  const { setDoc } = await import("firebase/firestore");
  await setDoc(doc(getClientDb(), "settings", key), { ...data, updatedAt: serverTimestamp() });
}

/* ------------------------------------------------------------------ */
/*  Services / disciplines (admin CRUD)                               */
/* ------------------------------------------------------------------ */

export interface ServiceDoc {
  code: string;
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  longBlurb?: string;
  deliverables?: string[];
  image?: string;
  order: number;
}

export async function getServices(): Promise<(ServiceDoc & { id: string })[]> {
  const q = query(collection(getClientDb(), "services"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceDoc & { id: string }));
}

export async function upsertService(id: string | null, data: ServiceDoc) {
  if (id) {
    await updateDoc(doc(getClientDb(), "services", id), data as DocumentData);
    return id;
  }
  const docRef = await addDoc(collection(getClientDb(), "services"), data);
  return docRef.id;
}

export async function deleteService(id: string) {
  await deleteDoc(doc(getClientDb(), "services", id));
}

/* ------------------------------------------------------------------ */
/*  Image upload (admin)                                              */
/* ------------------------------------------------------------------ */

export async function uploadImage(file: File, path: string) {
  const storageRef = ref(getClientStorage(), `public/${path}/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteImage(url: string) {
  const storageRef = ref(getClientStorage(), url);
  await deleteObject(storageRef);
}
