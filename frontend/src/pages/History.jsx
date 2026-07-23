import {
    CalendarDays,
    FileText,
    Search,
    Target,
    Trash2,
} from "lucide-react";
import Navbar from "../components/Navbar";

const historyData = [
    {
        id: 1,
        resumeName: "Palak_Resume.pdf",
        jobRole: "Software Engineer Intern",
        company: "Microsoft",
        atsScore: 87,
        date: "23 July 2026",
    },
    {
        id: 2,
        resumeName: "Palak_ML_Resume.pdf",
        jobRole: "Machine Learning Intern",
        company: "Adobe",
        atsScore: 91,
        date: "20 July 2026",
    },
    {
        id: 3,
        resumeName: "Palak_Resume.pdf",
        jobRole: "Frontend Developer Intern",
        company: "Atlassian",
        atsScore: 78,
        date: "17 July 2026",
    },
];

export default function History() {
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

                    {/* Summary cards */}
                    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <SummaryCard
                            label="Total Analyses"
                            value="3"
                            icon={<FileText size={22} />}
                        />

                        <SummaryCard
                            label="Highest ATS Score"
                            value="91%"
                            icon={<Target size={22} />}
                        />

                        <SummaryCard
                            label="Last Analysis"
                            value="23 Jul"
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
                                    placeholder="Search history..."
                                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                                />
                            </div>
                        </div>

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
                                    {historyData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                        <FileText size={19} />
                                                    </div>

                                                    <span className="font-medium text-slate-800">
                                                        {item.resumeName}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-700">
                                                {item.jobRole}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-700">
                                                {item.company}
                                            </td>

                                            <td className="px-6 py-5">
                                                <ScoreBadge
                                                    score={item.atsScore}
                                                />
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-500">
                                                {item.date}
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                        aria-label="Delete analysis"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="divide-y divide-slate-200 md:hidden">
                            {historyData.map((item) => (
                                <article key={item.id} className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                <FileText size={19} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate font-medium text-slate-800">
                                                    {item.resumeName}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {item.jobRole}
                                                </p>
                                            </div>
                                        </div>

                                        <ScoreBadge score={item.atsScore} />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                                        <span>{item.company}</span>
                                        <span>{item.date}</span>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            type="button"
                                            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                        >
                                            View Analysis
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded-lg border border-slate-300 p-2 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                            aria-label="Delete analysis"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function ScoreBadge({ score }) {
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