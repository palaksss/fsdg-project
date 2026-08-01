import {
    ArrowLeft,
    LoaderCircle,
    Mail,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const normalizedEmail = email.trim();

        if (!normalizedEmail) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setError("");
            setMessage("");
            setIsLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: normalizedEmail,
                    }),
                }
            );

            const responseText = await response.text();

            let data = {};

            if (responseText) {
                try {
                    data = JSON.parse(responseText);
                } catch {
                    throw new Error(
                        "The server returned an invalid response."
                    );
                }
            }

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Could not send reset email."
                );
            }

            setMessage(data.message);
        } catch (err) {
            console.error("Forgot password error:", err);

            setError(
                err.message || "Could not send reset email."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                    <ArrowLeft size={17} />
                    Back to login
                </Link>

                <div className="mt-8 flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Mail size={23} />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-slate-900">
                    Forgot your password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter your registered email address and
                    we’ll send you a password reset link.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                                setMessage("");
                            }}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            <>
                                <LoaderCircle
                                    size={18}
                                    className="animate-spin"
                                />
                                Sending link...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}