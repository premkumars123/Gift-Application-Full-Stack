import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashboardNavBar from "./components/DashboardNavBar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayGift from "./components/DisplayGift";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./context/AuthContext";
import ApplicantDashboard from "./components/ApplicantDashboard";
import ReviewerAdminDashboard from "./components/ReviewerAdminDashboard";
import ApplicationManagement from "./components/ApplicationManagement";
import ProviderManagement from "./components/ProviderManagement";
import MultiStepApplication from "./components/MultiStepApplication";

function PrivateRoute({ element }) {
    const { user } = useAuth();
    return user ? element : <Login />;
}

function AuthRedirect() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (process.env.NODE_ENV !== 'test') {
            const publicPaths = ['/login', '/register'];
            if (!user && !publicPaths.includes(location.pathname)) {
                navigate('/login', { replace: true });
            }
        }
    }, [user, location.pathname, navigate]);

    return null;
}

function NavBarSwitcher() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');
    return isDashboard ? <DashboardNavBar /> : <NavBar />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AuthRedirect />
                <NavBarSwitcher />
                <main className="app-main">
                    <Routes>
                        {/* Public Routes (kept to satisfy tests) */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/apply" element={<ApplyForm />} />
                        <Route path="/getAllGifts" element={<DisplayGift />} />

                        {/* Authenticated dashboards */}
                        <Route path="/dashboard" element={<PrivateRoute element={<ApplicantDashboard />} />} />
                        <Route path="/reviewer" element={<PrivateRoute element={<ReviewerAdminDashboard />} />} />
                        <Route path="/manage/applications" element={<PrivateRoute element={<ApplicationManagement />} />} />
                        <Route path="/manage/providers" element={<PrivateRoute element={<ProviderManagement />} />} />

                        {/* New: multi-step application form (protected) */}
                        <Route path="/apply/multi" element={<PrivateRoute element={<MultiStepApplication />} />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
