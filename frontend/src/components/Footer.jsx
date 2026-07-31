import Icon from "../assets/icon.svg";
import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";

export default function Footer() {
    return (
        <footer className="mt-40 w-full px-6 text-slate-500 md:px-16 lg:px-24 xl:px-32">
            <div className="flex w-full flex-col justify-between gap-10 border-b border-gray-200 pb-6 md:flex-row">
                {/* Left Section */}
                <div className="md:max-w-[28rem]">
                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >
                        <img
                            src={Icon}
                            alt="AlignCV Logo"
                            className="h-10 w-auto"
                        />

                        <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
                            AlignCV
                        </span>
                    </Link>

                    <p className="mt-6">
                        AlignCV is an AI-powered resume analyzer that helps
                        job seekers improve ATS compatibility, identify skill
                        gaps, and receive personalized suggestions to create
                        stronger resumes.
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-1 items-start gap-20 md:justify-end">
                    <div>
                        <h2 className="mb-5 font-semibold text-gray-800">
                            Company
                        </h2>

                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="hover:text-indigo-600"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-5 font-semibold text-gray-800">
                            Get in touch
                        </h2>

                        <div className="space-y-2">
                            <p>support@aligncv.ai</p>
                            <p>Built as a Full-Stack AI Project</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 pb-5 text-center">
                © {new Date().getFullYear()} AlignCV. Built using MERN Stack &
                Gemini AI. All Rights Reserved.
            </p>
        </footer>
    );
}