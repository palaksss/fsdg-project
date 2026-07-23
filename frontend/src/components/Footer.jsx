import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";

export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-40 w-full text-slate-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">
                <div className="md:max-w-114">
                    <Link
                        to="/"
                        className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
                    >
                        AlignCV
                    </Link>
                    <p className="mt-6">
                        AlignCV is an AI-powered resume analyzer that helps job seekers
                        improve ATS compatibility, identify skill gaps, and receive
                        personalized suggestions to create stronger resumes.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="hover:text-indigo-600">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="space-y-2">
                            <p>support@aligncv.ai</p>
                            <p>Built as a Full-Stack AI Project</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center pb-5">
                <p className="pt-4 pb-5 text-center">
                    © {new Date().getFullYear()} AlignCV. Built using MERN Stack & Gemini AI.
                </p> All Right Reserved.
            </p>
        </footer>
    );
};