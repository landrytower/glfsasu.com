import type { Locale } from "@/lib/translations";

export type AboutMissionItem = {
  code: string;
  text: string;
};

export type AboutValueItem = {
  code: string;
  title: string;
  body: string;
};

export type AboutLocalizedContent = {
  header: {
    number: string;
    kicker: string;
    title: string;
    titleEmphasis: string;
    intro: string;
  };
  vision: {
    number: string;
    label: string;
    body: string;
  };
  mission: {
    number: string;
    label: string;
    items: AboutMissionItem[];
  };
  values: {
    number: string;
    label: string;
    headline: string;
    items: AboutValueItem[];
  };
};

export type AboutDesignSettings = {
  headerTitleSize: string;
  headerIntroSize: string;
  visionTitleSize: string;
  missionItemSize: string;
  valuesHeadlineSize: string;
  valueCardTitleSize: string;
  valueCardBodySize: string;
};

export type AboutPageSettings = {
  content: Record<Locale, AboutLocalizedContent>;
  design: AboutDesignSettings;
};

export const ABOUT_TRANSLATABLE_LOCALES: Locale[] = ["en", "es", "de", "ar"];

const fr: AboutLocalizedContent = {
  header: {
    number: "01",
    kicker: "À propos",
    title: "Ce que",
    titleEmphasis: "nous sommes.",
    intro:
      "Fondé par l'Ingénieur Jean Toussaint Mindela, Groupe Lipanda FAMILY SASU rassemble dix pôles d'ingénierie sous un même étendard : bâtir l'infrastructure qui tient, avec les personnes qu'elle concerne.",
  },
  vision: {
    number: "01.A",
    label: "Vision",
    body:
      "Être un leader de l'ingénierie et du développement durable en R.D. Congo et en Afrique.",
  },
  mission: {
    number: "01.B",
    label: "Mission",
    items: [
      { code: "M.1", text: "Réaliser des infrastructures modernes et durables." },
      { code: "M.2", text: "Promouvoir l'accès à l'eau potable et à l'énergie." },
      { code: "M.3", text: "Développer l'agriculture et l'élevage." },
      { code: "M.4", text: "Offrir des formations techniques adaptées." },
      { code: "M.5", text: "Assurer la qualité et l'innovation à chaque étape." },
    ],
  },
  values: {
    number: "02",
    label: "Valeurs",
    headline: "Quatre repères pour ne pas dévier.",
    items: [
      {
        code: "V.1",
        title: "Qualité d'ingénierie",
        body:
          "Des ouvrages dimensionnés selon les normes, vérifiés par nos pôles études, et testés par des essais normalisés.",
      },
      {
        code: "V.2",
        title: "Impact social",
        body:
          "Chaque projet est évalué à l'aune de son effet sur les populations : accès à l'eau, à l'énergie, à la formation, à l'emploi.",
      },
      {
        code: "V.3",
        title: "Durabilité",
        body:
          "Priorité aux solutions solaires, aux matériaux locaux, et à la maintenance par des opérateurs formés dans la communauté.",
      },
      {
        code: "V.4",
        title: "Transparence",
        body:
          "Devis chiffrés, rapports d'avancement consultables depuis l'espace client, et audits externes sur demande.",
      },
    ],
  },
};

