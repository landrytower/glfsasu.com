"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  Users,
  Save,
  Loader2,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  ImagePlus,
  Lock,
  LockOpen,
  Layers,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import {
  getSetting,
  setSetting,
  uploadImage,
  getServices,
  upsertService,
  deleteService,
  type ServiceDoc,
} from "@/lib/firebase-db";
import {
  company as defaultCompany,
  metrics as defaultMetrics,
  services as defaultServices,
  type Metric,
} from "@/lib/content";
import { cn } from "@/lib/cn";
import { numberToFrench } from "@/lib/number-to-french";
import type { Locale } from "@/lib/translations";
import {
  ABOUT_TRANSLATABLE_LOCALES,
  defaultAboutSettings,
  normalizeAboutSettings,
  type AboutDesignSettings,
  type AboutLocalizedContent,
  type AboutPageSettings,
} from "@/lib/about-content";

/* --------------------------------------------------------------- */
/*  Types                                                           */
/* --------------------------------------------------------------- */

interface CompanyData {
  name: string;
  tagline: string;
  founder: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  domain: string;
  rccm: string;
  idNat: string;
  tax: string;
}

/* --------------------------------------------------------------- */
/*  Helpers                                                         */
/* --------------------------------------------------------------- */

function companyToFlat(c: typeof defaultCompany): CompanyData {
  return {
    name: c.name,
    tagline: c.tagline,
    founder: c.founder,
    addressLine1: c.address.line1,
    addressLine2: c.address.line2,
    city: c.address.city,
    country: c.address.country,
    phone: c.phone,
    whatsapp: c.whatsapp,
    email: c.email,
    domain: c.domain,
    rccm: c.rccm,
    idNat: c.idNat,
    tax: c.tax,
  };
}

/* --------------------------------------------------------------- */
/*  Section wrapper                                                 */
/* --------------------------------------------------------------- */

