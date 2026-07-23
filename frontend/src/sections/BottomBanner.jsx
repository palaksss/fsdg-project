import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BottomBanner() {
    const navigate = useNavigate();

    return (
        <div className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto mt-28 px-8 md:px-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10">

                <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                        Ready to Optimize Your Resume?
                    </h2>

                    <p className="mt-4 text-slate-600 max-w-lg">
                        Upload your resume, compare it with your dream job description,
                        and receive AI-powered ATS insights to stand out from the competition.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition"
                >
                    Analyze Resume
                    <ArrowRight size={18} />
                </button>

            </div>
        </div>
    );
}