const en: AboutLocalizedContent = {
  header: {
    number: "01",
    kicker: "About",
    title: "What",
    titleEmphasis: "we are.",
    intro:
      "Founded by Engineer Jean Toussaint Mindela, Groupe Lipanda FAMILY SASU brings together ten engineering divisions under one banner: building infrastructure that lasts, with the people it serves.",
  },
  vision: {
    number: "01.A",
    label: "Vision",
    body:
      "To be a leader in engineering and sustainable development in the D.R. Congo and across Africa.",
  },
  mission: {
    number: "01.B",
    label: "Mission",
    items: [
      { code: "M.1", text: "Deliver modern and durable infrastructure." },
      { code: "M.2", text: "Promote access to clean water and energy." },
      { code: "M.3", text: "Develop agriculture and livestock." },
      { code: "M.4", text: "Provide technical training adapted to local needs." },
      { code: "M.5", text: "Ensure quality and innovation at every stage." },
    ],
  },
  values: {
    number: "02",
    label: "Values",
    headline: "Four markers to stay on course.",
    items: [
      {
        code: "V.1",
        title: "Engineering quality",
        body:
          "Projects are sized to standards, reviewed by our design teams, and validated through standardized tests.",
      },
      {
        code: "V.2",
        title: "Social impact",
        body:
          "Each project is measured by its effect on communities: access to water, energy, training, and employment.",
      },
      {
        code: "V.3",
        title: "Sustainability",
        body:
          "We prioritize solar solutions, local materials, and maintenance by operators trained within the community.",
      },
      {
        code: "V.4",
        title: "Transparency",
        body:
          "Costed quotations, progress reports available through the client portal, and external audits on request.",
      },
    ],
  },
};

const es: AboutLocalizedContent = {
  header: {
    number: "01",
    kicker: "Nosotros",
    title: "Lo que",
    titleEmphasis: "somos.",
    intro:
      "Fundado por el Ingeniero Jean Toussaint Mindela, Groupe Lipanda FAMILY SASU reúne diez polos de ingeniería bajo un mismo estandarte: construir infraestructuras duraderas con las personas a las que sirven.",
  },
  vision: {
    number: "01.A",
    label: "Visión",
    body:
      "Ser un líder de la ingeniería y del desarrollo sostenible en la R.D. del Congo y en África.",
  },
  mission: {
    number: "01.B",
    label: "Misión",
    items: [
      { code: "M.1", text: "Realizar infraestructuras modernas y duraderas." },
      { code: "M.2", text: "Promover el acceso al agua potable y a la energía." },
      { code: "M.3", text: "Desarrollar la agricultura y la ganadería." },
      { code: "M.4", text: "Ofrecer formaciones técnicas adaptadas." },
      { code: "M.5", text: "Garantizar calidad e innovación en cada etapa." },
    ],
  },
  values: {
    number: "02",
    label: "Valores",
    headline: "Cuatro referencias para no desviarse.",
    items: [
      {
        code: "V.1",
        title: "Calidad de ingeniería",
        body:
          "Obras dimensionadas según las normas, verificadas por nuestros equipos de estudios y probadas con ensayos normalizados.",
      },
      {
        code: "V.2",
        title: "Impacto social",
        body:
          "Cada proyecto se evalúa por su efecto en la población: acceso al agua, a la energía, a la formación y al empleo.",
      },
      {
        code: "V.3",
        title: "Durabilidad",
        body:
          "Priorizamos soluciones solares, materiales locales y mantenimiento por operadores formados en la comunidad.",
      },
      {
        code: "V.4",
        title: "Transparencia",
        body:
          "Presupuestos detallados, informes de avance disponibles en el espacio cliente y auditorías externas a solicitud.",
      },
    ],
  },
};

