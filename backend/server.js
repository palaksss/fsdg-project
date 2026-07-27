require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const connectDatabase = require("./config/db");

const {
    uploadResume,
    analyzeResume,
} = require("./controllers/analyzeController");

const {
    getAnalyses,
    getAnalysisById,
    deleteAnalysis,
} = require("./controllers/historyController");

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());



const storage = multer.diskStorage({
    destination(req, file, cb) {

        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads");
        }

        cb(null, "uploads/");
    },

    filename(req, file, cb) {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"));
        }

        cb(null, true);
    },
});

// Upload resume
app.post(
    "/api/upload",
    upload.single("resume"),
    uploadResume
);

// Analyze resume
app.post(
    "/api/analyze",
    analyzeResume
);

// History routes
app.get("/api/analyses", getAnalyses);

app.get(
    "/api/analyses/:id",
    getAnalysisById
);

app.delete(
    "/api/analyses/:id",
    deleteAnalysis
);

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message:
                error.code === "LIMIT_FILE_SIZE"
                    ? "PDF must be smaller than 5 MB."
                    : error.message,
        });
    }

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong.",
        });
    }

    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});