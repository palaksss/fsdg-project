import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { navLinks } from "../data/navLinks";

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout } = useAuth();

    const handleFeaturesClick = () => {
        setOpenMobileMenu(false);

        if (location.pathname === "/") {
            document
                .getElementById("features")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        } else {
            navigate("/");

            setTimeout(() => {
                document
                    .getElementById("features")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }, 150);
        }
    };

    useEffect(() => {
        if (openMobileMenu) {
            document.body.classList.add("max-md:overflow-hidden");
        } else {
            document.body.classList.remove("max-md:overflow-hidden");
        }

        return () => {
            document.body.classList.remove("max-md:overflow-hidden");
        };
    }, [openMobileMenu]);

    return (
        <nav
            className={`fixed top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 px-6 py-4 md:px-16 lg:px-24 xl:px-32 ${
                openMobileMenu
                    ? "bg-white/80"
                    : "bg-white/40 backdrop-blur"
            }`}
        >
            {/* Logo */}
            <Link
                to="/"
                onClick={() => setOpenMobileMenu(false)}
            >
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
                    AlignCV
                </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center font-medium md:flex md:gap-8 lg:gap-9 lg:pl-20">
                {navLinks.map((link) =>
                    link.name === "Features" ? (
                        <button
                            key={link.name}
                            type="button"
                            onClick={handleFeaturesClick}
                            className="transition hover:text-indigo-600"
                        >
                            {link.name}
                        </button>
                    ) : (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600"
                                    : "transition hover:text-indigo-600"
                            }
                        >
                            {link.name}
                        </NavLink>
                    )
                )}
            </div>

            {/* Mobile navigation */}
            <div
                className={`fixed inset-0 flex flex-col items-center justify-center gap-6 bg-white/80 text-lg font-medium backdrop-blur-md transition-transform duration-300 md:hidden ${
                    openMobileMenu
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                {navLinks.map((link) =>
                    link.name === "Features" ? (
                        <button
                            key={link.name}
                            type="button"
                            onClick={handleFeaturesClick}
                            className="transition hover:text-indigo-600"
                        >
                            {link.name}
                        </button>
                    ) : (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            onClick={() => setOpenMobileMenu(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600"
                                    : "transition hover:text-indigo-600"
                            }
                        >
                            {link.name}
                        </NavLink>
                    )
                )}

                <button
                    type="button"
                    onClick={() => {
                        setOpenMobileMenu(false);
                        navigate("/login");
                    }}
                >
                    Sign in
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setOpenMobileMenu(false);
                        navigate("/register");
                    }}
                    className="rounded-md bg-indigo-600 px-5 py-2.5 text-white"
                >
                    Get started
                </button>

                <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-md bg-indigo-600 p-1 text-white transition hover:bg-indigo-700"
                    onClick={() => setOpenMobileMenu(false)}
                    aria-label="Close menu"
                >
                    <XIcon />
                </button>
            </div>

            {/* Right-side buttons */}
            <div className="flex items-center gap-4">
                {user ? (
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="hidden rounded-md border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-50 md:block"
                    >
                        Logout
                    </button>
                ) : (
                <>
                        <button
                            onClick={() => navigate("/login")}
                            className="hidden rounded-md border border-indigo-600 px-4 py-2 transition hover:bg-slate-100 md:block"
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="hidden rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 md:block"
                        >
                            Get Started
                        </button>
                </>
            )}
            </div>
        </nav>
    );
}