const de: AboutLocalizedContent = {
  header: {
    number: "01",
    kicker: "Über uns",
    title: "Was",
    titleEmphasis: "wir sind.",
    intro:
      "Die von Ingenieur Jean Toussaint Mindela gegründete Groupe Lipanda FAMILY SASU vereint zehn Ingenieursparten unter einem gemeinsamen Leitbild: belastbare Infrastruktur zu bauen, gemeinsam mit den Menschen, für die sie bestimmt ist.",
  },
  vision: {
    number: "01.A",
    label: "Vision",
    body:
      "Ein führendes Unternehmen für Ingenieurwesen und nachhaltige Entwicklung in der DR Kongo und in Afrika zu sein.",
  },
  mission: {
    number: "01.B",
    label: "Mission",
    items: [
      { code: "M.1", text: "Moderne und dauerhafte Infrastruktur realisieren." },
      { code: "M.2", text: "Den Zugang zu Trinkwasser und Energie fördern." },
      { code: "M.3", text: "Landwirtschaft und Viehzucht entwickeln." },
      { code: "M.4", text: "Passende technische Ausbildungen anbieten." },
      { code: "M.5", text: "Qualität und Innovation in jeder Phase sicherstellen." },
    ],
  },
  values: {
    number: "02",
    label: "Werte",
    headline: "Vier Leitplanken, damit wir nicht vom Kurs abkommen.",
    items: [
      {
        code: "V.1",
        title: "Ingenieurqualität",
        body:
          "Bauwerke werden nach Normen dimensioniert, von unseren Planungsteams geprüft und mit standardisierten Tests validiert.",
      },
      {
        code: "V.2",
        title: "Soziale Wirkung",
        body:
          "Jedes Projekt wird nach seinem Einfluss auf die Bevölkerung bewertet: Zugang zu Wasser, Energie, Ausbildung und Arbeit.",
      },
      {
        code: "V.3",
        title: "Nachhaltigkeit",
        body:
          "Vorrang haben Solarlösungen, lokale Materialien und Wartung durch in der Gemeinschaft geschulte Betreiber.",
      },
      {
        code: "V.4",
        title: "Transparenz",
        body:
          "Bezifferte Angebote, Fortschrittsberichte im Kundenbereich und externe Audits auf Anfrage.",
      },
    ],
  },
};

const ar: AboutLocalizedContent = {
  header: {
    number: "01",
    kicker: "من نحن",
    title: "ما الذي",
    titleEmphasis: "نمثله.",
    intro:
      "أسس المهندس جان توسان مينديلا مجموعة ليباندا فاميلي، التي تجمع عشرة أقطاب هندسية تحت راية واحدة: بناء بنية تحتية تصمد، مع الأشخاص الذين تخدمهم.",
  },
  vision: {
    number: "01.A",
    label: "الرؤية",
    body:
      "أن نكون رواداً في الهندسة والتنمية المستدامة في جمهورية الكونغو الديمقراطية وفي أفريقيا.",
  },
  mission: {
    number: "01.B",
    label: "الرسالة",
    items: [
      { code: "M.1", text: "إنجاز بنى تحتية حديثة ومستدامة." },
      { code: "M.2", text: "تعزيز الوصول إلى مياه الشرب والطاقة." },
      { code: "M.3", text: "تطوير الزراعة وتربية المواشي." },
      { code: "M.4", text: "تقديم تكوينات تقنية ملائمة." },
      { code: "M.5", text: "ضمان الجودة والابتكار في كل مرحلة." },
    ],
  },
  values: {
    number: "02",
    label: "القيم",
    headline: "أربع مرجعيات حتى لا نحيد عن المسار.",
    items: [
      {
        code: "V.1",
        title: "جودة هندسية",
        body:
          "منشآت مصممة وفق المعايير، وتُراجع من طرف فرق الدراسات، وتُختبر عبر تجارب معيارية.",
      },
      {
        code: "V.2",
        title: "أثر اجتماعي",
        body:
          "يُقاس كل مشروع بأثره على السكان: الوصول إلى الماء والطاقة والتكوين والعمل.",
      },
      {
        code: "V.3",
        title: "الاستدامة",
        body:
          "نعطي الأولوية للحلول الشمسية، والمواد المحلية، والصيانة عبر مشغلين مدرَّبين داخل المجتمع.",
      },
      {
        code: "V.4",
        title: "الشفافية",
        body:
          "عروض أسعار مفصلة، وتقارير تقدم متاحة عبر فضاء العميل، وتدقيقات خارجية عند الطلب.",
      },
    ],
  },
};

