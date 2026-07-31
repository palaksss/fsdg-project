import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("aligncv_user");
            const savedToken = localStorage.getItem("aligncv_token");

            if (savedUser && savedToken) {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }
        } catch (error) {
            console.error("Could not restore login:", error);

            localStorage.removeItem("aligncv_user");
            localStorage.removeItem("aligncv_token");
        } finally {
            setIsAuthLoading(false);
        }
    }, []);

    const saveAuth = (authUser, authToken) => {
        setUser(authUser);
        setToken(authToken);

        localStorage.setItem(
            "aligncv_user",
            JSON.stringify(authUser)
        );

        localStorage.setItem(
            "aligncv_token",
            authToken
        );
    };

    const register = async ({ name, email, password }) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Registration failed."
            );
        }

        saveAuth(data.user, data.token);

        return data.user;
    };

    const login = async ({ email, password }) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Login failed."
            );
        }

        saveAuth(data.user, data.token);

        return data.user;
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("aligncv_user");
        localStorage.removeItem("aligncv_token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthLoading,
                isAuthenticated: Boolean(user && token),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider."
        );
    }

    return context;
}