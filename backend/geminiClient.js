import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the exact JSON structure you want
const auditResponseSchema = {
  type: "OBJECT",
  properties: {
    url: {
      type: "STRING",
      description: "The 'public_identifier' or 'linkedin_profile_url' from the JSON."
    },
    name: {
      type: "STRING",
      description: "The 'full_name' from the JSON."
    },
    headline: {
      type: "STRING",
      description: "The 'headline' from the JSON. If missing, say 'No headline provided'."
    },
    overallScore: {
      type: "NUMBER",
      description: "A score from 0 to 100."
    },
    strengths: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Exactly 3 user-friendly strength points."
    },
    weaknesses: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Exactly 2 user-friendly weakness points, focusing on skills, headline, or general gaps."
    },
    recommendations: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Exactly 2 actionable recommendations."
    },
    actionPlan: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Exactly 2 very crisp and short action plan items."
    }
  },
  required: [
    "url",
    "name",
    "headline",
    "overallScore",
    "strengths",
    "weaknesses",
    "recommendations",
    "actionPlan"
  ]
};

// Define the System Prompt (The "Persona")
const systemPrompt = `You are a world-class LinkedIn profile optimization expert named 'Profixion'. Your task is to analyze a user's LinkedIn profile, provided as a JSON object, and return a structured JSON audit.

Guidelines:
- Act as an encouraging and helpful career coach.
- Be concise, user-friendly, and positive, even when giving criticism.
- Focus on the most relevant information for a job seeker.
- Provide highly actionable advice.
- Do NOT use technical jargon, "N/A", or "NULL". If information is missing (like a summary), frame it as an opportunity in the 'weaknesses' or 'recommendations' section.
- Strictly adhere to the requested number of points for each list as defined in the JSON schema.
- Extract the 'full_name', 'headline', and 'public_identifier' (or 'linkedin_profile_url') directly from the provided JSON.`;

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-09-2025",
  systemInstruction: {
    parts: [{ text: systemPrompt }]
  },
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: auditResponseSchema,
    temperature: 0.5, // A little creativity but not too much
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... add other safety settings as needed
  ],
});


/**
 * Analyzes the LinkedIn profile JSON and returns a structured JSON object.
 */
export async function analyzeWithGemini(snapshotJson) {
  try {
    const userQuery = `Analyze this LinkedIn profile JSON: ${JSON.stringify(snapshotJson)}`;

    const result = await model.generateContent(userQuery);
    const response = result.response;

    // The output is a *string* of JSON, so we need to parse it
    const jsonText = response.text();
    if (!jsonText) {
      throw new Error("Received an empty response from Gemini.");
    }
    
    // Return the parsed JavaScript object
    console.log(JSON.parse(jsonText));
    return JSON.parse(jsonText);

  } catch (err) {
    console.error("Gemini analysis failed:", err.message || err);
    // Check for specific content safety blocks
    if (err.response && err.response.promptFeedback) {
      console.error("Prompt Feedback:", err.response.promptFeedback);
    }
    throw new Error(`Gemini analysis failed: ${err.message}`);
  }
}
