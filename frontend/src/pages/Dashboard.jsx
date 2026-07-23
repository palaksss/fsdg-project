import { useState } from "react";

export default function Dashboard() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");

    return (
        <div className="min-h-screen bg-slate-50 pt-28 px-8">

            <h1 className="text-4xl font-bold mb-2">
                AlignCV Dashboard
            </h1>

            <p className="text-slate-600 mb-10">
                Analyze and optimize resumes using AI.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="space-y-6">

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="font-semibold text-xl mb-4">
                            Upload Resume
                        </h2>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                                setResume(e.target.files[0]);
                            }}
                            className="border rounded-lg p-3 w-full"
                        />
                        {resume && (
                            <p className="mt-2 text-sm text-green-600">
                                Selected: {resume.name}
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="font-semibold text-xl mb-4">
                            Job Description
                        </h2>

                        <textarea
                            rows="10"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste job description here..."
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <button
                        onClick={() => {
                            console.log(resume);
                            console.log(jobDescription);
                        }}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold"
                    >
                        Analyze Resume
                    </button>

                </div>

                <div className="space-y-6">

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="font-semibold">
                            ATS Score
                        </h2>

                        <p className="text-6xl font-bold text-indigo-600 mt-4">
                            84%
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="font-semibold mb-4">
                            Missing Keywords
                        </h2>

                        <div className="flex gap-3 flex-wrap">
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                Docker
                            </span>

                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                AWS
                            </span>

                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                Kubernetes
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="font-semibold mb-4">
                            AI Suggestions
                        </h2>

                        <ul className="list-disc ml-6 space-y-2">
                            <li>Add quantified achievements.</li>
                            <li>Mention deployment experience.</li>
                            <li>Include cloud technologies.</li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    );
}