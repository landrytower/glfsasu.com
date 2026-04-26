"use client";

import { useEffect, useState } from "react";
import {
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
  Download,
  Loader2,
} from "lucide-react";
import {
  getRealizations,
  upsertRealization,
  deleteRealization,
  uploadImage,
  type RealizationDoc,
} from "@/lib/firebase-db";
import { realizations as staticRealizations } from "@/lib/content";
import { cn } from "@/lib/cn";

const empty: RealizationDoc = {
  slug: "",
  title: "",
  kicker: "",
  location: "",
  province: "",
  year: "",
  service: "",
  code: "",
  coords: "",
  summary: "",
  image: "",
  metrics: [],
  order: 0,
};

export default function AdminRealizationsPage() {
  const [items, setItems] = useState<(RealizationDoc & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<
    (RealizationDoc & { id: string | null }) | null
  >(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function seedStaticData() {
    if (!confirm(`Importer les ${staticRealizations.length} réalisations initiales dans Firebase ?`)) return;
    setSeeding(true);
    try {
      const existingSlugs = new Set(items.map((i) => i.slug));
      let added = 0;
      for (let i = 0; i < staticRealizations.length; i++) {
        const r = staticRealizations[i];
        if (existingSlugs.has(r.slug)) continue;
        await upsertRealization(null, {
          ...r,
          metrics: r.metrics ?? [],
          order: i,
        });
        added++;
      }
      alert(`${added} réalisation(s) importée(s).`);
      await load();
    } catch (err) {
      alert("Erreur : " + (err as Error).message);
    } finally {
      setSeeding(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getRealizations();
      setItems(data);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setEditing({ ...empty, id: null, order: items.length });
    setImageFile(null);
  }

  function openEdit(item: RealizationDoc & { id: string }) {
    setEditing({ ...item });
    setImageFile(null);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      let image = editing.image;
      if (imageFile) {
        image = await uploadImage(
          imageFile,
          `realizations/${editing.slug || "new"}`
        );
      }

      const data: RealizationDoc = {
        slug: editing.slug,
        title: editing.title,
        kicker: editing.kicker,
        location: editing.location,
        province: editing.province,
        year: editing.year,
        service: editing.service,
        code: editing.code,
        coords: editing.coords,
        summary: editing.summary,
        image,
        metrics: editing.metrics,
        order: editing.order,
      };

      const id = await upsertRealization(editing.id, data);
      setEditing(null);
      // Reload to get fresh data
      const updated = await getRealizations();
      setItems(updated);
      void id;
    } catch (err) {
      alert("Erreur lors de la sauvegarde : " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette réalisation ?")) return;
    await deleteRealization(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateField<K extends keyof RealizationDoc>(
    key: K,
    value: RealizationDoc[K]
  ) {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  }

  function updateMetric(index: number, field: "label" | "value", val: string) {
    if (!editing) return;
    const metrics = [...editing.metrics];
    metrics[index] = { ...metrics[index], [field]: val };
    setEditing({ ...editing, metrics });
  }

  function addMetric() {
    if (!editing) return;
    setEditing({
      ...editing,
      metrics: [...editing.metrics, { label: "", value: "" }],
    });
  }

  function removeMetric(index: number) {
    if (!editing) return;
    setEditing({
      ...editing,
      metrics: editing.metrics.filter((_, i) => i !== index),
    });
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight">
            Réalisations
          </h1>
          <p className="mt-2 text-ink-muted">
            {items.length} projet(s) publiés
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={seedStaticData}
            disabled={seeding}
            className="flex items-center gap-2 border border-ink/20 text-ink-muted px-4 py-2.5 text-sm font-medium hover:bg-paper-100 transition-colors disabled:opacity-50"
          >
            {seeding ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Importer les données initiales
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-bordeaux-700 text-paper-50 px-4 py-2.5 text-sm font-medium hover:bg-bordeaux-800 transition-colors"
          >
            <Plus className="size-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-paper-50 border border-ink/10 w-full max-w-2xl mb-10">
            <div className="flex items-center justify-between p-4 border-b border-ink/10">
              <h2 className="font-display text-xl">
                {editing.id ? "Modifier" : "Nouvelle"} réalisation
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-1 text-ink-muted hover:text-ink"
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <EditorField
                  label="Titre"
                  value={editing.title}
                  onChange={(v) => updateField("title", v)}
                />
                <EditorField
                  label="Slug (URL)"
                  value={editing.slug}
                  onChange={(v) => updateField("slug", v)}
                />
                <EditorField
                  label="Accroche"
                  value={editing.kicker}
                  onChange={(v) => updateField("kicker", v)}
                />
                <EditorField
                  label="Code"
                  value={editing.code}
                  onChange={(v) => updateField("code", v)}
                />
                <EditorField
                  label="Localisation"
                  value={editing.location}
                  onChange={(v) => updateField("location", v)}
                />
                <EditorField
                  label="Province"
                  value={editing.province}
                  onChange={(v) => updateField("province", v)}
                />
                <EditorField
                  label="Année"
                  value={editing.year}
                  onChange={(v) => updateField("year", v)}
                />
                <EditorField
                  label="Service"
                  value={editing.service}
                  onChange={(v) => updateField("service", v)}
                />
                <EditorField
                  label="Coordonnées GPS"
                  value={editing.coords}
                  onChange={(v) => updateField("coords", v)}
                />
                <EditorField
                  label="Ordre d'affichage"
                  value={String(editing.order)}
                  onChange={(v) => updateField("order", parseInt(v) || 0)}
                  type="number"
                />
              </div>

              <div>
                <label className="font-mono-label text-ink-muted block mb-2 text-xs">
                  Résumé
                </label>
                <textarea
                  rows={3}
                  placeholder="Résumé du projet..."
                  value={editing.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  className="w-full bg-transparent border border-ink/20 px-3 py-2 text-sm focus:border-bordeaux-700 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Image */}
              <div>
                <label className="font-mono-label text-ink-muted block mb-2 text-xs">
                  Image
                </label>
                {editing.image && !imageFile && (
                  <div className="mb-2">
                    <img
                      src={editing.image}
                      alt=""
                      className="h-24 object-cover border border-ink/10"
                    />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 border border-ink/20 px-3 py-2 text-sm cursor-pointer hover:bg-paper-100 transition-colors">
                    <ImageIcon className="size-4 text-ink-faint" />
                    {imageFile ? imageFile.name : "Choisir une image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  <span className="text-xs text-ink-faint">ou</span>
                  <input
                    type="text"
                    placeholder="URL de l'image"
                    value={editing.image}
                    onChange={(e) => updateField("image", e.target.value)}
                    className="flex-1 bg-transparent border border-ink/20 px-3 py-2 text-sm focus:border-bordeaux-700 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-mono-label text-ink-muted text-xs">
                    Métriques
                  </label>
                  <button
                    onClick={addMetric}
                    className="text-xs text-bordeaux-700 hover:underline"
                  >
                    + Ajouter une métrique
                  </button>
                </div>
                <div className="space-y-2">
                  {editing.metrics.map((m, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Label"
                        value={m.label}
                        onChange={(e) => updateMetric(i, "label", e.target.value)}
                        className="flex-1 bg-transparent border border-ink/20 px-3 py-1.5 text-sm focus:border-bordeaux-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Valeur"
                        value={m.value}
                        onChange={(e) => updateMetric(i, "value", e.target.value)}
                        className="flex-1 bg-transparent border border-ink/20 px-3 py-1.5 text-sm focus:border-bordeaux-700 focus:outline-none"
                      />
                      <button
                        onClick={() => removeMetric(i)}
                        className="p-1 text-ink-faint hover:text-red-600"
                        aria-label="Supprimer métrique"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-ink/10">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm text-ink-muted hover:text-ink"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.title || !editing.slug}
                className="flex items-center gap-2 bg-bordeaux-700 text-paper-50 px-5 py-2 text-sm font-medium hover:bg-bordeaux-800 disabled:opacity-50 transition-colors"
              >
                <Save className="size-4" />
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-paper-50 border border-ink/10 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-paper-50 border border-ink/10 p-12 text-center">
          <FolderOpen
            className="size-12 text-ink-faint mx-auto mb-4"
            strokeWidth={1}
          />
          <p className="font-display text-xl">Aucune réalisation</p>
          <p className="mt-2 text-ink-muted text-sm">
            Ajoutez votre premier projet pour qu'il s'affiche sur le site.
          </p>
        </div>
      ) : (
        <div className="space-y-0 border border-ink/10 bg-paper-50 divide-y divide-ink/10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 hover:bg-paper-100 transition-colors"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="size-14 object-cover border border-ink/10 shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-faint">
                    {item.code}
                  </span>
                  <span className="font-mono text-xs text-ink-faint">
                    {item.year}
                  </span>
                </div>
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-ink-muted truncate">
                  {item.location}, {item.province}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 text-ink-muted hover:text-ink transition-colors"
                  title="Modifier"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-ink-muted hover:text-red-600 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditorField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono-label text-ink-muted block mb-1 text-xs">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-ink/20 px-3 py-2 text-sm focus:border-bordeaux-700 focus:outline-none transition-colors"
      />
    </label>
  );
}
