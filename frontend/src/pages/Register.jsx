import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log("Registration data:", formData);

        // Temporary frontend behaviour.
        // Replace this with the backend registration request later.
        navigate("/dashboard");
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-24">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
                {/* Left section */}
                <section className="hidden bg-gradient-to-br from-indigo-600 to-violet-600 p-10 text-white md:flex md:flex-col md:justify-between">
                    <Link to="/" className="text-3xl font-bold">
                        AlignCV
                    </Link>

                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-100">
                            AI-powered resume analysis
                        </p>

                        <h1 className="mt-4 text-4xl font-bold leading-tight">
                            Build a resume that matches the role you want.
                        </h1>

                        <p className="mt-5 leading-7 text-indigo-100">
                            Create your account to analyze resumes, discover
                            missing keywords, review ATS compatibility, and
                            receive personalized improvement suggestions.
                        </p>
                    </div>

                    <p className="text-sm text-indigo-100">
                        Upload. Analyze. Improve. Apply.
                    </p>
                </section>

                {/* Registration form */}
                <section className="p-7 sm:p-10">
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent md:hidden"
                    >
                        AlignCV
                    </Link>

                    <div className="mt-8 md:mt-0">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <UserPlus size={24} />
                        </div>

                        <h2 className="mt-5 text-3xl font-bold text-slate-800">
                            Create your account
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Start optimizing your resume with AI-powered
                            insights.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                autoComplete="name"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Confirm password
                            </label>

                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Enter your password again"
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (previous) => !previous
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}