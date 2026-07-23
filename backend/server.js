const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const cors = require("cors");

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }

    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("Resume Uploaded");

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(dataBuffer);

    console.log("----------------------");
    console.log(pdfData.text);
    console.log("----------------------");

    res.json({
      success: true,
      filename: req.file.filename,
      extractedText: pdfData.text,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error reading PDF",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});