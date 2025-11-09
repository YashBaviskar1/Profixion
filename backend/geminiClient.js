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
      description: "A score from 0 to 100, based on the weighted average of the parameter scores."
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
    // ✅ CHANGED: Replaced 'actionPlan' with 'parameterScores'
    parameterScores: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          parameterName: { type: "STRING" },
          score: { type: "NUMBER" },
          justification: { type: "STRING" }
        },
        required: ["parameterName", "score", "justification"]
      },
      description: "An array of 4 objects, each scoring a key profile parameter from 0-10 with a brief justification. The parameters must be: 'Headline', 'About Section', 'Experience Details', and 'Skills & Certifications'."
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
    "parameterScores" // ✅ UPDATED
  ]
};

// Define the System Prompt (The "Persona")
// ✅ UPDATED: Changed instructions for Action Plan -> Parameter Scores
const systemPrompt = `You are a world-class LinkedIn profile optimization expert named 'Profixion'. Your task is to analyze a user's LinkedIn profile, provided as a JSON object, and return a structured JSON audit.

Guidelines:
- Act as an encouraging and helpful career coach.
- Be concise, user-friendly, and positive, even when giving criticism.
- Provide highly actionable advice.
- Do NOT use technical jargon, "N/A", or "NULL". If information is missing (like a summary), frame it as an opportunity.
- Strictly adhere to the requested number of points for each list as defined in the JSON schema.
- Extract the 'full_name', 'headline', and 'public_identifier' (or 'linkedin_profile_url') directly from the provided JSON.
- You MUST provide exactly 4 'parameterScores' objects for: 'Headline', 'About Section', 'Experience Details', and 'Skills & Certifications'.
- The 'overallScore' should be a weighted average of these parameter scores and should be in whole number.`;

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: {
    parts: [{ text: systemPrompt }]
  },
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: auditResponseSchema,
    temperature: 0.0, // ✅ CHANGED: Set to 0.0 for deterministic scoring
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
    const parsedJson = JSON.parse(jsonText);
    console.log("Gemini Analysis Complete:", parsedJson);
    return parsedJson;

  } catch (err) {
    console.error("Gemini analysis failed:", err.message || err);
    // Check for specific content safety blocks
    if (err.response && err.response.promptFeedback) {
      console.error("Prompt Feedback:", err.response.promptFeedback);
    }
    throw new Error(`Gemini analysis failed: ${err.message}`);
  }
}