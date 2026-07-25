const fs = require("fs");
const pdf = require("pdf-parse");

const parseResume = require("../utils/resumeParser");
const analyzeResumeWithGemini = require("../services/gemini");

const uploadResume = async (req, res) => {

    try {

        const dataBuffer = fs.readFileSync(req.file.path);

        const pdfData = await pdf(dataBuffer);

        const resume = parseResume(pdfData.text);

        res.json({
            success: true,
            filename: req.file.filename,
            resume
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Error reading PDF"
        });

    }

};

const analyzeResume = async (req, res) => {

    try {

        const { resume, jobDescription } = req.body;

        const result = await analyzeResumeWithGemini(
            resume,
            jobDescription
        );

        res.json(result);

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Gemini analysis failed"
        });

    }

};

module.exports = {
    uploadResume,
    analyzeResume
};