import {
    Eye,
    EyeOff,
    LoaderCircle,
    LockKeyhole,
} from "lucide-react";
import { useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const password = formData.password;
        const confirmPassword =
            formData.confirmPassword;

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setError("");
            setMessage("");
            setIsLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Could not reset password."
                );
            }

            setMessage(data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(
                err.message ||
                    "Could not reset password."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
                <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <LockKeyhole size={23} />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-slate-900">
                    Create a new password
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter and confirm your new AlignCV
                    password.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >
                    <PasswordInput
                        id="password"
                        name="password"
                        label="New password"
                        value={formData.password}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm new password"
                        value={formData.confirmPassword}
                        showPassword={showConfirmPassword}
                        setShowPassword={
                            setShowConfirmPassword
                        }
                        onChange={handleChange}
                    />

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
                        disabled={isLoading || Boolean(message)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            <>
                                <LoaderCircle
                                    size={18}
                                    className="animate-spin"
                                />
                                Updating password...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Remembered your password?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}

function PasswordInput({
    id,
    name,
    label,
    value,
    showPassword,
    setShowPassword,
    onChange,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={
                        showPassword ? "text" : "password"
                    }
                    value={value}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(
                            (previous) => !previous
                        )
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
    );
}