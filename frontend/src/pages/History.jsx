import {
    CalendarDays,
    FileText,
    LoaderCircle,
    Search,
    Target,
    Trash2,
    X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function History() {
    const { user } = useAuth();

    const [historyData, setHistoryData] = useState([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isViewing, setIsViewing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user?.email) {
                setError("Please log in to view your analysis history.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/api/analyses?userEmail=${encodeURIComponent(
                        user.email
                    )}`
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Could not load analysis history."
                    );
                }

                setHistoryData(data.analyses || []);
            } catch (err) {
                console.error("History fetch error:", err);

                setError(
                    err.message || "Could not load analysis history."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [user?.email]);

    const filteredHistory = useMemo(() => {
        const searchValue = searchTerm.trim().toLowerCase();

        if (!searchValue) {
            return historyData;
        }

        return historyData.filter((item) => {
            return (
                item.resumeName?.toLowerCase().includes(searchValue) ||
                item.jobTitle?.toLowerCase().includes(searchValue) ||
                item.company?.toLowerCase().includes(searchValue)
            );
        });
    }, [historyData, searchTerm]);

    const highestScore =
        historyData.length > 0
            ? Math.max(
                  ...historyData.map((item) => item.atsScore || 0)
              )
            : 0;

    const lastAnalysis =
        historyData.length > 0
            ? formatDate(historyData[0].createdAt)
            : "No data";

    const handleView = async (id) => {
        try {
            setIsViewing(true);
            setError("");

            const response = await fetch(
                `http://localhost:5000/api/analyses/${id}?userEmail=${encodeURIComponent(
                    user.email
                )}`
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Could not load analysis."
                );
            }

            setSelectedAnalysis(data.analysis);
        } catch (err) {
            console.error("View analysis error:", err);

            setError(
                err.message || "Could not load analysis."
            );
        } finally {
            setIsViewing(false);
        }
    };

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this analysis?"
        );

        if (!shouldDelete) return;

        try {
            setDeletingId(id);
            setError("");

            const response = await fetch(
                `http://localhost:5000/api/analyses/${id}?userEmail=${encodeURIComponent(
                    user.email
                )}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Could not delete analysis."
                );
            }

            setHistoryData((previousHistory) =>
                previousHistory.filter((item) => item._id !== id)
            );

            if (selectedAnalysis?._id === id) {
                setSelectedAnalysis(null);
            }
        } catch (err) {
            console.error("Delete analysis error:", err);

            setError(
                err.message || "Could not delete analysis."
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Heading */}
                    <section className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Previous analyses
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Analysis History
                        </h1>

                        <p className="mt-3 max-w-2xl text-slate-600">
                            Review your previous resume analyses, compare ATS
                            scores, and revisit recommendations for different
                            job roles.
                        </p>
                    </section>

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Summary cards */}
                    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <SummaryCard
                            label="Total Analyses"
                            value={historyData.length}
                            icon={<FileText size={22} />}
                        />

                        <SummaryCard
                            label="Highest ATS Score"
                            value={`${highestScore}%`}
                            icon={<Target size={22} />}
                        />

                        <SummaryCard
                            label="Last Analysis"
                            value={lastAnalysis}
                            icon={<CalendarDays size={22} />}
                        />
                    </section>

                    {/* History table */}
                    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Recent Resume Analyses
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your saved resume and job-description
                                    comparisons.
                                </p>
                            </div>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search history..."
                                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center gap-3 px-6 py-16 text-slate-600">
                                <LoaderCircle className="animate-spin" />

                                <span>Loading analysis history...</span>
                            </div>
                        ) : filteredHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                                <div className="flex size-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                                    <FileText size={26} />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                    No analyses found
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {searchTerm
                                        ? "No saved analysis matches your search."
                                        : "Your resume analyses will appear here."}
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop table */}
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-sm text-slate-500">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">
                                                    Resume
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Job Role
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Company
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    ATS Score
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Date
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-200">
                                            {filteredHistory.map((item) => (
                                                <tr
                                                    key={item._id}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                                <FileText
                                                                    size={19}
                                                                />
                                                            </div>

                                                            <span className="max-w-52 truncate font-medium text-slate-800">
                                                                {item.resumeName ||
                                                                    "Resume.pdf"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-slate-700">
                                                        {item.jobTitle ||
                                                            "Not specified"}
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-slate-700">
                                                        {item.company ||
                                                            "Not specified"}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <ScoreBadge
                                                            score={
                                                                item.atsScore
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-slate-500">
                                                        {formatDate(
                                                            item.createdAt
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleView(
                                                                        item._id
                                                                    )
                                                                }
                                                                disabled={
                                                                    isViewing
                                                                }
                                                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                            >
                                                                View
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item._id
                                                                    )
                                                                }
                                                                disabled={
                                                                    deletingId ===
                                                                    item._id
                                                                }
                                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                                                aria-label={`Delete analysis for ${
                                                                    item.jobTitle ||
                                                                    "this role"
                                                                }`}
                                                            >
                                                                {deletingId ===
                                                                item._id ? (
                                                                    <LoaderCircle
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="animate-spin"
                                                                    />
                                                                ) : (
                                                                    <Trash2
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile row cards */}
                                <div className="divide-y divide-slate-200 md:hidden">
                                    {filteredHistory.map((item) => (
                                        <article
                                            key={item._id}
                                            className="p-5"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                        <FileText size={19} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-medium text-slate-800">
                                                            {item.resumeName ||
                                                                "Resume.pdf"}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            {item.jobTitle ||
                                                                "Not specified"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <ScoreBadge
                                                    score={item.atsScore}
                                                />
                                            </div>

                                            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-500">
                                                <span className="truncate">
                                                    {item.company ||
                                                        "Not specified"}
                                                </span>

                                                <span className="shrink-0">
                                                    {formatDate(
                                                        item.createdAt
                                                    )}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleView(item._id)
                                                    }
                                                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                                >
                                                    View Analysis
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }
                                                    disabled={
                                                        deletingId === item._id
                                                    }
                                                    className="rounded-lg border border-slate-300 p-2 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                                                    aria-label="Delete analysis"
                                                >
                                                    {deletingId ===
                                                    item._id ? (
                                                        <LoaderCircle
                                                            size={18}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <Trash2 size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </main>

            {/* View analysis modal */}
            {selectedAnalysis && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                    onClick={() => setSelectedAnalysis(null)}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                    Saved analysis
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                    {selectedAnalysis.resumeName}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    {formatDate(
                                        selectedAnalysis.createdAt
                                    )}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedAnalysis(null)
                                }
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label="Close analysis"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="mt-7 grid gap-4 sm:grid-cols-3">
                            <ModalInfo
                                label="ATS Score"
                                value={
                                    <ScoreBadge
                                        score={
                                            selectedAnalysis.atsScore
                                        }
                                    />
                                }
                            />

                            <ModalInfo
                                label="Job Role"
                                value={
                                    selectedAnalysis.jobTitle ||
                                    "Not specified"
                                }
                            />

                            <ModalInfo
                                label="Company"
                                value={
                                    selectedAnalysis.company ||
                                    "Not specified"
                                }
                            />
                        </div>

                        <SkillSection
                            title="Matched Skills"
                            skills={selectedAnalysis.matchedSkills}
                            badgeClass="bg-emerald-50 text-emerald-700"
                        />

                        <SkillSection
                            title="Missing Skills"
                            skills={selectedAnalysis.missingSkills}
                            badgeClass="bg-amber-50 text-amber-700"
                        />

                        <SkillSection
                            title="Required Skills"
                            skills={selectedAnalysis.requiredSkills}
                            badgeClass="bg-blue-50 text-blue-700"
                        />

                        <section className="mt-7">
                            <h3 className="text-lg font-semibold text-slate-900">
                                Suggestions
                            </h3>

                            {selectedAnalysis.suggestions?.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    {selectedAnalysis.suggestions.map(
                                        (suggestion, index) => (
                                            <li
                                                key={`${suggestion}-${index}`}
                                                className="rounded-xl bg-violet-50 px-4 py-3 text-sm leading-6 text-violet-900"
                                            >
                                                {suggestion}
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <p className="mt-3 text-sm text-slate-500">
                                    No suggestions available.
                                </p>
                            )}
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                        {value}
                    </p>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function ScoreBadge({ score = 0 }) {
    let scoreStyle = "bg-red-50 text-red-700";

    if (score >= 85) {
        scoreStyle = "bg-emerald-50 text-emerald-700";
    } else if (score >= 70) {
        scoreStyle = "bg-amber-50 text-amber-700";
    }

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${scoreStyle}`}
        >
            {score}%
        </span>
    );
}

function SkillSection({ title, skills = [], badgeClass }) {
    return (
        <section className="mt-7">
            <h3 className="text-lg font-semibold text-slate-900">
                {title}
            </h3>

            {skills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={`${skill}-${index}`}
                            className={`rounded-full px-3 py-1.5 text-sm font-medium ${badgeClass}`}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="mt-3 text-sm text-slate-500">
                    No skills available.
                </p>
            )}
        </section>
    );
}

function ModalInfo({ label, value }) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
                {label}
            </p>

            <div className="mt-2 font-semibold text-slate-900">
                {value}
            </div>
        </div>
    );
}

function formatDate(date) {
    if (!date) return "No date";

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}