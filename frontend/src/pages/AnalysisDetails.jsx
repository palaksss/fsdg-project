import { ArrowLeft, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const analysisData = {
    1: {
        resumeName: "Palak_Resume.pdf",
        jobRole: "Software Engineer Intern",
        company: "Microsoft",
        atsScore: 87,
        matchedSkills: ["React", "JavaScript", "Node.js", "MongoDB"],
        missingSkills: ["Docker", "AWS"],
        suggestions: [
            "Add measurable outcomes to your projects.",
            "Mention REST API development experience.",
            "Include deployment tools you have used.",
        ],
    },
    2: {
        resumeName: "Palak_ML_Resume.pdf",
        jobRole: "Machine Learning Intern",
        company: "Adobe",
        atsScore: 91,
        matchedSkills: ["Python", "Machine Learning", "TensorFlow", "OpenCV"],
        missingSkills: ["Docker", "MLOps"],
        suggestions: [
            "Add model-performance metrics.",
            "Mention dataset size and preprocessing.",
            "Describe deployment or inference experience.",
        ],
    },
    3: {
        resumeName: "Palak_Resume.pdf",
        jobRole: "Frontend Developer Intern",
        company: "Atlassian",
        atsScore: 78,
        matchedSkills: ["React", "JavaScript", "Tailwind CSS"],
        missingSkills: ["TypeScript", "Testing"],
        suggestions: [
            "Add responsive-design achievements.",
            "Mention reusable component development.",
            "Include testing tools where applicable.",
        ],
    },
};

export default function AnalysisDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const analysis = analysisData[id];

    if (!analysis) {
        return (
            <>
                <Navbar />

                <main className="min-h-screen bg-slate-50 px-4 pt-28">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Analysis not found
                        </h1>

                        <button
                            type="button"
                            onClick={() => navigate("/history")}
                            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-white"
                        >
                            Return to History
                        </button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6">
                <div className="mx-auto max-w-5xl">
                    <button
                        type="button"
                        onClick={() => navigate("/history")}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
                    >
                        <ArrowLeft size={18} />
                        Back to History
                    </button>

                    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FileText size={23} />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        {analysis.jobRole}
                                    </h1>

                                    <p className="mt-1 text-slate-500">
                                        {analysis.company} · {analysis.resumeName}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-emerald-50 px-6 py-4 text-center">
                                <p className="text-sm font-medium text-emerald-700">
                                    ATS Score
                                </p>

                                <p className="mt-1 text-3xl font-bold text-emerald-700">
                                    {analysis.atsScore}%
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mt-6 grid gap-6 md:grid-cols-2">
                        <SkillCard
                            title="Matched Skills"
                            skills={analysis.matchedSkills}
                            type="matched"
                        />

                        <SkillCard
                            title="Missing Skills"
                            skills={analysis.missingSkills}
                            type="missing"
                        />
                    </section>

                    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <Sparkles size={21} />
                            </div>

                            <h2 className="text-xl font-semibold text-slate-900">
                                AI Suggestions
                            </h2>
                        </div>

                        <div className="mt-5 space-y-3">
                            {analysis.suggestions.map((suggestion) => (
                                <div
                                    key={suggestion}
                                    className="flex gap-3 rounded-xl bg-slate-50 p-4"
                                >
                                    <CheckCircle2
                                        size={19}
                                        className="mt-0.5 shrink-0 text-indigo-600"
                                    />

                                    <p className="text-sm leading-6 text-slate-700">
                                        {suggestion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

function SkillCard({ title, skills, type }) {
    const skillClass =
        type === "matched"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700";

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                {title}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium ${skillClass}`}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}