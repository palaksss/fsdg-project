const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        resumeName: {
            type: String,
            required: true,
            trim: true,
        },

        jobTitle: {
            type: String,
            default: "Not specified",
            trim: true,
        },

        company: {
            type: String,
            default: "Not specified",
            trim: true,
        },

        jobDescription: {
            type: String,
            required: true,
        },

        atsScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        matchedSkills: {
            type: [String],
            default: [],
        },

        missingSkills: {
            type: [String],
            default: [],
        },

        requiredSkills: {
            type: [String],
            default: [],
        },

        suggestions: {
            type: [String],
            default: [],
        },

        userEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Analysis", analysisSchema);