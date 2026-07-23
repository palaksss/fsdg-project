import {
    Upload,
    BriefcaseBusiness,
    Bot,
    TrendingUp,
} from "lucide-react";

export const howItWorksData = [
    {
        title: "Upload Resume",
        step: "Step 1",
        icon: Upload,
        features: [
            {
                name: "Upload your resume in PDF format.",
                icon: Upload,
            },
            {
                name: "Secure and quick file upload.",
                icon: Upload,
            },
        ],
        buttonText: "Step 1",
    },

    {
        title: "Add Job Description",
        step: "Step 2",
        mostPopular: true,
        icon: BriefcaseBusiness,
        features: [
            {
                name: "Paste the job description.",
                icon: BriefcaseBusiness,
            },
            {
                name: "Compare your resume against the role.",
                icon: BriefcaseBusiness,
            },
        ],
        buttonText: "Step 2",
    },

    {
        title: "AI Analysis",
        step: "Step 3",
        icon: Bot,
        features: [
            {
                name: "Generate ATS compatibility score.",
                icon: Bot,
            },
            {
                name: "Identify missing keywords and skills.",
                icon: Bot,
            },
        ],
        buttonText: "Step 3",
    },

    {
        title: "Improve Resume",
        step: "Step 4",
        icon: TrendingUp,
        features: [
            {
                name: "Review AI suggestions.",
                icon: TrendingUp,
            },
            {
                name: "Optimize and apply with confidence.",
                icon: TrendingUp,
            },
        ],
        buttonText: "Final Step",
    },
];