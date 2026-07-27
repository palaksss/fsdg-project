const mongoose = require("mongoose");
const Analysis = require("../models/Analysis");

const getAnalyses = async (req, res) => {
    try {
        const { userEmail } = req.query;

        if (!userEmail?.trim()) {
            return res.status(400).json({
                success: false,
                message: "User email is required.",
            });
        }

        const analyses = await Analysis.find({
            userEmail: userEmail.trim().toLowerCase(),
        }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            analyses,
        });
    } catch (error) {
        console.error("History fetch error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not fetch analysis history.",
        });
    }
};

const getAnalysisById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid analysis ID.",
            });
        }

        const analysis = await Analysis.findOne({
            _id: id,
            userEmail: userEmail?.trim().toLowerCase(),
        });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found.",
            });
        }

        return res.status(200).json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error("Analysis fetch error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not fetch analysis.",
        });
    }
};

const deleteAnalysis = async (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid analysis ID.",
            });
        }

        const analysis = await Analysis.findOneAndDelete({
            _id: id,
            userEmail: userEmail?.trim().toLowerCase(),
        });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Analysis deleted successfully.",
        });
    } catch (error) {
        console.error("Analysis deletion error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not delete analysis.",
        });
    }
};

module.exports = {
    getAnalyses,
    getAnalysisById,
    deleteAnalysis,
};