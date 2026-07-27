const fs = require("fs");
const pdf = require("pdf-parse");

const parseResume = require("../utils/resumeParser");
const analyzeResumeWithGemini = require("../services/gemini");
const Analysis = require("../models/Analysis");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        const dataBuffer = fs.readFileSync(req.file.path);

        const pdfData = await pdf(dataBuffer);

        const resume = parseResume(pdfData.text);

        // Remove the temporary uploaded PDF
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(200).json({
            success: true,
            filename: req.file.originalname,
            resume,
        });
    } catch (err) {
        console.error("PDF upload error:", err);

        // Remove the file even if parsing fails
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: "Error reading PDF",
        });
    }
};

const analyzeResume = async (req, res) => {
    try {
        const {
            resume,
            resumeName,
            jobDescription,
            jobTitle,
            company,
            userEmail,
        } = req.body;

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Parsed resume is required.",
            });
        }

        if (!jobDescription?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job description is required.",
            });
        }

        if (!userEmail?.trim()) {
            return res.status(400).json({
                success: false,
                message: "User email is required.",
            });
        }

        const result = await analyzeResumeWithGemini(
            resume,
            jobDescription.trim()
        );

        if (
            !result ||
            typeof result.atsScore !== "number"
        ) {
            throw new Error("Invalid analysis response from Gemini.");
        }

        const savedAnalysis = await Analysis.create({
            resumeName: resumeName || "Resume.pdf",
            jobTitle: jobTitle || "Not specified",
            company: company || "Not specified",
            jobDescription: jobDescription.trim(),
            atsScore: result.atsScore,
            matchedSkills: result.matchedSkills || [],
            missingSkills: result.missingSkills || [],
            requiredSkills: result.requiredSkills || [],
            suggestions: result.suggestions || [],
            userEmail: userEmail.trim().toLowerCase(),
        });

        return res.status(201).json({
            success: true,
            analysis: savedAnalysis,
        });
    } catch (error) {
        console.error("Analysis error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Resume analysis failed.",
        });
    }
};

module.exports = {
    uploadResume,
    analyzeResume,
};