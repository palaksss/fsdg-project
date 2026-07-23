import SectionTitle from "../components/SectionTitle";
import {
    FileText,
    Target,
    Search,
    Sparkles,
    History,
    Zap
} from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "Resume Parsing",
        description:
            "Upload your resume in PDF format and let AlignCV extract and organize your information automatically.",
    },
    {
        icon: Target,
        title: "ATS Compatibility Score",
        description:
            "Instantly see how well your resume matches a job description with an AI-generated ATS score.",
    },
    {
        icon: Search,
        title: "Skill Gap Analysis",
        description:
            "Identify missing technical skills and important keywords recruiters expect in your resume.",
    },
    {
        icon: Sparkles,
        title: "AI-Powered Suggestions",
        description:
            "Receive personalized recommendations to improve your resume and increase interview chances.",
    },
    {
        icon: History,
        title: "Resume History",
        description:
            "Keep track of previous analyses and compare improvements over time.",
    },
    {
        icon: Zap,
        title: "Instant Analysis",
        description:
            "Analyze your resume against any job description within seconds using AI.",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="mt-24">

            <SectionTitle
                text1="Features"
                text2="Everything You Need to Build a Stronger Resume"
                text3="AlignCV combines AI-powered analysis, ATS optimization, and personalized feedback to help you create resumes that stand out."
            />

            <div className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">

                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-indigo-300 transition-all duration-300"
                        >

                            <div className="w-14 h-14 rounded-xl bg-indigo-100 group-hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center">

                                <Icon
                                    className="text-indigo-600 group-hover:text-white transition-colors duration-300"
                                    size={28}
                                />

                            </div>

                            <h3 className="text-xl font-semibold mt-6">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 mt-3 leading-7">
                                {feature.description}
                            </p>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}