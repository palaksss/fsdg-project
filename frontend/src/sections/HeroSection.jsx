import { ChevronRightIcon, SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center text-center bg-[url('/assets/hero-section-dot-image.png')] bg-cover bg-no-repeat">
            <a
                href="#"
                className="flex items-center gap-2 rounded-full p-1 pr-3 mt-44 text-indigo-600 bg-indigo-50"
            >
                <span className="bg-indigo-600 text-white text-xs px-3.5 py-1 rounded-full">
                    AI
                </span>

                <p className="flex items-center gap-1">
                    <span>AI-Powered Resume Analyzer</span>
                <ChevronRightIcon size={16} />
                </p>
            </a>
            <h1 className="text-[40px]/12 md:text-[54px]/16 font-semibold max-w-3xl mt-4">
                Align Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                    Resume
                </span>
                {" "}with your dream Job
            </h1>
            <p className="text-base text-slate-600 max-w-lg mt-5">Upload your resume, compare it with job descriptions, identify missing skills, and improve your ATS score using AI.</p>
            <div className="flex items-center gap-4 mt-6">
                <button 
                    onClick={() => navigate("/dashboard")}
                    className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-md text-white">
                    Analyze Resume
                </button>

                <button className="flex items-center justify-center gap-2 border border-indigo-400 px-5 py-3 rounded-md text-indigo-600">
                    Explore Features
                </button>
            </div>
            <img
                className="w-full max-w-5xl mt-16 rounded-2xl shadow-2xl mx-auto border border-slate-200"
                src="/assets/dashboard-preview.png"
                alt="AlignCV Dashboard Preview"
            />
        </div>
    );
}