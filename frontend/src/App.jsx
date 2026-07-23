import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="/history"
                    element={<History />}
                />
            </Routes>

            <Footer />
        </>
    );
}