export const defaultAboutSettings: AboutPageSettings = {
  content: { fr, en, es, de, ar },
  design: {
    headerTitleSize: "clamp(2.5rem, 7vw, 6.5rem)",
    headerIntroSize: "1.125rem",
    visionTitleSize: "clamp(1.75rem, 3.5vw, 3rem)",
    missionItemSize: "1.25rem",
    valuesHeadlineSize: "clamp(2rem, 4.5vw, 3.5rem)",
    valueCardTitleSize: "1.5rem",
    valueCardBodySize: "0.875rem",
  },
};

function mergeMissionItem(base: AboutMissionItem, patch?: Partial<AboutMissionItem>): AboutMissionItem {
  return {
    code: patch?.code ?? base.code,
    text: patch?.text ?? base.text,
  };
}

function mergeValueItem(base: AboutValueItem, patch?: Partial<AboutValueItem>): AboutValueItem {
  return {
    code: patch?.code ?? base.code,
    title: patch?.title ?? base.title,
    body: patch?.body ?? base.body,
  };
}

function mergeLocaleContent(
  base: AboutLocalizedContent,
  patch?: Partial<AboutLocalizedContent>,
): AboutLocalizedContent {
  return {
    header: {
      number: patch?.header?.number ?? base.header.number,
      kicker: patch?.header?.kicker ?? base.header.kicker,
      title: patch?.header?.title ?? base.header.title,
      titleEmphasis: patch?.header?.titleEmphasis ?? base.header.titleEmphasis,
      intro: patch?.header?.intro ?? base.header.intro,
    },
    vision: {
      number: patch?.vision?.number ?? base.vision.number,
      label: patch?.vision?.label ?? base.vision.label,
      body: patch?.vision?.body ?? base.vision.body,
    },
    mission: {
      number: patch?.mission?.number ?? base.mission.number,
      label: patch?.mission?.label ?? base.mission.label,
      items: base.mission.items.map((item, index) =>
        mergeMissionItem(item, patch?.mission?.items?.[index]),
      ),
    },
    values: {
      number: patch?.values?.number ?? base.values.number,
      label: patch?.values?.label ?? base.values.label,
      headline: patch?.values?.headline ?? base.values.headline,
      items: base.values.items.map((item, index) =>
        mergeValueItem(item, patch?.values?.items?.[index]),
      ),
    },
  };
}

export function normalizeAboutSettings(value: unknown): AboutPageSettings {
  const incoming = typeof value === "object" && value !== null ? (value as Partial<AboutPageSettings>) : {};
  const content = (incoming.content ?? {}) as Partial<
    Record<Locale, Partial<AboutLocalizedContent>>
  >;

  return {
    content: {
      fr: mergeLocaleContent(defaultAboutSettings.content.fr, content.fr),
      en: mergeLocaleContent(defaultAboutSettings.content.en, content.en),
      es: mergeLocaleContent(defaultAboutSettings.content.es, content.es),
      de: mergeLocaleContent(defaultAboutSettings.content.de, content.de),
      ar: mergeLocaleContent(defaultAboutSettings.content.ar, content.ar),
    },
    design: {
      headerTitleSize:
        incoming.design?.headerTitleSize ?? defaultAboutSettings.design.headerTitleSize,
      headerIntroSize:
        incoming.design?.headerIntroSize ?? defaultAboutSettings.design.headerIntroSize,
      visionTitleSize:
        incoming.design?.visionTitleSize ?? defaultAboutSettings.design.visionTitleSize,
      missionItemSize:
        incoming.design?.missionItemSize ?? defaultAboutSettings.design.missionItemSize,
      valuesHeadlineSize:
        incoming.design?.valuesHeadlineSize ?? defaultAboutSettings.design.valuesHeadlineSize,
      valueCardTitleSize:
        incoming.design?.valueCardTitleSize ?? defaultAboutSettings.design.valueCardTitleSize,
      valueCardBodySize:
        incoming.design?.valueCardBodySize ?? defaultAboutSettings.design.valueCardBodySize,
    },
  };
}