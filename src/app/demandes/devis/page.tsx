"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Upload, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { services } from "@/lib/content";
import { cn } from "@/lib/cn";
import { submitQuote } from "@/lib/firebase-db";
import { useT } from "@/lib/language-context";



type FormState = {
  service: string;
  subService: string;
  location: string;
  description: string;
  file: File | null;
  urgency: "standard" | "rapide" | "urgent";
  budget: string;
  timeline: string;
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  phone: string;
  consent: boolean;
};

const initial: FormState = {
  service: "",
  subService: "",
  location: "",
  description: "",
  file: null,
  urgency: "standard",
  budget: "",
  timeline: "",
  firstName: "",
  lastName: "",
  organization: "",
  email: "",
  phone: "",
  consent: false,
};

export default function DevisPage() {
  const tq = useT().quotePage;
  const steps = tq.steps.map((s, i) => ({ id: i + 1, code: String(i + 1).padStart(2, "0"), title: s.title, subtitle: s.subtitle }));
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quoteCode, setQuoteCode] = useState("");

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitQuote(
        {
          service: form.service,
          subService: form.subService,
          location: form.location,
          description: form.description,
          urgency: form.urgency,
          budget: form.budget,
          timeline: form.timeline,
          firstName: form.firstName,
          lastName: form.lastName,
          organization: form.organization,
          email: form.email,
          phone: form.phone,
        },
        form.file,
      );
      setQuoteCode(result.code);
      setSubmitted(true);
    } catch {
      alert(tq.sendError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        number="07"
        kicker={tq.kicker}
        title={tq.title}
        titleEmphasis={tq.titleEm}
        intro={tq.intro}
        crumbs={[
          { href: "/demandes", label: tq.kicker },
          { href: "/demandes/devis", label: tq.kicker },
        ]}
      />

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          {/* Progress — mobile: thin segmented bar + current-step label; md+: full 5-column layout */}
          <div className="mb-10 md:mb-12">
            {/* Mobile progress */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-3 font-mono-label">
                <span className="text-bordeaux-700">
                  N° {steps[step - 1].code} · {steps[step - 1].title}
                </span>
                <span className="text-ink-faint">
                  {tq.stepLabel} {step} {tq.stepOf} {steps.length}
                </span>
              </div>
              <div className="flex gap-1.5">
                {steps.map((s) => {
                  const active = s.id === step;
                  const done = s.id < step;
                  return (
                    <span
                      key={s.id}
                      className={cn(
                        "flex-1 h-1 transition-colors",
                        active
                          ? "bg-bordeaux-700"
                          : done
                            ? "bg-green-700"
                            : "bg-ink/15"
                      )}
                    />
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-ink-faint">
                {steps[step - 1].subtitle}
              </p>
            </div>

            {/* Desktop progress */}
            <div className="hidden md:grid grid-cols-5 gap-2">
              {steps.map((s) => {
                const active = s.id === step;
                const done = s.id < step;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => !submitted && s.id < step && setStep(s.id)}
                    className={cn(
                      "text-left border-t-[3px] pt-4 transition-colors",
                      active
                        ? "border-bordeaux-700"
                        : done
                          ? "border-green-700"
                          : "border-ink/15"
                    )}
                  >
                    <p
                      className={cn(
                        "font-mono-label mb-2 flex items-center gap-2",
                        active
                          ? "text-bordeaux-700"
                          : done
                            ? "text-green-700"
                            : "text-ink-faint"
                      )}
                    >
                      N° {s.code}
                      {done && <Check className="size-3" strokeWidth={2.5} />}
                    </p>
                    <p className="font-display text-lg leading-tight">
                      {s.title}
                    </p>
                    <p className="mt-1 text-xs text-ink-faint">{s.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-ink/12 bg-paper-50 p-5 sm:p-6 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessView code={quoteCode} />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.6, 0.2, 1] }}
                >
                  {step === 1 && <Step1 form={form} update={update} />}
                  {step === 2 && <Step2 form={form} update={update} />}
                  {step === 3 && <Step3 form={form} update={update} />}
                  {step === 4 && <Step4 form={form} update={update} />}
                  {step === 5 && <Step5 form={form} />}
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-ink/10 flex items-center justify-between gap-3">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="inline-flex items-center gap-2 px-3 sm:px-5 py-3 text-sm font-medium text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  <span className="hidden sm:inline">{tq.prevBtn}</span>
                </button>

                <div className="hidden md:block font-mono-label text-ink-faint">
                  {tq.stepLabel} {step} {tq.stepOf} {steps.length}
                </div>

                {step < steps.length ? (
                  <button
                    onClick={next}
                    className="group inline-flex items-center gap-2 bg-navy-900 text-paper-50 px-5 sm:px-6 py-3 text-sm font-medium hover:bg-navy-800 transition-colors"
                  >
                    {tq.nextBtn}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!form.consent || submitting}
                    className="group inline-flex items-center gap-2 bg-bordeaux-700 text-paper-50 px-5 sm:px-6 py-3 text-sm font-medium hover:bg-bordeaux-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? tq.submitting : tq.submitBtn}
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          <p className="mt-8 text-sm text-ink-muted max-w-2xl flex gap-3">
            <AlertCircle className="size-4 mt-0.5 text-ink-faint shrink-0" strokeWidth={1.5} />
            {tq.privacyNote}
          </p>
        </div>
      </section>
    </>
  );
}

function StepHeader({ code, title, desc }: { code: string; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <SectionKicker number={code} label="Étape" />
      <h2 className="mt-6 font-display text-3xl md:text-4xl leading-tight tracking-tight text-balance">
        {title}
      </h2>
      <p className="mt-3 text-ink-muted max-w-2xl leading-relaxed">{desc}</p>
    </div>
  );
}

function Field({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <label className="block">
      <span className="font-mono-label text-ink-muted block mb-2">{label}</span>
      {children}
      {note && <span className="block mt-1.5 text-xs text-ink-faint">{note}</span>}
    </label>
  );
}

const inputClass =
  "w-full bg-transparent border-b border-ink/20 px-0 py-3 text-base text-ink placeholder:text-ink-faint focus:border-bordeaux-700 focus:outline-none transition-colors";

function Step1({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const tq = useT().quotePage;
  return (
    <>
      <StepHeader
        code="01"
        title={tq.step1Title}
        desc={tq.step1Desc}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => update("service", s.slug)}
            className={cn(
              "group text-left p-5 border transition-colors",
              form.service === s.slug
                ? "border-bordeaux-700 bg-bordeaux-50"
                : "border-ink/12 bg-paper-100 hover:border-ink/40"
            )}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono-label text-ink-faint">{s.code}</span>
              {form.service === s.slug && (
                <Check className="size-4 text-bordeaux-700" strokeWidth={2} />
              )}
            </div>
            <h3 className="mt-6 font-display text-lg leading-tight">{s.title}</h3>
            <p className="mt-2 text-xs text-ink-muted">{s.kicker}</p>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <Field label={tq.step1Other}>
          <input
            type="text"
            className={inputClass}
            placeholder={tq.step1OtherPh}
            value={form.subService}
            onChange={(e) => update("subService", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

function Step2({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const tq = useT().quotePage;
  return (
    <>
      <StepHeader
        code="02"
        title={tq.step2Title}
        desc={tq.step2Desc}
      />

      <div className="space-y-8">
        <Field label={tq.locationLabel} note={tq.locationNote}>
          <input
            type="text"
            className={inputClass}
            placeholder={tq.locationPh}
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </Field>

        <Field
          label={tq.descLabel}
          note={tq.descNote}
        >
          <textarea
            rows={6}
            className={cn(inputClass, "resize-none")}
            placeholder={tq.descPh}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>

        <div>
          <span className="font-mono-label text-ink-muted block mb-3">
            {tq.attachLabel}
          </span>
          <div className="border border-dashed border-ink/20 bg-paper-100 p-8 flex flex-col items-center justify-center text-center">
            <Upload className="size-8 text-ink-faint mb-4" strokeWidth={1.5} />
            <p className="text-sm text-ink-muted mb-2">
              {tq.attachDrop}{" "}
              <label className="text-bordeaux-700 underline underline-offset-4 cursor-pointer">
                {tq.attachBrowse}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.dwg"
                  className="hidden"
                  onChange={(e) => update("file", e.target.files?.[0] ?? null)}
                />
              </label>
            </p>
            <p className="font-mono-label text-ink-faint">
              {tq.attachMeta}
            </p>
            {form.file && (
              <p className="mt-4 text-sm text-green-700 font-mono">
                &#10003; {form.file.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Step3({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const tq = useT().quotePage;
  return (
    <>
      <StepHeader
        code="03"
        title={tq.step3Title}
        desc={tq.step3Desc}
      />

      <div className="space-y-10">
        <div>
          <span className="font-mono-label text-ink-muted block mb-4">{tq.urgencyLabel}</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {tq.urgencies.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => update("urgency", u.id as FormState["urgency"])}
                className={cn(
                  "text-left p-5 border transition-colors",
                  form.urgency === u.id
                    ? "border-bordeaux-700 bg-bordeaux-50"
                    : "border-ink/12 bg-paper-100 hover:border-ink/40"
                )}
              >
                <p className="font-display text-xl">{u.label}</p>
                <p className="mt-2 text-sm text-ink-muted">{u.sub}</p>
              </button>
            ))}
          </div>
        </div>

        <Field label={tq.timelineLabel} note={tq.timelineNote}>
          <input
            type="text"
            className={inputClass}
            placeholder={tq.timelinePh}
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
          />
        </Field>

        <Field label={tq.budgetLabel} note={tq.budgetNote}>
          <input
            type="text"
            className={inputClass}
            placeholder={tq.budgetPh}
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

function Step4({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const tq = useT().quotePage;
  return (
    <>
      <StepHeader
        code="04"
        title={tq.step4Title}
        desc={tq.step4Desc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <Field label={tq.firstNameLabel}>
          <input
            type="text"
            className={inputClass}
            placeholder="Ex. Thérèse"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </Field>
        <Field label={tq.lastNameLabel}>
          <input
            type="text"
            className={inputClass}
            placeholder="Ex. Kasongo"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </Field>
        <Field label={tq.orgLabel}>
          <input
            type="text"
            className={inputClass}
            placeholder="Ex. Commune de Nsele"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
          />
        </Field>
        <Field label="Rôle dans le projet">
          <input
            type="text"
            className={inputClass}
            placeholder="Ex. Maître d'ouvrage"
          />
        </Field>
        <Field label={tq.emailLabel}>
          <input
            type="email"
            className={inputClass}
            placeholder="vous@example.cd"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field label={tq.phoneLabel}>
          <input
            type="tel"
            className={inputClass}
            placeholder="+243 ..."
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
      </div>

      <label className="mt-10 flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 size-4 accent-bordeaux-700"
        />
        <span className="text-sm text-ink-muted leading-relaxed">
          {tq.consentLabel}
        </span>
      </label>
    </>
  );
}

function Step5({ form }: { form: FormState }) {
  const tq = useT().quotePage;
  const selected = services.find((s) => s.slug === form.service);
  return (
    <>
      <StepHeader
        code="05"
        title={tq.step5Title}
        desc={tq.step5Desc}
      />

      <dl className="divide-y divide-ink/10 border-y border-ink/10">
        {[
          { l: tq.serviceKey, v: selected?.title ?? "—" },
          { l: tq.locationKey, v: form.location || "—" },
          { l: tq.urgencyKey, v: form.urgency },
          { l: tq.contactKey, v: `${form.firstName} ${form.lastName}${form.organization ? ` · ${form.organization}` : ""}`.trim() || "—" },
          { l: tq.fileKey, v: form.file?.name ?? "—" },
        ].map((row) => (
          <div
            key={row.l}
            className="grid grid-cols-12 gap-4 py-4 text-sm"
          >
            <dt className="col-span-4 font-mono-label text-ink-faint self-start pt-0.5">
              {row.l}
            </dt>
            <dd className="col-span-8 text-ink leading-relaxed">{row.v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function SuccessView({ code }: { code: string }) {
  const tq = useT().quotePage;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 text-center"
    >
      <div className="mx-auto size-16 rounded-full bg-green-100 border border-green-300/50 flex items-center justify-center mb-8">
        <Check className="size-8 text-green-700" strokeWidth={2} />
      </div>
      <SectionKicker number="∞" label={tq.successTitle} className="justify-center" />
      <h2 className="mt-8 font-display font-light text-4xl md:text-6xl tracking-tight leading-[1.02] text-balance">
        {tq.successTitle}
      </h2>
      <p className="mt-6 max-w-xl mx-auto text-ink-muted leading-relaxed">
        {tq.successNote}
      </p>
      <p className="mt-6 font-mono text-sm text-ink-faint">
        {tq.successRef} {code}
      </p>
      <div className="mt-12 flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="border border-ink/20 px-6 py-3.5 text-sm font-medium hover:bg-paper-100 transition-colors"
        >
          {tq.successBack}
        </Link>
        <Link
          href="/espace-client"
          className="bg-navy-900 text-paper-50 px-6 py-3.5 text-sm font-medium hover:bg-navy-800 transition-colors"
        >
          Suivre dans l'espace client
        </Link>
      </div>
    </motion.div>
  );
}
