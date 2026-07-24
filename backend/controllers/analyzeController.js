const fs = require("fs");
const pdf = require("pdf-parse");

const parseResume = require("../utils/resumeParser");
const matchResume = require("../utils/jobMatcher");

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

const analyzeResume = (req, res) => {

    const { resume, jobDescription } = req.body;

    const result = matchResume(
        resume,
        jobDescription
    );

    res.json(result);

};

module.exports = {
    uploadResume,
    analyzeResume
};