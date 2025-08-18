import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayGift from "./components/DisplayGift";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./context/AuthContext";
import ApplicantDashboard from "./components/ApplicantDashboard";

function PrivateRoute({ element }) {
    const { user } = useAuth();
    return user ? element : <Login />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <main className="app-main">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/" element={<PrivateRoute element={<ApplicantDashboard />} />} />
                        <Route path="/apply" element={<PrivateRoute element={<ApplyForm />} />} />
                        <Route path="/getAllGifts" element={<PrivateRoute element={<DisplayGift />} />} />
                        {/* Placeholder routes removed to prevent undefined component references */}

                        {/* Admin & Reviewer Routes */}
                        {/* <Route path="/reviewer-dashboard" element={<ReviewerAdminDashboard />} /> */}
                        {/* <Route path="/provider-dashboard" element={<ProviderDashboard />} /> */}
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
