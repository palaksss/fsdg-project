import {
    CheckCircle2,
    FileText,
    LoaderCircle,
    Search,
    Sparkles,
    Target,
    UploadCloud,
    X,
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            setError("Please upload a PDF file.");
            setResume(null);
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("Resume file must be smaller than 5 MB.");
            setResume(null);
            return;
        }

        setResume(selectedFile);
        setError("");
    };

    const removeResume = () => {
        setResume(null);
        setShowResults(false);
    };

    const handleAnalyze = () => {
        if (!resume) {
            setError("Please upload your resume.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please paste the job description.");
            return;
        }

        setError("");
        setIsAnalyzing(true);
        setShowResults(false);

        // Temporary mock analysis.
        // Replace this with your backend API request later.
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 1800);
    };

    const suggestions = [
        "Add measurable results to your project and internship descriptions.",
        "Mention REST APIs and backend integration where relevant.",
        "Include Docker and cloud deployment keywords if you have experience.",
        "Move your strongest technical skills closer to the top of the resume.",
    ];

    const matchedSkills = [
        "React",
        "JavaScript",
        "Node.js",
        "MongoDB",
        "Python",
        "Machine Learning",
    ];

    const missingSkills = [
        "Docker",
        "AWS",
        "Redis",
        "CI/CD",
    ];

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Page heading */}
                    <section className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Resume workspace
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Welcome back 👋
                        </h1>

                        <p className="mt-3 max-w-2xl text-slate-600">
                            Upload your resume and compare it with a job
                            description to discover your ATS score, skill gaps,
                            and personalized suggestions.
                        </p>
                    </section>

                    {/* Input cards */}
                    <section className="grid gap-6 lg:grid-cols-2">
                        {/* Resume upload */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                        <UploadCloud size={22} />
                                    </div>

                                    <h2 className="mt-4 text-xl font-semibold text-slate-900">
                                        Upload Resume
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Upload your latest resume in PDF format.
                                    </p>
                                </div>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                    PDF only
                                </span>
                            </div>

                            {!resume ? (
                                <label className="mt-6 flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
                                    <div className="flex size-14 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                                        <FileText size={26} />
                                    </div>

                                    <p className="mt-4 font-medium text-slate-800">
                                        Click to upload your resume
                                    </p>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Maximum file size: 5 MB
                                    </p>

                                    <span className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                                        Browse File
                                    </span>

                                    <input
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50/50 px-6 text-center">
                                    <div className="flex size-14 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                                        <CheckCircle2 size={27} />
                                    </div>

                                    <p className="mt-4 max-w-full truncate font-semibold text-slate-800">
                                        {resume.name}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {(resume.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB
                                    </p>

                                    <button
                                        type="button"
                                        onClick={removeResume}
                                        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                    >
                                        <X size={17} />
                                        Remove file
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Job description */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                                        <Search size={22} />
                                    </div>

                                    <h2 className="mt-4 text-xl font-semibold text-slate-900">
                                        Job Description
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Paste the complete job description you
                                        want to compare.
                                    </p>
                                </div>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                    Required
                                </span>
                            </div>

                            <textarea
                                value={jobDescription}
                                onChange={(event) => {
                                    setJobDescription(event.target.value);
                                    setError("");
                                }}
                                placeholder="Paste the job title, responsibilities, required skills, qualifications, and preferred experience here..."
                                className="mt-6 min-h-64 w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            />

                            <div className="mt-2 flex justify-between text-xs text-slate-400">
                                <span>More detail gives better results</span>
                                <span>{jobDescription.length} characters</span>
                            </div>
                        </div>
                    </section>

                    {error && (
                        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Analyze button */}
                    <div className="mt-7 flex justify-center">
                        <button
                            type="button"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="inline-flex min-w-56 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isAnalyzing ? (
                                <>
                                    <LoaderCircle
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Analyzing Resume...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Analyze Resume
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results */}
                    {showResults && (
                        <section className="mt-12 space-y-6">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                    Analysis results
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                    Resume Match Overview
                                </h2>
                            </div>

                            {/* Stats */}
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    label="ATS Score"
                                    value="87%"
                                    description="Strong overall match"
                                    icon={<Target size={22} />}
                                />

                                <StatCard
                                    label="Matched Skills"
                                    value="12"
                                    description="Relevant skills found"
                                    icon={<CheckCircle2 size={22} />}
                                />

                                <StatCard
                                    label="Missing Skills"
                                    value="4"
                                    description="Keywords to consider"
                                    icon={<Search size={22} />}
                                />

                                <StatCard
                                    label="Match Level"
                                    value="High"
                                    description="Good fit for this role"
                                    icon={<Sparkles size={22} />}
                                />
                            </div>

                            {/* Skill details */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Matched Skills
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Skills found in both your resume and the
                                        job description.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {matchedSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Missing Keywords
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Consider adding these only when they
                                        accurately reflect your experience.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {missingSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                        <Sparkles size={22} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            AI Suggestions
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Improvements that may strengthen
                                            your resume.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3 md:grid-cols-2">
                                    {suggestions.map((suggestion) => (
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
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}

function StatCard({ label, value, description, icon }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-slate-900">
                        {value}
                    </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
                {description}
            </p>
        </div>
    );
}