function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  headerAction,
  locked,
  onToggleLock,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerAction?: React.ReactNode;
  locked?: boolean;
  onToggleLock?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const lockButton = onToggleLock ? (
    <button
      type="button"
      onClick={onToggleLock}
      aria-label={locked ? "Déverrouiller la section" : "Verrouiller la section"}
      title={locked ? "Cliquer pour déverrouiller" : "Cliquer pour verrouiller"}
      className={cn(
        "inline-flex items-center gap-2 rounded border px-3 py-1.5 text-xs font-mono transition-colors",
        locked
          ? "border-ink/15 bg-paper-100 text-ink-muted hover:bg-paper-200"
          : "border-bordeaux-700 bg-bordeaux-700 text-paper-50 hover:bg-bordeaux-800"
      )}
    >
      {locked ? (
        <Lock className="size-3.5" strokeWidth={1.75} />
      ) : (
        <LockOpen className="size-3.5" strokeWidth={1.75} />
      )}
      {locked ? "Déverrouiller" : "Verrouiller"}
    </button>
  ) : null;

  return (
    <div className="bg-paper-50 rounded-lg border border-ink/10 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="min-w-0 flex-1 flex items-center gap-3 text-left hover:bg-paper-100 transition-colors -my-4 -mx-2 px-2 py-4 rounded"
        >
          <Icon className="size-5 text-bordeaux-600" strokeWidth={1.5} />
          <span className="font-semibold text-ink flex-1 min-w-0">{title}</span>
          {open ? (
            <ChevronDown className="size-4 text-ink-muted" />
          ) : (
            <ChevronRight className="size-4 text-ink-muted" />
          )}
        </button>
        {lockButton && <div className="shrink-0">{lockButton}</div>}
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>
      {open && (
        <div className="px-5 pb-5 space-y-4">
          {onToggleLock !== undefined ? (
            <div className={cn("rounded-lg transition-opacity", locked && "opacity-45")}>
              <div className="rounded border border-ink/10 bg-paper-100/70 px-4 py-3 text-xs font-mono text-ink-muted mb-4">
                {locked
                  ? "Section verrouillée. Cliquez sur le cadenas pour autoriser les modifications."
                  : "Section déverrouillée. Vous pouvez modifier le contenu puis enregistrer."}
              </div>
              <fieldset disabled={locked} className="space-y-4 min-w-0">
                {children}
              </fieldset>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Input helpers                                                   */
/* --------------------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  type = "text",
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-ink-muted mb-1">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full rounded border border-ink/15 bg-paper-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-ink/15 bg-paper-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Image upload field                                              */
/* --------------------------------------------------------------- */

function ImageField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-mono text-ink-muted mb-1">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <img
            src={value}
            alt=""
            className="size-16 rounded object-cover border border-ink/10"
          />
        )}
        <label
          className={cn(
            "inline-flex items-center gap-2 px-3 py-2 rounded border border-ink/15 bg-paper-100 text-sm cursor-pointer hover:bg-paper-200 transition-colors",
            uploading && "opacity-50 pointer-events-none"
          )}
        >
          {uploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ImagePlus className="size-4" />
          )}
          {uploading ? "Envoi..." : "Choisir une image"}
          <input type="file" accept="image/*" onChange={handleFile} className="sr-only" />
        </label>
      </div>
      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded border border-ink/15 bg-paper-100 px-3 py-1.5 text-xs text-ink-muted focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
          placeholder="URL de l'image"
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Page component                                                  */
/* --------------------------------------------------------------- */

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  // Company
  const [companyData, setCompanyData] = useState<CompanyData>(companyToFlat(defaultCompany));

  // Hero
  const [heroHeadline, setHeroHeadline] = useState("Du génie intarissable");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Ingénierie multidisciplinaire au service des infrastructures durables d'Afrique centrale."
  );
  const [heroImage, setHeroImage] = useState("/hero-bg.jpg");

  // Metrics
  const [metricsData, setMetricsData] = useState<Metric[]>([...defaultMetrics]);

  // About page
  const [aboutData, setAboutData] = useState<AboutPageSettings>(defaultAboutSettings);

  // Services / disciplines
  const [servicesData, setServicesData] = useState<(ServiceDoc & { id: string })[]>(
    defaultServices.map((s, i) => ({
      id: "",
      code: s.code,
      slug: s.slug,
      title: s.title,
      kicker: s.kicker,
      blurb: s.blurb,
      longBlurb: s.longBlurb ?? "",
      deliverables: s.deliverables ?? [],
      image: s.image ?? "",
      order: i,
    }))
  );
  const [servicesHeadline, setServicesHeadline] = useState("Dix disciplines.");
  const [servicesHeadlineEm, setServicesHeadlineEm] = useState("Une");
  const [servicesHeadlineSuffix, setServicesHeadlineSuffix] = useState(
    "ingénierie au service du continent."
  );
  const [servicesSub, setServicesSub] = useState(
    "Des études géophysiques aux centrales solaires, nos équipes couvrent l'ensemble du cycle d'un projet : conception, réalisation, exploitation, formation."
  );
  const [editingService, setEditingService] = useState<number | null>(null);
  const [serviceDeleting, setServiceDeleting] = useState<number | null>(null);

  // Lock states – all sections locked by default
  const [heroLocked, setHeroLocked] = useState(true);
  const [companyLocked, setCompanyLocked] = useState(true);
  const [aboutLocked, setAboutLocked] = useState(true);
  const [imagesLocked, setImagesLocked] = useState(true);
  const [metricsLocked, setMetricsLocked] = useState(true);
  const [servicesLocked, setServicesLocked] = useState(true);

  // Founder image
  const [founderImage, setFounderImage] = useState("/founder.jpg");

  /* --------------------------------------------------------------- */
  /*  Load from Firestore                                            */
  /* --------------------------------------------------------------- */

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const [companySnap, heroSnap, metricsSnap, imagesSnap, aboutSnap, servicesPillarsSnap] =
        await Promise.all([
          getSetting("company"),
          getSetting("hero"),
          getSetting("metrics"),
          getSetting("images"),
          getSetting("aboutPage"),
          getSetting("servicesPillars"),
        ]);

      // Load services separately so a missing index doesn't break everything
      let servicesDocs: (ServiceDoc & { id: string })[] = [];
      try {
        servicesDocs = await getServices();
      } catch (e) {
        console.warn("Could not load services from Firestore:", e);
      }

      if (companySnap) {
        setCompanyData((prev) => ({ ...prev, ...companySnap } as CompanyData));
      }
      if (heroSnap) {
        if (heroSnap.headline) setHeroHeadline(heroSnap.headline as string);
        if (heroSnap.subtitle) setHeroSubtitle(heroSnap.subtitle as string);
        if (heroSnap.image) setHeroImage(heroSnap.image as string);
      }
      if (metricsSnap?.items) {
        setMetricsData(metricsSnap.items as Metric[]);
      }
      if (imagesSnap) {
        if (imagesSnap.founder) setFounderImage(imagesSnap.founder as string);
      }
      if (aboutSnap) {
        setAboutData(normalizeAboutSettings(aboutSnap));
      }
      if (servicesPillarsSnap) {
        if (servicesPillarsSnap.headline) setServicesHeadline(servicesPillarsSnap.headline as string);
        if (servicesPillarsSnap.headlineEm) setServicesHeadlineEm(servicesPillarsSnap.headlineEm as string);
        if (servicesPillarsSnap.headlineSuffix) setServicesHeadlineSuffix(servicesPillarsSnap.headlineSuffix as string);
        if (servicesPillarsSnap.sub) setServicesSub(servicesPillarsSnap.sub as string);
      }
      if (servicesDocs.length > 0) {
        setServicesData(servicesDocs);
      } else {
        // Seed from static defaults
        setServicesData(
          defaultServices.map((s, i) => ({
            id: "",
            code: s.code,
            slug: s.slug,
            title: s.title,
            kicker: s.kicker,
            blurb: s.blurb,
            longBlurb: s.longBlurb ?? "",
            deliverables: s.deliverables ?? [],
            image: s.image ?? "",
            order: i,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  /* --------------------------------------------------------------- */
  /*  Save helpers                                                   */
  /* --------------------------------------------------------------- */

  async function saveSection(key: string, data: Record<string, unknown>) {
    setSaving(key);
    setSaved(null);
    try {
      await setSetting(key, data);
      setSaved(key);
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      console.error(`Failed to save ${key}:`, err);
      alert(`Erreur lors de la sauvegarde: ${(err as Error).message}`);
    } finally {
      setSaving(null);
    }
  }

  async function saveAboutSettings() {
    setSaving("about");
    setSaved(null);

    try {
      let localizedContent = aboutData.content;

      try {
        const response = await fetch("/api/translate-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceLocale: "fr",
            targetLocales: ABOUT_TRANSLATABLE_LOCALES,
            content: aboutData.content.fr,
          }),
        });

        if (response.ok) {
          const payload = (await response.json()) as {
            translations?: Partial<Record<Locale, AboutLocalizedContent>>;
          };

          localizedContent = {
            ...localizedContent,
            ...payload.translations,
            fr: aboutData.content.fr,
          };
        } else {
          console.error("Translation request failed:", await response.text());
        }
      } catch (translationError) {
        console.error("Automatic translation failed:", translationError);
      }

      const nextValue: AboutPageSettings = {
        content: localizedContent,
        design: aboutData.design,
      };

      await setSetting("aboutPage", nextValue as unknown as Record<string, unknown>);
      setAboutData(normalizeAboutSettings(nextValue));
      setSaved("about");
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      console.error("Failed to save about page:", err);
      alert(`Erreur lors de la sauvegarde: ${(err as Error).message}`);
    } finally {
      setSaving(null);
    }
  }

  async function saveServicesSection() {
    setSaving("services");
    setSaved(null);
    try {
      // Save section text (headline is auto-computed from count, not stored)
      await setSetting("servicesPillars", {
        headlineEm: servicesHeadlineEm,
        headlineSuffix: servicesHeadlineSuffix,
        sub: servicesSub,
      });
      // Upsert each service
      for (const svc of servicesData) {
        const { id, ...data } = svc;
        const newId = await upsertService(id || null, data as ServiceDoc);
        if (!id) svc.id = newId;
      }
      setSaved("services");
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      console.error("Failed to save services:", err);
      alert(`Erreur: ${(err as Error).message}`);
    } finally {
      setSaving(null);
    }
  }

  function SaveButton({
    sectionKey,
    label = "Enregistrer",
  }: {
    sectionKey: string;
    label?: string;
  }) {
    return (
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            if (sectionKey === "company") {
              saveSection("company", companyData as unknown as Record<string, unknown>);
            } else if (sectionKey === "hero") {
              saveSection("hero", { headline: heroHeadline, subtitle: heroSubtitle, image: heroImage });
            } else if (sectionKey === "metrics") {
              saveSection("metrics", { items: metricsData });
            } else if (sectionKey === "images") {
              saveSection("images", { founder: founderImage });
            } else if (sectionKey === "about") {
              void saveAboutSettings();
            } else if (sectionKey === "services") {
              void saveServicesSection();
            }
          }}
          disabled={saving === sectionKey}
          className={cn(
            "inline-flex items-center gap-2 rounded border border-navy-950 bg-navy-950 px-4 py-2 text-sm font-medium text-paper-50 shadow-sm",
            "hover:bg-bordeaux-700 hover:border-bordeaux-700 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {saving === sectionKey ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {label}
        </button>
        {saved === sectionKey && (
          <span className="text-sm text-green-600 font-mono">Sauvegardé</span>
        )}
      </div>
    );
  }

  /* --------------------------------------------------------------- */
  /*  Metric editor helpers                                          */
  /* --------------------------------------------------------------- */

  function updateMetric(index: number, field: keyof Metric, value: string | number) {
    setMetricsData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  /* --------------------------------------------------------------- */
  /*  About editor helpers                                           */
  /* --------------------------------------------------------------- */

  function updateAboutSection(
    section: keyof AboutLocalizedContent,
    field: string,
    value: string,
  ) {
    setAboutData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        fr: {
          ...prev.content.fr,
          [section]: {
            ...prev.content.fr[section],
            [field]: value,
          },
        },
      },
    }));
  }

  function updateMissionItem(index: number, field: "code" | "text", value: string) {
    setAboutData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        fr: {
          ...prev.content.fr,
          mission: {
            ...prev.content.fr.mission,
            items: prev.content.fr.mission.items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          },
        },
      },
    }));
  }

  function updateValueItem(
    index: number,
    field: "code" | "title" | "body",
    value: string,
  ) {
    setAboutData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        fr: {
          ...prev.content.fr,
          values: {
            ...prev.content.fr.values,
            items: prev.content.fr.values.items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          },
        },
      },
    }));
  }

  function updateAboutDesign(field: keyof AboutDesignSettings, value: string) {
    setAboutData((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        [field]: value,
      },
    }));
  }

  /* --------------------------------------------------------------- */
  /*  Service editor helpers                                         */
  /* --------------------------------------------------------------- */

  function slugify(text: string) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function updateServiceField(
    index: number,
    field: string,
    value: string | string[],
  ) {
    setServicesData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      // Auto-generate slug from title
      if (field === "title" && typeof value === "string") {
        next[index] = { ...next[index], slug: slugify(value) };
      }
      return next;
    });
  }

  function addService() {
    setServicesData((prev) => [
      ...prev,
      {
        id: "",
        code: "",
        slug: "",
        title: "",
        kicker: "",
        blurb: "",
        longBlurb: "",
        deliverables: [],
        image: "",
        order: prev.length,
      },
    ]);
    setEditingService(servicesData.length);
  }

  async function removeService(index: number) {
    const svc = servicesData[index];
    if (!confirm(`Supprimer « ${svc.title || "sans titre"} » ?`)) return;
    setServiceDeleting(index);
    try {
      if (svc.id) await deleteService(svc.id);
      setServicesData((prev) => prev.filter((_, i) => i !== index));
      if (editingService === index) setEditingService(null);
    } catch (err) {
      alert(`Erreur: ${(err as Error).message}`);
    } finally {
      setServiceDeleting(null);
    }
  }

  function moveService(index: number, direction: -1 | 1) {
    setServicesData((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  }

  /* --------------------------------------------------------------- */
  /*  Render                                                         */
  /* --------------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-ink-muted" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Contenu du site</h1>
          <p className="text-sm text-ink-muted mt-1">
            Modifiez les textes, images et informations affichés sur le site public.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSettings}
          className="inline-flex items-center gap-2 rounded border border-ink/15 bg-paper-50 px-3 py-2 text-xs font-mono text-ink-muted hover:text-ink hover:bg-paper-100 transition-colors"
        >
          <RotateCcw className="size-3.5" />
          Recharger
        </button>
      </div>

      {/* ---- Hero Section ---- */}
      <Section title="Section Hero (page d'accueil)" icon={BarChart3} defaultOpen locked={heroLocked} onToggleLock={() => setHeroLocked((l) => !l)}>
        <Field label="Titre principal" value={heroHeadline} onChange={setHeroHeadline} />
        <Field
          label="Sous-titre"
          value={heroSubtitle}
          onChange={setHeroSubtitle}
          rows={3}
        />
        <ImageField
          label="Image d'arrière-plan"
          value={heroImage}
          onChange={setHeroImage}
          folder="hero"
        />
        <SaveButton sectionKey="hero" />
      </Section>

      {/* ---- Company Info ---- */}
      <Section title="Informations de l'entreprise" icon={Building2} locked={companyLocked} onToggleLock={() => setCompanyLocked((l) => !l)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Nom de l'entreprise"
            value={companyData.name}
            onChange={(v) => setCompanyData({ ...companyData, name: v })}
          />
          <Field
            label="Slogan"
            value={companyData.tagline}
            onChange={(v) => setCompanyData({ ...companyData, tagline: v })}
          />
          <Field
            label="Fondateur"
            value={companyData.founder}
            onChange={(v) => setCompanyData({ ...companyData, founder: v })}
          />
          <Field
            label="RCCM"
            value={companyData.rccm}
            onChange={(v) => setCompanyData({ ...companyData, rccm: v })}
          />
          <Field
            label="Id. Nationale"
            value={companyData.idNat}
            onChange={(v) => setCompanyData({ ...companyData, idNat: v })}
          />
          <Field
            label="N° Impôt"
            value={companyData.tax}
            onChange={(v) => setCompanyData({ ...companyData, tax: v })}
          />
        </div>
        <hr className="border-ink/10" />
        <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider flex items-center gap-2">
          <MapPin className="size-3.5" /> Adresse
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Ligne 1"
            value={companyData.addressLine1}
            onChange={(v) => setCompanyData({ ...companyData, addressLine1: v })}
          />
          <Field
            label="Ligne 2"
            value={companyData.addressLine2}
            onChange={(v) => setCompanyData({ ...companyData, addressLine2: v })}
          />
          <Field
            label="Ville"
            value={companyData.city}
            onChange={(v) => setCompanyData({ ...companyData, city: v })}
          />
          <Field
            label="Pays"
            value={companyData.country}
            onChange={(v) => setCompanyData({ ...companyData, country: v })}
          />
        </div>
        <hr className="border-ink/10" />
        <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider flex items-center gap-2">
          <Phone className="size-3.5" /> Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Téléphone"
            value={companyData.phone}
            onChange={(v) => setCompanyData({ ...companyData, phone: v })}
            type="tel"
          />
          <Field
            label="WhatsApp"
            value={companyData.whatsapp}
            onChange={(v) => setCompanyData({ ...companyData, whatsapp: v })}
            type="tel"
          />
          <Field
            label="Email"
            value={companyData.email}
            onChange={(v) => setCompanyData({ ...companyData, email: v })}
            type="email"
          />
          <Field
            label="Domaine"
            value={companyData.domain}
            onChange={(v) => setCompanyData({ ...companyData, domain: v })}
          />
        </div>
        <SaveButton sectionKey="company" />
      </Section>

      {/* ---- About page ---- */}
      <Section
        title="À propos (page publique)"
        icon={Users}
        locked={aboutLocked}
        onToggleLock={() => setAboutLocked((l) => !l)}
      >
        <div className="rounded border border-bordeaux-200 bg-bordeaux-50/60 px-4 py-3 text-sm text-ink-muted">
          Les champs ci-dessous servent de source en français. Lors de l'enregistrement, les versions anglaise, espagnole, allemande et arabe sont régénérées automatiquement pour le bouton de langue.
        </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">En-tête</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Numéro"
                  value={aboutData.content.fr.header.number}
                  onChange={(v) => updateAboutSection("header", "number", v)}
                />
                <Field
                  label="Kicker"
                  value={aboutData.content.fr.header.kicker}
                  onChange={(v) => updateAboutSection("header", "kicker", v)}
                />
                <Field
                  label="Titre"
                  value={aboutData.content.fr.header.title}
                  onChange={(v) => updateAboutSection("header", "title", v)}
                />
                <Field
                  label="Titre en emphase"
                  value={aboutData.content.fr.header.titleEmphasis}
                  onChange={(v) => updateAboutSection("header", "titleEmphasis", v)}
                />
              </div>
              <Field
                label="Introduction"
                value={aboutData.content.fr.header.intro}
                onChange={(v) => updateAboutSection("header", "intro", v)}
                rows={4}
              />
            </div>

            <hr className="border-ink/10" />

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">Vision</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Numéro vision"
                  value={aboutData.content.fr.vision.number}
                  onChange={(v) => updateAboutSection("vision", "number", v)}
                />
                <Field
                  label="Libellé vision"
                  value={aboutData.content.fr.vision.label}
                  onChange={(v) => updateAboutSection("vision", "label", v)}
                />
              </div>
              <Field
                label="Texte vision"
                value={aboutData.content.fr.vision.body}
                onChange={(v) => updateAboutSection("vision", "body", v)}
                rows={3}
              />
            </div>

            <hr className="border-ink/10" />

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">Mission</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Numéro mission"
                  value={aboutData.content.fr.mission.number}
                  onChange={(v) => updateAboutSection("mission", "number", v)}
                />
                <Field
                  label="Libellé mission"
                  value={aboutData.content.fr.mission.label}
                  onChange={(v) => updateAboutSection("mission", "label", v)}
                />
              </div>
              <div className="space-y-3">
                {aboutData.content.fr.mission.items.map((item, index) => (
                  <div
                    key={item.code}
                    className="grid grid-cols-[5rem_1fr] gap-3 rounded border border-ink/10 bg-paper-100 p-3"
                  >
                    <Field
                      label="Code"
                      value={item.code}
                      onChange={(v) => updateMissionItem(index, "code", v)}
                    />
                    <Field
                      label="Texte"
                      value={item.text}
                      onChange={(v) => updateMissionItem(index, "text", v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-ink/10" />

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">Valeurs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Numéro valeurs"
                  value={aboutData.content.fr.values.number}
                  onChange={(v) => updateAboutSection("values", "number", v)}
                />
                <Field
                  label="Libellé valeurs"
                  value={aboutData.content.fr.values.label}
                  onChange={(v) => updateAboutSection("values", "label", v)}
                />
              </div>
              <Field
                label="Titre bloc valeurs"
                value={aboutData.content.fr.values.headline}
                onChange={(v) => updateAboutSection("values", "headline", v)}
              />
              <div className="space-y-3">
                {aboutData.content.fr.values.items.map((item, index) => (
                  <div
                    key={item.code}
                    className="rounded border border-ink/10 bg-paper-100 p-3 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[5rem_1fr] gap-3">
                      <Field
                        label="Code"
                        value={item.code}
                        onChange={(v) => updateValueItem(index, "code", v)}
                      />
                      <Field
                        label="Titre"
                        value={item.title}
                        onChange={(v) => updateValueItem(index, "title", v)}
                      />
                    </div>
                    <Field
                      label="Texte"
                      value={item.body}
                      onChange={(v) => updateValueItem(index, "body", v)}
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-ink/10" />

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">Style et tailles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Taille titre en-tête"
                  value={aboutData.design.headerTitleSize}
                  onChange={(v) => updateAboutDesign("headerTitleSize", v)}
                  placeholder="ex: clamp(2.5rem, 7vw, 6.5rem)"
                />
                <Field
                  label="Taille intro"
                  value={aboutData.design.headerIntroSize}
                  onChange={(v) => updateAboutDesign("headerIntroSize", v)}
                  placeholder="ex: 1.125rem"
                />
                <Field
                  label="Taille titre vision"
                  value={aboutData.design.visionTitleSize}
                  onChange={(v) => updateAboutDesign("visionTitleSize", v)}
                />
                <Field
                  label="Taille items mission"
                  value={aboutData.design.missionItemSize}
                  onChange={(v) => updateAboutDesign("missionItemSize", v)}
                />
                <Field
                  label="Taille titre valeurs"
                  value={aboutData.design.valuesHeadlineSize}
                  onChange={(v) => updateAboutDesign("valuesHeadlineSize", v)}
                />
                <Field
                  label="Taille titre carte valeur"
                  value={aboutData.design.valueCardTitleSize}
                  onChange={(v) => updateAboutDesign("valueCardTitleSize", v)}
                />
                <Field
                  label="Taille texte carte valeur"
                  value={aboutData.design.valueCardBodySize}
                  onChange={(v) => updateAboutDesign("valueCardBodySize", v)}
                />
              </div>
            </div>

        <SaveButton sectionKey="about" label="Enregistrer et traduire" />
      </Section>

      {/* ---- Images ---- */}
      <Section title="Images du site" icon={ImagePlus} locked={imagesLocked} onToggleLock={() => setImagesLocked((l) => !l)}>
        <ImageField
          label="Photo du fondateur"
          value={founderImage}
          onChange={setFounderImage}
          folder="founder"
        />
        <SaveButton sectionKey="images" />
      </Section>

      {/* ---- Metrics ---- */}
      <Section title="Chiffres clés (page d'accueil)" icon={BarChart3} locked={metricsLocked} onToggleLock={() => setMetricsLocked((l) => !l)}>
        <div className="space-y-4">
          {metricsData.map((m, i) => (
            <div
              key={i}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded border border-ink/10 bg-paper-100"
            >
              <div>
                <label htmlFor={`metric-${i}-value`} className="block text-[10px] font-mono text-ink-muted mb-1">
                  Valeur
                </label>
                <input
                  id={`metric-${i}-value`}
                  type="number"
                  value={m.value}
                  onChange={(e) => updateMetric(i, "value", Number(e.target.value))}
                  className="w-full rounded border border-ink/15 bg-paper-50 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
                />
              </div>
              <div>
                <label htmlFor={`metric-${i}-suffix`} className="block text-[10px] font-mono text-ink-muted mb-1">
                  Suffixe
                </label>
                <input
                  id={`metric-${i}-suffix`}
                  type="text"
                  value={m.suffix ?? ""}
                  onChange={(e) => updateMetric(i, "suffix", e.target.value)}
                  placeholder="ex: +"
                  className="w-full rounded border border-ink/15 bg-paper-50 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor={`metric-${i}-label`} className="block text-[10px] font-mono text-ink-muted mb-1">
                  Libellé
                </label>
                <input
                  id={`metric-${i}-label`}
                  type="text"
                  value={m.label}
                  onChange={(e) => updateMetric(i, "label", e.target.value)}
                  className="w-full rounded border border-ink/15 bg-paper-50 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
                />
              </div>
              <div className="col-span-2 sm:col-span-4">
                <label htmlFor={`metric-${i}-sub`} className="block text-[10px] font-mono text-ink-muted mb-1">
                  Sous-texte
                </label>
                <input
                  id={`metric-${i}-sub`}
                  type="text"
                  value={m.sub ?? ""}
                  onChange={(e) => updateMetric(i, "sub", e.target.value)}
                  className="w-full rounded border border-ink/15 bg-paper-50 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
                />
              </div>
            </div>
          ))}
        </div>
        <SaveButton sectionKey="metrics" />
      </Section>

      {/* ---- Services & disciplines ---- */}
      <Section
        title="Services & disciplines (page d'accueil)"
        icon={Layers}
        locked={servicesLocked}
        onToggleLock={() => setServicesLocked((l) => !l)}
      >
        {/* Section text */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">
            Texte de la section
          </h3>
          <p className="text-xs text-ink-muted">
            Nombre de disciplines calculé automatiquement :{" "}
            <strong className="text-ink">{servicesData.length}</strong>
          </p>
          <div className="rounded bg-paper-50 border border-ink/10 px-3 py-2">
            <span className="text-[10px] font-mono text-ink-muted block mb-0.5">Titre auto-calculé (aperçu)</span>
            <span className="text-sm text-ink font-display">
              {numberToFrench(servicesData.length)} disciplines.{" "}
              <em className="italic text-bordeaux-700">{servicesHeadlineEm}</em>{" "}
              {servicesHeadlineSuffix}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="En emphase (ex: Une)"
              value={servicesHeadlineEm}
              onChange={setServicesHeadlineEm}
            />
          </div>
          <Field
            label="Suite du titre (ex: ingénierie au service du continent.)"
            value={servicesHeadlineSuffix}
            onChange={setServicesHeadlineSuffix}
          />
          <Field
            label="Sous-titre"
            value={servicesSub}
            onChange={setServicesSub}
            rows={3}
          />
        </div>

        <hr className="border-ink/10" />

        {/* Service list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">
              Disciplines ({servicesData.length})
            </h3>
            <button
              type="button"
              onClick={addService}
              className="inline-flex items-center gap-1.5 rounded border border-ink/15 bg-paper-50 px-3 py-1.5 text-xs font-mono text-ink-muted hover:text-ink hover:bg-paper-100 transition-colors"
            >
              <Plus className="size-3.5" />
              Ajouter
            </button>
          </div>

          {servicesData.map((svc, i) => (
            <div
              key={svc.id || `new-${i}`}
              className="rounded border border-ink/10 bg-paper-100 overflow-hidden"
            >
              {/* Collapsed header */}
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveService(i, -1)}
                    disabled={i === 0}
                    className="text-ink-muted hover:text-ink disabled:opacity-25"
                    title="Monter"
                  >
                    <GripVertical className="size-3 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveService(i, 1)}
                    disabled={i === servicesData.length - 1}
                    className="text-ink-muted hover:text-ink disabled:opacity-25"
                    title="Descendre"
                  >
                    <GripVertical className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-ink-muted w-8">
                  {svc.code || "—"}
                </span>
                <span className="flex-1 text-sm text-ink truncate">
                  {svc.title || "(sans titre)"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setEditingService(editingService === i ? null : i)
                  }
                  className="text-xs font-mono text-bordeaux-600 hover:text-bordeaux-800"
                >
                  {editingService === i ? "Fermer" : "Modifier"}
                </button>
                <button
                  type="button"
                  onClick={() => void removeService(i)}
                  disabled={serviceDeleting === i}
                  className="text-ink-muted hover:text-red-600 disabled:opacity-50"
                  title="Supprimer"
                >
                  {serviceDeleting === i ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="size-3.5" />
                  )}
                </button>
              </div>

              {/* Expanded editor */}
              {editingService === i && (
                <div className="border-t border-ink/10 p-3 space-y-3">
                  <Field
                    label="Titre complet"
                    value={svc.title}
                    onChange={(v) => updateServiceField(i, "title", v)}
                  />
                  <div className="rounded bg-paper-50 border border-ink/10 px-3 py-2">
                    <span className="text-[10px] font-mono text-ink-muted block mb-0.5">Slug URL (auto-généré)</span>
                    <span className="text-sm text-ink font-mono">/services/{svc.slug || "…"}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                      label="Code (ex: HYD)"
                      value={svc.code}
                      onChange={(v) => updateServiceField(i, "code", v)}
                    />
                    <Field
                      label="Kicker (mot-clé court)"
                      value={svc.kicker}
                      onChange={(v) => updateServiceField(i, "kicker", v)}
                    />
                  </div>
                  <Field
                    label="Description courte (affichée dans la grille d'accueil)"
                    value={svc.blurb}
                    onChange={(v) => updateServiceField(i, "blurb", v)}
                    rows={2}
                  />
                  <Field
                    label="Description longue (affichée sur la page du pôle)"
                    value={svc.longBlurb ?? ""}
                    onChange={(v) => updateServiceField(i, "longBlurb", v)}
                    rows={4}
                  />
                  <div>
                    <span className="block text-xs font-mono text-ink-muted mb-2">
                      Livrables typiques
                    </span>
                    <div className="space-y-2">
                      {(svc.deliverables ?? []).map((d, di) => (
                        <div key={di} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={d}
                            aria-label={`Livrable ${di + 1}`}
                            onChange={(e) => {
                              const next = [...(svc.deliverables ?? [])];
                              next[di] = e.target.value;
                              updateServiceField(i, "deliverables", next);
                            }}
                            className="flex-1 rounded border border-ink/15 bg-paper-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordeaux-400/40"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = (svc.deliverables ?? []).filter((_, xi) => xi !== di);
                              updateServiceField(i, "deliverables", next);
                            }}
                            className="text-ink-muted hover:text-red-600 shrink-0"
                            title="Retirer"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...(svc.deliverables ?? []), ""];
                          updateServiceField(i, "deliverables", next);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-bordeaux-600 hover:text-bordeaux-800"
                      >
                        <Plus className="size-3.5" />
                        Ajouter un livrable
                      </button>
                    </div>
                  </div>
                  <ImageField
                    label="Image"
                    value={svc.image ?? ""}
                    onChange={(v) => updateServiceField(i, "image", v)}
                    folder={`services/${svc.slug || "new"}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <SaveButton sectionKey="services" />
      </Section>
    </div>
  );
}
