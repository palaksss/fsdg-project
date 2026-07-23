import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
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

        if (!formData.email.trim() || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        login({
            name: "Palak",
            email: formData.email,
        });

        navigate("/dashboard");

        // Temporary frontend behaviour.
        // Replace this with the backend login request later.
        const { login } = useAuth();
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
                            Welcome back
                        </p>

                        <h1 className="mt-4 text-4xl font-bold leading-tight">
                            Continue improving your resume with AI.
                        </h1>

                        <p className="mt-5 leading-7 text-indigo-100">
                            Sign in to access your dashboard, review previous
                            analyses, track ATS scores, and continue optimizing
                            your resume for the roles you want.
                        </p>
                    </div>

                    <p className="text-sm text-indigo-100">
                        Analyze smarter. Apply with confidence.
                    </p>
                </section>

                {/* Login form */}
                <section className="p-7 sm:p-10">
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent md:hidden"
                    >
                        AlignCV
                    </Link>

                    <div className="mt-8 md:mt-0">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <LogIn size={24} />
                        </div>

                        <h2 className="mt-5 text-3xl font-bold text-slate-800">
                            Sign in to your account
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Enter your details to continue to AlignCV.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        
                        {/* Email */}
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

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                    onClick={() =>
                                        alert(
                                            "Forgot password functionality will be added later."
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
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

                        {/* Error */}
                        {error && (
                            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            Create account
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}