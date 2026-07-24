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
    storage
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

app.listen(5000, () => {

    console.log("Server running on port 5000");

});