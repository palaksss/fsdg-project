const fs = require("fs");
const pdf = require("pdf-parse");

const parseResume = require("../utils/resumeParser");
const analyzeResumeWithGemini = require("../services/gemini");

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

        res.json({
            success: true,
            filename: req.file.filename,
            resume,
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Error reading PDF",
        });
    }
};

const analyzeResume = async (req, res) => {
    try {
        const { resume, jobDescription } = req.body;

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Parsed resume is required",
            });
        }

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job description is required",
            });
        }

        const result = await analyzeResumeWithGemini(
            resume,
            jobDescription.trim()
        );

        res.json(result);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Gemini analysis failed",
        });
    }
};

module.exports = {
    uploadResume,
    analyzeResume,
};