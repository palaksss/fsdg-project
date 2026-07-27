require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const {
    uploadResume,
    analyzeResume
} = require("./controllers/analyzeController");

const app = express();

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

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.post(
    "/api/upload",
    upload.single("resume"),
    uploadResume
);

app.post(
    "/api/analyze",
    analyzeResume
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});