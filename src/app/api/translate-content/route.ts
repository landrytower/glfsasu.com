import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Locale } from "@/lib/translations";

type JsonLike = string | number | boolean | null | JsonLike[] | { [key: string]: JsonLike };

type TranslateRequest = {
  sourceLocale?: Locale;
  targetLocales?: Locale[];
  content?: JsonLike;
};

type FlattenedString = {
  path: string[];
  value: string;
};

function shouldSkipKey(key: string) {
  return key === "number" || key === "code";
}

function flattenStrings(value: JsonLike, path: string[] = []): FlattenedString[] {
  if (typeof value === "string") {
    return [{ path, value }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => flattenStrings(entry, [...path, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, entry]) => {
      if (shouldSkipKey(key)) {
        return [];
      }
      return flattenStrings(entry, [...path, key]);
    });
  }

  return [];
}

function cloneJson<T extends JsonLike>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function setDeepValue(root: JsonLike, path: string[], value: string) {
  let cursor: JsonLike = root;

  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index];
    cursor = Array.isArray(cursor)
      ? cursor[Number(segment)]
      : (cursor as Record<string, JsonLike>)[segment];
  }

  const last = path[path.length - 1];
  if (Array.isArray(cursor)) {
    cursor[Number(last)] = value;
  } else {
    (cursor as Record<string, JsonLike>)[last] = value;
  }
}

async function translateWithGemini(
  sourceLocale: Locale,
  targetLocale: Locale,
  strings: FlattenedString[],
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || strings.length === 0) {
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = [
    `Translate the following JSON array of strings from ${sourceLocale} to ${targetLocale}.`,
    "Return valid JSON only.",
    "Preserve meaning, punctuation, tone, and sentence casing.",
    "Do not add commentary.",
    JSON.stringify(strings.map((entry) => entry.value)),
  ].join("\n\n");

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed) || parsed.length !== strings.length) {
      return null;
    }

    return parsed.map((item) => String(item));
  } catch (error) {
    console.error("Gemini translation failed:", error);
    return null;
  }
}

async function translateTextViaGoogle(
  sourceLocale: Locale,
  targetLocale: Locale,
  value: string,
) {
  const params = new URLSearchParams({
    client: "gtx",
    sl: sourceLocale,
    tl: targetLocale,
    dt: "t",
    q: value,
  });

  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?${params.toString()}`,
    {
      headers: {
        "User-Agent": "Lipanda About Translation",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Translation request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as unknown[];
  const parts = Array.isArray(payload[0]) ? (payload[0] as unknown[]) : [];
  return parts
    .map((part) => (Array.isArray(part) ? String(part[0] ?? "") : ""))
    .join("");
}

async function translateStrings(
  sourceLocale: Locale,
  targetLocale: Locale,
  strings: FlattenedString[],
) {
  const geminiResult = await translateWithGemini(sourceLocale, targetLocale, strings);
  if (geminiResult) {
    return geminiResult;
  }

  return Promise.all(
    strings.map((entry) => translateTextViaGoogle(sourceLocale, targetLocale, entry.value)),
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateRequest;
    const sourceLocale = body.sourceLocale ?? "fr";
    const targetLocales = body.targetLocales ?? [];
    const content = body.content;

    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "content is required" }, { status: 400 });
    }

    const strings = flattenStrings(content);
    const translations: Partial<Record<Locale, JsonLike>> = {};

    await Promise.all(
      targetLocales.map(async (locale) => {
        if (locale === sourceLocale) {
          return;
        }

        try {
          const translatedStrings = await translateStrings(sourceLocale, locale, strings);
          const localized = cloneJson(content);

          strings.forEach((entry, index) => {
            setDeepValue(localized, entry.path, translatedStrings[index]);
          });

          translations[locale] = localized;
        } catch (error) {
          console.error(`Translation failed for ${locale}:`, error);
        }
      }),
    );

    return NextResponse.json({ translations });
  } catch (error) {
    console.error("translate-content error:", error);
    return NextResponse.json({ error: "Failed to translate content" }, { status: 500 });
  }
}