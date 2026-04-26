import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 503 });
  }

  const quote = await req.json();

  const prompt = `
Tu es l'assistant IA interne du Groupe Lipanda FAMILY, une entreprise d'ingénierie multidisciplinaire (hydraulique, BTP, énergies, études spécialisées) en RDC.

Analyse cette demande de devis et réponds en JSON avec exactement ces champs :
{
  "priority": "haute" | "moyenne" | "faible",
  "complexity": "simple" | "moyenne" | "complexe",
  "summary": "résumé en 1-2 phrases du besoin du client",
  "flags": ["liste de points d'attention ou risques éventuels"],
  "suggestedReply": "brouillon de réponse professionnelle en français pour ce client (2-3 phrases, ton Groupe Lipanda FAMILY)",
  "estimatedTimeline": "estimation réaliste du délai d'exécution",
  "questions": ["question complémentaire 1", "question complémentaire 2"]
}

Demande de devis :
- Code : ${quote.code}
- Service : ${quote.service}
- Sous-service : ${quote.subService || "Non précisé"}
- Localisation : ${quote.location || "Non précisée"}
- Urgence déclarée : ${quote.urgency || "Non précisée"}
- Délai souhaité : ${quote.timeline || "Non précisé"}
- Budget : ${quote.budget || "Non précisé"}
- Description : ${quote.description || "Aucune description"}
- Client : ${quote.firstName} ${quote.lastName}${quote.organization ? `, ${quote.organization}` : ""}

Réponds UNIQUEMENT avec le JSON, sans markdown ni explication.
`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Strip markdown code fences if present
    const clean = text.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ error: "Analyse échouée", detail: String(err) }, { status: 500 });
  }
}
