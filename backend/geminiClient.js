import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});

export async function analyzeWithGemini(snapshotJson) {
  try {
    const prompt = `
    Analyze this LinkedIn profile JSON and generate an audit report with:
    - Overall score (0-100)
    - Strengths (bullet list)
    - Weaknesses (bullet list)
    - Recommendations (bullet list)
    
    Profile JSON:
    ${JSON.stringify(snapshotJson, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });

    // response.text contains model’s plain text output
    return response.text;
  } catch (err) {
    console.error("Gemini analysis failed:", err);
    throw err;
  }
}
