const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeResumeWithGemini(resume, jobDescription) {

    const prompt = `
You are an ATS Resume Analyzer.

Resume:
${JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Analyze the resume against the job description.

Return ONLY valid JSON.

Format:

{
  "atsScore": number,
  "requiredSkills": [],
  "matchedSkills": [],
  "missingSkills": [],
  "suggestions": []
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt
    });

    let text = response.text;

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
}

module.exports = analyzeResumeWithGemini;